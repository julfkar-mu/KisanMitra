# Overview

This is a professional crop disease identification system built specifically for Hindi-speaking farmers. The application provides a comprehensive platform for identifying crop diseases, offering treatment remedies, and sharing crop management guidance. It features a modern React frontend with Express.js backend, PostgreSQL database through Drizzle ORM, and Firebase authentication for mobile number-based login with OTP verification.

The system supports full multilingual functionality with Hindi as the default language and English as an alternative, ensuring accessibility for the target demographic. The application emphasizes mobile-first design with responsive UI components optimized for farmers using mobile devices in field conditions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom color scheme optimized for agricultural themes
- **Internationalization**: react-i18next for Hindi/English language support with cultural localization

## Backend Architecture
- **Runtime**: Node.js with Express.js REST API framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful endpoints following conventional patterns (/api/crops, /api/diseases, /api/feedback)
- **Development**: Hot reload with Vite middleware integration for seamless development experience
- **Build Process**: ESBuild for production bundling with platform-specific optimizations

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless hosting for scalability
- **Schema Design**: Relational model with entities for users, crops, diseases, and feedback
- **Data Structure**: JSONB fields for multilingual content (symptoms, treatments, prevention)
- **Image Storage**: URL-based references to external image hosting services

## Authentication and Authorization
- **Provider**: Firebase Authentication for reliability and security
- **Method**: Mobile number + OTP verification optimized for Indian farmers
- **Session Management**: Firebase tokens with automatic refresh handling
- **User Roles**: Basic user and admin role distinction for content management

## External Dependencies
- **Database Hosting**: Neon PostgreSQL for serverless database infrastructure
- **Authentication Service**: Firebase Auth for OTP-based mobile authentication
- **Font Services**: Google Fonts for Noto Sans Devanagari (Hindi) and Inter (English)
- **Image CDN**: Unsplash for high-quality crop and disease imagery
- **Development Tools**: Replit environment with specialized plugins for runtime error handling
- **UI Components**: Extensive Radix UI ecosystem for accessible component primitives
- **Build Tools**: Vite with React plugin and TypeScript support for modern development workflow