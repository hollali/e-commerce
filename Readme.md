# 🛍️ Modern E-commerce Platform

A full-stack e-commerce solution built with modern web technologies, featuring secure authentication, multiple payment gateways, headless CMS, and a beautiful, responsive design.

<!--![Project Banner](https://via.placeholder.com/800x400/4F46E5/ffffff?text=E-commerce+Platform)-->

## ✨ Features

### 🔐 Authentication & User Management

- **Firebase Authentication** with Google, Email/Password sign-in
- Secure user sessions and profile management
- Protected routes and user-specific content

### 🛒 Shopping Experience

- Product catalog with search and filtering
- Shopping cart functionality
- Wishlist and favorites
- Product reviews and ratings
- Responsive design for all devices

### 💳 Payment Integration

- **Stripe** for international payments (Cards, Apple Pay, Google Pay)
- **Paystack** for African markets (Mobile Money, Bank transfers)
- Secure checkout process
- Order tracking and management

### 📝 Content Management

- **Sanity CMS** for product management and content
- Real-time content updates
- Rich media handling
- Structured content with custom schemas

### 🎨 Modern UI/UX

- Beautiful, accessible components with **shadcn/ui**
- Responsive design with **Tailwind CSS**
- Dark/Light mode support
- Smooth animations and interactions

## 🚀 Tech Stack

### Frontend & Framework

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### Styling & UI

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

### Backend & Authentication

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)

### Database

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Content Management

![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)

### Payments

![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Paystack](https://img.shields.io/badge/Paystack-011C2A?style=for-the-badge&logo=paystack&logoColor=white)

### Deployment & Hosting

![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account
- MongoDB Atlas account
- Stripe account
- Paystack account
- Sanity account

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/hollali/e-commerce.git
   cd e-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # MongoDB Configuration
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
   MONGODB_DB=your_database_name

   # Sanity Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_READ_TOKEN=your_read_token
   SANITY_API_WRITE_TOKEN=your_write_token

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...

   # Paystack Configuration
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
   PAYSTACK_SECRET_KEY=sk_test_...

   # App Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Setup MongoDB Atlas**

   ```bash
   # Install MongoDB driver
   npm install mongodb mongoose

   # Create your MongoDB Atlas cluster and get connection string
   # Add your IP address to the whitelist
   # Create database user with appropriate permissions
   ```

5. **Setup Sanity Studio**

   ```bash
   # Initialize Sanity in your project
   cd sanity
   npm install
   npx sanity init

   # Start Sanity Studio
   npm run dev
   ```

6. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── (auth)/            # Authentication pages
│   ├── (shop)/            # Shopping pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   ├── shop/             # Shopping components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   ├── mongodb.ts        # MongoDB configuration
│   ├── sanity.ts         # Sanity configuration
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Utility functions
├── models/               # MongoDB/Mongoose models
│   ├── User.ts           # User model
│   ├── Product.ts        # Product model
│   ├── Order.ts          # Order model
│   └── Category.ts       # Category model
├── sanity/               # Sanity CMS
│   ├── schemas/          # Content schemas
│   ├── lib/              # Sanity utilities
│   └── sanity.config.ts  # Sanity configuration
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── public/              # Static assets
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication with Google and Email providers
3. Create a Firestore database
4. Add your domain to authorized domains in Authentication settings

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier available)
3. Create database user with read/write permissions
4. Whitelist your IP address or use 0.0.0.0/0 for development
5. Get your connection string and add it to environment variables
6. Create your database and collections for products, users, orders, etc.

### Sanity Setup

1. Create a Sanity project at [Sanity Management](https://www.sanity.io/manage)
2. Configure your content schemas for products, categories, and other content
3. Set up API tokens for read/write access
4. Deploy your Sanity Studio for content management

### Stripe Setup

1. Create a Stripe account at [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your publishable and secret keys
3. Configure webhooks for order processing

### Paystack Setup

1. Create a Paystack account at [Paystack Dashboard](https://dashboard.paystack.com)
2. Get your public and secret keys
3. Configure webhook endpoints

## 🚀 Deployment

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy with these build settings:
   ```
   Build command: npm run build
   Publish directory: .next
   ```

### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

### Deploy Sanity Studio

```bash
cd sanity
npx sanity deploy
```

## 📱 Features Overview

### User Authentication

- [x] Google Sign-in
- [x] Email/Password Registration
- [x] Password Reset
- [x] Profile Management

### Shopping Features

- [x] Product Listing
- [x] Product Details
- [x] Shopping Cart
- [x] Wishlist
- [x] Search & Filters
- [x] Category Navigation

### Payment Processing

- [x] Stripe Integration
- [x] Paystack Integration
- [x] Order Management
- [x] Payment History

### Content Management

- [x] Sanity CMS Integration
- [x] Product Content Management
- [x] Real-time Content Updates
- [x] Media Asset Management

### Database Features

- [x] MongoDB Atlas Integration
- [x] User Data Management
- [x] Order History Storage
- [x] Product Inventory Management
- [x] Cart Persistence
- [x] Analytics Data Storage

### Admin Features

- [x] Sanity Studio for Content Management
- [ ] Order Management Dashboard
- [ ] User Management
- [ ] Analytics Dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- Email: support@dheztinykartel@gmail.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues](https://github.com/hollali/nadia/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Firebase](https://firebase.google.com/) for authentication and database
- [MongoDB](https://www.mongodb.com/) for flexible document database
- [MongoDB Atlas](https://cloud.mongodb.com/) for cloud database hosting
- [Sanity](https://www.sanity.io/) for headless CMS and content management
- [Stripe](https://stripe.com/) for payment processing
- [Paystack](https://paystack.com/) for African payment solutions

---

<div align="center">
  <p>Built with ❤️ using modern web technologies</p>
  <p>
    <a href="#top">Back to top</a>
  </p>
</div>
