# InstZom

Full-stack MERN food app with two roles:
- `User`: browse reels, place orders, view own orders/account
- `Food Partner`: manage dishes, edit profile, view public profile

The project uses:
- Backend: Node.js, Express, MongoDB, JWT (cookie auth), Multer, ImageKit
- Frontend: React + Vite + React Router + Axios

## Folder Structure

```text
instzom/
  backand/    # Express API + MongoDB models/controllers/routes
  frontand/   # React app
```

## Features

### User Side
- User register/login/logout
- Reel feed (home)
- `Order Now` from feed (user-only)
- My Orders page (`/user/orders`)
- Account page (`/user/account`)
- Role-based footer tabs (`Home`, `Orders`, `Account`)

### Food Partner Side
- Partner register/login/logout
- Redirect to food manager after auth
- Create, edit, delete dishes (video upload)
- Partner profile page
- Edit profile (name, address, customers served, profile image)
- Role-based footer tabs (`Home`, `Manage`, `Profile`)

### Shared
- Public partner profile via `/profile/:id`
- Cookie-based auth with middleware guards
- Route-level role protection in frontend

## Prerequisites

- Node.js 18+
- MongoDB connection URI
- ImageKit account (for video/profile image upload)

## Environment Variables (Backend)

Create `backand/.env`:

```env
PORT=3000
mongoURI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
IMAGE_KIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

## Installation

### 1. Backend

```bash
cd backand
npm install
node server.js
```

Backend runs on `http://localhost:3000`.

### 2. Frontend

```bash
cd frontand
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

## API Overview

Base URL: `http://localhost:3000/api`

### Auth Routes

- `POST /auth/user/register`
- `POST /auth/user/login`
- `GET /auth/user/logout`

- `POST /auth/foodpartner/register`
- `POST /auth/foodpartner/login`
- `GET /auth/foodpartner/logout`
- `GET /auth/foodpartner/:id` (public partner profile)
- `GET /auth/me` (partner self profile, auth required)
- `PUT /auth/foodpartner/profile` (partner update, multipart `profileImage`, auth required)

### Food Routes

- `GET /food` (all foods)
- `GET /food/user/:id` (foods by partner)
- `POST /food` (partner create, multipart `video`, auth required)
- `GET /food/my` (partner own foods, auth required)
- `PUT /food/:id` (partner update own food, optional multipart `video`, auth required)
- `DELETE /food/:id` (partner delete own food, auth required)

### Order Routes (User Only)

- `POST /orders` body:
  - `foodId` (required)
  - `quantity` (optional, default 1)
- `GET /orders/my`

## Frontend Routes

### Public
- `/` Home reel
- `/profile/:id` Public partner profile
- `/user/login`, `/user/register`
- `/foodpartner/login`, `/foodpartner/register`

### User Protected
- `/user/orders`
- `/user/account`

### Food Partner Protected
- `/create-food`
- `/foodpartner/profile`
- `/foodpartner/profile/edit`

## Auth & Role Behavior

- JWT token is stored in cookie `token`
- Frontend stores role snapshots:
  - `localStorage.userProfile`
  - `localStorage.foodPartnerProfile`
- On login/register:
  - user login clears partner snapshot
  - partner login clears user snapshot
- Footer and route guards use these snapshots for role-specific UX

## Notes

- CORS is configured for `http://localhost:5173` with credentials enabled.
- Uploads use ImageKit via server-side API keys.
- Backend folder names contain original typos (`backand`, `midellware`, `foodpatner`) and are intentionally preserved to avoid breaking imports.

## Recommended Next Improvements

- Add quantity selector in UI before placing order
- Add partner order management (accept/reject/update status)
- Add shared auth refresh/state hook instead of direct localStorage checks
- Add validation library (Joi/Zod) and centralized error handler
- Add tests (API + component tests)
