# Antiguo - Designer Fashion Buy & Rent Platform

Welcome to **Antiguo**! This platform allows users to buy or rent designer clothes in India, making high-fashion accessible, sustainable, and convenient for everyone.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [License](#license)

---

## Project Overview

**Antiguo** is a fashion e-commerce website that aims to make designer clothing accessible to a broader audience by offering rental and purchase options. Users can browse a curated collection of high-end fashion, select items for special occasions, and either rent or buy them. The platform also promotes sustainable fashion by encouraging rentals, helping reduce the environmental impact of fast fashion.

## Features

- **User Authentication**: Sign up and log in with Firebase authentication.
- **Browse & Search**: Discover designer outfits through categories, keywords, and filters.
- **Rent or Buy Options**: Select between renting an outfit for an event or purchasing it to keep.
- **Secure Payments**: Checkout securely with integrated payment options.
- **Wishlist**: Save favorite outfits for easy access later.
- **Responsive Design**: Optimized for seamless use on mobile and desktop devices.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MinavKaria/antiguo.git
   cd antiguo
   ```

2. **Install Dependencies**:
   - Frontend dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Backend dependencies:
     ```bash
     cd backend
     npm install
     ```

3. **Environment Setup**:
   - In the `frontend` and `backend` directories, create a `.env` file.
   - Add your Firebase, MongoDB, and other necessary API keys and configurations.

4. **Run the Development Servers**:
   - Frontend:
     ```bash
     cd frontend
     npm start
     ```
   - Backend:
     ```bash
     cd backend
     npm start
     ```

5. **Access the Application**:
   - Open your browser and go to `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend API.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication & Hosting**: Firebase

## Folder Structure

```
antiguo/
├── frontend/              # React & Tailwind CSS frontend
│   ├── src/
│   ├── public/
│   └── .env
├── backend/               # Express & Node.js backend
│   ├── models/            # Mongoose schemas for MongoDB
│   ├── routes/            # API routes
│   └── .env
└── README.md              # Project README file
```

## Usage

- **Sign Up/Login**: Create an account to start browsing collections and accessing exclusive features.
- **Browse Collections**: Use filters and categories to find outfits based on your preferences.
- **Rent or Buy**: Select your preferred option, choose sizes, and add items to your cart.
- **Checkout**: Complete the payment process and receive confirmation for rentals or purchases.
- **Manage Orders**: View and track orders, return rentals, and manage wishlists.


## License

Distributed under the MIT License. See `LICENSE` for more information.

---

Happy coding! 🚀
