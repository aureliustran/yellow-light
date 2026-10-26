# Đèn vàng – TH: tái cơ cấu nhân sự lab Thiên Nhãn

Oct 25, 2026 · @aureliustran. **[đề xuất]** Chưa duyệt. Tác giả (25/10, 23:21, 23:23): ở v1, các nhân vật nữ bên kinh doanh có mặt ở lab vì anh Tuấn làm việc bừa bãi, muốn tuyển nhân viên nữ để quấy rối; một anh Tuấn có năng lực, biết mình có thể bị loại nếu kết quả không tốt bị ghi lại làm bằng chứng, sẽ không làm thế; ở v2 rất khó có đủ lý do để giữ các nhân viên ấy. Cần tái cơ cấu nhân sự, có thể dựa theo cơ cấu một R&D trong thực tế, ở mức đề xuất.

Đi cùng: `th-mang-luoi-loi-ich.md` (tài nguyên, tranh chấp, phe). File này thay phần dàn người của file ấy khi được duyệt.

**Tác giả chốt dàn người và chức danh (25/10, 23:29):**

| Người | Chức danh | Ghi chú |
| --- | --- | --- |
| Anh Tuấn | R&D Lead | |
| Thuyên | Software Engineer (GĐ1) → System Architect kiêm ML Engineer (GĐ2) | Khớp thẻ nhân viên bản cũ (*R&D Software Engineer – Astrea Technology*, ch.13 cũ) và bài thử system architect ở tất niên (chốt 24/10) |
| Anh Bảo | Tech Lead | |
| Anh Kiên | DevOps, MLOps | |
| Chị Quỳnh | GIS Expert / GIS Engineer | |
| Chị Phương | Data Labelling / Annotation Lead | |
| Thảo | Data Analyst Intern | |
| Chị Hạnh | PM | |
| Trâm | BA | |
| Hà My | Product Marketing Executive [đề xuất chức danh] | Tác giả 23:32: giữ Hà My; đồng ý phần người Khối Kinh doanh gửi sang. Đến ở GĐ2, sau email production, do Khối Kinh doanh đề xuất cho dòng *truyền thông*; mượn từ bộ phận marketing, hợp đồng có hạn |
| Diệp Anh (ngoài lab) | Business Development Associate, Astrea Logistics (mảng giao nhận chặng cuối); Product Owner phía Logistics của pilot bản đồ điểm giao với Thiên Nhãn [chức danh đề xuất] | Tác giả 23:35, 23:36: dù bố là giám đốc, cô có năng lực và cái tôi đủ lớn để giành lấy một chức danh; bố tạo điều kiện, năng lực là thật. Xem mục 4b | Các mục dưới đây là đề xuất gốc; chỗ nào lệch bảng trên thì bảng trên thắng.

---

## 1. Luật: mỗi người có một lý do tổ chức

Người nào ở lab cũng phải trả lời được ba câu, bằng lý do của tổ chức chứ không bằng ý thích của một người:
1. **Vị trí này có trong một nhóm R&D thật làm sản phẩm này không?**
2. **Ai đưa người này vào, theo quy trình nào?** (tuyển, điều chuyển, biệt phái, mượn)
3. **Vì sao người này có mặt từ lúc ấy?** Vị trí chỉ cần ở giai đoạn vận hành thì người ấy chỉ đến ở giai đoạn vận hành.

Hệ quả: lab ở GĐ1 nhỏ và toàn người làm R&D. Lab ở GĐ2 phình ra vì production cần thêm vị trí, và chính lúc phình ra là lúc tranh giành nổ ra (danh sách nhân sự vận hành).

## 2. Hình mẫu thực tế

**Thiên Nhãn đúng kiểu "lab R&D của một tập đoàn không làm công nghệ là chính".** Trong phân loại tổ chức nhóm ML phổ biến (Full Stack Deep Learning), kiểu này có những người giỏi và tham vọng dài hạn, nhưng khó có dữ liệu tốt, kết quả hiếm khi thành giá trị kinh doanh, và đầu tư nhỏ. Các khó khăn quen thuộc: tiến độ khó ước lượng, tiến bộ không tuyến tính nên dự án có thể đứng hàng tháng, lãnh đạo khó đặt kỳ vọng vì không hiểu sâu ML, và văn hóa nghiên cứu (thích ý mới) va văn hóa kỹ thuật (thích cách đã chắc). Đó chính là hoàn cảnh của Đạt, Sơn, và cũng là áp lực trên ghế anh Tuấn.

**Khi dự án sang vận hành, lab chuyển dần thành một bộ phận sản phẩm:** phải bàn giao cho khách, phải có người được khách chấp nhận, phản hồi chậm hơn. Đó là chỗ Khối Kinh doanh có lý do thật để cài người.

