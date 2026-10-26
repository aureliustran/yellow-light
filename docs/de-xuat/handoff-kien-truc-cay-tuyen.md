# Handoff – Kiến trúc cây tuyến

Oct 25, 2026 · @aureliustran. Bàn giao từ session 25/10 (16:32 → 21:32) sang một session mới chuyên làm kiến trúc. Session cũ chuyển sang tái cấu trúc tuyến thriller (lab); xem mục 6 để không giẫm chân nhau.

## 1. Việc của session này

Đưa kiến trúc cây tuyến từ đề xuất đến áp dụng:
1. Xin tác giả trả lời các câu hỏi đang mở (mục 4), tối đa bốn câu một lần, kèm khuyến nghị.
2. Khi đã có câu trả lời: sửa `kien-truc.md`, `quy-trinh.md`, `README.md` theo `hop-nhat-cay-tuyen.md` §5.
3. Dựng `docs/tuyen/README.md`, `docs/tuyen/goc.md`, rồi các node theo lộ trình `cay-tuyen.md` §11 (trừ tuyến TH, xem mục 6).
4. Sửa skill qua thẻ lưu skill (`propose_skills`): `den-vang-plot-synthesis` thêm bước chọn tuyến; `den-vang-writing-pipeline` bước 0 kéo theo phạm vi; `den-vang-canon` kiểm luật cây; sau đó là script `npm run budget` và các kiểm mới của `canon:check`.

## 2. Đọc gì, theo thứ tự

| # | File | Để biết |
| --- | --- | --- |
| 1 | `docs/README.md`, `docs/kien-truc.md`, `docs/quy-trinh.md` | Kiến trúc hiện hành (repo là kho gốc; tác giả chốt, Claude ghi sổ) |
| 2 | `docs/de-xuat/cay-tuyen.md` | Cây tuyến: gốc, năm tuyến cấp 1, node, giao điểm, thang D → SSS theo năm giai đoạn, ma trận mức |
| 3 | `docs/de-xuat/hop-nhat-cay-tuyen.md` | Đối chiếu với kiến trúc cũ; cây quyết định (lối vào A, B); ba chỗ không khớp và phương án hợp nhất M1, M2, M3 |
| 4 | `docs/de-xuat/ngan-sach-tuyen.md` | Ngân sách theo tuyến: hai quỹ, chia hai tầng có sàn, cờ đảo ngược, neo quỹ từ node trục |
| 5 | `docs/canon/cau-hoi.md` | Q-022 → Q-036 là của cây tuyến |

Cả bốn file `de-xuat` và `cau-hoi.md` có bản sao cùng đường dẫn trên Project "Đèn Vàng".

## 3. Tác giả đã nói gì (25/10, theo giờ)

Đây là ý tác giả trong chat, **chưa phải chốt có mã D-** vì sổ quyết định chưa dựng. Hỏi tác giả: các ý này có tính là chốt không, để đánh mã khi dựng `so-quyet-dinh.md`.

