<div align="center">

<img src="https://img.shields.io/badge/🛒%20SHOPNEST-Smart%20Grocery%20Delivery-16A34A?style=for-the-badge&labelColor=14532D" alt="ShopNest — Smart Grocery Delivery" />

# 🛒 ShopNest

### **Smart Grocery Shopping & Delivery Platform**

Shop smarter. Track faster. Deliver better.

A full-stack grocery delivery platform featuring AI-powered assistance, interactive maps, real-time delivery tracking, and online payments.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socket.io&logoColor=white)

</div>

---

## 🟢 About the Project

**ShopNest** is a full-stack grocery shopping and delivery platform designed to simplify online shopping and delivery management.

Customers can browse groceries, add products to their cart, place orders, select delivery locations, and follow delivery progress. Administrators can manage products and orders, while delivery partners can access assigned deliveries and share their locations.

The project combines modern web technologies with AI integration, interactive maps, and real-time communication.

## ✨ Key Features

| Feature | Description |
|---|---|
| 🛍️ **Grocery Shopping** | Browse products, manage cart items, and place orders. |
| 🤖 **AI Assistant** | Gemini-powered conversational assistance. |
| 🗺️ **Interactive Maps** | Map-based location selection using Leaflet. |
| 🚚 **Live Tracking** | Real-time delivery location updates using Socket.IO. |
| 👨‍💼 **Admin Dashboard** | Product and order management. |
| 🔐 **Authentication** | Credentials-based authentication and Google sign-in. |
| 💳 **Payments** | Stripe payment integration. |
| 📧 **Email & OTP** | Email notifications and delivery verification. |
| 💬 **Live Messaging** | Real-time communication through Socket.IO. |

---

## 🎨 Tech Stack

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)

### Backend & Database

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socket.io&logoColor=white)

### AI, Maps & Integrations

![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=googlegemini&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

### Supporting Tools

![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22A7F0?style=for-the-badge)

| Technology | Role in ShopNest |
|---|---|
| Next.js & React | Application pages, routing, and UI components |
| TypeScript | Type-safe application development |
| Tailwind CSS | Responsive styling |
| Node.js & Express.js | Server-side runtime and socket server |
| MongoDB & Mongoose | Data storage, schemas, and database operations |
| Socket.IO | Real-time location updates and messaging |
| Redux Toolkit | Shared frontend state |
| Google Gemini API | AI-powered conversational assistance |
| Leaflet & React Leaflet | Interactive maps and location visualization |
| NextAuth.js & Google OAuth | Authentication workflows |
| bcrypt | Password hashing |
| Stripe | Payment integration |
| Nodemailer | Email notifications and OTP delivery |
| Cloudinary | Media storage |
| Axios | HTTP requests |

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    A["Customer"] --> D["ShopNest Frontend"]
    B["Administrator"] --> D
    C["Delivery Partner"] --> D

    D --> E["Next.js API Routes"]
    D <--> F["Socket.IO Server"]

    E --> G[("MongoDB")]
    E --> H["Gemini AI"]
    E --> I["Stripe"]
    E --> J["Email Service"]

    F --> K["Live Location Updates"]
    F --> L["Real-Time Messaging"]

    style A fill:#dcfce7,stroke:#16a34a,color:#14532d
    style B fill:#dbeafe,stroke:#2563eb,color:#1e3a8a
    style C fill:#ffedd5,stroke:#ea580c,color:#9a3412
    style H fill:#ede9fe,stroke:#7c3aed,color:#4c1d95
    style G fill:#dcfce7,stroke:#16a34a,color:#14532d
```

---

## 🤖 AI, Maps & Real-Time Tracking

### 🤖 AI Integration

The Google Gemini API powers the AI assistant, providing a conversational interface for grocery-related queries and assistance.

### 🗺️ Interactive Maps

Leaflet and React Leaflet support map-based location selection and delivery location visualization.

### 🚚 Real-Time Delivery

Socket.IO enables real-time communication between application components, supporting location updates and messaging.

> Real-time tracking depends on the socket server being available and correctly configured. Location accuracy depends on the device and location permissions.

---

## 📁 Project Structure

```text
groceryFolder/
├── shopnest/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   └── api/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── models/
│   │   └── hooks/
│   └── package.json
├── socketServer/
│   ├── index.js
│   └── package.json
└── README.md
```

*This is a high-level overview. Use the actual repository structure if folder names differ.*

---

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB database
- Git
- API credentials for the external services you use

### 1. Clone the Repository

```bash
git clone https://github.com/samarthpandey158/groceryFolder.git
cd groceryFolder
```

### 2. Install Frontend Dependencies

```bash
cd shopnest
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file inside `shopnest`. Add the variables required by your source code.

```env
MONGODB_URL=your_mongodb_connection_string

AUTH_SECRET=your_auth_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_api_key

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

EMAIL=your_email
PASS=your_email_app_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NEXT_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_SERVER=http://localhost:5000
```

**Important:**
- Use the exact environment variable names referenced by your source code.
- Configure the socket server's environment variables separately if required.
- Some variables are only needed when using their associated integrations.
- Never commit real API keys, passwords, or database credentials to GitHub.

### 4. Start the Frontend

From the `shopnest` directory:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### 5. Start the Socket Server

Open a separate terminal from the repository root:

```bash
cd socketServer
npm install
npm run dev
```

Use the start command defined in `socketServer/package.json` if its scripts differ. Ensure the frontend socket URL points to the running socket server.

---

## 🔒 Security Considerations

- Store credentials in environment variables.
- Never expose private API keys through `NEXT_PUBLIC_` variables.
- Validate requests and authorize access on the server.
- Hash passwords before storing them.
- Protect administrator and delivery-partner routes with authorization checks.
- Verify payment webhook signatures.
- Keep `.env` and `.env.local` out of version control.

## 💡 Skills Demonstrated

- Full-stack web application development.
- API development and database integration.
- Authentication and authorization.
- Generative AI API integration.
- Geolocation and interactive maps.
- Real-time communication using Socket.IO.
- Payment and email service integration.
- Role-based application workflows.
- Deployment and environment configuration.

---

## 👨‍💻 Author

**Samarth Pandey**  
Computer Science and Engineering Student

---

## 🚀 Live Demo

Explore the deployed application:

<div align="center">

<a href="https://shopnest-india.vercel.app">
  <img src="https://img.shields.io/badge/OPEN%20LIVE%20DEMO-16A34A?style=for-the-badge&logo=vercel&logoColor=white" alt="Open ShopNest Live Demo" />
</a>

<br/>

**[ShopNest — Live Application](https://shopnest-brown.vercel.app)**

</div>

*AI, payment, email, and real-time tracking features depend on the configuration and availability of their respective services.*

<div align="center">

**ShopNest — Built with modern web technologies.**

</div>
