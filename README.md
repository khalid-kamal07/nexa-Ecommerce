# Nexa Commerce — MERN E-commerce

A production-minded MERN e-commerce starter implementing the requirements from the supplied task:

- Product catalog
- Product search, category filtering and price sorting
- Product details
- Shopping cart with persistent local storage
- User registration/login
- JWT authentication
- User profile
- Order checkout and order history
- Admin product CRUD
- Admin order management
- Responsive modern UI
- Vercel-ready deployment architecture
- MongoDB Atlas support
- Reusable React context/components
- Express/Mongoose REST API

## Stack

Frontend: React + Vite + React Router  
Backend: Node.js + Express + Mongoose  
Auth: JWT + bcryptjs  
Database: MongoDB / MongoDB Atlas  
Deployment: Vercel

## Local setup

1. Install Node.js 20+.
2. Create a MongoDB database (MongoDB Atlas is recommended).
3. Copy `.env.example` to `.env`.
4. Fill in `MONGO_URI` and `JWT_SECRET`.
5. Install dependencies:

```bash
npm install
npm --prefix frontend install
```

6. Seed the database:

```bash
npm run seed
```

The seed creates an admin account:

- Email: `admin@nexacommerce.dev`
- Password: `Admin@12345`

Change the password before production use.

7. Start both apps:

```bash
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:5000/api

## Vercel

The repository is structured so the Vercel project can use the repository root.

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` (your Vercel URL)
4. Deploy.

`api/index.js` exposes the Express API as a Vercel serverless function. `frontend/dist` is the Vite build output.

For local development, `server/server.js` runs the same Express app on port 5000.

## API

Public:
- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`

Auth:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

User:
- `GET /api/orders/my`
- `POST /api/orders`

Admin:
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/orders`
- `PUT /api/orders/:id/status`

## Notes

This implementation intentionally does not pretend to process real card payments. Checkout records an order as cash-on-delivery, which is fully functional without requiring a third-party payment account. Stripe can be added later without changing the catalog/cart/order architecture.
