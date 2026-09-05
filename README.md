# 🏕️ TentHouse - Tent House Management & Booking Platform

A production-ready MERN Stack (MongoDB, Express, React, Node.js) web application for managing and booking tent houses for events, weddings, camping, and adventures.

## ✨ Features

- **Responsive Public Website**: Modern, mobile-first design
- **Advanced Booking System**: Easy-to-use booking management
- **Admin Dashboard**: Complete event and booking management
- **Image Management**: Cloudinary integration for image uploads
- **Authentication**: Secure JWT-based authentication
- **Real-time Features**: Interactive booking calendar
- **Payment Integration**: Razorpay payment gateway support
- **WhatsApp Integration**: Direct WhatsApp contact capability
- **Testimonials & Reviews**: Customer feedback showcase
- **Analytics Dashboard**: Track bookings and revenue

## 🛠 Technology Stack

### Frontend
- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: Context API
- **Form Handling**: React Hook Form
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Carousel**: Swiper

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Image Storage**: Cloudinary
- **Security**: Helmet
- **CORS**: Cross-Origin Resource Sharing

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary

## 📁 Project Structure

```
tent-house/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── layouts/       # Layout wrappers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # Context API state
│   │   ├── services/      # API services
│   │   ├── assets/        # Images and icons
│   │   ├── utils/         # Helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
│
├── server/                # Node.js Express backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   ├── services/      # Database services
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Helper functions
│   │   └── server.js      # Main server file
│   ├── package.json
│   └── .env
│
├── docs/                  # Documentation
├── README.md
├── .gitignore
└── .env.example
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd tent-house
```

2. **Set up Frontend**
```bash
cd client
npm install
cp .env.example .env
# Update .env with your API base URL
npm run dev
```

3. **Set up Backend**
```bash
cd server
npm install
cp .env.example .env
# Update .env with MongoDB URI and other credentials
npm run dev
```

### Environment Variables

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (.env)**
```
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 🎨 Design Theme

- **Primary Color**: Gold (#D4AF37)
- **Secondary Color**: Dark Navy (#0F172A)
- **Background**: White/Light Gray
- **Font**: Segoe UI, Roboto, sans-serif

## 📝 Development Rules

- Clean architecture principles
- Reusable components
- Modular code structure
- Production-quality standards
- No dead code
- Proper error handling
- Security best practices
- Comprehensive logging

## 🔒 Security Features

- Helmet.js for secure HTTP headers
- CORS configuration
- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Environment variable protection
- Rate limiting ready

## 📦 Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start production server
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support, email info@tenthouse.com or contact us via WhatsApp.

## 🎯 Roadmap

- [ ] Advanced booking calendar
- [ ] Payment gateway integration
- [ ] User reviews and ratings
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---

Built with ❤️ for event management
