# CampusCollab

CampusCollab is a peer-to-peer skill-sharing platform designed for university students. It enables students to share their expertise, book tutoring sessions, and learn from their peers in a collaborative environment.

## Features

- 🔐 User Authentication with Firebase
- 👥 User Profiles (Student/Tutor roles)
- 📚 Skill Listings and Management
- 📅 Booking System for Sessions
- ⭐ Review and Rating System
- ❤️ Favorite Skills Feature
- 🔍 Advanced Search and Filtering

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Firebase Authentication
- Axios for API calls

### Backend
- Node.js with TypeScript
- Express.js framework
- MySQL database
- Sequelize ORM
- JWT for API authentication

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/darshan-regmi/CampusCollab.git
cd CampusCollab
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd server
npm install
```

4. Set up environment variables
- Copy `.env.example` to `.env` in both root and server directories
- Update the variables with your configuration

5. Set up the database
```bash
cd server
npm run db:create
npm run db:migrate
```

6. Start the development servers

Frontend:
```bash
# In the root directory
npm run dev
```

Backend:
```bash
# In the server directory
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Project Structure

```
CampusCollab/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── contexts/         # React contexts
│   ├── hooks/           # Custom hooks
│   ├── types/           # TypeScript types
│   └── config/          # Configuration files
├── server/               # Backend source code
│   ├── src/
│   │   ├── config/      # Server configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── models/      # Sequelize models
│   │   ├── routes/      # API routes
│   │   ├── validators/  # Request validators
│   │   └── middleware/  # Custom middleware
│   └── migrations/      # Database migrations
└── public/              # Static assets
```

## API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when running the development server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

### 1. Backend Integration
- [x] Set up Node.js/Express backend
- [x] Set up MySQL database with Sequelize ORM
- [x] Implement core API endpoints:
  - [x] Skills CRUD operations
  - [x] Bookings management
  - [x] Reviews system
  - [x] User profiles
  - [x] Favorites
- [ ] Add API documentation with Swagger/OpenAPI

### 2. Firebase Integration
- [ ] Configure Firebase Authentication
  - [ ] Add actual Firebase configuration
  - [ ] Implement email verification
  - [ ] Add password reset functionality
- [ ] Set up Firebase security rules
- [ ] Implement Firebase Cloud Messaging for notifications

### 3. User Features
- [x] Implement user roles (student/tutor)
- [ ] Complete profile management
  - [ ] Skills offered (for tutors)
  - [ ] Past bookings view
  - [ ] Reviews dashboard
  - [ ] Favorites management
- [ ] Add profile image upload

### 4. Booking System
- [x] Basic booking functionality
- [ ] Enhanced features:
  - [ ] Calendar/availability management
  - [ ] Booking confirmation emails
  - [ ] Real-time booking status updates
  - [ ] Payment integration (Stripe/PayPal)

### 5. Search and Discovery
- [ ] Implement advanced search
  - [ ] Full-text search
  - [ ] Price range filter
  - [ ] Availability filter
  - [ ] Rating filter
  - [ ] Location/mode filter (Online/Offline)
- [ ] Add search result sorting options

### 6. Communication System
- [ ] Implement messaging
  - [ ] Real-time chat
  - [ ] Message notifications
- [ ] Add notification system
  - [ ] Booking notifications
  - [ ] Review notifications
  - [ ] System notifications

### 7. Performance & Security
- [ ] Add rate limiting
- [ ] Implement caching
- [ ] Add input validation
- [ ] Set up monitoring
- [ ] Implement error tracking

## Contact

Darshan Regmi - [GitHub](https://github.com/darshan-regmi)
