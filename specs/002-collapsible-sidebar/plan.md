# Implementation Plan: Collapsible Sidebar

**Feature Branch**: `002-collapsible-sidebar`  
**Created**: October 28, 2025  
**Status**: Draft  
**Feature Spec**: /Users/toannh/projects/lap-trinh-voi-ai/homework03/specs/002-collapsible-sidebar/spec.md

## Technical Context *(mandatory)*

### Existing Architecture

The project is a React application bootstrapped with Vite, utilizing Tailwind CSS for styling and `shadcn/ui` for UI components. The application structure follows standard React conventions.

### Technology Stack

- React 18.x (with Hooks)
- TypeScript 5.x
- Node.js 20.x
- Vite 5.x
- Tailwind CSS 3.x
- shadcn/ui components (Button, Collapsible, Badge, Avatar, ScrollArea, DropdownMenu)

### Dependencies

- `shadcn/ui` components for UI elements.
- `lucide-react` for icons (as commonly used with shadcn/ui).

### Unknowns / Research Areas

- None. The technical requirements are clearly defined in the feature specification and align with the existing project setup.

## Constitution Check *(mandatory)*

### Compliance Assessment

- [x] **Principle I. Component Origin**: All specified UI components (Button, Collapsible, Badge, Avatar, ScrollArea, DropdownMenu) are from `shadcn/ui`, adhering to this principle.
- [x] **Principle II. Customization and Extension**: Customization will be done within the generated `shadcn/ui` component files if needed, adhering to this principle.
- [x] **Principle III. Visual Consistency**: New custom components (if any) will use Tailwind CSS utilities and variables, ensuring visual consistency.
- [x] **Principle IV. Avoiding Fragmentation**: No third-party UI component libraries are planned for installation, adhering to this principle.
- [x] **Principle I. Package Manager**: `pnpm` will be used for all dependency management.
- [x] **Principle II. Lock File**: `pnpm-lock.yaml` will be committed.
- [x] **Principle III. Script Execution**: `pnpm` will be used for script execution.
- [x] **Principle IV. Adding Components**: `npx shadcn@latest add` will be used for adding `shadcn/ui` components.
- [x] **Principle I. Sole Tool**: Prettier is the sole formatter.
- [x] **Principle II. Shared Configuration**: A shared Prettier configuration is expected to be in place.
- [x] **Principle III. ESLint Integration**: Prettier is expected to be integrated with ESLint.
- [x] **Principle IV. Integrity**: All code files will be formatted by Prettier.
- [x] **Principle I. Primary Tool**: ESLint is the primary linting tool.
- [x] **Principle II. Shared Configuration**: An ESLint configuration is expected to be in place.
- [x] **Principle III. Zero-Error Policy**: No ESLint errors will be present in the final code.
- [x] **Principle IV. Restricted Disabling**: Rule-disabling comments will be avoided or justified.
- [x] **Principle I. Git Hook Management**: Husky is expected to be used for Git hooks.
- [x] **Principle II. Pre-commit Checks**: Lint-staged is expected to run Prettier and ESLint on staged files.
- [x] **Principle III. Blocking Faulty Commits**: Commits will be rejected if formatting or linting fails.

### Justification for Violations *(if any)*

- No violations are anticipated with the current plan.

## Gates *(mandatory)*

### Phase 0: Outline & Research

- [x] `research.md` is complete and all "NEEDS CLARIFICATION" items from the Technical Context are resolved.

### Phase 1: Design & Contracts

- [ ] `data-model.md` is complete and accurately reflects the entities and relationships.
- [ ] API contracts (if any) are defined in the `contracts/` directory. (N/A for this feature)
- [ ] `quickstart.md` is updated with instructions for setting up and running the new feature.
- [ ] Agent context is updated with new technologies.

### Phase 2: Implementation

- [ ] All unit tests pass with 100% coverage for new code.
- [ ] Integration tests pass for key user flows.
- [ ] Code reviews are completed and all critical feedback addressed.
- [ ] Performance benchmarks (if any) are met.

## Phase 0: Outline & Research *(mandatory)*

### Research Tasks

- No specific research tasks are required as the technical stack and requirements are clear.

### Research Findings *(to be filled after research is complete)*

- **Decision**: Proceed with React, TypeScript, Vite, Tailwind CSS, and `shadcn/ui` as per existing project setup and feature requirements.
- **Rationale**: These technologies are already established in the project and meet all functional and technical constraints.
- **Alternatives considered**: None, as the tech stack is predefined.

## Phase 1: Design & Contracts *(mandatory)*

### Data Model

- [ ] `data-model.md` created, defining entities, attributes, and relationships.

### API Contracts *(if applicable)*

- Not applicable for this front-end only feature.

### Architectural Decisions

- **Component Structure**: A main `Sidebar.tsx` component will be created in `src/components/app/`.
- **State Management**: Utilize React's `useState` hook for managing the collapsible state of menu items.
- **Data**: Use mock data for menu items and user profile information within the `Sidebar.tsx` component.
- **Layout Integration**: The `Sidebar` component will be integrated into `App.tsx` to create a two-column layout.

## Phase 2: Implementation Plan *(mandatory)*

### Implementation Tasks

- [ ] **Giai đoạn 1: Cài đặt Components.** Thêm các component `shadcn/ui` cần thiết cho Sidebar (Button, Collapsible, Badge, Avatar, ScrollArea, DropdownMenu). (Effort: 2 hours, Dependencies: None)
- [ ] **Giai đoạn 2: Tạo Cấu trúc Component.** Tạo file `Sidebar.tsx` trong `src/components/app/` và thiết lập cấu trúc cơ bản (header, nội dung, footer). (Effort: 1 hour, Dependencies: Giai đoạn 1)
- [ ] **Giai đoạn 3: Xây dựng Menu Điều hướng.** Triển khai các liên kết và các mục `Collapsible` bằng dữ liệu giả (mock data). (Effort: 3 hours, Dependencies: Giai đoạn 2)
- [ ] **Giai đoạn 4: Hoàn thiện UI.** Thêm khối CTA và Hồ sơ Người dùng vào cuối sidebar. (Effort: 2 hours, Dependencies: Giai đoạn 3)
- [ ] **Giai đoạn 5: Tích hợp Layout.** Cập nhật `App.tsx` để hiển thị `Sidebar` trong bố cục 2 cột. (Effort: 1 hour, Dependencies: Giai đoạn 4)

## Quickstart Guide *(mandatory)*

### Setup and Run Instructions

- Instructions will be provided in `quickstart.md` after the implementation is complete.