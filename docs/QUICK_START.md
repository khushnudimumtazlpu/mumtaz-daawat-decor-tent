# 🚀 Quick Start Guide - TentHouse Project

## Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- npm v6+ (comes with Node.js)
- MongoDB Atlas account ([Create Free](https://www.mongodb.com/cloud/atlas))
- Cloudinary account ([Sign Up](https://cloudinary.com/)) - Optional for Phase 1
- Git ([Download](https://git-scm.com/))

## Clone or Setup

```bash
# Navigate to the project
cd c:\Users\ASUS\OneDrive\Desktop\Tent
```

## Step 1: Setup Backend Server

```bash
# Navigate to server
cd server

# Install dependencies (already done in Phase 1)
npm install

# Create .env file (copy from .env.example)
# Update MONGODB_URI with your MongoDB Atlas connection string

# Start the server
npm run dev
# Server runs on http://localhost:5000
```

### Backend .env Template
```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tenthouse
JWT_SECRET=your_secret_key_change_in_production
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Step 2: Setup Frontend Application

```bash
# Navigate to client (in a new terminal)
cd client

# Install dependencies (already done in Phase 1)
npm install

# Create .env file (copy from .env.example)
# Verify VITE_API_BASE_URL points to backend

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### Frontend .env Template
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Step 3: Verify Setup

### Check Backend
```bash
# In browser, visit:
http://localhost:5000/api/health

# You should see:
# {"success": true, "message": "Server is running", "timestamp": "..."}
```

### Check Frontend
```bash
# In browser, visit:
http://localhost:5173

# You should see the TentHouse homepage with:
# - Navbar with navigation
# - Hero section
# - Features section
# - CTA section
# - Footer with links
```

## 📂 Project Structure Quick Reference

```
tent-house/
├── client/                 # React Frontend (Port 5173)
│   ├── src/
│   │   ├── components/    # Navbar, Footer, reusable components
│   │   ├── pages/         # Home, Services, Gallery, About, Contact, Bookings
│   │   ├── layouts/       # MainLayout wrapper
│   │   ├── services/      # axiosInstance for API calls
│   │   └── App.jsx        # Main routing
│   ├── package.json
│   └── .env
│
├── server/                # Express Backend (Port 5000)
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── models/        # User model
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Authentication & error handling
│   │   └── server.js      # Main server
│   ├── package.json
│   └── .env
│
├── docs/                  # Documentation
├── README.md              # Full documentation
└── .gitignore             # Git ignore file
```

## 🔌 API Endpoints Ready

| Method | Endpoint | Status | Description |
|--------|----------|--------|-------------|
| GET | `/api/health` | ✅ Active | Server health check |
| POST | `/api/auth/register` | 🔄 Phase 2 | User registration |
| POST | `/api/auth/login` | 🔄 Phase 2 | User login |
| GET | `/api/bookings` | 🔄 Phase 2 | List bookings |
| POST | `/api/bookings` | 🔄 Phase 2 | Create booking |

## 🎨 Frontend Pages Available

| Page | URL | Status | Features |
|------|-----|--------|----------|
| Home | `/` | ✅ Live | Hero, features, CTA |
| Services | `/services` | ✅ Live | Service cards |
| Gallery | `/gallery` | ✅ Live | Image grid |
| About | `/about` | ✅ Live | Story, stats, team |
| Contact | `/contact` | ✅ Live | Contact form, info |
| Bookings | `/bookings` | ✅ Live | Packages, booking form |

## 🛠 Development Commands

### Frontend
```bash
cd client

npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linter (oxlint)
```

### Backend
```bash
cd server

npm run dev          # Start with auto-reload (nodemon)
npm start            # Start production server
npm test             # Run tests (coming in Phase 2)
```

## 🔐 MongoDB Atlas Setup

1. Create an account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project
3. Create a new cluster (free tier available)
4. Create a database user
5. Get connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/tenthouse`)
6. Add to server/.env as `MONGODB_URI`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
# Or change PORT in server/.env

# Kill process on port 5173 (frontend)
# Or let Vite choose a different port
```

### MongoDB Connection Error
```
Check:
✓ MongoDB URI is correct
✓ Network access is allowed in MongoDB Atlas
✓ Database user credentials are correct
✓ Cluster is active
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Tailwind CSS Not Working
```bash
cd client
npm install -D @tailwindcss/postcss
npm run dev
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [Vite Docs](https://vitejs.dev/)

## 💾 Git Commands

```bash
# Initialize git (if not done)
git init

# Stage all changes
git add .

# Commit Phase 1
git commit -m "feat: initialize MERN project structure"

# View status
git status
```

## ✅ Verification Checklist

- [ ] Node.js installed (check: `node --version`)
- [ ] npm installed (check: `npm --version`)
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] MongoDB Atlas connection working
- [ ] Backend server starts without errors
- [ ] Frontend dev server starts without errors
- [ ] Can access http://localhost:5173 in browser
- [ ] Can access http://localhost:5000/api/health in browser
- [ ] All navigation links work
- [ ] Responsive design works on mobile

## 🎯 Next Phase

Once Phase 1 is verified working:
1. Await Phase 2 prompt
2. Implement authentication system
3. Create admin dashboard
4. Build booking management system

---

**Happy Coding! 🚀**

For support or questions, refer to the main README.md
