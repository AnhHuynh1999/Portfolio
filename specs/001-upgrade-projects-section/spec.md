# Feature Specification: Nâng cấp phần Dự án (Projects) của Portfolio

**Feature Branch**: `update-ui`
**Created**: 2026-11-26
**Status**: Draft
**Input**: User description: "Nâng cấp phần project của web"

## Hiện trạng (bối cảnh)

- Phần Dự án hiển thị giống hệt nhau ở trang chủ và trang `/project`: lưới thẻ (ảnh, nhãn danh mục, tiêu đề, mô tả, tag công nghệ, nút Live Demo / Mã nguồn) kèm bộ lọc "Tất cả / Fullstack / Mobile".
- Dữ liệu dự án có cờ "nổi bật" nhưng không được dùng ở đâu; danh mục Frontend/Backend tồn tại trong dữ liệu và bản dịch nhưng không có trong bộ lọc.
- Nhiều dự án dùng chung ảnh, một số liên kết demo trỏ về trang GitHub cá nhân thay vì sản phẩm thật.
- Khách truy cập không có cách nào xem chi tiết một dự án (vai trò, thách thức, kết quả, ảnh chụp).

## Clarifications

### Session 2026-11-26

- Q: Chi tiết dự án mở dạng cửa sổ phủ hay trang riêng? → A: Trang riêng cho từng dự án với đường dẫn thân thiện (ví dụ `/project/xcel-edtech`); nút Back đưa về danh sách với bộ lọc và vị trí cuộn như cũ.
- Q: Trang chi tiết cần đủ mọi mục hay chạy được khi thiếu nội dung? → A: Chỉ tiêu đề, mô tả, công nghệ, ảnh đại diện là bắt buộc; vai trò, thời gian, tính năng, kết quả, ảnh chụp màn hình là tùy chọn và tự ẩn khi thiếu.
- Q: Lọc theo công nghệ chọn một hay nhiều? → A: Chỉ một công nghệ tại một thời điểm; bấm lại để bỏ chọn; kết hợp được với lọc danh mục.
- Q: Bộ lọc có nằm trong link trang Dự án không? → A: Có; bộ lọc danh mục và công nghệ được phản ánh trong link, chia sẻ được và giữ nguyên khi tải lại.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Xem chi tiết một dự án (Priority: P1)

Nhà tuyển dụng / khách hàng tiềm năng thấy một dự án thú vị và muốn hiểu sâu hơn: bài toán là gì, chủ sở hữu portfolio đảm nhận vai trò gì, dùng công nghệ nào, kết quả ra sao, và xem thêm ảnh chụp màn hình.

**Why this priority**: Thẻ dự án hiện chỉ có 1 đoạn mô tả ngắn — không đủ để người tuyển dụng đánh giá năng lực. Đây là giá trị lớn nhất của việc nâng cấp.

**Independent Test**: Mở một thẻ dự án bất kỳ → thấy được toàn bộ thông tin chi tiết, đóng/quay lại danh sách mà không mất vị trí hay bộ lọc đang chọn.

**Acceptance Scenarios**:

1. **Given** khách đang xem danh sách dự án, **When** chọn "Xem chi tiết" trên một thẻ, **Then** chuyển sang trang chi tiết riêng của dự án gồm: tiêu đề, danh mục, thời gian thực hiện, vai trò, mô tả tổng quan, các tính năng chính, công nghệ sử dụng, kết quả/điểm nổi bật, bộ ảnh chụp màn hình, và các liên kết (demo, mã nguồn) nếu có.
2. **Given** khách đang xem chi tiết dự án, **When** đóng hoặc quay lại, **Then** trở về đúng danh sách với bộ lọc và vị trí cuộn như trước.
3. **Given** khách có đường dẫn trực tiếp tới chi tiết một dự án, **When** mở đường dẫn đó, **Then** thấy ngay chi tiết dự án đó (chia sẻ được).
4. **Given** ngôn ngữ đang là Tiếng Anh, **When** xem chi tiết, **Then** toàn bộ nội dung văn bản hiển thị bằng Tiếng Anh.

---

### User Story 2 - Lọc và tìm dự án theo danh mục / công nghệ (Priority: P2)

Khách muốn nhanh chóng tìm các dự án liên quan tới công nghệ họ quan tâm (ví dụ: chỉ xem dự án dùng React hoặc NestJS).

**Why this priority**: Khi số lượng dự án tăng, bộ lọc hiện tại (thiếu Frontend/Backend, không lọc theo công nghệ) không còn hữu ích.

**Independent Test**: Chọn một danh mục và/hoặc một công nghệ → danh sách chỉ còn dự án khớp, kèm số lượng kết quả.

**Acceptance Scenarios**:

1. **Given** danh sách dự án, **When** khách xem bộ lọc danh mục, **Then** chỉ hiển thị các danh mục thực sự có ít nhất 1 dự án, mỗi danh mục kèm số lượng dự án.
2. **Given** khách chọn một tag công nghệ (trên thẻ hoặc trong bộ lọc), **When** lọc được áp dụng, **Then** chỉ hiển thị dự án chứa công nghệ đó, và có cách bỏ lọc rõ ràng.
3. **Given** bộ lọc không khớp dự án nào, **When** áp dụng, **Then** hiển thị thông báo "không có dự án phù hợp" kèm nút xóa bộ lọc.