| Giờ | Ý tác giả |
| --- | --- |
| 16:32 | Chia việc dựng tình tiết thành các tuyến, làm nguồn sự thật cho tình tiết. Gốc là truyện và các quan niệm hiện sinh, thứ sinh ra các tuyến. Tuyến romance (Thuyên – Nhi rất chính), thriller (thực tập, summit, lab). Giao điểm tự do (ví dụ romance giao thriller ở Thuyên – Diệp Anh). Claude được đề xuất thêm tuyến ở mọi tầng |
| 16:35 | Thêm tuyến cấp 1 **Quá khứ**: phát triển nhân vật qua hồi tưởng, tạo quan niệm hiện sinh, thế giới quan, tư duy của nhân vật ở mạch hiện tại |
| 16:41 | Đánh giá mức theo thang D → SSS |
| 16:46 | "Phần" chưa có định nghĩa; dùng các giai đoạn của truyện; node cũng đánh giá D → SSS |
| 16:55 | Mức TH.LAB: GĐ1 SS+, GĐ2 SSS, GÃY S. Hiện sinh nằm hẳn trong gốc, mọi tuyến đều chứa nó; bỏ tuyến Hiện sinh; triển khai nằm trong các tuyến |
| 17:05 | Dùng kiến trúc này làm cây quyết định để AI biết tập trung vào tuyến nào khi lập plan; chọn làm chính nếu khớp cái có sẵn, nếu không thì đề xuất phương án hợp nhất |
| 21:16 | RM: MĐ B, GĐ1 SS+, GĐ2 SSS, GÃY SS+. TH: GĐ1 SS+, GĐ2 SSS, GÃY SSS. Romance và thriller là thứ giữ người đọc ở lại; quỹ cho các mạch hiện tại dồn vào hai mạch này. Ma trận giống kế toán: biết độ quan trọng từng hạng mục để chia ngân sách |
| 21:25 | Token chỉ giới hạn bởi kỳ reset, đăng ký một tháng là có lại, nên quỹ rất lớn: coi mỗi giai đoạn là 100% effort, chia phần trăm theo mức độ ảnh hưởng |
| 21:32 | Việc kiến trúc bàn giao sang session khác; session cũ tập trung vào TH |

**Việc treo từ 21:25:** Claude đồng ý và đề xuất bốn sửa cho `ngan-sach-tuyen.md`, tác giả chưa trả lời:
1. Mục 6: quỹ effort thành "100% mỗi giai đoạn, phần trăm là độ sâu đầu tư" (số vòng nghiên cứu, phương án, độ kỹ phản biện), không còn là giới hạn chi.
2. Bỏ dự phòng của effort; giữ dự phòng 10% của quỹ chữ.
3. Q-036 đổi từ "đặt quỹ chữ tuyệt đối" thành "chữ tuyệt đối chỉ cần khi chốt số chương"; quỹ chữ giữ ở dạng phần trăm vì nó quyết định nhịp đọc.
4. Thêm dòng: thứ thật sự có hạn là sự chú ý của người đọc và thời gian duyệt của tác giả; lịch reset chỉ là chuyện xếp đợt.

Kèm theo: mỗi giai đoạn 100% thì không so được giữa các giai đoạn; nếu cần thì thêm một tầng phần trăm của cả truyện cho từng giai đoạn.

## 4. Câu hỏi đang mở (theo thứ tự nên hỏi)

| Ưu tiên | Q | Nội dung ngắn | Khuyến nghị |
| --- | --- | --- | --- |
| 1 | Q-030 | Cây tuyến làm kiến trúc chính của T1 và cây quyết định ở cửa vào T2 | Có |
| 1 | Q-031 | Tình tiết đã chốt nằm ở đâu: M1 node là canon, M2 bible, M3 tách file (gộp Q-023) | M1 |
| 1 | Q-022 | Năm tuyến cấp 1: QK, RM, TH, SL, GD | Duyệt |
| 1 | Q-028 | Thang D → SSS (có SS+) theo năm giai đoạn; MĐ có gồm quá khứ lớp 10 → đại học không | Duyệt; hỏi riêng câu MĐ |
| 2 | Q-026, Q-027 | Khuôn mã; mỗi node một cha | Duyệt |
| 2 | Q-032, Q-033 | Bốn vai theo mức, mục "Không đụng", luật va chạm theo nhịp; mức quyết định độ nặng quy trình | Duyệt |
| 2 | Q-024, Q-025, Q-029 | HĐQT ở SL; QK dày cho Thuyên; chủ của *Nước lạnh* và chẩn đoán | SL; Thuyên dày; SL.DT |
| 3 | Q-034, Q-035, Q-036 | Ngân sách (xem việc treo ở mục 3) | Sửa theo việc treo trước, rồi hỏi |

## 5. Trạng thái file và git

