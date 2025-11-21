import { getBlogBySlug } from './blog-data.js';

// Get the slug from the URL
function getSlugFromUrl() {
  const path = window.location.pathname;
  const parts = path.split('/');
  // Handle both /blog/slug and /blog/slug.html patterns
  const slug = parts[parts.length - 1].replace('.html', '');
  return slug;
}

// Render the blog post
function renderBlogPost(post) {
  if (!post) {
    // Blog post not found
    document.getElementById('blog-content').innerHTML = `
      <section class="py-24 bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="max-w-3xl mx-auto text-center">
            <h1 class="text-4xl font-semibold text-gray-900 mb-4">Article Not Found</h1>
            <p class="text-lg text-gray-700 mb-8">Sorry, we couldn't find the article you're looking for.</p>
            <a href="/blog" class="inline-flex py-3 px-6 items-center justify-center text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200">
              Back to Blog
            </a>
          </div>
        </div>
      </section>
    `;
    return;
  }

  // Update page title
  document.title = `${post.title} - Eternal Safety Solutions`;

  // Render the blog post content
  document.getElementById('blog-content').innerHTML = `
    <section class="relative py-12 lg:py-24 bg-blue-900 overflow-hidden">
      <img class="absolute top-0 right-0" src="/assets/quantam-assets/pricing/waves-right-top.png" alt=""/>
      <div class="container mx-auto px-4 relative">
        <div class="max-w-4xl mx-auto">
          <div class="mb-6">
            <a href="/blog" class="inline-flex items-center text-white hover:text-blue-200 transition duration-200">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Blog
            </a>
          </div>
          <div class="mb-6">
            <span class="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">${post.category}</span>
          </div>
          <h1 class="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-xs text-white mb-6">${post.title}</h1>
          <div class="flex flex-wrap items-center gap-4 text-white opacity-90">
            <div class="flex items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="mr-2">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 3C11.66 3 13 4.34 13 6C13 7.66 11.66 9 10 9C8.34 9 7 7.66 7 6C7 4.34 8.34 3 10 3ZM10 17.2C7.5 17.2 5.29 15.92 4 13.98C4.03 11.99 8 10.9 10 10.9C11.99 10.9 15.97 11.99 16 13.98C14.71 15.92 12.5 17.2 10 17.2Z" fill="white"/>
              </svg>
              <span class="text-sm font-medium">${post.author}</span>
            </div>
            <span>•</span>
            <span class="text-sm">${post.readTime}</span>
            <span>•</span>
            <span class="text-sm">${post.date}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 lg:py-24">
      <div class="container mx-auto px-4">
        <article class="max-w-4xl mx-auto">
          <div class="prose prose-lg max-w-none">
            ${post.content}
          </div>

          <div class="mt-12 pt-8 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <a href="/blog" class="inline-flex items-center text-blue-500 hover:text-blue-600 font-medium transition duration-200">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Back to All Articles
              </a>
              <div class="flex gap-3">
                <span class="text-gray-600">Share:</span>
                <a href="#" class="text-gray-600 hover:text-blue-500 transition duration-200">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="text-gray-600 hover:text-blue-500 transition duration-200">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="py-12 lg:py-24 bg-blue-900">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 text-center">
            <h2 class="font-heading text-3xl sm:text-4xl tracking-sm text-white mb-4">Need Expert WHS Guidance?</h2>
            <p class="text-lg text-white opacity-80 mb-8">Our team of safety consultants is ready to help your business achieve compliance and build a stronger safety culture</p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <a class="inline-flex py-4 px-6 items-center justify-center text-lg font-medium text-white border border-blue-500 hover:border-white hover:text-blue-900 bg-blue-500 hover:bg-white rounded-full transition duration-200" href="/contact">Book a Consultation</a>
              <a class="inline-flex py-4 px-6 items-center justify-center text-lg font-medium text-white border border-white hover:border-blue-500 hover:text-blue-900 hover:bg-blue-500 rounded-full transition duration-200" href="/pricing">View Our Services</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Initialize the blog detail page
document.addEventListener('DOMContentLoaded', () => {
  const slug = getSlugFromUrl();
  const post = getBlogBySlug(slug);
  renderBlogPost(post);
});
