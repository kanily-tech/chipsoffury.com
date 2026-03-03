module.exports = {
    layout: "layouts/tool.html",
    eleventyComputed: {
        permalink: (data) => {
            if (data.permalink) return data.permalink;
            return `/${data.page.fileSlug}/`;
        }
    }
};
