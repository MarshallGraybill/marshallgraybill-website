# marshallgraybill.com

Plain HTML + CSS. No build tools, no frameworks, no monthly fees.

```
index.html          Work: intro + project grid
research.html       PhD research + publications
about.html          Bio, CV, contact
projects/           One HTML page per project (copy project-one.html)
images/projects/    Project images
css/style.css       All styling (colors and fonts are at the top)
```

## Adding a project
1. Copy `projects/project-one.html` to `projects/your-project.html` and fill it in.
2. Put images in `images/projects/` and replace each `<div class="ph">…</div>` with
   `<img src="../images/projects/your-image.jpg" alt="Description">`.
3. Add a card to the grid in `index.html` pointing at the new page.

Export images as JPG/WebP about 2000px wide so pages load quickly.

## Free hosting
- **GitHub Pages**: push this folder to a GitHub repo, then go to Settings → Pages → Deploy from branch `main`.
- **Netlify** or **Cloudflare Pages**: connect the repo, leave the build command empty, and set the publish directory to `/`.

All three support a custom domain. Point `marshallgraybill.com`'s DNS at the host before you cancel Adobe.
