# marshallgraybill.com

Plain HTML + CSS. No build tools, no frameworks, no monthly fees.

```
index.html                 Work: project grid with sorting tabs
projects/canyon-house.html Project page (copy it for each new project)
images/projects/<name>/    Images for each project (cover.jpg is the 16:9 grid tile)
css/style.css              All styling (colours, corner radius etc. at the top)
mockups/                   Layout concepts explored before choosing the off-white gallery
```

## Adding a project
1. Make a folder `images/projects/your-project/` with the images and a 16:9 `cover.jpg`.
2. Copy `projects/canyon-house.html` to `projects/your-project.html` and swap in the text and images.
3. Add a tile to the grid in `index.html`, with `data-tags` set to `id`, `eng` and/or `sci`.

Export images as JPG/WebP about 2000px wide so pages load quickly.

## Free hosting
- **GitHub Pages**: push this folder to a GitHub repo, then go to Settings → Pages → Deploy from branch `main`.
- **Netlify** or **Cloudflare Pages**: connect the repo, leave the build command empty, and set the publish directory to `/`.

All three support a custom domain. Point `marshallgraybill.com`'s DNS at the host before you cancel Adobe.
