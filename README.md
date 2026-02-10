# HackRore Test Suite

A comprehensive device diagnostics and benchmarking platform built for production environments.

## 🚀 Live Demo

**URL**: https://hackrore.vercel.app/

## 📋 Overview

HackRore Test Suite is a professional-grade web application that provides comprehensive device diagnostics, hardware benchmarking, and system testing capabilities. Built with modern web technologies and deployed with enterprise-grade configurations.

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **UI Framework**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: Zustand + React Query
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 🏗️ Production Architecture

This project is structured as a production-grade Vite + React SPA:

### Performance Optimizations
- **Manual Code Splitting**: Vendor, UI, and utility chunks for optimal loading
- **Asset Caching**: Long-term caching for static assets
- **Terser Minification**: Production-grade JavaScript optimization
- **Bundle Analysis**: Optimized chunk sizes under 500KB

### Stability & Error Handling
- **Global Error Boundaries**: Graceful error recovery and user feedback
- **Defensive Programming**: Null checks and validation throughout
- **React Query Configuration**: Retry limits and stale-time optimization
- **Type Safety**: Full TypeScript coverage

### Security & Deployment
- **SPA Routing**: Vercel fallback configuration for client-side routing
- **Security Headers**: XSS protection, content type options, frame protection
- **Environment Configuration**: Proper build and deployment settings
- **Asset Optimization**: Compressed and cached static resources

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/HackRore/hack-test-hub.git

# Navigate to project
cd hack-test-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🚀 Deployment

This project is configured for automatic deployment on Vercel:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Framework**: Vite
- **Node Version**: 18.x

### Environment Variables

Create `.env.local` for development:
```env
VITE_API_URL=http://localhost:8080
```

## 🧪 Testing Features

The Test Suite includes comprehensive diagnostics for:

- **Permissions & Input**: Camera, microphone, speaker testing
- **Controls & Display**: Keyboard, mouse, display calibration
- **Performance**: CPU, GPU, memory, storage benchmarks
- **Connectivity**: Network speed, MIDI I/O, system information

## 📊 Architecture Decisions

### Why Vite over Create React App?
- Faster development builds with HMR
- Optimized production bundles
- Modern ES module support
- Better plugin ecosystem

### Why Manual Code Splitting?
- Predictable chunk sizes
- Better caching strategies
- Reduced main bundle size
- Improved loading performance

### Why Error Boundaries?
- Prevents app crashes from affecting UX
- Provides graceful error recovery
- Better debugging information
- Professional error handling

## 🎯 Production Readiness

This application is built and deployed as a real-world diagnostic dashboard, not a demo or tutorial project. It includes:

- ✅ Production-grade error handling
- ✅ Optimized bundle sizes
- ✅ Security best practices
- ✅ Responsive design
- ✅ Performance monitoring ready
- ✅ Scalable architecture

## 📄 License

© 2024 Ravindra Ahire. All rights reserved.

---

**Built with ❤️ for the developer community**
