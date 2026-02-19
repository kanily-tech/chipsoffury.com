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
    eleventyConfig.ignores.add("docs/**");
    eleventyConfig.ignores.add("README.md");
    eleventyConfig.ignores.add("CLAUDE.md");
    eleventyConfig.ignores.add("AGENTS.md");
    eleventyConfig.ignores.add("scripts/**");
    
    // Copy `img/` to `_site/img`
    eleventyConfig.addPassthroughCopy("images");

    // Copy CSS files (except tailwind.css which we'll compile)
    eleventyConfig.addPassthroughCopy({"css/normalize.css": "css/normalize.css"});
    eleventyConfig.addPassthroughCopy({"css/webflow.css": "css/webflow.css"});
    eleventyConfig.addPassthroughCopy({"css/chips-of-fury.webflow.css": "css/chips-of-fury.webflow.css"});
    eleventyConfig.addPassthroughCopy({"css/chip-distribution-calculator.css": "css/chip-distribution-calculator.css"});
    eleventyConfig.addPassthroughCopy({"css/pre-game-checklist.css": "css/pre-game-checklist.css"});

    // Copy js files to _site/js
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("js");
    
    // Copy robots.txt to root
    eleventyConfig.addPassthroughCopy("robots.txt");

    // Copy _redirects for Cloudflare
    eleventyConfig.addPassthroughCopy("_redirects");

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

    // Extract headings for Table of Contents (H2 by default, optionally H3)
    eleventyConfig.addFilter("extractToc", (content, includeH3 = false) => {
        const headings = [];

        // Extract H2 headings
        const h2Regex = /<h2[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h2>/gi;
        let match;
        while ((match = h2Regex.exec(content)) !== null) {
            const text = match[2].replace(/<[^>]*>/g, '').trim();
            headings.push({ id: match[1], text, level: 2, index: match.index });
        }

        // Optionally extract H3 headings
        if (includeH3) {
            const h3Regex = /<h3[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h3>/gi;
            while ((match = h3Regex.exec(content)) !== null) {
                const text = match[2].replace(/<[^>]*>/g, '').trim();
                headings.push({ id: match[1], text, level: 3, index: match.index });
            }
            // Sort by position in document
            headings.sort((a, b) => a.index - b.index);
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

    // Create publishedBlogPosts collection (excludes drafts, includes unlisted)
    // Used by sitemap - unlisted posts should appear in sitemap
    eleventyConfig.addCollection("publishedBlogPosts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("blog/*.md")
            .filter(post => !post.data.draft)
            .reverse();
    });

    // Create listedPosts collection (excludes drafts AND unlisted)
    // Used by /blog listing page
    eleventyConfig.addCollection("listedPosts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("blog/*.md")
            .filter(post => !post.data.draft && !post.data.unlisted)
            .reverse();
    });

    // Create publishedLearnPosts collection (excludes drafts)
    // Used by sitemap and /learn listing
    eleventyConfig.addCollection("publishedLearnPosts", function(collectionApi) {
        return collectionApi.getFilteredByGlob("learn/*.md")
            .filter(post => !post.data.draft)
            .reverse();
    });

    // Create listedAllPosts collection (blog + learn, excludes drafts AND unlisted)
    // Used by author pages - reverse chronological order
    eleventyConfig.addCollection("listedAllPosts", function(collectionApi) {
        const blogPosts = collectionApi.getFilteredByGlob("blog/*.md");
        const learnPosts = collectionApi.getFilteredByGlob("learn/*.md");
        return [...blogPosts, ...learnPosts]
            .filter(post => !post.data.draft && !post.data.unlisted)
            .sort((a, b) => b.date - a.date);
    });

    // Create publishedTools collection (excludes drafts)
    eleventyConfig.addCollection("publishedTools", function(collectionApi) {
        return collectionApi.getFilteredByGlob("tools/*.md")
            .filter(post => !post.data.draft);
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

        // Helper to create poker-term span
        const createPokerTerm = (slug, text) => {
            return `<span class="poker-term" tabindex="0" role="button" data-term="${slug}" onclick="openPokerTermModal(this)" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();openPokerTermModal(this)}">${text}</span>`;
        };

        // After markdown processing, [text](glossary:slug) becomes <a href="glossary:slug">text</a>
        const markdownProcessedRegex = /<a href="glossary:([^"]+)">([^<]+)<\/a>/g;
        content = content.replace(markdownProcessedRegex, (match, slug, text) => createPokerTerm(slug, text));

        return content;
    });

    return {
        templateFormats: ["html", "njk", "md"],
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
};
