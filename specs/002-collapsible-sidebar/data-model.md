# Data Model: Collapsible Sidebar

**Feature Branch**: `002-collapsible-sidebar`  
**Created**: October 28, 2025  
**Status**: Draft  
**Feature Spec**: /Users/toannh/projects/lap-trinh-voi-ai/homework03/specs/002-collapsible-sidebar/spec.md

## Entities

### MenuItem

Represents a single item in the sidebar navigation, which can be a simple link or a collapsible parent with children.

**Attributes**:

- `id`: (String) A unique identifier for the menu item.
- `label`: (String) The display text of the menu item (e.g., "Dashboards", "File Manager").
- `icon`: (Optional, String) A string representing the icon to be displayed next to the menu item (e.g., a Lucide React icon name).
- `link`: (Optional, String) The URL or path for navigation if it's a simple link.
- `isCollapsible`: (Boolean) Indicates if the item can be expanded/collapsed to reveal sub-items. Defaults to `false`.
- `children`: (Optional, Array of MenuItem) An array of `MenuItem` objects representing sub-items for collapsible menus.
- `badge`: (Optional, String or Number) Text or number to display as a badge next to the menu item (e.g., "New", "Coming", "8").

**Relationships**:

- A `MenuItem` can have a one-to-many relationship with other `MenuItem` objects through its `children` attribute, forming a hierarchical menu structure.

**Validation Rules**:

- `label` attribute MUST NOT be empty or contain only whitespace.
- If `isCollapsible` is `true`, `children` should ideally be present.

### UserProfile

Represents the current user's information displayed at the bottom of the sidebar.

**Attributes**:

- `avatarUrl`: (String) The URL to the user's avatar image.
- `name`: (String) The user's display name.

**Relationships**:

- None. `UserProfile` is an independent entity within the sidebar context.

**Validation Rules**:

- `avatarUrl` should be a valid URL.
- `name` attribute MUST NOT be empty or contain only whitespace.
