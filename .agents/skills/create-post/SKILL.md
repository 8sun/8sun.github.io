---
name: create-post
description: Turn pasted writing into a Markdown post in this repository, with title, description, categories, and publication date in resources/posts.yaml. Use for adding a post, including standalone pasted articles or poems under this project's AGENTS.md convention.
---

# Create a post

Work from the repository root. Read `resources/posts.yaml` and a similar file in `resources/content/` to follow current conventions.

1. Preserve the supplied text, language, paragraph structure, links, and deliberate line breaks. Apply Markdown formatting without rewriting. For poetry, use Markdown hard breaks (two trailing spaces) where individual lines must stay separate. Do not add YAML frontmatter. Keep an existing body heading; do not insert a duplicate title just because the template also displays it.
2. Use the supplied title or extract it from a clear title line/heading. Otherwise derive a short, faithful title in the text's language. Write a concise description in that language without inventing facts.
3. Use an explicitly supplied publication date; otherwise obtain the current local date at execution time (`date +%F`). Dates mentioned within the narrative are not publication instructions. Store the date as a quoted `YYYY-MM-DD` string.
4. Choose a unique, descriptive lowercase ASCII `id` using underscores, following existing IDs. Check both the YAML and content filenames for collisions; also avoid category IDs and generated names such as `index`. Save the body as `resources/content/<id>.md`. Do not overwrite an existing post unless the user requests an update.
5. Add one entry to `resources/posts.yaml`, preserving existing entries and formatting. Use the schema below, with `template: "post.html"`, `icon: ""`, and `home: true` unless instructed otherwise. Insert new posts before the standalone `about` and `contact` entries. Quote and escape YAML string values correctly.

```yaml
- id: example_post
  title: "Extracted or supplied title"
  description: "A concise description of the text"
  template: "post.html"
  icon: ""
  categories:
    stories: "Проза"
  home: true
  date: "YYYY-MM-DD"
```

Categories are a mapping, not a list. Reuse the current keys and labels: `stories: "Проза"` for fiction/prose, `poetry: "Поэзия"` for poems, `dev: "Dev"` for software topics, and `view: "Взгляд"` for opinions, travel, and personal observations. Select the most relevant category; use multiple when warranted. Honor explicitly requested categories, checking current metadata before creating a new key.

Verify that the new ID is unique, the Markdown filename matches it, and the YAML entry has all fields. Run `./static-site-gen` from the repository root when available, and inspect `site/<id>.html` plus the relevant home/category listing for the title, body, links, date, and line breaks. The executable ignores `--help` and builds instead. If it is missing or incompatible, report that generation could not be verified; still finish the Markdown and metadata. Do not edit generated HTML or manually mirror `docs/`.

Review the diff for unintended changes. Report the created file, chosen metadata, and whether generation succeeded. Leave committing, pushing, and publication to a separate user request.
