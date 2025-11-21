import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',

  css: {
    devSourcemap: true,
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        about: resolve(__dirname, 'src/about.html'),
        pricing: resolve(__dirname, 'src/pricing.html'),
        blog: resolve(__dirname, 'src/blog.html'),
        'blog-detail': resolve(__dirname, 'src/blog-detail.html'),
        contact: resolve(__dirname, 'src/contact.html'),
        login: resolve(__dirname, 'src/login.html'),
        register: resolve(__dirname, 'src/register.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
  },

  plugins: [
    {
      name: 'html-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          // Remove trailing slashes except for root
          if (req.url !== '/' && req.url.endsWith('/')) {
            req.url = req.url.slice(0, -1);
          }

          // Rewrite clean URLs to .html files
          const cleanUrls = ['/about', '/pricing', '/blog', '/contact', '/login', '/register'];
          if (cleanUrls.includes(req.url)) {
            req.url = `${req.url}.html`;
          }

          // Handle blog detail routes (e.g., /blog/slug -> /blog-detail.html)
          if (req.url.startsWith('/blog/') && !req.url.includes('.')) {
            req.url = '/blog-detail.html';
          }

          next();
        });
      },
      closeBundle() {
        // After build, create directory structure for clean URLs
        const distDir = resolve(__dirname, 'dist');
        const pages = ['about', 'pricing', 'blog', 'contact', 'login', 'register'];

        pages.forEach(page => {
          const htmlFile = path.join(distDir, `${page}.html`);
          const pageDir = path.join(distDir, page);

          if (fs.existsSync(htmlFile)) {
            // Create directory for the page
            if (!fs.existsSync(pageDir)) {
              fs.mkdirSync(pageDir, { recursive: true });
            }

            // Copy HTML file as index.html in the directory
            const targetFile = path.join(pageDir, 'index.html');
            fs.copyFileSync(htmlFile, targetFile);
          }
        });

        // Create blog detail pages structure
        const blogDetailFile = path.join(distDir, 'blog-detail.html');
        if (fs.existsSync(blogDetailFile)) {
          // List of blog slugs - should match the slugs in blog-data.js
          const blogSlugs = [
            'understanding-new-whs-regulations-2024',
            'achieving-iso-45001-certification',
            '5-common-workplace-hazards',
            'building-proactive-safety-culture',
            'essential-guide-whs-documentation',
            'construction-site-safety-inspection-checklist',
            'officer-due-diligence-legal-obligations',
            'psychosocial-hazards-workplace',
            'iso-14001-environmental-management-explained'
          ];

          blogSlugs.forEach(slug => {
            const slugDir = path.join(distDir, 'blog', slug);
            if (!fs.existsSync(slugDir)) {
              fs.mkdirSync(slugDir, { recursive: true });
            }
            const targetFile = path.join(slugDir, 'index.html');
            fs.copyFileSync(blogDetailFile, targetFile);
          });
        }
      },
    },
  ],

  server: {
    port: 3000,
    open: true,
    hmr: {
      overlay: true,
    },
    watch: {
      usePolling: false,
    },
  },
});
