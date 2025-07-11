# 🏨 Hotel Listing App

This project is a modern, responsive hotel listing web app built with React + TypeScript. It features an infinite scroll room list, expandable variants, a media carousel (images/videos), and smooth UI/UX enhancements including skeleton loaders and debounced loading strategies.

# 🚀 **Live Demo:**  

## 👉 [skj-hotel-room-listing.netlify.app/](https://skj-hotel-room-listing.netlify.app/)


# 🔥 Features
🔍 Hotel Details View with rich media (images/videos)

🪄 Infinite Scroll Room List (pagination-based lazy loading)

💡 Expandable Room Variants

📹 Media Carousel (videos and images)

🧊 Skeleton Loaders for better perceived performance

🎛 Tabs for switching media types

💬 Optimized with custom throttle hooks and memoized components

# Screenshot -

<img width="1898" height="986" alt="Image" src="https://github.com/user-attachments/assets/2726a604-6aeb-4f88-8e35-86af1b7002de" />

# Mobile Responsive -

<img width="428" height="934" alt="Image" src="https://github.com/user-attachments/assets/caee20d4-3321-4264-9eac-d03729566362" />


# 📁 Project Structure -
### src/

├── components/         # All reusable components like RoomCard, Carousel, Tabs, etc.

├── hooks/              # Custom React hooks (e.g., useInfiniteScroll, useThrottle)

├── services/           # Mock API services

├── types/              # Global TypeScript types

├── mock_data.json      # Local mock data for hotel and rooms

├── App.tsx             # App entry

└── index.tsx           # React DOM mount`


## 🛠 Setup Instructions
Clone the repository:

`
git clone https://github.com/your-username/hotel-listing-app.git
`

`
cd hotel-listing-app
`

Install dependencies:

`
npm install
`

### or

`
yarn install
`

Start the development server:

`
npm run dev
`

### or

`
yarn dev
`


## 🧠 Architecture Notes
### 🧩 Components
HotelDetails: Displays main hotel info, description, amenities, and carousel.

RoomList: Lists all rooms with infinite scroll.

RoomCard: Each room with expandable variants.

VariantCard: Individual room option with pricing/media info.

Tabs & Carousel: Media viewer utilities.

Skeleton components: Shimmer placeholders for loading state.

### 🧵 State Management
Local useState + useEffect used for fetching & rendering.

useRef and useCallback for scroll locking and memoization.

# ⚙️ Performance Optimizations
#### ✅ Custom Throttle Hook (useThrottle)
Prevents excessive calls during scroll detection.

Keeps app responsive during heavy DOM events.

#### ✅ Debounced Intersection Observer
Used in useInfiniteScroll to wait for DOM stabilization before triggering load.

Smooths infinite scroll loading.

#### ✅ Skeleton Loaders (HotelDetailsSkeleton, VariantSkeleton)
Shimmer UI shown during media and data fetch to improve UX.

Helps maintain perceived speed.

#### ✅ useMemo + React.memo
Prevents unnecessary re-renders for derived data and heavy components.

#### ✅ Lazy DOM triggers (rootMargin)
Loads content before user hits the bottom to improve perceived performance.

<br/>
