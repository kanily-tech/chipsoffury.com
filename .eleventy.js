const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebc = require("@11ty/eleventy-plugin-webc");

module.exports = function(eleventyConfig) {
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("images");

    // Copy `css/fonts/` to `_site/css/fonts`
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("css");

    // Copy js files to _site/js
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("js");

    // A plugin to add shortcodes to render an Eleventy template string (or file) inside another template.
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(pluginWebc, {
        components: "_includes/components/**/*.webc",
    });

    return {
        templateFormats: ["html", "njk", "md"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
};
