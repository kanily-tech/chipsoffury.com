const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const { DateTime } = require("luxon");
const { execSync } = require("child_process");

let isCompiling = false;

module.exports = function(eleventyConfig) {
    // Ignore ai_docs folder and notes folder
    eleventyConfig.ignores.add("ai_docs/**");
    eleventyConfig.ignores.add("notes/**");
    eleventyConfig.ignores.add("README.md");
    eleventyConfig.ignores.add("CLAUDE.md");
    
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("images");

    // Copy CSS files (except tailwind.css which we'll compile)
    eleventyConfig.addPassthroughCopy({"css/normalize.css": "css/normalize.css"});
    eleventyConfig.addPassthroughCopy({"css/webflow.css": "css/webflow.css"});
    eleventyConfig.addPassthroughCopy({"css/chips-of-fury.webflow.css": "css/chips-of-fury.webflow.css"});

    // Copy js files to _site/js
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("js");
    
    // Copy robots.txt to root
    eleventyConfig.addPassthroughCopy("robots.txt");

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
    
    // Add sitemap plugin
    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: "https://chipsoffury.com"
        }
    });

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });
    
    // Add date filter for ISO format (for structured data)
    eleventyConfig.addFilter("date", (dateObj, format) => {
        if (format === '%Y-%m-%d') {
            return DateTime.fromJSDate(dateObj).toISODate();
        }
        return DateTime.fromJSDate(dateObj).toFormat(format);
    });
    
    // Add truncate filter
    eleventyConfig.addFilter("truncate", (str, length = 50) => {
        if (!str) return '';
        if (str.length <= length) return str;
        return str.substr(0, length) + '...';
    });
    
    // Add helper for current year
    eleventyConfig.addGlobalData("helpers", {
        currentYear: () => new Date().getFullYear()
    });

    return {
        templateFormats: ["html", "njk", "md"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
};
