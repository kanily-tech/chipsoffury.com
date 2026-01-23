const { EleventyRenderPlugin } = require("@11ty/eleventy");
const pluginWebc = require("@11ty/eleventy-plugin-webc");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const { DateTime } = require("luxon");
const { execSync } = require("child_process");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

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

    // Configure markdown-it with anchor plugin for ToC
    const md = markdownIt({ html: true }).use(markdownItAnchor, {
        permalink: false,
        slugify: (s) => s.toLowerCase().replace(/[^\w\s]+/g, '').replace(/\s+/g, '-').replace(/-+$/, '')
    });
    eleventyConfig.setLibrary("md", md);

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

    // Extract headings for Table of Contents (H2 only for cleaner ToC)
    eleventyConfig.addFilter("extractToc", (content) => {
        const regex = /<h2[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h2>/gi;
        const headings = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            // Strip HTML tags from heading text
            const text = match[2].replace(/<[^>]*>/g, '').trim();
            headings.push({ id: match[1], text });
        }
        return headings;
    });

    // Calculate reading time (avg 200 words per minute)
    eleventyConfig.addFilter("readingTime", (content) => {
        const text = content.replace(/<[^>]*>/g, '');
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / 200);
        return minutes;
    });

    // Add helper for current year
    eleventyConfig.addGlobalData("helpers", {
        currentYear: () => new Date().getFullYear()
    });

    // Create variations collection
    eleventyConfig.addCollection("variations", function(collectionApi) {
        return collectionApi.getFilteredByGlob("variations/*.md").sort((a, b) => {
            // Sort by popularity (descending) then by name
            const popularityDiff = (b.data.popularity || 0) - (a.data.popularity || 0);
            if (popularityDiff !== 0) return popularityDiff;
            return a.data.title.localeCompare(b.data.title);
        });
    });

    // Create publishedPosts collection (excludes drafts)
    // Draft posts are still built and accessible via direct URL
    eleventyConfig.addCollection("publishedPosts", function(collectionApi) {
        return collectionApi.getFilteredByTag("post").filter(post => !post.data.draft);
    });

    // Create glossary collection for poker term definitions
    eleventyConfig.addCollection("glossary", function(collectionApi) {
        return collectionApi.getFilteredByGlob("glossary/*.md");
    });

    // Transform glossary links [text](glossary:slug) to poker-term spans
    // This runs after markdown is processed
    eleventyConfig.addTransform("glossaryLinks", function(content, outputPath) {
        if (!outputPath || !outputPath.endsWith(".html")) {
            return content;
        }

        // Match [text](glossary:slug) pattern
        // After markdown processing, this becomes <a href="glossary:slug">text</a>
        const glossaryLinkRegex = /<a href="glossary:([^"]+)">([^<]+)<\/a>/g;

        return content.replace(glossaryLinkRegex, (match, slug, text) => {
            return `<span class="poker-term" tabindex="0" role="button" data-term="${slug}" onclick="openPokerTermModal(this)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openPokerTermModal(this)}">${text}</span>`;
        });
    });

    return {
        templateFormats: ["html", "njk", "md"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
};
