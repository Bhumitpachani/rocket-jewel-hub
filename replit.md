# Rocket Diamond - B2B Jewelry Platform

## Overview

Rocket Diamond is a B2B jewelry marketplace platform that connects diamond wholesalers with retail jewelers. The platform features a multi-tenant architecture with three main user interfaces:

1. **Main B2B Storefront** - Public-facing website for Rocket Diamond showcasing products and company information
2. **Super Admin Dashboard** - Administrative portal for managing products, jeweler shops, and platform settings
3. **Jeweler Storefronts** - Individual white-label stores for each jeweler with their own branding and product catalogs

The platform supports product management with multi-image galleries, price markup capabilities for jewelers, theme customization, and light/dark mode toggling.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** as the build tool and development server (configured on port 5000)
- **React Router** for client-side routing with nested layouts

### State Management
- **Redux Toolkit** for global application state
- Three main slices: `appSlice` (products, shops, dashboard stats), `authSlice` (authentication), `themeSlice` (theme preferences)
- Currently uses mock data with simulated async loading; designed for Firebase integration

### UI Component Library
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind CSS** for styling with custom design tokens
- **Framer Motion** for animations and transitions
- **Lucide React** for icons

### Styling System
- CSS variables for theming (HSL color format)
- Custom font configuration: Playfair Display (display) and Inter (sans-serif)
- Glass-card effects and gradient text utilities defined in index.css
- Light/dark mode support via class-based toggling

### Routing Structure
```
/ - Client-facing pages (HomePage, AboutPage, ProductsPage, ContactPage)
/login - Authentication page
/admin/* - Super admin dashboard (products, shops, theme settings)
/shop/:shopId/* - Individual jeweler storefronts
/jeweler-admin/:shopId/* - Jeweler admin dashboards
```

### Data Models
- **Product** - Base product with multi-image support, pricing, categories
- **JewelerShop** - Jeweler business with customizable settings
- **JewelerProduct** - Products associated with specific jewelers
- **ProductVisibility** - Controls which products appear in which jeweler stores
- **JewelerSettings** - Store customization including branding, pricing markup, and theme colors

### Authentication
- Simple username/password authentication stored in Redux
- Role-based access: `super_admin` and `jeweler_admin`
- Hardcoded demo credentials: admin/123 for super admin

### Testing
- **Vitest** configured with jsdom environment
- Test setup includes matchMedia polyfill for responsive testing
- Tests located in `src/test/` directory

## External Dependencies

### Firebase (Planned Integration)
- Firebase SDK installed and initialized in `src/lib/firebase.ts`
- Configured for Firestore (database) and Storage (file uploads)
- Requires environment variables: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`
- Currently using mock data; ready for migration to Firestore

### Data Fetching
- **TanStack Query** (React Query) configured for server state management
- QueryClient initialized in App.tsx

### Third-Party UI Libraries
- **embla-carousel-react** for product image carousels
- **react-day-picker** for calendar/date selection
- **vaul** for drawer components
- **react-resizable-panels** for resizable layouts
- **cmdk** for command palette functionality
- **sonner** for toast notifications (in addition to shadcn toast)