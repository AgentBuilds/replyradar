# ReplyRadar design system

An editorial investigation workspace: evidence first, no automated verdicts.

- Palette (60/30/10): 60% warm paper `hsl(42 33% 96%)`, 30% pale sage and charcoal surfaces, 10% deep teal `hsl(173 57% 24%)` accents. Text uses `hsl(180 17% 16%)`; muted text uses `hsl(180 10% 35%)`. Never use color alone to convey status.
- Typography: **Georgia** for the editorial heading, **Trebuchet MS** for interface text and **Courier New** for evidence labels and timestamps. These locally available fonts avoid network dependencies; body line-height is 1.6.
- Spacing: 4, 8, 12, 16, 24, 32, 48 pixels via CSS tokens.
- Radius: 8px controls, 16px panels, pill badges. Elevation: a restrained charcoal shadow on the main board; borders separate evidence rows.
- Mobile first: stacked layout, wrapping labels, fluid widths, controls at least 44px tall. Desktop adds an evidence sidebar.
- Interaction: 180ms color/transform transitions; hover, active, focus-visible and disabled states. API refresh shows loading, failure/retry, and unavailable states. Sample evidence has an explicit empty-state fallback.
- Accessibility: semantic landmarks and headings, native keyboard controls, live status announcements, focus rings, contrast >= 4.5:1 for text, reduced-motion support.
- Content: all observations are explicitly synthetic sample data. No risk scores, bot labels, fabricated live metrics, or mutation of Bluesky accounts.
