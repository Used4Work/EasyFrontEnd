# Visual Editor Spec

## Editor Layout

The editor is the primary product surface and the default route. It has a top bar, left page structure tree, center canvas, and right inspector panel. The primary customer-facing UI is Chinese.

AI is auxiliary. It can generate a first draft from `/start` or optimize a selected module, but routine editing must work through direct visual controls.

## Top Bar

- Project name
- Preview entry
- AI auxiliary optimize action
- Export action
- Save status
- Backup, restore, reset, preview, export, and AI optimize must show an immediate visible result or status message.

## Left Structure Tree

The left panel is called page structure, not layers. It shows business modules and supports:

- Select module
- Move up
- Move down
- Drag reorder
- Hide or show
- Duplicate
- Delete
- Add module

Adding or duplicating a module selects the new module immediately. Dragging a module reorders sections in the DSL; it is not a separate visual-only order.

## Center Canvas

The canvas renders the current DSL in real time. It supports desktop and mobile preview modes. Clicking a section selects it and highlights it. Dragging a section reorders modules at section level.

## Right Inspector Panel

The inspector has three tabs:

- 内容
- 样式
- 智能建议

## Module Editing Capabilities

MVP content editing includes:

- Hero: title, subtitle, primary button, secondary button, image placeholder
- Feature Grid: item title, description, icon placeholder
- Pricing: plan name, price, benefits, recommended plan
- FAQ: question and answer
- CTA: title and button

Style editing includes semantic controls:

- Section background
- Layout variant
- Card style
- Radius
- Density
- Primary color
- Overall tone

## Smart Suggestions

The inspector should surface whether the current module has clear copy, an obvious CTA, mobile crowding risk, contrast risk, missing conversion path, or a need for FAQ, pricing, or proof.

## Beginner Mode Limits

Beginner mode is default. It does not show CSS classes, raw spacing units, z-index, Flex, Grid, or code as primary controls.
