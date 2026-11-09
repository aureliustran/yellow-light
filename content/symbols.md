# symbols (SINH)

Sinh bởi `npm run canon:check`. Không sửa tay. Mã → file → một câu. Mã viết trong backtick để file này không tạo cạnh trong đồ thị.

Có phần đầu (frontmatter): 21 file. Chưa chuyển sang khuôn mới (legacy): 153 file.

| Mã | Loại | Trạng thái | File | Tóm tắt |
| --- | --- | --- | --- | --- |
| `config.calendar` | `config` | `proposed` | `config/calendar.md` | Một nguồn duy nhất cho ngày tháng. Luật `LAW.check.weekday` kiểm mọi ngày trong tài liệu theo file này. |
| `config.ids` | `config` | `proposed` | `config/ids.md` | Dùng cho (1) script đổi mã ở B7, (2) `aliases` trong Obsidian để tìm bằng mã cũ vẫn ra, (3) `LAW.check.unique-id`. Chưa đổi mã nào ở B1; … |
| `config.levels` | `config` | `proposed` | `config/levels.md` | Mức đo **độ cần thiết** của một tuyến, node hoặc giao điểm đối với truyện **trong một giai đoạn**. Không đo độ hay của chất liệu. |
| `config.phases` | `config` | `proposed` | `config/phases.md` | Chiều thời gian của star schema. Mọi giá trị động (weight, relation, state, voice, hiệu lực luật) được ghi **theo giai đoạn**. Thứ tự cố … |
| `config.statuses` | `config` | `proposed` | `config/statuses.md` | Mỗi dòng, mỗi file mang một trạng thái. Trạng thái là mức ổn định: tầng nào dựa vào tầng nào thì không được ổn định hơn nó. |
| `GUIDE.main` | `guide` | `draft` | `GUIDELINES.md` | Read this first in every session. It says how to work on the story. For what the system *is* (entities, ids, inheritance, tooling), look … |
| `schema.article` | `schema` | `proposed` | `schemas/article.md` | Điều hiến pháp: bất biến chia từ trục AX; luật giai đoạn lấy căn cứ từ đây. **Vị trí:** `core/constitution/ART-AX<n>.md` (một chương một … |
| `schema.belief` | `schema` | `proposed` | `schemas/belief.md` | Niềm tin (cũ: NT-) là sản phẩm của một neo quá khứ, được tình tiết hiện tại tiêu thụ. **Vị trí:** `world/characters/<id>/CH.<id>.beliefs.… |
| `schema.chapter` | `schema` | `proposed` | `schemas/chapter.md` | Chương đã viết hoặc đang viết, nằm ở `content/posts/vercel/` (không đổi tên, không chuyển). Schema này mô tả **hồ sơ chương** ghi bên ngo… |
| `schema.character` | `schema` | `proposed` | `schemas/character.md` | Nhân vật là thực thể **tĩnh** (bảng chiều). Giá trị theo thời điểm nằm ở node (`storylines/`), không ở đây. |
| `schema.event` | `schema` | `proposed` | `schemas/event.md` | Tình tiết là đơn vị nhỏ nhất của chuyện xảy ra: **dòng nối** (như `order_product`) giữa nhân vật, hàm, bí mật và thời điểm. **Vị trí:** m… |
| `schema.function` | `schema` | `proposed` | `schemas/function.md` | Hàm là **cơ chế** của một nhân vật, viết như hàm có chữ ký. Agent đọc `in`, `when` để biết khi nào gọi; không phải đọc cả cỗ máy. **Vị tr… |
| `schema.group` | `schema` | `proposed` | `schemas/group.md` | Nhóm người và nhân vật quần chúng. **Vị trí:** `world/groups/<nhóm>.md`. **Mã:** `GRP.<id>` (đề xuất; chưa có trong `config/ids.md`). |
| `schema.intersection` | `schema` | `proposed` | `schemas/intersection.md` | Giao điểm là **một dịp** (order), không phải một node: nhiều node cùng ghi vào, không nằm trong cây node, có **cây riêng** (quãng chứa sự… |
| `schema.law` | `schema` | `proposed` | `schemas/law.md` | Luật là **thực thể riêng**, không phải một khối. Một luật áp cho một vài thành tố; một thành tố chịu một vài luật. **Vị trí:** `rules/<as… |
| `schema.node` | `schema` | `proposed` | `schemas/node.md` | Node là thực thể **động** (bảng sự kiện): một mạch có người, có sự kiện trên trục thời gian, phục vụ ít nhất một trục AX. **Vị trí:** `st… |
| `schema.object` | `schema` | `proposed` | `schemas/object.md` | Vật mang nghĩa (lặp lại, có ý nghĩa tượng trưng hoặc là vật chứng). **Vị trí:** `world/objects/<id>.md`. **Mã:** `OBJ-<n>`. |
| `schema.plan` | `schema` | `proposed` | `schemas/plan.md` | Plan cho một khoảng chương. **Vị trí:** `plans/<khoảng>/…`. Đầu ra của lối vào A (cây quyết định, `tuyen/README.md` §5). |
| `schema.proposal` | `schema` | `proposed` | `schemas/proposal.md` | Đề xuất chưa duyệt (cũ: `de-xuat/`). **Vị trí:** `proposals/<tên>.md`; đã gộp vào canon thì chuyển `proposals/_merged/`. **Mã:** tên file… |
| `schema.secret` | `schema` | `proposed` | `schemas/secret.md` | Bí mật là thực thể riêng để theo dõi **ai biết gì lúc nào**. **Vị trí:** `world/secrets/<id>.md`. **Mã:** `SEC-<n>`. |
| `schema.setting` | `schema` | `proposed` | `schemas/setting.md` | Bối cảnh (nơi, không gian lặp lại). **Vị trí:** `world/settings/<id>.md`. **Mã:** `SET.<id>`. |
