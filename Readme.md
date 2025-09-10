# 🛍️ Modern E-commerce Platform

A full-stack e-commerce solution built with modern web technologies, featuring secure authentication, multiple payment gateways, and a beautiful, responsive design.

![Project Banner](https://via.placeholder.com/800x400/4F46E5/ffffff?text=E-commerce+Platform)

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

### 🎨 Modern UI/UX

- Beautiful, accessible components with **shadcn/ui**
- Responsive design with **Tailwind CSS**
- Dark/Light mode support
- Smooth animations and interactions

## 🚀 Tech Stack

| Category           | Technology                       |
| ------------------ | -------------------------------- |
| **Frontend**       | Next.js 14, React 18, TypeScript |
| **Styling**        | Tailwind CSS, shadcn/ui          |
| **Authentication** | Firebase Auth                    |
| **Database**       | Firebase Firestore               |
| **Payments**       | Stripe, Paystack                 |
| **Deployment**     | Netlify/Vercel                   |

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account
- Stripe account
- Paystack account

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/hollali/nadia.git
   cd nadia
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

4. **Run the development server**

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
│   ├── stripe.ts         # Stripe configuration
│   └── utils.ts          # Utility functions
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

### Admin Features

- [ ] Product Management
- [ ] Order Management
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

- Email: support@dheztinykartel@gmail.com / @hollali
- Documentation: [Link to docs]
- Issues: [GitHub Issues](https://github.com/hollali/nadia/issues)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Firebase](https://firebase.google.com/) for authentication and database
- [Stripe](https://stripe.com/) for payment processing
- [Paystack](https://paystack.com/) for African payment solutions

---

<div align="center">
  <p>Built with ❤️ using modern web technologies</p>
  <p>
    <a href="#top">Back to top</a>
  </p>
</div>
