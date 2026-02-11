module.exports = {
    layout: "layouts/tool.html",
    eleventyComputed: {
        permalink: (data) => {
            return `/${data.page.fileSlug}/`;
        }
    }
};