**Vai trò chuẩn của một nhóm ML** (cùng nguồn): quản lý sản phẩm ML (nối kinh doanh, người dùng, chủ dữ liệu, ưu tiên dự án); kỹ sư DevOps (triển khai, giám sát hạ tầng); kỹ sư dữ liệu (đường ống dữ liệu, gom và theo dõi dữ liệu; công cụ hệ phân tán); kỹ sư ML (huấn luyện và triển khai model trên dữ liệu thật; tổ hợp hiếm giữa ML và kỹ thuật phần mềm); nhà nghiên cứu ML (model hướng tương lai, không gắn production). Riêng mảng ảnh vệ tinh còn cần **người chuyên dữ liệu không gian** (hệ tọa độ, độ cao, đối soát thực địa) và **đội gán nhãn** có trưởng nhóm, chỉ tiêu, kiểm định chất lượng; ở Việt Nam đội này thường kết hợp người trong nhà với nhà cung cấp gán nhãn bên ngoài.

## 3. Sơ đồ đề xuất

```
                      Tổng giám đốc Astrea Technology (Khải, tầng 18)
                                        │
        ┌───────────────────────────────┼──────────────────────────────┐
  Văn phòng quản lý dự án        LAB R&D THIÊN NHÃN            Khối Chiến lược –
  (mượn người cho dự án          Trưởng nhóm: anh Tuấn          Phát triển Kinh doanh
   trọng điểm)                          │                       (anh Đông)
        ┊                 ┌─────────────┼──────────────┐                ┊
   chị Hạnh ┈┈┈┈┈┈┈┈┈┈┈┈  Model    Nền tảng, vận hành   Dữ liệu ┈┈┈┈┈┈┈ Trâm
   (quản lý dự án)        Thuyên   anh Bảo (trưởng)    chị Quỳnh       (biệt phái: yêu cầu
                         (part-     anh Kiên            (không gian,     khách, hợp đồng
                          time)                          đánh giá)       bên bán model)
                                                        chị Phương
                                                        (gán nhãn: 4 người
                                                         + nhà cung cấp)
                                                        Thảo (thực tập)

  ┈┈ đường báo cáo kép: làm việc ở lab, báo cáo về đơn vị gốc
```

## 4. Dàn người GĐ1 (từ 28/10/2024)

| Người | Vị trí (vai chuẩn) | Ai đưa vào, theo đường nào | Vì sao có mặt từ GĐ1 | Báo cáo cho |
| --- | --- | --- | --- | --- |
| **Anh Tuấn** [đã thống nhất] | Trưởng nhóm R&D | Được bổ nhiệm lúc lập lab; con một cổ đông, có người đỡ | Lab cần một người đứng tên trước tầng 18 | Khải |
| **Thuyên** | Nghiên cứu viên ML part-time (thực chất là kỹ sư ML: vừa model vừa đưa lên hệ thống) | Nhân sự tuyển theo đề nghị của văn phòng Tổng giám đốc; thư mời viết ngược từ CV của anh | Vị trí bỏ trống từ khi Đạt rời; lab có pipeline mà không có model | Anh Tuấn |
| **Anh Bảo** | Trưởng nền tảng: kỹ sư dữ liệu kiêm hạ tầng (đường ống ảnh, cắt ô, lọc mây, cụm máy) | Tuyển lúc lập lab | Dựng pipeline cùng Đạt, Sơn; nền tảng là thứ duy nhất lab đang có | Anh Tuấn |
| **Anh Kiên** | Kỹ sư vận hành (DevOps, MLOps) | Điều chuyển nội bộ từ một công ty khác trong tập đoàn | Pipeline chạy mẻ đêm thì cần người trực; công ty thanh toán vẫn mượn anh lúc lab rảnh (đường lui của anh) | Anh Bảo |
| **Chị Quỳnh** | Chuyên gia dữ liệu không gian kiêm đánh giá: hệ tọa độ, độ cao, đối soát thực địa, tập đánh giá | Tuyển từ một công ty đo đạc bản đồ | Khách cần sai số độ cao; không có chị thì không ai định nghĩa được "đạt" | Anh Tuấn |
| **Chị Phương** | Trưởng nhóm gán nhãn: bốn người trong nhà và một nhà cung cấp ngoài; chỉ tiêu, kiểm định | Tuyển khi lab mua lô ảnh đầu tiên | Model nào cũng cần nhãn; nhãn là thứ lab đang làm dở | Anh Tuấn |
| **Thảo** | Thực tập sinh dữ liệu: kiểm định nhãn, thống kê lỗi | Chương trình thực tập của tập đoàn với Kinh tế Quốc dân | Đội nhãn nhận thực tập sinh theo kỳ | Chị Phương |
| **Chị Hạnh** | Quản lý dự án | Văn phòng quản lý dự án cử sang khi Thiên Nhãn được xếp vào danh mục dự án trọng điểm | Dự án trọng điểm bắt buộc có người của văn phòng theo dõi tiến độ, rủi ro, báo cáo lên Tổng giám đốc | Văn phòng quản lý dự án (đường kép với anh Tuấn) |
| **Trâm** | Phân tích nghiệp vụ, phát triển kinh doanh: viết yêu cầu khách, giữ hợp đồng với bên bán model | Khối Chiến lược – Phát triển Kinh doanh biệt phái khi ký hợp đồng thuê model ngoài | Cô là người giữ hợp đồng ấy; hợp đồng hết thì cô ở lại chờ gia hạn hoặc chờ lab thất bại, và giữ yêu cầu của khách bất động sản | Anh Đông (đường kép với anh Tuấn) |

