# Next.js Login Project with Firebase Authentication

This project demonstrates a simple login and signup flow implemented using Next.js and Firebase Authentication.

## Features
- User signup and login using Firebase Authentication
- Securely manage user sessions with Next.js
- Fully responsive design

---

## Prerequisites
Before you begin, ensure you have the following:
- Node.js installed (>=16.8.0)
- Firebase account and a project created

---

## Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Firebase:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Enable Authentication under the "Build > Authentication" section.
   - Set up the desired sign-in methods (e.g., Email/Password).
   - Copy your Firebase config object from "Project Settings > General > Your apps".

4. **Add Environment Variables:**
   - Create a `.env.local` file in the root of the project.
   - Add the following variables:

     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=<your-firebase-api-key>
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=<your-firebase-project-id>
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
     NEXT_PUBLIC_FIREBASE_APP_ID=<your-firebase-app-id>
     ```

5. **Run the Application:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

---

## Project Structure
```
.
├── components     # Reusable React components
├── pages          # Next.js pages (e.g., login, signup, dashboard)
├── styles         # Global and component-specific styles
├── firebase       # Firebase config and initialization
└── public         # Static assets
```

---

## Commands
- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm start`: Start the production server.

---

## Notes
- Ensure all environment variables are added to `.env.local`.
- Do not commit your `.env.local` file to version control for security purposes.

---

## Support
If you encounter any issues, feel free to create an issue in the repository or reach out to the maintainers.

---

Happy coding!

