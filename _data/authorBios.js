// Scans _includes/author-bios/ for author bio templates
// Returns an array of author objects for pagination
// Only authors with bio templates get pages
const fs = require('fs');
const path = require('path');

module.exports = function() {
  const biosDir = path.join(__dirname, '../_includes/author-bios');
  const authors = [];

  if (fs.existsSync(biosDir)) {
    const files = fs.readdirSync(biosDir);
    for (const file of files) {
      if (file.endsWith('.njk') || file.endsWith('.html')) {
        const slug = file.replace(/\.(njk|html)$/, '').toLowerCase();
        authors.push({ slug });
      }
    }
  }

  return authors;
};
