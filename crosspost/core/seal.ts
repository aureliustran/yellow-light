// Encrypting the sign-in details from the admin page to the worker.
// Standard Web Crypto, the same in the browser and in Node:
//   a fresh AES-256-GCM key encrypts the data, and the worker's RSA-OAEP
//   public key encrypts that AES key. Only the worker's private key, which
//   never leaves the author's computer, can open it.

export interface Sealed {
  v: 1;
  alg: 'RSA-OAEP-256+A256GCM';
  key: string; // AES key, encrypted with the RSA public key (base64)
  iv: string; // base64
  data: string; // ciphertext (base64)
}

const subtle = () => globalThis.crypto.subtle;
const RSA = { name: 'RSA-OAEP', hash: 'SHA-256' } as const;

function toB64(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function fromB64(s: string): Uint8Array<ArrayBuffer> {
  const bin = atob(s);
  const out = new Uint8Array(new ArrayBuffer(bin.length));
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function makeKeyPair(): Promise<{ publicJwk: JsonWebKey; privateJwk: JsonWebKey }> {
  const pair = await subtle().generateKey({ ...RSA, modulusLength: 3072, publicExponent: new Uint8Array([1, 0, 1]) }, true, ['encrypt', 'decrypt']);
  return {
    publicJwk: await subtle().exportKey('jwk', pair.publicKey),
    privateJwk: await subtle().exportKey('jwk', pair.privateKey),
  };
}

export async function seal(publicJwk: JsonWebKey, value: unknown): Promise<Sealed> {
  const pub = await subtle().importKey('jwk', { ...publicJwk, key_ops: ['encrypt'] }, RSA, false, ['encrypt']);
  const aes = await subtle().generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const data = await subtle().encrypt({ name: 'AES-GCM', iv }, aes, new TextEncoder().encode(JSON.stringify(value)));
  const key = await subtle().encrypt(RSA, pub, await subtle().exportKey('raw', aes));
  return { v: 1, alg: 'RSA-OAEP-256+A256GCM', key: toB64(key), iv: toB64(iv), data: toB64(data) };
}

export async function unseal<T = unknown>(privateJwk: JsonWebKey, sealed: Sealed): Promise<T> {
  if (sealed?.v !== 1 || sealed.alg !== 'RSA-OAEP-256+A256GCM') throw new Error('Không đọc được dữ liệu đã mã hóa (sai định dạng).');
  const priv = await subtle().importKey('jwk', { ...privateJwk, key_ops: ['decrypt'] }, RSA, false, ['decrypt']);
  const raw = await subtle().decrypt(RSA, priv, fromB64(sealed.key));
  const aes = await subtle().importKey('raw', raw, { name: 'AES-GCM' }, false, ['decrypt']);
  const plain = await subtle().decrypt({ name: 'AES-GCM', iv: fromB64(sealed.iv) }, aes, fromB64(sealed.data));
  return JSON.parse(new TextDecoder().decode(plain)) as T;
}

// What the admin page sends. `sentAt` lets the worker refuse old requests.
export interface LoginPayload {
  username: string;
  password: string;
  remember: boolean;
  sentAt: string;
}
