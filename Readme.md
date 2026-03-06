# HomeDine

HomeDine is a full-stack **ecommerce web application** focused on **quality kitchen and home products for every home**.  
It offers high-quality items for daily needs across categories like:

- Home Decor
- Utensils
- Bottles
- Cups
- Spoons

The platform includes browsing, product details, cart, checkout, authentication, profile management, contact, newsletter subscription, and order handling.

---

## Live Links

- **Frontend:** https://home-dine.vercel.app
- **Backend:** https://home-dine-backend.vercel.app
- **API Health:** https://home-dine-backend.vercel.app/api/health

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Context API (Auth, Cart)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Nodemailer

### Deployment
- Vercel (Frontend and Backend deployed separately)

---

## Monorepo Structure

```text
HomeDine/
├── frontend/
└── backend/
```

---

## Frontend Structure (`/frontend`)

```text
frontend/
├── .env
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vercel.json
├── vite.config.js
├── public/
│   └── logo.avif
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    ├── components/
    │   ├── common/
    │   │   ├── BackToTop.jsx
    │   │   └── ScrollToTop.jsx
    │   ├── home/
    │   │   ├── AccordionSection.jsx
    │   │   ├── CategoryGrid.jsx
    │   │   ├── Features.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Newsletter.jsx
    │   │   ├── ProductCard.jsx
    │   │   ├── ProductGrid.jsx
    │   │   └── Testimonials.jsx
    │   └── layout/
    │       ├── Footer.jsx
    │       └── Navbar.jsx
    ├── context/
    │   ├── AuthContext.jsx
    │   └── CartContext.jsx
    ├── data/
    │   └── mockData.js
    ├── pages/
    │   ├── Auth.jsx
    │   ├── Cart.jsx
    │   ├── Checkout.jsx
    │   ├── Contact.jsx
    │   ├── FAQ.jsx
    │   ├── ForgotPassword.jsx
    │   ├── Home.jsx
    │   ├── ProductDetails.jsx
    │   ├── Profile.jsx
    │   ├── ResetPassword.jsx
    │   └── Shop.jsx
    └── utils/
        ├── api.js
        └── imageMapper.js
```

---

## Backend Structure (`/backend`)

```text
backend/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js
├── vercel.json
├── config/
│   └── db.js
├── controllers/
│   ├── contactController.js
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── contactRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
└── utils/
    └── sendEmail.js
```

---

## Core Features

- Product listing and product detail pages
- Category-based browsing (home decor, utensils, bottles, cups, spoons)
- Cart management
- Checkout flow
- User authentication (register/login)
- Forgot/reset password flow
- Profile management
- Contact form and newsletter subscription
- Order creation and order history
- Responsive modern UI

---

## Environment Variables

## Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

### Frontend Production (Vercel)
```env
VITE_API_URL=https://home-dine-backend.vercel.app/api
```

## Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_pass
```

### Backend Production (Vercel)
```env
FRONTEND_URL=https://home-dine.vercel.app
NODE_ENV=production
```

---

## Local Setup

### 1) Clone
```bash
git clone https://github.com/Soumyosish/HomeDine.git
cd HomeDine
```

### 2) Install dependencies
```bash
cd frontend
npm install
cd ../backend
npm install
```

### 3) Run backend
```bash
cd backend
npm run dev
```

### 4) Run frontend
```bash
cd frontend
npm run dev
```

- Frontend: http://localhost:5173  
- Backend: http://localhost:5000

---

## Deployment Notes (Vercel)

### Frontend Project
- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Env:
  - `VITE_API_URL=https://home-dine-backend.vercel.app/api`

### Backend Project
- Root Directory: `backend`
- Env:
  - `MONGO_URI`
  - `FRONTEND_URL=https://home-dine.vercel.app`
  - `JWT_SECRET`
  - `JWT_EXPIRES_IN=7d`
  - `EMAIL_HOST`
  - `EMAIL_PORT`
  - `EMAIL_USER`
  - `EMAIL_PASS`
  - `NODE_ENV=production`

---

## Main API Endpoints

- `GET /api/health`
- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/users/forgot-password`
- `POST /api/users/reset-password/:token`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/orders`
- `GET /api/orders/myorders`
- `POST /api/contact`
- `POST /api/contact/subscribe`

---

## Scripts

### Frontend
```bash
npm run dev
npm run build
npm run preview
```

### Backend
```bash
npm run dev
npm start
```

---

## Troubleshooting

- **CORS issue:** Verify `FRONTEND_URL` in backend env matches deployed frontend URL.
- **API not reachable from frontend:** Ensure `VITE_API_URL` includes `/api`.
- **Auth token issues:** Verify `JWT_SECRET` and `JWT_EXPIRES_IN`.
- **Database errors:** Check `MONGO_URI`.
- **Mail errors:** Check `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS`.

---

## License

This project is for educational and portfolio use.