---

### User Story 3 - Trang chủ chỉ giới thiệu dự án nổi bật (Priority: P2)

Trên trang chủ, khách chỉ cần thấy vài dự án tiêu biểu nhất, sau đó có lối đi rõ ràng sang trang Dự án đầy đủ.

**Why this priority**: Trang chủ hiện lặp nguyên toàn bộ trang Dự án; cờ "nổi bật" có sẵn nhưng bị bỏ phí.

**Independent Test**: Mở trang chủ → chỉ thấy dự án được đánh dấu nổi bật và nút "Xem tất cả dự án" dẫn sang trang `/project`.

**Acceptance Scenarios**:

1. **Given** trang chủ, **When** tải phần Dự án, **Then** chỉ hiển thị các dự án nổi bật (tối đa 3), không có bộ lọc, có nút "Xem tất cả dự án".
2. **Given** trang Dự án, **When** tải, **Then** hiển thị toàn bộ dự án kèm bộ lọc; dự án nổi bật có huy hiệu "Nổi bật" và được xếp trước.

---

### User Story 4 - Thẻ dự án trình bày rõ ràng, nhất quán (Priority: P3)

Mỗi thẻ cần phân biệt được với nhau (ảnh riêng), hiển thị trạng thái liên kết trung thực và đọc tốt trên mọi kích thước màn hình.

**Why this priority**: Cải thiện độ tin cậy và cảm nhận chuyên nghiệp, nhưng không chặn các story khác.

**Independent Test**: Duyệt lưới dự án trên di động và máy tính, kiểm tra từng thẻ.

**Acceptance Scenarios**:

1. **Given** dự án không có demo công khai hoặc mã nguồn là riêng tư, **When** hiển thị thẻ, **Then** nút tương ứng bị ẩn hoặc thay bằng nhãn trung thực (ví dụ "Mã nguồn riêng tư"), không trỏ tới trang không liên quan.
2. **Given** ảnh dự án bị lỗi hoặc thiếu, **When** hiển thị thẻ, **Then** thay bằng ảnh dự phòng thống nhất, bố cục không vỡ.
3. **Given** mô tả dài, **When** hiển thị trên thẻ, **Then** mô tả được rút gọn số dòng cố định để các thẻ cao bằng nhau.
4. **Given** người dùng bật chế độ giảm chuyển động của hệ điều hành, **When** tương tác với thẻ, **Then** hiệu ứng chuyển động được tắt/giảm.

---

### Edge Cases

