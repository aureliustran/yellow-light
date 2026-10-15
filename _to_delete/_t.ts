import { checkConversion } from './crosspost/core/checks.ts';
const src = 'Chú thích:\n\n- *Mi mua cái ni à? / Tiền mô?*: Mày mua cái này à? / Tiền đâu?\n- *Hỏi chi lắm rứa.*: Hỏi gì lắm thế.\n';
const ok = 'Chú thích:\n\n• *Mi mua cái ni à? / Tiền mô?*: Mày mua cái này à? / Tiền đâu?\n• *Hỏi chi lắm rứa.*: Hỏi gì lắm thế.\n';
const bad = 'Chú thích:\n\n• *Mi mua cái ni à?*: Mày mua cái này à?\n• *Hỏi chi lắm rứa.*: Hỏi gì lắm thế.\n';
console.log(checkConversion(src, ok).ok, checkConversion(src, bad).ok);
