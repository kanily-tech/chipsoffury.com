module.exports = {
    // Apply default layout to all posts
    layout: "layouts/blog-post.html",
    
    // Compute the permalink by stripping the number prefix
    eleventyComputed: {
        permalink: (data) => {
            // Get the filename without extension
            const fileSlug = data.page.fileSlug;
            
            // Remove the number prefix (e.g., "0001-" from "0001-hello-world")
            const slug = fileSlug.replace(/^\d{4}-/, '');
            
            // Return the clean permalink
            return `/posts/${slug}/`;
        }
    }
};