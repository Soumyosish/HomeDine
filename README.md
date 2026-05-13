# HomeDine

HomeDine is a full-stack **ecommerce web application** focused on quality kitchen and home products for every home.  
Shop high-quality items for daily needs across categories like:
- Home Decor
- Utensils
- Bottles
- Cups
- Spoons

The platform includes browsing, product details, cart, checkout, authentication, profile management, contact, newsletter, and order handling.

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

### Infrastructure/DevOps
- **GitHub Actions:** CI/CD, Docker build & push, EC2 deployment
- **Vercel:** Production hosting (frontend/backend)
- **AWS EC2:** Production Docker host (CI/CD target)
- **Docker:** Containerized frontend and backend
- **Jenkins:** For local CI/CD builds and Docker orchestration

---

## Monorepo Structure

```text
HomeDine/
├── frontend/
├── backend/
├── jenkins/
├── docker-compose.yml
├── docker-compose.jenkins.yml
├── Jenkinsfile
├── .github/workflows/
│      └── deploy.yml
```

---

## Main Features

- Product listing and detail pages
- Category-based browsing (home decor, utensils, bottles, cups, spoons)
- Cart & checkout
- User registration/login; profile management
- Forgot/reset password flow
- Order creation and history
- Newsletter and contact forms
- Responsive modern UI

---

## Local Development

### 1) Clone and Setup
```bash
git clone https://github.com/Soumyosish/HomeDine.git
cd HomeDine
```

### 2) Install dependencies
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3) Run locally
- Start MongoDB (local or Docker)
- In one terminal:  
  ```bash
  cd backend
  npm run dev
  ```
- In another terminal:  
  ```bash
  cd frontend
  npm run dev
  ```

- Frontend: [http://localhost:5173](http://localhost:5173)  
- Backend: [http://localhost:5000](http://localhost:5000)

---

## Docker Usage

### Local with Compose

Spin up frontend, backend, and MongoDB with **docker-compose**:
```bash
docker-compose up --build
```

This uses:
- `docker-compose.yml` for MongoDB, backend and frontend (prod build)

### Jenkins-Driven Local Build

Use the Jenkins pipeline for local automated builds:
```bash
docker-compose -f docker-compose.jenkins.yml up --build
```
> Jenkins (runs in a container) will manage and monitor Docker builds and deploys.

---

## CI/CD: GitHub Actions & AWS EC2

- `.github/workflows/deploy.yml` automates:
  - Docker builds for frontend & backend
  - Pushes images to Docker Hub
  - Deploys via SSH to an AWS EC2 instance
  - Runs/updates containers using `docker-compose`

### Environment/Secrets
- `DOCKER_USERNAME`, `DOCKER_PASSWORD` for Docker Hub push
- `EC2_IP`, `EC2_SSH_KEY` for remote AWS access

#### EC2 Deployment Steps (Automated via GitHub Actions):
1. Build/push Docker images
2. SSH into EC2 and pull new images
3. Use `docker-compose` to relaunch containers

---

## Production Deployment (Vercel)

- Frontend and backend are deployable as separate Vercel projects.
- Provide necessary env variables in Vercel dashboard or `.env` files.

---

## Jenkins Pipeline (For Local CI/CD)

See [`Jenkinsfile`](https://github.com/Soumyosish/HomeDine/blob/master/Jenkinsfile) for stages:
- Checkout, Docker build, (optionally push, deploy)

## Environment Variables

### Frontend
- `VITE_API_URL` (local: `http://localhost:5000/api`, prod: `https://home-dine-backend.vercel.app/api`)

### Backend
- `MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL`, mail config, etc.

---

## Troubleshooting

- CORS: Check `FRONTEND_URL` in backend `.env`
- Mongo/DB: Validate `MONGO_URI`
- JWT/config: Ensure secrets and expires
- Mail: Check SMTP credentials

---

## License

Developed by Soumyosish
