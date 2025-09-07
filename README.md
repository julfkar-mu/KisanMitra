# कृषि सहायक (Krishi Sahayak) - Crop Disease Identification System

A professional, scalable ReactJS web application tailored for Hindi-speaking farmers, focused on crop disease identification, remedies, and crop management guidance.

## 🌾 Features

### Core Features
- **Multilingual Support**: Full Hindi language support with English toggle
- **Mobile-First Design**: Optimized for farmers using mobile devices
- **Crop Disease Identification**: Comprehensive database of crops and their diseases
- **Treatment Guidance**: Step-by-step remedies in Hindi
- **Image Galleries**: High-quality disease identification images
- **Feedback System**: Farmers can rate and comment on treatments
- **Mobile Authentication**: OTP-based login using Firebase

### Technical Features
- **Modern React Stack**: TypeScript, TanStack Query, Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Firebase Phone Authentication
- **Admin Panel**: Content management for crops and diseases
- **Responsive UI**: Shadcn/ui components with accessibility
- **Performance Optimized**: Lazy loading for rural internet conditions

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- PostgreSQL database
- Firebase project for authentication

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd krishi-sahayak
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/krishi_sahayak
PGHOST=localhost
PGPORT=5432
PGUSER=your_username
PGPASSWORD=your_password
PGDATABASE=krishi_sahayak

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Database Setup

#### PostgreSQL Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

#### Create Database

```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database and user
CREATE DATABASE krishi_sahayak;
CREATE USER your_username WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE krishi_sahayak TO your_username;
\q
```

#### Push Database Schema

```bash
npm run db:push
```

### 5. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Phone" provider
   - Add your domain to authorized domains
4. Get your config keys:
   - Go to Project Settings > General
   - Find "Your apps" section
   - Copy `apiKey`, `projectId`, and `appId`
   - Add these to your `.env` file

### 6. Seed Sample Data (Optional)

The application includes sample crops and diseases. To add them:

```bash
npm install pg drizzle-orm
# This will populate the database with sample Hindi crops and diseases
npx tsx server/seed.ts
```

Or manually through the admin panel at `/admin`

### 7. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📱 Usage

### For Farmers
1. **Browse Crops**: View different crop categories (Rabi, Kharif, Cash Crops)
2. **Disease Information**: Click on crops to see common diseases
3. **Treatment Details**: Get step-by-step treatment in Hindi
4. **Submit Feedback**: Rate and comment on treatments
5. **Mobile Login**: Use phone number + OTP for personalized features

### For Administrators
1. Visit `/admin` to access the admin panel
2. **Crop Management**: Add, edit, delete crop information
3. **Disease Management**: Manage disease data and treatments
4. **Feedback Review**: Monitor farmer feedback and ratings

## 🏗️ Project Structure

```
krishi-sahayak/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # Shadcn/ui components
│   │   │   ├── AuthModal.tsx
│   │   │   ├── CropCard.tsx
│   │   │   ├── FeedbackForm.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ImageGallery.tsx
│   │   ├── contexts/       # React contexts
│   │   │   ├── AuthContext.tsx
│   │   │   └── LanguageContext.tsx
│   │   ├── lib/           # Utilities and configurations
│   │   │   ├── firebase.ts
│   │   │   ├── i18n.ts
│   │   │   └── queryClient.ts
│   │   ├── pages/         # Route components
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── CropDetail.tsx
│   │   │   ├── DiseaseDetail.tsx
│   │   │   └── Home.tsx
│   │   └── App.tsx
├── server/                # Backend Express application
│   ├── db.ts             # Database connection
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Database operations
├── shared/               # Shared types and schemas
│   └── schema.ts         # Drizzle database schema
├── package.json
└── README.md
```

## 🛠️ Development

### Available Scripts

```bash
# Start development server (both frontend and backend)
npm run dev

# Build for production
npm run build

# Push database schema changes
npm run db:push

# Generate database migrations
npm run db:generate

# Type checking
npm run type-check

# Lint code
npm run lint
```

### Adding New Crops/Diseases

1. **Through Admin Panel**: Visit `/admin` and use the management interface
2. **Direct Database**: Use the PostgreSQL interface or run SQL commands
3. **Programmatically**: Use the storage interface in `server/storage.ts`

### Internationalization

All text strings are managed through `client/src/lib/i18n.ts`. To add new translations:

1. Add the key-value pair in both `hi` (Hindi) and `en` (English) sections
2. Use the `useTranslation` hook: `const { t } = useTranslation()`
3. Access translations: `t('your.key')`

### Database Schema

The application uses these main tables:
- `users`: User authentication and profiles
- `crops`: Crop information (Hindi/English names, care instructions)
- `diseases`: Disease data with symptoms, causes, treatments
- `feedback`: User ratings and comments

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables for Production

Ensure all environment variables are set in your production environment:
- Database connection string
- Firebase configuration keys
- Any additional production-specific settings

### Deployment Options

1. **Replit**: The project is optimized for Replit deployment
2. **Vercel/Netlify**: For frontend with separate backend deployment
3. **Railway/Heroku**: For full-stack deployment
4. **VPS/Docker**: Custom server deployment

## 🌐 Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify PostgreSQL is running
   - Check DATABASE_URL format
   - Ensure database exists and user has permissions

2. **Firebase Authentication Error**
   - Verify Firebase config keys
   - Check if Phone Authentication is enabled
   - Ensure domain is in authorized domains list

3. **Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check TypeScript errors: `npm run type-check`
   - Verify all dependencies are installed

4. **Mobile Authentication Issues**
   - Enable reCAPTCHA for phone auth in Firebase Console
   - Add your domain to Firebase authorized domains
   - Test with a valid Indian mobile number

### Performance Tips

1. **Rural Internet Optimization**
   - Images are lazy-loaded
   - Minimal JavaScript bundles
   - Compressed assets
   - Offline-first approach for critical features

2. **Mobile Performance**
   - Touch-friendly UI elements (44px minimum)
   - Optimized for low-end Android devices
   - Progressive Web App features

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review the troubleshooting section

## 🙏 Acknowledgments

- **Target Users**: Hindi-speaking farmers across India
- **Design Inspiration**: Rural-friendly, accessible interfaces
- **Technology Stack**: Modern web technologies optimized for farming communities
- **Cultural Considerations**: Hindi-first approach with proper Devanagari script support

---

**Made with ❤️ for Indian farmers**