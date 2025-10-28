# Feature Specification: Collapsible Sidebar

**Feature Branch**: `002-collapsible-sidebar`  
**Created**: October 28, 2025  
**Status**: Draft  
**Input**: User description: "Mục tiêu: Xây dựng thanh điều hướng bên (Sidebar) có thể thu gọn, giống như trong hình ảnh thiết kế. Yêu cầu chức năng (Features): 1. **Tiêu đề:** Hiển thị tiêu đề \"Shadcn UI Kit\" ở trên cùng. 2. **Menu thu gọn (Collapsible):** * Các mục chính như \"Dashboards\", \"E-commerce\", \"Sales\", \"Project Management\" phải là các mục có thể thu gọn (giống như `Accordion` hoặc `Collapsible`). * Khi nhấp vào, chúng sẽ hiển thị các liên kết con bên trong. 3. **Liên kết Điều hướng:** * Hiển thị các liên kết điều hướng đơn giản (như \"File Manager\", \"Crypto\"). * Các liên kết phải có trạng thái `hover` rõ ràng. 4. **Huy hiệu (Badges):** * Hiển thị các huy hiệu bên cạnh một số liên kết, ví dụ: \"Coming\" (cho \"Hotel Dashboard\"), \"New\" (cho \"Kanban\"), và \"8\" (cho \"Notes\"). 5. **Khối CTA (Call to Action):** * Hiển thị một khối CTA ở gần cuối sidebar (\"Unlock...\"). 6. **Hồ sơ Người dùng (User Profile):** * Hiển thị thông tin người dùng (Avatar và Tên) ở dưới cùng của sidebar, kèm theo một menu (dấu ba chấm). Yêu cầu kỹ thuật (Constraints): 1. **Tech Stack:** Phải sử dụng React (với Hooks) và TypeScript. 2. **UI Components:** Phải sử dụng các component từ `shadcn/ui` đã cài đặt, bao gồm: * `Button` (với `variant="ghost"`) cho các mục menu/liên kết. * `Collapsible` (cho các mục menu có thể thu gọn). * `Badge` (cho các nhãn \"New\", \"Coming\", \"8\"). * `Avatar` (cho hồ sơ người dùng). * `ScrollArea` (để bọc danh sách menu, cho phép cuộn nếu nội dung dài). * `DropdownMenu` (cho menu dấu ba chấm bên cạnh tên người dùng). 3. **Cấu trúc tệp:** Tạo một component chính `Sidebar.tsx` trong `src/components/app/`. "

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Basic Navigation & Collapsible Menus (Priority: P1)

As a user, I want to be able to see the sidebar, navigate through simple links, and expand/collapse main menu items to reveal sub-links, so I can easily access different sections of the application.

**Why this priority**: This is the core navigation functionality. Without it, users cannot effectively move through the application.

**Independent Test**: Can be fully tested by interacting with the sidebar UI to expand/collapse menu items and observe link highlighting.

**Acceptance Scenarios**:

1. **Given** the sidebar is displayed, **When** I click on a main menu item (e.g., "Dashboards"), **Then** its sub-links are revealed.
2. **Given** the sidebar is displayed, **When** I hover over a simple navigation link (e.g., "File Manager"), **Then** the link displays a clear hover state.
3. **Given** a main menu item is expanded, **When** I click on it again, **Then** its sub-links are hidden.

---


### User Story 2 - Enhanced Navigation with Badges & CTA (Priority: P2)

As a user, I want to see additional information like badges next to certain links and interact with a call-to-action block, so I can quickly identify new or upcoming features and engage with promotional content.

**Why this priority**: This enhances the user experience by providing more context and engagement opportunities, but is not critical for basic navigation.

**Independent Test**: Can be fully tested by visually verifying badge presence and content, and confirming the CTA block is interactive.

**Acceptance Scenarios**:

1. **Given** the sidebar is displayed, **When** I view the "Hotel Dashboard" link, **Then** a "Coming" badge is displayed next to it.
2. **Given** the sidebar is displayed, **When** I view the "Kanban" link, **Then** a "New" badge is displayed next to it.
3. **Given** the sidebar is displayed, **When** I view the "Notes" link, **Then** a badge with "8" is displayed next to it.
4. **Given** the sidebar is displayed, **When** I see the "Unlock..." CTA block, **Then** it is visually distinct and clickable.

---


### User Story 3 - User Profile & Settings (Priority: P3)

As a user, I want to see my profile information and access a dropdown menu for settings, so I can personalize my experience and manage my account.

**Why this priority**: This provides personalization and account management, which are important but secondary to core navigation and feature discovery.

**Independent Test**: Can be fully tested by verifying the display of user information and the functionality of the dropdown menu.

**Acceptance Scenarios**:

1. **Given** the sidebar is displayed, **When** I view the bottom section, **Then** my avatar and name are displayed.
2. **Given** the user profile is displayed, **When** I click the ellipsis icon next to my name, **Then** a dropdown menu appears with relevant options.

---


### Edge Cases

- What happens if a collapsible menu item has no sub-links? (Should not be collapsible or should be disabled)
- How does the sidebar behave on very small screens or when resized? (Should be responsive or hide/show appropriately)
- What happens if user data (avatar, name) is not available? (Display placeholders or a default state)
- How does the `ScrollArea` behave with a very long list of menu items? (Should scroll smoothly without layout issues)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display "Shadcn UI Kit" as the sidebar title.
- **FR-002**: System MUST allow main menu items ("Dashboards", "E-commerce", "Sales", "Project Management") to be collapsible.
- **FR-003**: System MUST display sub-links when a collapsible menu item is expanded.
- **FR-004**: System MUST display simple navigation links ("File Manager", "Crypto").
- **FR-005**: System MUST provide a clear hover state for navigation links.
- **FR-006**: System MUST display badges ("Coming", "New", "8") next to specified links.
- **FR-007**: System MUST display a distinct Call to Action (CTA) block.
- **FR-008**: System MUST display user avatar and name at the bottom of the sidebar.
- **FR-009**: System MUST provide a dropdown menu for user profile settings.

### Key Entities *(include if feature involves data)*

- **MenuItem**: Represents a single item in the sidebar navigation.
    *   Attributes:
        *   `id`: Unique identifier for the menu item.
        *   `label`: The display text of the menu item.
        *   `icon`: (Optional) Icon associated with the menu item.
        *   `link`: (Optional) URL or path for navigation.
        *   `isCollapsible`: (Boolean) Indicates if the item can be expanded/collapsed.
        *   `children`: (Array of MenuItem) Sub-items for collapsible menus.
        *   `badge`: (Optional) Text or number to display as a badge.
- **UserProfile**: Represents the current user's information.
    *   Attributes:
        *   `avatarUrl`: URL to the user's avatar image.
        *   `name`: The user's display name.

## Assumptions

- The design image is available and will be used as a reference for visual layout and styling.
- The `shadcn/ui` components are correctly installed and configured in the project.
- The application will run in a modern web browser environment.
- Basic user interaction (clicking, hovering) is expected.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The sidebar renders correctly and matches the provided design image within 1 second of page load.
- **SC-002**: Users can successfully expand and collapse all main menu items with 100% accuracy.
- **SC-003**: All navigation links display a clear hover state and are clickable.
- **SC-004**: Badges are displayed correctly next to their respective links.
- **SC-005**: The user profile section and its dropdown menu are fully functional.