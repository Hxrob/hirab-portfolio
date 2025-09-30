# Hirab Abdourazak - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Vite, and Tailwind CSS. Features smooth animations with Framer Motion and GSAP, interactive UI components, and a clean, professional design.

## 🚀 Features

- **Modern Tech Stack**: React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion + GSAP
- **Interactive Animations**: Framer Motion and GSAP with custom effects:
  - Typewriter text animation (TextType component)
  - Magnetic hover effects (Magnetic component)
  - Animated backgrounds and particles (AnimatedBackground)
  - Logo animation loops (LogoLoop component)
  - Dark veil overlay effects (DarkVeil component)
  - Smooth scroll animations
- **Responsive Design**: Mobile-first approach with seamless desktop scaling
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized for fast loading and smooth interactions
- **SEO Ready**: Meta tags, Open Graph, and Twitter Card support
- **Dark Theme**: Beautiful dark color scheme with purple accents

## 🎨 Design System

- **Background**: `#0B0B12` (Dark blue-black)
- **Surface**: `#101022` (Card backgrounds)
- **Primary**: `#7C3AED` (Purple accent)
- **Primary Hover**: `#8B5CF6` (Lighter purple)
- **Text**: `#E6E6F0` (Main text)
- **Text Muted**: `#A3A3B2` (Secondary text)
- **Typography**: Inter font family

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   │   ├── AnimatedBackground.tsx  # Particle/animated backgrounds
│   │   ├── Button.tsx             # Interactive button component
│   │   ├── Card.tsx               # Card layout component
│   │   ├── DarkVeil.tsx           # Dark overlay effects
│   │   ├── LogoLoop.tsx           # Logo animation loop
│   │   ├── Magnetic.tsx           # Magnetic hover effects
│   │   ├── SectionHeading.tsx     # Section title component
│   │   └── TextType.tsx           # Typewriter text animation
│   ├── Contact.tsx      # Contact form & info
│   ├── Footer.tsx       # Site footer
│   ├── Hero.tsx         # Hero/intro section
│   ├── Navbar.tsx       # Navigation component
│   ├── Projects.tsx     # Project portfolio
│   ├── Section.tsx      # Layout wrapper
│   └── Skills.tsx       # Skills showcase
├── assets/              # Static assets
│   ├── images/          # Project images
│   │   ├── hotspot.png
│   │   ├── onepointfive.jpeg
│   │   └── pigletprep.jpeg
│   ├── hero-image.JPEG  # Hero section image
│   ├── Hirab-Logo-White.png       # Logo files
│   ├── Hirab-Name-Logo-White.png
│   └── react.svg
├── css/                 # Additional CSS files
│   ├── DarkVeil.css     # Dark veil component styles
│   ├── LogoLoop.css     # Logo animation styles
│   └── TextType.css     # Typewriter animation styles
├── data/
│   └── site.ts          # All site content (EDIT THIS!)
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app component
├── main.tsx            # App entry point
├── index.css           # Global styles & Tailwind
└── vite-env.d.ts       # Vite type definitions
```

## 🛠️ Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hirab-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ✏️ Customization

### 1. Edit Content

All website content is centralized in `src/data/site.ts`. Update this file to customize:

- Personal information
- Skills and technologies
- Project details
- Contact information
- Social media links

### 2. Contact Form Setup (Optional)

The contact form supports two modes:

**Option A: Formspree (Recommended)**
1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Create a `.env` file: `cp .env.example .env`
4. Add your Formspree ID: `VITE_FORMSPREE_ID=your_form_id`

**Option B: Mailto Fallback**
If no Formspree ID is provided, the form will use mailto: functionality.

### 3. Styling

The design system is built with Tailwind CSS. Key customization points:

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Typography**: Modify font settings in `src/index.css`
- **Components**: Update component styles in individual component files
- **Animations**: Adjust Framer Motion settings in components

### 4. Adding Sections

To add new sections:

1. Create a new component in `src/components/`
2. Import and add to `src/App.tsx`
3. Update navigation in `src/components/Navbar.tsx`
4. Add content to `src/data/site.ts`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables (if using Formspree)
4. Deploy!

### Other Deployment Options

- **Netlify**: Drag and drop the `dist/` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Traditional Hosting**: Upload `dist/` contents to your web server

## 🔧 Technical Details

### Key Dependencies

- **React 19**: Latest React with improved performance
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **GSAP**: High-performance animations
- **Lucide React**: Beautiful icon library
- **React Icons**: Additional icon sets
- **OGL**: WebGL library for advanced graphics

### Performance Optimizations

- **Code Splitting**: Automatic chunking with Vite
- **Image Optimization**: Responsive images and lazy loading
- **Animation Performance**: Hardware acceleration and reduced motion support
- **Bundle Size**: Tree-shaking and minification

### Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Reduced Motion**: Respects user motion preferences

### Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Fallbacks**: Graceful degradation for older browsers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and make it your own! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📞 Support

If you have questions or need help customizing your portfolio:

- Check the documentation above
- Review the code comments
- Open an issue on GitHub
- Contact: [your.email@example.com](mailto:your.email@example.com)

---

**Built with ❤️ using React, TypeScript, and modern web technologies.**
