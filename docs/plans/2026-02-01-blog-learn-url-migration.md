# Blog/Learn URL Migration Design

## Overview

Migrate posts from `/posts/<slug>` to either `/blog/<slug>` or `/learn/<slug>` based on content type, with 301 redirects for SEO preservation.

## Content Split

- **Blog** (0001-0014): Dev blog / technical posts
- **Learn** (0015-0020): User-facing educational content

## Directory Structure

```
blog/
├── 0001-hello-world.md
├── ...
├── 0014-discord-activity.md
└── blog.11tydata.js

learn/
├── 0015-play-poker-with-friends-online.md
├── ...
├── 0020-poker-winning-hand-rankings.md
└── learn.11tydata.js

_redirects              # Static file, generated once
```

## Data Files

**`blog/blog.11tydata.js`:**
```js
module.exports = {
    layout: "layouts/blog-post-tailwind.html",
    eleventyComputed: {
        permalink: (data) => {
            const slug = data.page.fileSlug.replace(/^\d{4}-/, '');
            return `/blog/${slug}/`;
        }
    }
};
```

**`learn/learn.11tydata.js`:**
```js
module.exports = {
    layout: "layouts/blog-post-tailwind.html",
    eleventyComputed: {
        permalink: (data) => {
            const slug = data.page.fileSlug.replace(/^\d{4}-/, '');
            return `/learn/${slug}/`;
        }
    }
};
```

## Collections

**Updated `publishedPosts`** (for sitemap - excludes drafts, includes unlisted):
```js
eleventyConfig.addCollection("publishedPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("blog/*.md")
        .filter(post => !post.data.draft)
        .reverse();
});
```

**New `listedPosts`** (for /blog listing - excludes drafts AND unlisted):
```js
eleventyConfig.addCollection("listedPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("blog/*.md")
        .filter(post => !post.data.draft && !post.data.unlisted)
        .reverse();
});
```

## Redirects

Static `_redirects` file with 301 redirects from old to new URLs. Generated once (not part of build). Skips posts with `draft: true`.

Format:
```
/posts/hello-world /blog/hello-world 301
/posts/play-poker-with-friends-online /learn/play-poker-with-friends-online 301
```

## File Changes Summary

**New files:**
- `blog/blog.11tydata.js`
- `learn/learn.11tydata.js`
- `_redirects`

**Modified files:**
- `.eleventy.js` - update collections, add passthrough for `_redirects`
- `blog.html` - use `listedPosts` instead of `publishedPosts`

**Moved files:**
- `posts/0001-*.md` to `posts/0014-*.md` → `blog/`
- `posts/0015-*.md` to `posts/0020-*.md` → `learn/`

**Deleted:**
- `posts/` folder (after migration)
