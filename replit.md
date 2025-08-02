# Valeria Kuka - AI/ML Content Strategist Portfolio

## Overview

This is a professional portfolio website for Valeria Kuka, an AI/ML Content Strategist and Technical Writer. Built with React and TypeScript, featuring a full-stack architecture with Express.js backend. The site showcases her content strategy work, technical writing portfolio, and provides contact functionality for potential clients. It uses a pixel art aesthetic with a custom design system while maintaining professional credibility.

## User Preferences

Preferred communication style: Simple, everyday language.
Focus: AI/ML content strategy, technical writing, community building
Target audience: Potential clients, AI/ML community, recruiters

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Custom component library built on Radix UI primitives with shadcn/ui patterns
- **Styling**: Tailwind CSS with custom pixel art theme variables and CSS Grid/Flexbox layouts
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints and static file serving
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Data Layer**: In-memory storage implementation with interface for easy database migration
- **API Design**: RESTful endpoints for projects, blog posts, and contact management
- **Development**: Hot module replacement with Vite integration for seamless full-stack development

### Data Storage Solutions
- **ORM**: Drizzle with PostgreSQL dialect for schema management and migrations
- **Schema**: Shared TypeScript schemas using Drizzle and Zod for validation
- **Current Storage**: In-memory storage class implementing the storage interface
- **Migration Ready**: Drizzle configuration set up for easy PostgreSQL integration

### Authentication and Authorization
- **Current State**: No authentication implemented
- **Session Management**: Express session setup present with connect-pg-simple for PostgreSQL sessions
- **Future Ready**: Infrastructure prepared for user authentication and role-based access

### Design System
- **Theme**: Custom pixel art aesthetic with defined color variables (pixel-pink, pixel-teal, etc.)
- **Components**: Comprehensive UI component library with consistent styling
- **Typography**: Custom font loading and responsive typography scale
- **Shadows**: Custom "pixel" shadow effects for maintaining the retro aesthetic
- **Responsive**: Mobile-first design with breakpoint-based responsive layouts

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing for single-page application navigation
- **drizzle-orm**: Type-safe ORM for database operations
- **express**: Node.js web framework for API and static file serving

### UI and Styling Dependencies
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: For creating consistent component variants
- **clsx**: Utility for constructing className strings conditionally

### Development and Build Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production builds

### Database and Validation
- **@neondatabase/serverless**: PostgreSQL client for serverless environments
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **zod**: Schema validation library for runtime type checking

### Form and Data Handling
- **react-hook-form**: Performant forms with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **date-fns**: Date utility library for formatting and manipulation

### Additional Utilities
- **lucide-react**: Icon library with consistent styling
- **cmdk**: Command palette component for enhanced UX
- **embla-carousel-react**: Carousel component for project showcases