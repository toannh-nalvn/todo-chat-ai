# Tasks: Collapsible Sidebar

**Feature Branch**: `002-collapsible-sidebar`  
**Created**: October 28, 2025  
**Status**: To Do  
**Feature Spec**: /Users/toannh/projects/lap-trinh-voi-ai/homework03/specs/002-collapsible-sidebar/spec.md

## Implementation Strategy

This feature will be implemented incrementally, focusing on delivering core user value in each phase. Tasks are organized by user story to enable independent development and testing. The goal is to build a functional and visually appealing collapsible sidebar.

## Phase 1: Setup

- [x] T001 Execute shell command: `npx shadcn@latest add button`
- [x] T002 Execute shell command: `npx shadcn@latest add collapsible`
- [x] T003 Execute shell command: `npx shadcn@latest add badge`
- [x] T004 Execute shell command: `npx shadcn@latest add avatar`
- [x] T005 Execute shell command: `npx shadcn@latest add scroll-area`
- [x] T006 Execute shell command: `npx shadcn@latest add dropdown-menu`
- [x] T007 Execute shell command: `pnpm add lucide-react`

## Phase 2: Foundational

- [x] T008 Create new file: `src/components/app/Sidebar.tsx`
- [x] T009 Overwrite file `src/components/app/Sidebar.tsx` with the basic structure including header, scroll area, CTA, and user profile sections.

## Phase 3: User Story 1 - Basic Navigation & Collapsible Menus (P1)

**Story Goal**: As a user, I want to be able to see the sidebar, navigate through simple links, and expand/collapse main menu items to reveal sub-links, so I can easily access different sections of the application.

**Independent Test**: Interact with the sidebar UI to expand/collapse menu items and observe link highlighting.

- [x] T010 [US1] Update file `src/components/app/Sidebar.tsx` to replace the placeholder text with actual menu navigation logic, including collapsible items and simple links using mock data.

## Phase 4: User Story 2 - Enhanced Navigation with Badges & CTA (P2)

**Story Goal**: As a user, I want to see additional information like badges next to certain links and interact with a call-to-action block, so I can quickly identify new or upcoming features and engage with promotional content.

**Independent Test**: Visually verify badge presence and content, and confirm the CTA block is interactive.

- [x] T011 [US2] Ensure the CTA block and badges are correctly rendered in `src/components/app/Sidebar.tsx` as per the design.

## Phase 5: User Story 3 - User Profile & Settings (P3)

**Story Goal**: As a user, I want to see my profile information and access a dropdown menu for settings, so I can personalize my experience and manage my account.

**Independent Test**: Verify the display of user information and the functionality of the dropdown menu.

- [x] T012 [US3] Ensure the user profile section and dropdown menu are correctly rendered and functional in `src/components/app/Sidebar.tsx` as per the design.

## Final Phase: Polish & Cross-Cutting Concerns

- [x] T013 Overwrite file `src/App.tsx` to integrate the `Sidebar` component into a two-column layout.
- [ ] T014 Display completion message to the user: "Hoàn tất Giai đoạn 1 (Sidebar)! Chạy 'pnpm dev' để xem Sidebar cơ bản. Chúng ta sẽ thêm logic menu chi tiết ở bước tiếp theo nếu cần."

## Dependencies

- Phase 1 must be completed before Phase 2.
- Phase 2 must be completed before Phase 3.
- Phase 3 must be completed before Phase 4.
- Phase 4 must be completed before Phase 5.

## Parallel Execution Examples

- Tasks within Phase 1 (T001-T007) can be executed in parallel as they are independent component installations.
