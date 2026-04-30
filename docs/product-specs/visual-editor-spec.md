# Visual Editor Spec

## Editor Layout

The editor has a top bar, left page structure tree, center canvas, and right inspector panel.

## Top Bar

- Project name
- Preview entry
- AI optimize action
- Export action
- Save status

## Left Structure Tree

The left panel is called page structure, not layers. It shows business modules and supports:

- Select module
- Move up
- Move down
- Hide or show
- Duplicate
- Delete
- Add module

## Center Canvas

The canvas renders the current DSL in real time. It supports desktop and mobile preview modes. Clicking a section selects it and highlights it.

## Right Inspector Panel

The inspector has three tabs:

- Content
- Style
- Smart Suggestions

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
