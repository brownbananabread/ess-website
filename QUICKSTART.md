# Quick Start Guide

## Get Started in 3 Steps

### 1. Navigate to the project
```bash
cd /Users/jacobbrown/Desktop/website/html-project
```

### 2. Start development server
```bash
npm run dev
```

This will:
- Build the project
- Start the dev server at `http://localhost:3000`
- Open your browser automatically
- Watch for changes and auto-reload

### 3. Start coding!
- Edit HTML files in `src/`
- Edit styles in `src/css/main.css` (or add Tailwind classes to HTML)
- Add JavaScript in `src/js/main.js`
- Changes will appear instantly in your browser!

## Common Commands

### Development
```bash
npm run dev        # Start dev server with hot reload
```

### Build for Production
```bash
npm run build      # Create optimized production build
```

The production build will be in the `dist/` folder, ready to deploy!

### Watch Mode (without dev server)
```bash
npm run watch      # Build and watch for changes
```

## Project Overview

```
html-project/
├── src/                  # Your source files
│   ├── index.html        # Homepage
│   ├── about.html        # About page
│   ├── pricing.html      # Pricing page
│   ├── blog.html         # Blog page
│   ├── contact.html      # Contact page
│   ├── login.html        # Login page
│   ├── register.html     # Registration page
│   ├── css/
│   │   └── main.css      # Tailwind CSS
│   ├── js/
│   │   └── main.js       # JavaScript
│   └── assets/           # Images, fonts, etc.
└── dist/                 # Built files (auto-generated)
```

## Making Changes

### Adding Tailwind Classes
Just add classes directly to your HTML:
```html
<div class="bg-teal-900 text-white p-6 rounded-lg">
  Hello World!
</div>
```

### Adding Custom CSS
Edit `src/css/main.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom CSS here */
.my-custom-class {
  color: #BEF264;
}
```

### Adding JavaScript
Edit `src/js/main.js`:
```javascript
import '../css/main.css';

// Your JavaScript here
console.log('Hello from Webpack!');
```

### Adding New Pages
1. Create new HTML file in `src/` (e.g., `services.html`)
2. Add it to `webpack.config.js`:
```javascript
new HtmlWebpackPlugin({
  template: './src/services.html',
  filename: 'services.html',
  minify: isProduction,
}),
```
3. Restart the dev server

## Deployment

After running `npm run build`, deploy the `dist/` folder to:
- **Netlify**: Drag & drop the `dist/` folder
- **Vercel**: `vercel dist`
- **GitHub Pages**: Push `dist/` to gh-pages branch
- **Any static host**: Upload contents of `dist/`

## Troubleshooting

### Port 3000 already in use?
Edit `webpack.config.js` and change the port:
```javascript
devServer: {
  port: 3001, // Change this
  // ...
}
```

### Assets not loading?
Make sure asset paths start with `assets/`:
```html
<img src="assets/images/logo.svg" alt="Logo" />
```

### CSS not applying?
1. Check that Tailwind classes are spelled correctly
2. Make sure `main.css` is imported in `main.js`
3. Clear your browser cache

## Next Steps

1. **Read the full README.md** for detailed documentation
2. **Check COMPARISON.md** to see differences from the original
3. **Customize Tailwind** by editing `tailwind.config.js`
4. **Add more features** - Webpack makes it easy!

Happy coding! 🚀
