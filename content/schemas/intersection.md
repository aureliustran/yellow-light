---
id: schema.intersection
kind: schema
status: proposed
updated: 2026-11-08
sources: [kien-truc-framework.md §8.3]
---
# schema · intersection

Giao điểm là **một dịp** (order), không phải một node: nhiều node cùng ghi vào, không nằm trong cây node, có **cây riêng** (quãng chứa sự kiện). Nó là siêu cạnh nối nhiều node qua tình tiết. **Vị trí:** `storylines/intersections/X-<nn>.md`. **Mã:** `X-<nn>`.

## Chỉ lưu phần đầu

| Trường | Ý |
| --- | --- |
| `id` | `X-nn` |
| `kind` | `event` (một sự kiện) · `span` (một quãng, chứa sự kiện) · `info` (giao điểm thông tin: sổ ai biết gì) |
| `parent` | giao điểm cha (cây riêng) hoặc `none` |
| `time` | ngày hoặc khoảng ngày |
| `place` | `[[SET.…]]` |
| `override` | luật/register chỉ riêng dịp này (có lý do) |
| `open` | câu hỏi mở (`Q-`) |

## Mọi thứ khác đều sinh (`_views/X-<nn>.view.md`)

Node tham gia · bảng nhịp (sắp theo `beat` của các tình tiết có `x: X-nn`) · **người giữ nhịp** (node có tình tiết trong nhịp và mức cao nhất; bằng mức thì node chủ) · POV · register · mức của dịp · sổ ai biết gì trước và sau (từ `changes` về `SEC-`) · kết quả.

## Luật

1. Giao điểm **không giữ tình tiết**; tình tiết nằm ở node chủ của nó và trỏ vào giao điểm bằng cột `x`, `beat`. (`LAW.check.x-consistency`)
2. Nhân quả xuyên node là cột `causes`, không phải giao điểm.
3. Node không trỏ nhau trực tiếp; chạm nhau chỉ ở giao điểm.
4. Mức giao điểm không thấp hơn mức cao nhất của tình tiết thành phần trong giai đoạn đó — hoặc ghi `override`.
