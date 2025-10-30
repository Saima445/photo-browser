# Photo Browser

**Photo Browser** is a modern web application that fetches and displays photo data from the public JSONPlaceholder API.
It provides a realistic demonstration of building a scalable Single Page Application (SPA) with real-world patterns such as data fetching, routing, state management, and UI composition.

This project demonstrates the core principles of a modern **Single Page Application (SPA)** built with **React**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **shadcn/ui**.

### Live Demo
[Visit the Photo Browser App](https://saima445.github.io/photo-browser/)

## Tech Stack

- **Vite** – fast build tool and dev server
- **React** – component-based UI rendering
- **TypeScript** – type-safe, scalable development
- **Tailwind CSS v4** – utility-first styling; once you start, it’s hard to go back
- **shadcn/ui** – accessible, theme-ready UI components
- **TanStack Query** – data fetching and caching made simple
- **React Router** – smooth client-side navigation for SPA behavior

## Features

- Dynamic data fetching
Uses the JSONPlaceholder API to load photos, albums, and users dynamically via TanStack Query.
- Infinite scroll
Implements lazy loading of photo thumbnails using IntersectionObserver for smooth performance without pagination UI.
- Photo filtering by user
Displays only photos from a specific uploader using album-user relations.
- Photo details page
Shows a full-size photo with detailed metadata (title, photographer, resolution).
Integrates optional extra data from the Picsum Photos API. Includes user contact methods (email, phone, website) and also company details via popover.
- Album details page
Displays all photos within an album, plus album and creator info.
- Local likes (favorites)
Liking photos is handled through localStorage to persist user preferences locally.
- Profile page
Displays all liked photos and allows unliking directly from the gallery.
- Responsive design
Mobile-first layout with adaptive navigation and flexible column-based galleries.
- Dark mode support
Integrated theme toggle with Tailwind’s dark mode configuration.
- Error and loading states
Graceful fallback UI for data fetch failures or slow network responses.
- Re-usable UI components
Shared components such as buttons, selects, and layout utilities built with shadcn/ui.

## Data Sources

- Photos, Albums, and Users:
https://jsonplaceholder.typicode.com/
- Fallback photo URLs:
https://picsum.photos/

## Scalability & Future Improvements

This project was designed with scalability and maintainability in mind.
- Modular architecture:
Each feature (albums, photos, profile) has its own folder structure with reusable components, hooks, and utilities — making it easy to extend the app with new pages or modules without breaking existing logic.
- Data layer via TanStack Query:
Using a centralized QueryClient ensures efficient caching, deduplication, and background updates. The data layer can easily be extended to connect with a real backend API or authentication service.
- Code-splitting & lazy loading:
Route-based code splitting ensures fast initial load times even as the project grows. Additional routes can be added with minimal overhead.
- State management:
Most state is handled by React Query and local component states. For larger-scale features (e.g., user sessions, global notifications), a lightweight global store like Jotai/Zustand or Redux Toolkit could be integrated seamlessly.
- API expansion ready:
The app can scale to work with larger datasets or private APIs by adding pagination, infinite query fetching, and optimistic updates for mutations such as editing or uploading photos.
-	Authentication & access control:
The architecture allows easy implementation of protected routes using custom hooks (useAuth) and middleware-like wrappers to control access to certain pages (e.g., user-only albums or admin tools).
-	Testing strategy:
Designed to support unit, integration, and E2E testing (Vitest + React Testing Library + Cypress), ensuring reliability as the project scales.
-	Cloud-ready deployment:
Currently deployed to GitHub Pages, but the build can be easily adapted for deployment on Vercel, or any container-based environment.


### How to Run the App

1. Clone the repository - git clone <repo-url>

2. Install dependencies - npm install

3. Start the development server - npm run dev

### Deployment

The project is built with Vite and deployed to GitHub Pages using a static export.

Live demo: https://saima445.github.io/photo-browser/
