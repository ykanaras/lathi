# Lathi Soap publishing guide

The site is static HTML on GitHub Pages. Publish to `ykanaras/lathi`, branch `main`.
The weekly ChatGPT automation writes and publishes one original article; there is no separate scheduled GitHub workflow.

## Add a post

1. Read current `shop.html`, `about.html`, this guide, and existing posts. Verify products, ingredients, offers and current facts. Do not rely on the old unused product catalog in assets/script.js or old FAQ/checkout pricing.
2. Write a useful, distinct article in `blog/<descriptive-slug>.html`, matching the first article's page shell, navigation, analytics, and `blog/blog.css`. Aim for roughly 600–900 words when the topic supports it; avoid filler.
3. Use a unique title, description, canonical URL, Open Graph fields, descriptive existing product image, visible byline, publication date, and matching BlogPosting JSON-LD. Dates must be the actual publication date in America/New_York. Link to relevant existing articles and the shop. Keep everything readable without JavaScript.
4. Add the latest card first between BLOG_POSTS_START and BLOG_POSTS_END in blog.html. Preserve all older posts; update the blogPost structured-data list.
5. Add the canonical article URL to sitemap.xml and update the blog index lastmod. Preserve existing entries. Only update an older article's lastmod when its content changes.
6. Check links, images, JSON-LD, and desktop/mobile layout. Publish all files together against the latest main commit, without force-pushing or overwriting concurrent changes. Verify GitHub Pages deployment and the live article if accessible.
7. Check dates before publishing to avoid duplicate posts on retries. Publish at most one new article in each Sunday–Saturday America/New_York week.

## Editorial approach

Write warmly as Lathi Soap, a family-owned handmade soap business. The confirmed ingredient story is extra-virgin olive oil from the family's farm in Sparta, Greece; Lathi Soap is vegan. Do not infer the place where the finished soap is manufactured from the oil's origin. Do not invent a complete formula, certifications, testimonials, clinical results, or production details. Do not call the soap organic. Do not assume every scent is essential-oil-only. Verify individual scents and current offers in the active shop.

Explain practical benefits, ingredient origins, scent enjoyment, gifting and soap care. Do not promise eczema/acne treatment, anti-aging effects, skin repair, universal gentleness, allergy safety or antibacterial effects. Do not transfer raw olive oil's nutritional properties to finished rinse-off soap. Source any skin/science claims from authoritative primary guidance and link to it in the article. Keep sources proportionate and avoid turning posts into health advice.

Use natural customer questions and clear answers, not repetitive keywords or manufactured local landing pages. SEO and AI visibility are not guaranteed.

## Possible next topics

- How to make handmade soap last longer: draining, drying, and storage.
- From Sparta to your soap dish: the meaning of our family-farm olive oil.
- How to choose a Lathi Soap scent: floral, citrus, and seasonal favorites.
- What vegan soap means and how to read a bar's ingredients.
- Handmade soap gift ideas for hosts, holidays, and everyday thank-yous.
- What olive oil does in soap: explain saponification with verified sources.

Recheck existing posts and seasonality before choosing. These are ideas, not prewritten or scheduled posts.
