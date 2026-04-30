# Security

MVP uses a mock AI adapter and does not require API keys.

`.env.example` documents that no environment variables are required for the current MVP. Real secrets belong in `.env.local`, GitHub repository secrets, or deployment provider secrets, never in committed files.

Future AI integrations must:

- Keep model/API keys in environment variables.
- Avoid logging sensitive user content.
- Treat exported code as generated output, not trusted executable input.
- Validate imported DSL before rendering or exporting.