Không ai trong số này do anh Tuấn tự chọn theo ý thích. Người anh Tuấn trực tiếp tuyển chỉ có những vị trí kỹ thuật lúc lập lab, và chính họ là người lão cần để giữ ghế.

## 4b. Diệp Anh: bố mở cửa, cô tự giành chức danh [đề xuất chi tiết]

- **Bố tạo điều kiện:** đưa cô vào khối chiến lược của Astrea Logistics theo dạng part-time (không phải thực tập, khớp chốt cũ), cho cô ngồi các buổi họp, mở cho cô dữ liệu giao nhận.
- **Năng lực thật:** cô dùng đúng những gì được mở để tự viết đề án pilot bản đồ điểm giao (bài toán địa chỉ Việt Nam: ngõ ngách, số nhà nhảy cóc), tự thuyết phục hội đồng duyệt của Logistics và lab, và giành vai Product Owner của pilot.
- **Cả hai nửa đều thật, và không ai tách được, kể cả cô.** Người ngoài nói "con giám đốc"; người làm cùng biết cô giỏi; chính cô không chắc nửa nào làm nên chức danh. Đó là vết thương "được công nhận thật nhưng ngồi sai ghế" đang chạy ở hiện tại.
- **Vì sao cô cần Thuyên:** pilot thành công thì tên cô gắn với một sản phẩm chạy thật, thứ chỉ nửa năng lực làm ra được.
- **Vì sao ván cược của Khải trúng:** Khải đưa một ghế chính thức, có hợp đồng, có KPI, **ở ngoài mảng của bố cô**: chỗ duy nhất mà chỉ nửa năng lực được tính.
- **Vì sao cô ra vào tầng 17:** cô là Product Owner phía khách của một pilot với lab; đủ lý do họp, làm việc muộn, OT đêm 31/12.
- **Chuyên ngành [đề xuất, tác giả 23:38 cho phép đổi expertise, giữ ở DAV]:** sinh viên năm cuối Học viện Ngoại giao, ngành **Kinh doanh quốc tế** (Khoa Kinh tế quốc tế), chuyên sâu **Logistics và quản lý chuỗi cung ứng**. Chương trình thật của ngành có học phần bắt buộc *Nguyên lý cơ bản về Logistics và quản lý chuỗi cung ứng* và nhóm chuyên sâu gồm *Quản trị logistics*, *Vận tải và giao nhận hàng hóa quốc tế*, *Quản lý chuỗi cung ứng toàn cầu* ([chương trình đào tạo KDQT, DAV](https://static.dav.edu.vn/files/2024/04/11/4-kinh-doanh-quoc-te-final.pdf)). MUN là hoạt động ngoại khóa: cô làm chủ tọa vì giỏi tranh biện, điều phối và đọc phòng, những kỹ năng chính là cốt lõi của một người phát triển kinh doanh. Như vậy hai vai không chọi nhau: chuyên môn là logistics, vũ khí là ngoại giao.
- Thay dòng đề xuất cũ "cô không có ghế chính thức" (00 §2, 01 §2.3); phần quyền lực không chính thức qua bố và hội con nhà các ông lớn vẫn giữ.

## 5. Người đến ở GĐ2 (từ email production, T2 19/5/2025)

Email production đề nghị nộp danh sách bốn dòng (kỹ thuật, dữ liệu, truyền thông, đầu mối đối tác), không tuyển mới, và Khối Kinh doanh gửi đề xuất cho hai dòng đầu mối đối tác và truyền thông.

| Người | Vị trí | Ai đưa vào | Vì sao đến lúc này |
| --- | --- | --- | --- |
| **Hà My** *(tùy chọn)* | Truyền thông sản phẩm | Khối Kinh doanh đề xuất từ bộ phận marketing; hợp đồng có hạn | Dòng *truyền thông* chỉ có khi sắp ra mắt. Cô đến để đứng tên lần ra mắt và để giành dòng ấy trước khi hợp đồng hết |
| **Người của khách bất động sản** *(không tên, tùy chọn)* | Người nghiệm thu phía khách | Bên bất động sản cử sang theo hợp đồng nội bộ | Production cần người nghiệm thu; là áp lực trực tiếp lên hàng đợi |

Lúc này Trâm đổi vai: từ người giữ hợp đồng cũ thành người khối đề cử cho dòng *đầu mối đối tác*, chọi chị Hạnh.

## 6. Đổi so với v1

| V1 | Đề xuất | Lý do |
| --- | --- | --- |
| Trâm, Hà My, chị Ngân, Ly là người anh Tuấn mượn về vì ngoại hình | Trâm: biệt phái chính thức từ Khối Kinh doanh, có việc thật từ GĐ1. Hà My: chỉ đến ở GĐ2 nếu giữ. **Cắt** chị Ngân, Ly | Lý do v1 không còn với anh Tuấn v2 |
| Hội kỹ sư là một khối "không muốn bị làm phiền" | Ba vai riêng: nền tảng (anh Bảo), vận hành (anh Kiên), dữ liệu không gian (chị Quỳnh) | Vai chuẩn của một nhóm ML; mỗi người một tham vọng |
| Chị Quỳnh: kỹ sư dữ liệu chung chung | Chuyên gia dữ liệu không gian kiêm đánh giá | Mảng ảnh vệ tinh cần vai này; vai này giữ thước đo |
| Chị Phương quản lý thực tập sinh, dồn việc cho Thảo | Trưởng nhóm gán nhãn có đội và nhà cung cấp; Thảo là thực tập sinh của đội | Đội gán nhãn là cấu trúc thật; quy trình tự động đe dọa đúng đội này |
| Chị Hạnh: điều phối, trung tâm tin đồn | Quản lý dự án do văn phòng quản lý dự án cử | Dự án trọng điểm của tập đoàn thường có vai này |
| Thuyên: "nghiên cứu viên part-time" | Giữ chức danh, thực chất làm kỹ sư ML | Chức danh thấp hơn việc làm: đúng cược rẻ của Khải (chốt cũ: 13–25 triệu so với 80–120 triệu cho một tiến sĩ) |

## 7. Chạm vào mạng lưới lợi ích

- **TC1 (tự làm hay mua ngoài):** Trâm giờ có mặt trong phòng với lý do thật, đúng phía mua ngoài. Mối đe dọa của GĐ1 ngồi cách Thuyên một cái bàn.
- **TC2, TC3:** chị Quỳnh giữ thước đo vì vai của chị là đối soát thực địa; không cần gán vai trọng tài từ ngoài.
- **TC6 (danh sách):** danh sách nổ ra đúng lúc người mới đến (GĐ2); người đến muộn tranh với người có mặt từ đầu.
- **Lào Cai:** sai số độ cao ở biên ô nằm giữa ba chuyên môn: hệ phân tán (anh Bảo), dữ liệu không gian (chị Quỳnh), toán của model (Thuyên). Mỗi người giỏi một phần; chỉ Thuyên thấy chỗ ba phần gặp nhau. Mạch hệ phân tán giữ được, và còn chặt hơn.

## 8. Câu hỏi cho tác giả

| # | Câu hỏi | Khuyến nghị |
| --- | --- | --- |
| 1 | Duyệt luật "mỗi người có một lý do tổ chức" và lab GĐ1 chín người như mục 4? | Duyệt |
| 2 | Trâm: biệt phái từ Khối Kinh doanh, giữ hợp đồng bên bán model, có mặt từ GĐ1? | Duyệt |
| 3 | ~~Hà My: cắt hay đến ở GĐ2?~~ **Đã trả lời 23:32:** giữ, đến ở GĐ2 do Khối Kinh doanh gửi sang; chức danh đề xuất Product Marketing Executive | — |
| 4 | Chị Quỳnh thành chuyên gia dữ liệu không gian kiêm đánh giá? | Duyệt |
| 5 | Chị Hạnh do văn phòng quản lý dự án cử, báo cáo kép? | Duyệt |

Nguồn: [Full Stack Deep Learning – Machine Learning Teams (2021)](https://fullstackdeeplearning.com/spring2021/lecture-notes-pdfs/FSDL%20Spring%202021%20-%20Machine-Learning-Teams.pdf) cho vai trò và kiểu tổ chức. Vai chuyên gia dữ liệu không gian và cấu trúc đội gán nhãn là mô tả chung của ngành, chưa đối chiếu nguồn cụ thể.
