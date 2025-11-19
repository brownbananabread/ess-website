# Quantam - HTML + Tailwind CSS + Webpack Project

This is a clean HTML project using Tailwind CSS and Webpack. The site is identical to the original Pug-based project, but follows proper HTML conventions.

## Project Structure

```
html-project/
├── src/
│   ├── assets/           # All static assets (images, fonts, etc.)
│   │   ├── favicon.png
│   │   ├── images/
│   │   ├── quantam-assets/
│   │   └── robots.txt
│   ├── css/
│   │   └── main.css      # Tailwind CSS imports
│   ├── js/
│   │   └── main.js       # Main JavaScript entry point
│   ├── index.html
│   ├── about.html
│   ├── pricing.html
│   ├── blog.html
│   ├── contact.html
│   ├── login.html
│   └── register.html
├── dist/                 # Built files (generated)
├── webpack.config.js     # Webpack configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
└── package.json
```

## Key Differences from Original Project

### ✅ Proper HTML Structure
- **HTML files are in `src/`** (not in a `public/` directory)
- **No Pug templates** - pure HTML files
- **Assets are in `src/assets/`** - properly organized
- **Built files go to `dist/`** - clean separation

### ✅ Modern Build System
- Uses **Webpack** for bundling
- Automatic CSS and JS injection into HTML
- Hot Module Replacement (HMR) for development
- Production-ready builds with minification

### ✅ Same Design & Functionality
- **100% identical** visual appearance
- All pages: index, about, pricing, blog, contact, login, register
- Same Tailwind CSS configuration
- Alpine.js for interactive components

## Installation

```bash
npm install
```

## Development

Start the development server with hot reload:

```bash
npm run dev
```

This will:
- Start Webpack Dev Server on `http://localhost:3000`
- Open your default browser automatically
- Watch for file changes and reload automatically
- Enable Hot Module Replacement

## Build for Production

Create an optimized production build:

```bash
npm run build
```

This will:
- Generate minified HTML, CSS, and JS files in `dist/`
- Optimize and compress all assets
- Create hashed filenames for cache busting

## Watch Mode

Build and watch for changes without dev server:

```bash
npm run watch
```

## Features

### Webpack Features
- **Multiple HTML pages** - Automatically processes all HTML files
- **CSS extraction** - Extracts Tailwind CSS to separate file
- **Asset copying** - Copies all assets to dist folder
- **Hot reload** - Instant updates during development
- **Minification** - Optimized production builds

### Tailwind CSS
- Custom color palette (teal, lime, orange, etc.)
- Custom spacing scale
- Custom font configuration (Figtree)
- Custom breakpoints
- Full responsive design

### Pages Included
1. **index.html** - Homepage with hero section
2. **about.html** - About page
3. **pricing.html** - Pricing plans
4. **blog.html** - Blog listing
5. **contact.html** - Contact form
6. **login.html** - Login page
7. **register.html** - Registration page

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Autoprefixer ensures CSS compatibility
- ES6+ JavaScript (transpilation can be added if needed)

## Technologies

- **HTML5** - Semantic markup
- **Tailwind CSS 3** - Utility-first CSS framework
- **Webpack 5** - Module bundler
- **Alpine.js** - Lightweight JavaScript framework
- **PostCSS** - CSS transformations
- **Autoprefixer** - CSS vendor prefixing

## Assets

All assets are located in `src/assets/`:
- `favicon.png` - Site favicon
- `images/` - Logo and brand images
- `quantam-assets/` - All page-specific images and graphics
- `robots.txt` - SEO robots file

## License

This project template was created by [Pixel Rocket](https://www.pixelrocket.store)
