# Smart Tools - Project Structure

## Directory Organization

### Root Level Configuration
- **package.json**: Project dependencies and build scripts
- **vite.config.ts**: Vite bundler configuration
- **tailwind.config.ts**: Tailwind CSS customization
- **tsconfig.json**: TypeScript compiler settings
- **firebase.json**: Firebase hosting configuration
- **components.json**: shadcn/ui component configuration

### Source Code Structure (`src/`)

#### Core Application (`src/`)
- **App.tsx**: Main application component with routing and providers
- **main.tsx**: Application entry point and React DOM rendering
- **index.css**: Global styles and Tailwind imports

#### Components (`src/components/`)
**Feature Components**:
- **ImageCompressor.tsx**: Image compression functionality
- **ImageConverter.tsx**: Format conversion tool
- **ImageToPdf.tsx**: Image to PDF conversion
- **PdfToImage.tsx**: PDF to image extraction
- **FileUploadZone.tsx**: Drag & drop file upload interface

**Layout Components**:
- **Navbar.tsx**: Site navigation header
- **Hero.tsx**: Landing page hero section
- **Footer.tsx**: Site footer with links
- **ContentSection.tsx**: Additional content areas

**UI Components (`src/components/ui/`)**:
- Complete shadcn/ui component library (40+ components)
- **sidebar.tsx**: Navigation sidebar component
- **button.tsx, card.tsx, dialog.tsx**: Core UI primitives
- **toast.tsx, toaster.tsx**: Notification system

**Utility Components**:
- **AdBanner.tsx, FeatureAds.tsx, InFeedAd.tsx**: Advertisement integration
- **LoadingSpinner.tsx**: Loading state indicators
- **ProcessingIndicator.tsx**: File processing feedback
- **SkipToContent.tsx**: Accessibility navigation
- **SEOHead.tsx**: Meta tags and SEO optimization

#### Pages (`src/pages/`)
- **Index.tsx**: Main landing page with all tools
- **AboutUs.tsx, Contact.tsx**: Informational pages
- **TermsOfService.tsx, Disclaimer.tsx**: Legal pages
- **Blog.tsx, Tutorials.tsx**: Content pages
- **NotFound.tsx**: 404 error page

#### Hooks (`src/hooks/`)
- **useAnalytics.ts**: Firebase Analytics integration
- **use-mobile.tsx**: Mobile device detection
- **use-toast.ts**: Toast notification management

#### Utilities (`src/lib/`)
- **utils.ts**: Common utility functions and class name merging
- **firebase.ts**: Firebase configuration and initialization

### Public Assets (`public/`)
- **favicon.ico**: Site favicon
- **convert-kitty.png**: Brand mascot image
- **sitemap.xml**: SEO sitemap
- **robots.txt**: Search engine directives
- **ads.txt**: Advertisement verification

## Architectural Patterns

### Component Architecture
- **Atomic Design**: UI components built from small, reusable primitives
- **Feature-based Organization**: Tools grouped by functionality
- **Composition Pattern**: Complex components built from simpler ones

### State Management
- **React Query**: Server state and caching management
- **Local State**: Component-level state with React hooks
- **Context Providers**: Global state for theming and notifications

### Routing Structure
- **React Router**: Client-side routing with BrowserRouter
- **Route Protection**: 404 handling with catch-all route
- **Analytics Tracking**: Automatic page view tracking

### Styling Architecture
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component system
- **CSS Variables**: Theme customization support
- **Responsive Design**: Mobile-first approach

## Core Component Relationships

### Main Application Flow
1. **App.tsx** → Provides global context and routing
2. **Index.tsx** → Main page orchestrating all tools
3. **Feature Components** → Individual tool implementations
4. **UI Components** → Shared interface elements
5. **Hooks** → Business logic and external integrations