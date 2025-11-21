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
        articles: resolve(__dirname, 'src/articles.html'),
        'articles-detail': resolve(__dirname, 'src/articles-detail.html'),
        contact: resolve(__dirname, 'src/contact.html'),
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
          const cleanUrls = ['/about', '/articles', '/contact'];
          if (cleanUrls.includes(req.url)) {
            req.url = `${req.url}.html`;
          }

          // Handle articles detail routes (e.g., /articles/slug -> /articles-detail.html)
          if (req.url.startsWith('/articles/') && !req.url.includes('.')) {
            req.url = '/articles-detail.html';
          }

          next();
        });
      },
      closeBundle() {
        // After build, create directory structure for clean URLs
        const distDir = resolve(__dirname, 'dist');
        const pages = ['about', 'articles', 'contact'];

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

        // Create articles detail pages structure
        const articlesDetailFile = path.join(distDir, 'articles-detail.html');
        if (fs.existsSync(articlesDetailFile)) {
          // List of articles slugs - should match the slugs in articles-data.js
          const articlesSlugs = [
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

          articlesSlugs.forEach(slug => {
            const slugDir = path.join(distDir, 'articles', slug);
            if (!fs.existsSync(slugDir)) {
              fs.mkdirSync(slugDir, { recursive: true });
            }
            const targetFile = path.join(slugDir, 'index.html');
            fs.copyFileSync(articlesDetailFile, targetFile);
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
