# Бодхисаттва в сети

My personal site for stories, poems, travel notes, and software articles. [8sun.github.io](https://8sun.github.io)

To add a post, paste the text into Codex in this repository. The `create-post` skill saves it in `resources/content/` and adds its metadata to `resources/posts.yaml`.

To rebuild and preview locally, run these commands from the repository root.

```sh
./static-site-gen
python3 -m http.server 8000 --directory site
```

Open http://localhost:8000. When ready to publish, include the generated `site/` changes in the push to `dev`. GitHub Actions copies them into `docs/`.
