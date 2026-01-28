const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const markdownIt = require("markdown-it");

const md = markdownIt({ html: true });

module.exports = function() {
    const glossaryDir = path.join(__dirname, "../glossary");
    const glossary = {};

    // Check if glossary directory exists
    if (!fs.existsSync(glossaryDir)) {
        return glossary;
    }

    // Read all markdown files in the glossary directory
    const files = fs.readdirSync(glossaryDir).filter(f => f.endsWith(".md"));

    for (const file of files) {
        const slug = file.replace(".md", "");
        const filePath = path.join(glossaryDir, file);
        const fileContent = fs.readFileSync(filePath, "utf-8");

        // Parse frontmatter and content
        const { data, content } = matter(fileContent);

        // Convert markdown content to HTML
        const htmlContent = md.render(content.trim());

        glossary[slug] = {
            term: data.term || slug,
            content: htmlContent
        };
    }

    return glossary;
};
