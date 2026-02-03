module.exports = {
    layout: "layouts/blog-post-tailwind.html",
    eleventyComputed: {
        permalink: (data) => {
            const slug = data.page.fileSlug.replace(/^\d{4}-/, '');
            return `/blog/${slug}/`;
        }
    }
};
