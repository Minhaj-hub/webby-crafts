# Smart Tools - Technology Stack

## Programming Languages and Frameworks

### Core Technologies
- **TypeScript**: Primary language for type-safe development
- **React 18.3.1**: Frontend framework with modern hooks and concurrent features
- **Vite 5.4.19**: Fast build tool and development server
- **Node.js**: Runtime environment for development tools

### UI and Styling
- **Tailwind CSS 3.4.17**: Utility-first CSS framework
- **shadcn/ui**: Modern React component library built on Radix UI
- **Radix UI**: Headless UI primitives for accessibility
- **Lucide React**: Icon library with 400+ icons
- **CSS Variables**: Dynamic theming support

## Key Dependencies

### State Management and Data Fetching
- **@tanstack/react-query 5.83.0**: Server state management and caching
- **React Hook Form 7.61.1**: Form state management with validation
- **Zod 3.25.76**: Schema validation library

### Routing and Navigation
- **React Router DOM 6.30.1**: Client-side routing solution
- **React Router**: Declarative routing for React applications

### File Processing Libraries
- **jsPDF 3.0.3**: PDF generation and manipulation
- **pdfjs-dist 5.4.296**: PDF parsing and rendering
- **Canvas API**: Image processing and compression

### Firebase Integration
- **Firebase 12.5.0**: Backend-as-a-Service platform
  - **Analytics**: User behavior tracking
  - **Hosting**: Static site deployment
  - **Performance Monitoring**: App performance insights

### UI Enhancement Libraries
- **Sonner 1.7.4**: Toast notification system
- **Embla Carousel**: Touch-friendly carousel component
- **React Resizable Panels**: Resizable layout panels
- **Vaul 0.9.9**: Drawer component for mobile

## Development Tools and Configuration

### Build and Development
- **Vite**: Lightning-fast build tool with HMR
- **TypeScript 5.8.3**: Static type checking
- **ESLint 9.32.0**: Code linting and formatting
- **PostCSS 8.5.6**: CSS processing and optimization

### Code Quality Tools
- **@typescript-eslint**: TypeScript-specific linting rules
- **eslint-plugin-react-hooks**: React hooks linting
- **eslint-plugin-react-refresh**: React Fast Refresh support
- **Prettier**: Code formatting (configured via ESLint)

### Package Management
- **npm**: Primary package manager
- **Bun**: Alternative package manager (lockfile present)
- **package-lock.json**: Dependency version locking

## Development Commands

### Core Scripts
```bash
npm run dev          # Start development server with HMR
npm run build        # Production build with optimization
npm run build:dev    # Development build for testing
npm run lint         # Run ESLint code analysis
npm run preview      # Preview production build locally
```

### Development Workflow
1. **Local Development**: `npm run dev` starts Vite dev server on localhost
2. **Code Quality**: ESLint runs on save with auto-fixing
3. **Type Checking**: TypeScript compilation in watch mode
4. **Hot Reload**: Instant updates without page refresh

## Build and Deployment

### Build Configuration
- **Vite Config**: Optimized for React with SWC compiler
- **TypeScript**: Strict mode enabled with path aliases
- **Tailwind**: JIT compilation for optimal CSS size
- **Asset Optimization**: Image compression and code splitting

### Deployment Targets
- **Firebase Hosting**: Primary deployment platform
- **Static Site Generation**: Pre-built HTML/CSS/JS assets
- **CDN Distribution**: Global content delivery
- **Environment Variables**: Configuration via .env files

## Browser Compatibility
- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **ES2020+ Features**: Native support required
- **Module Support**: ES6 modules and dynamic imports
- **Web APIs**: Canvas, File API, Blob, URL for file processing