- Mọi thay đổi của session cũ **chưa commit**, nằm trong working tree trên máy tác giả (`D:\PROJECTS\den-vang-site\den-vang-site`), nhánh `main`.
- `main` ở máy đang **chậm 21 commit** so với `origin/main` (gồm `docs/brief-tinh-cam-thuyen-nhi.md` mới nhất và bản 00, 01 có chốt 19–20/10). Bản brief mới chỉ đọc được qua `git show origin/main:docs/brief-tinh-cam-thuyen-nhi.md`.
- Trong working tree còn các thay đổi chưa commit của tác giả từ trước (`content/v2/01-…`, `docs/01-rules-viet.md`, `docs/02-hoi-dong-nhi.md`, `src/config.ts` và nhiều file mới trong `docs/`).
- **Việc đầu tiên:** hỏi tác giả muốn xử lý thế nào: tác giả tự commit và pull, hay Claude tạo nhánh `claude/cay-tuyen` (cần quyền xóa cho thư mục repo để git không để lại file khóa, xem `kien-truc.md` §7). Không pull đè lên thay đổi chưa commit.

## 6. Ranh giới với session TH (chạy song song)

| | Session kiến trúc (này) | Session TH |
| --- | --- | --- |
| Được ghi | `kien-truc.md`, `quy-trinh.md`, `README.md`, `docs/canon/*` (thêm Q- được, không sửa Q- của TH), `docs/tuyen/` **trừ** `docs/tuyen/thriller/`, `docs/de-xuat/cay-tuyen.md`, `hop-nhat-cay-tuyen.md`, `ngan-sach-tuyen.md`, skill | `docs/tuyen/thriller/*`, `docs/de-xuat/th-*.md`, Q- mới về lab |
| Không ghi | `docs/tuyen/thriller/`, `docs/de-xuat/th-*.md` | các file của cột trái |
| Mức của node TH | Không tự đổi; session TH có thể đề xuất đổi mức hoặc thêm, bớt node TH. Khi tác giả duyệt, session kiến trúc cập nhật ma trận ở `cay-tuyen.md` | Đề xuất trong `de-xuat/th-*.md` |

Cả hai session cùng ghi `docs/canon/cau-hoi.md` thì đọc lại file ngay trước khi ghi, và chỉ thêm dòng, không viết lại cả file từ bản cũ.

## 6b. Chuyển từ session TH sang gốc

Việc thuộc `goc.md` (session kiến trúc ghi), nguồn ở `th-tai-cau-truc-lab.md` mục 4b:
- **25/10, 22:27, câu của tác giả, đưa vào quan niệm hiện sinh của Thuyên ở GĐ2:** *"Một nửa sự thật không biến một lời nói dối thành sự thật, nhưng nó biến một lời nói dối thành một lời nói dối đáng tin."* Đề xuất đặt ở bảng cung hiện sinh theo giai đoạn: dòng GĐ2, nấc 8, trục H5 và H4.
- **26/10, 14:42, đề xuất của Claude tác giả chốt cùng các nhân vật ở ngày gãy:** bốn người đứng dậy (anh Kiên, Diệp Anh, chị Quỳnh, Thảo) nhờ phần tốt của Thuyên ở GĐ1; phần tốt sống sót, người làm ra nó thì không. Ứng viên cho cung hiện sinh ở GÃY.
- **26/10, 15:35, X-11 Đêm say:** tác giả đặt ở bản lề GĐ1 → GĐ2, thêm TH.LAB, sau giao điểm cả RM và TH ở SSS. Đề xuất cập nhật X-11 ở `docs/de-xuat/th-handoff-x11-dem-say.md` mục 6.

## 7. Quy ước giữ nguyên

- Tác giả chốt, Claude ghi sổ; Claude chỉ đề xuất.
- Văn bản trong doc: tiếng Việt, câu ngắn, không gạch ngang dài làm dấu câu, header ngày như các file khác.
- Kiểm thứ trong tuần bằng code; lịch 2024–2025 theo luật dời mốc "+2 ngày, giữ thứ".
- Cuối mỗi lượt có thay đổi: đồng bộ file đã đổi lên Project, cùng đường dẫn.
