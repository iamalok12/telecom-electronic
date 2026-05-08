# Firebase Setup Guide for Operations Portal

## Prerequisites
- A Google account
- Node.js and npm installed

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "telecom-electronics")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Click on "Email/Password"
5. Enable it and click "Save"

## Step 3: Create an Admin User

1. In Authentication, go to the "Users" tab
2. Click "Add user"
3. Enter an email and password for your admin account
4. Click "Add user"

## Step 4: Get Your Firebase Configuration

1. Click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click on the web icon (`</>`) to add a web app
5. Register your app with a nickname (e.g., "Operations Portal")
6. Copy the `firebaseConfig` object

## Step 5: Configure Your Application

1. Create a `.env` file in the root of your project:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in the values from your Firebase config:
   ```
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. Save the file

## Step 6: Enable Firestore (Optional - for future features)

1. In Firebase Console, click on "Firestore Database"
2. Click "Create database"
3. Select "Start in test mode" (we'll set up proper rules later)
4. Choose a location and click "Enable"

## Step 7: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:5173/operation/login`

3. Login with the email and password you created in Step 3

4. You should be redirected to the operations dashboard

## Security Notes

- ✅ Never commit your `.env` file to version control (it's in `.gitignore`)
- ✅ In production, use Firebase Security Rules to protect your data
- ✅ Consider setting up Firebase App Check for additional security
- ✅ Regularly review authentication logs in the Firebase Console

## Troubleshooting

### "Firebase: Error (auth/operation-not-allowed)"
- Make sure Email/Password authentication is enabled in Firebase Console

### "Firebase: Error (auth/invalid-api-key)"
- Check that your `.env` file has the correct API key
- Restart your dev server after changing `.env`

### "Firebase: Error (auth/user-not-found)"
- Make sure you created a user in the Firebase Console
- Check that the email is correct

## Next Steps

Once authentication is working, you can:
- Set up Firestore security rules
- Add password reset functionality
- Implement role-based access control
- Add additional authentication methods (Google, etc.)