- Không có dự án nổi bật nào → trang chủ hiển thị 3 dự án đầu tiên theo thứ tự khai báo trong dữ liệu.
- Đường dẫn chi tiết tới dự án không tồn tại → hiển thị thông báo không tìm thấy và liên kết quay về danh sách.
- Dự án thiếu bản dịch cho một ngôn ngữ → hiển thị bản Tiếng Việt (giữ hành vi hiện tại).
- Dự án thiếu bất kỳ trường tùy chọn nào (ảnh chụp màn hình, vai trò, thời gian, tính năng, kết quả) → mục tương ứng trên trang chi tiết bị ẩn, không để trống.
- Chuyển ngôn ngữ khi đang mở chi tiết hoặc đang lọc → nội dung đổi ngôn ngữ, giữ nguyên dự án và bộ lọc.
- Link chứa danh mục hoặc công nghệ không tồn tại → bỏ qua giá trị đó, hiển thị như "Tất cả", không báo lỗi.
- Danh sách có nhiều dự án (≥ 12) → vẫn tải nhanh, ảnh ngoài màn hình chỉ tải khi cần.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hệ thống PHẢI cung cấp một trang chi tiết riêng cho mỗi dự án, gồm: tiêu đề, danh mục, thời gian thực hiện, vai trò, tổng quan, tính năng chính, công nghệ, kết quả/điểm nổi bật, ảnh chụp màn hình, liên kết demo/mã nguồn (nếu có).
- **FR-001a**: Trường bắt buộc của mỗi dự án: tiêu đề, mô tả (song ngữ), công nghệ, ảnh đại diện. Các trường vai trò, thời gian, tính năng chính, kết quả, ảnh chụp màn hình, liên kết là tùy chọn; mục nào thiếu dữ liệu thì phần tương ứng trên trang chi tiết PHẢI bị ẩn hoàn toàn (không hiển thị tiêu đề rỗng).
- **FR-002**: Mỗi trang chi tiết PHẢI có đường dẫn thân thiện, duy nhất, dạng `/project/<định-danh>`, chia sẻ và mở trực tiếp được, và có tiêu đề trang riêng theo tên dự án.
- **FR-003**: Quay lại từ trang chi tiết (nút Back của trình duyệt hoặc nút "Quay lại" trên trang) PHẢI đưa về danh sách với bộ lọc và vị trí cuộn như trước.
- **FR-004**: Bộ lọc danh mục PHẢI được sinh từ dữ liệu thực tế (chỉ danh mục có dự án) và hiển thị số lượng dự án mỗi danh mục.
- **FR-005**: Người dùng PHẢI lọc được dự án theo đúng một tag công nghệ tại một thời điểm (chọn tag khác sẽ thay tag cũ; bấm lại tag đang chọn để bỏ lọc), kết hợp được với lọc danh mục.
- **FR-005a**: Trạng thái bộ lọc (danh mục, công nghệ) PHẢI được phản ánh trong link của trang Dự án (ví dụ `/project?category=Fullstack&tech=React`); mở link đó hoặc tải lại trang PHẢI hiển thị đúng bộ lọc. Giá trị không hợp lệ trong link PHẢI bị bỏ qua (coi như "Tất cả").
- **FR-006**: Khi không có kết quả lọc, hệ thống PHẢI hiển thị trạng thái rỗng kèm thao tác xóa bộ lọc.
- **FR-007**: Trang chủ PHẢI chỉ hiển thị tối đa 3 dự án nổi bật, không có bộ lọc, kèm lời kêu gọi "Xem tất cả dự án" dẫn tới trang Dự án.
- **FR-008**: Trang Dự án PHẢI hiển thị toàn bộ dự án, dự án nổi bật được gắn huy hiệu và xếp trước; trong mỗi nhóm giữ thứ tự khai báo trong dữ liệu.
- **FR-009**: Nút demo/mã nguồn CHỈ hiển thị khi có liên kết hợp lệ dành riêng cho dự án; dự án mã nguồn riêng tư PHẢI hiển thị nhãn tương ứng thay vì liên kết.
- **FR-010**: Ảnh lỗi/thiếu PHẢI được thay bằng ảnh dự phòng thống nhất.
- **FR-011**: Mọi văn bản mới (nhãn, nút, trạng thái rỗng, nội dung chi tiết) PHẢI có đủ Tiếng Việt và Tiếng Anh.
- **FR-012**: Toàn bộ phần Dự án PHẢI dùng được bằng bàn phím (tab tới thẻ, mở/đóng chi tiết, chọn bộ lọc), ảnh có văn bản thay thế mô tả, và tôn trọng thiết lập giảm chuyển động.
- **FR-013**: Bố cục PHẢI hiển thị đúng từ màn hình 360px tới màn hình máy tính lớn (1 / 2 / 3 cột tùy độ rộng).

### Key Entities

- **Dự án (Project)**: định danh dạng đường dẫn thân thiện, tiêu đề, danh mục, cờ nổi bật, thời gian thực hiện, vai trò, mô tả ngắn (song ngữ), tổng quan chi tiết (song ngữ), danh sách tính năng chính (song ngữ), kết quả/điểm nổi bật (song ngữ), tag công nghệ, ảnh đại diện, danh sách ảnh chụp màn hình, liên kết demo (tùy chọn), liên kết mã nguồn (tùy chọn), cờ mã nguồn riêng tư.
- **Danh mục (Category)**: Fullstack, Frontend, Backend, Mobile — có nhãn song ngữ.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Khách truy cập mở được chi tiết bất kỳ dự án nào trong tối đa 1 thao tác từ danh sách và 1 thao tác để quay lại.
- **SC-002**: 100% dự án có đủ trường bắt buộc (tiêu đề, mô tả song ngữ, công nghệ, ảnh đại diện) và 0 trang chi tiết hiển thị mục rỗng.
- **SC-003**: 0 liên kết demo/mã nguồn trỏ tới trang không dành riêng cho dự án đó.
- **SC-004**: Khách tìm được tất cả dự án dùng một công nghệ cụ thể trong dưới 10 giây.
- **SC-005**: Phần Dự án trên trang chủ hiển thị tối đa 3 thẻ và luôn có lối sang trang Dự án đầy đủ.
- **SC-006**: Phần Dự án không có lỗi truy cập mức nghiêm trọng khi kiểm tra tự động và thao tác được hoàn toàn bằng bàn phím.
- **SC-007**: Trang Dự án hiển thị nội dung chính trong dưới 2,5 giây trên kết nối di động thông thường.

## Assumptions

- Dữ liệu dự án vẫn được quản lý tĩnh trong mã nguồn (không cần trang quản trị/CMS).
- Chủ portfolio sẽ bổ sung dần nội dung thật cho các trường tùy chọn; tính năng phát hành được ngay khi chỉ có trường bắt buộc. Spec không bao gồm việc soạn nội dung giả.
- Giữ nguyên ngôn ngữ thiết kế hiện tại (thẻ kính mờ, hiệu ứng phát sáng) — đây là nâng cấp, không phải thiết kế lại toàn bộ.
- Thứ tự hiển thị do chủ portfolio quyết định qua thứ tự khai báo trong dữ liệu (vì thời gian thực hiện là trường tùy chọn, không dùng để sắp xếp).
- Không bao gồm: bình luận, lượt thích, thống kê lượt xem, tìm kiếm toàn văn.
