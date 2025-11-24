# QuantumVector AI Solutions

## Overview

QuantumVector AI Solutions is a marketing website for an AI integration consulting firm. The site showcases AI-powered business solutions including chatbots, content generation, lead qualification, and predictive analytics. Built as a modern single-page application with multiple routes, it provides information about services, company values, pricing tiers, and contact options for prospective clients.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18.3.1 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured to run on port 5000
- React Router for client-side routing between pages (Home, About, Pricing, 404)

**UI Component System**
- shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- Class Variance Authority (CVA) for component variant management
- Custom design system defined in CSS variables using HSL color space for consistent theming

**Component Structure**
- Layout components: Header (fixed navigation with mobile menu) and Footer (company info, links, social media)
- Section components: HeroSection, ServicesSection, HowItWorksSection, ContactSection
- Page components: Index (home), About, Pricing, NotFound
- Comprehensive UI component library (40+ components) from shadcn/ui including forms, dialogs, cards, navigation, etc.

**State Management**
- React Query (TanStack Query v5) for server state management and caching
- React Hook Form with Zod resolvers for form validation
- React context for toast notifications and UI state

**Styling Approach**
- Dark-themed design with AI/tech aesthetic (deep blues, cyans, dark backgrounds)
- Custom CSS variables for colors, gradients, shadows, and transitions
- Responsive design with mobile-first breakpoints
- Custom animations defined in CSS (fade-in, gradient, float effects)

### External Dependencies

**UI & Styling**
- @radix-ui/* packages: Headless UI components for accessibility
- lucide-react: Icon library for consistent iconography
- tailwindcss: Utility-first CSS framework
- next-themes: Theme management (though currently using dark theme)
- embla-carousel-react: Carousel/slider functionality
- date-fns: Date formatting utilities
- react-day-picker: Calendar/date picker component

**Developer Tools**
- TypeScript with relaxed strictness settings for flexible development
- ESLint with React-specific rules for code quality
- Vite with React SWC for fast builds and hot module replacement
- lovable-tagger plugin for development mode component tagging

**Forms & Validation**
- react-hook-form: Performant form state management
- @hookform/resolvers: Form validation resolver integration
- zod: Schema validation (implied by resolver package)

**Routing & Queries**
- react-router-dom: Client-side routing
- @tanstack/react-query: Async state management and data fetching

**Build Configuration**
- Path aliases configured (@/* maps to ./src/*)
- Component imports organized through centralized barrel exports
- Development server allows external hosts for container/remote access
- Separate production and development build modes

### Design System

**Color Palette**
- Primary: HSL(199, 89%, 48%) - Bright cyan for CTAs and accents
- Background: HSL(222, 47%, 11%) - Deep blue-black base
- Card/Secondary: HSL(222, 47%, 15%) - Slightly lighter surfaces
- Custom gradients for hero sections and visual interest

**Typography & Spacing**
- System configured through Tailwind with custom container settings
- Responsive spacing scale with mobile-first approach
- Custom font weights and line heights for readability

**Interactive Elements**
- Consistent hover states and transitions across components
- Focus states with ring utilities for accessibility
- Disabled states with reduced opacity
- Animated elements using CSS animations and Tailwind utilities