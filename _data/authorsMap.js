// Create a lookup map for author metadata
// Combines authors.json (for display names/bios) with bio template existence (for page links)
// All keys are lowercase for case-insensitive lookups
const fs = require('fs');
const path = require('path');

// Load author metadata if it exists
let authorMetadata = {};
const authorsJsonPath = path.join(__dirname, 'authors.json');
if (fs.existsSync(authorsJsonPath)) {
  const authors = require('./authors.json');
  authorMetadata = authors.reduce((map, author) => {
    map[author.slug.toLowerCase()] = author;
    return map;
  }, {});
}

// Check which authors have bio templates (and thus pages)
const biosDir = path.join(__dirname, '../_includes/author-bios');
const authorsWithPages = new Set();
if (fs.existsSync(biosDir)) {
  const files = fs.readdirSync(biosDir);
  for (const file of files) {
    if (file.endsWith('.njk') || file.endsWith('.html')) {
      const slug = file.replace(/\.(njk|html)$/, '').toLowerCase();
      authorsWithPages.add(slug);
    }
  }
}

// Build final map with hasPage flag (all keys lowercase)
const authorsMap = {};
for (const slug of Object.keys(authorMetadata)) {
  const lowerSlug = slug.toLowerCase();
  authorsMap[lowerSlug] = {
    ...authorMetadata[slug],
    slug: lowerSlug,
    hasPage: authorsWithPages.has(lowerSlug)
  };
}

// Also add entries for authors with pages but no metadata
for (const slug of authorsWithPages) {
  if (!authorsMap[slug]) {
    authorsMap[slug] = {
      slug,
      hasPage: true
    };
  }
}

module.exports = authorsMap;
