const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const { DateTime } = require("luxon");
const { execSync } = require("child_process");

let isCompiling = false;

module.exports = function(eleventyConfig) {
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("images");

    // Copy CSS files (except tailwind.css which we'll compile)
    eleventyConfig.addPassthroughCopy({"css/normalize.css": "css/normalize.css"});
    eleventyConfig.addPassthroughCopy({"css/webflow.css": "css/webflow.css"});
    eleventyConfig.addPassthroughCopy({"css/chips-of-fury.webflow.css": "css/chips-of-fury.webflow.css"});

    // Copy js files to _site/js
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("js");

    // Compile Tailwind CSS after 11ty builds the HTML
    eleventyConfig.on("eleventy.after", async () => {
        // Prevent duplicate compilation runs
        if (isCompiling) {
            console.log("Tailwind CSS compilation already in progress, skipping...");
            return;
        }
        
        isCompiling = true;
        console.log("Compiling Tailwind CSS...");
        
        try {
            execSync("npx @tailwindcss/cli -i ./css/tailwind-full.css -o ./_site/css/tailwind-full.css", { stdio: "pipe" });
            console.log("Tailwind CSS compiled successfully!");
            
        } catch (error) {
            console.error("Error compiling Tailwind CSS:", error.message);
        } finally {
            isCompiling = false;
        }
    });

    // Watch for changes in CSS files to trigger rebuilds
    eleventyConfig.addWatchTarget("./css/tailwind-full.css");

    // A plugin to add shortcodes to render an Eleventy template string (or file) inside another template.
    eleventyConfig.addPlugin(EleventyRenderPlugin);
    eleventyConfig.addPlugin(pluginWebc, {
        components: "_includes/components/**/*.webc",
    });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    return {
        templateFormats: ["html", "njk", "md"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
};
