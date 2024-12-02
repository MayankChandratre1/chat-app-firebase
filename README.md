# NoConvo ✨

## 🌐 [Live Site](https://chatapp-4db2b.web.app)

**NoConvo** is a chat application built using React and Firebase, featuring AI-powered chats through the Gemini API. Users can create and join conversational groups ("convos") and chat with their personal AI partner, which adopts a funny and quirky personality as a virtual boyfriend or girlfriend.

## Features

1. **React Frontend**: A responsive and interactive user interface.
2. **Firebase Backend**:
   - **Authentication**: Uses Google authentication.
   - **Firestore**: Real-time data storage and management.
3. **Gemini API**: Powers the AI partner, which provides humorous and conversational replies.
4. Core Functionalities:
   - **Create Convos**: Start your own conversation group.
   - **Invite Others**: Share a join link to invite people to your convo.
   - **Join Convos**: Use a join link to participate in other conversations.
   - **AI Chat Partner**: Chat with an AI partner that adds a fun, personalized experience.

---

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js installed on your machine.
- **Firebase Project**: 
  - Set up a Firebase project.
  - Enable Google Authentication in Firebase Auth.
  - Enable Firestore in your Firebase project.

---

### Steps to Run Locally

1. **Clone the Repository**  
   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and add the following variables with your Firebase and Gemini API credentials:

   ```env
   VITE_BASE_URL=http://localhost:5173

   VITE_FIREBASE_API_KEY=<your-firebase-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
   VITE_FIREBASE_APP_ID=<your-firebase-app-id>
   VITE_FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>

   VITE_GEMINI_API_KEY=<your-gemini-api-key>
   ```

4. **Run the Development Server**  
   ```bash
   npm run dev
   ```

5. **Access the App**  
   Open your browser and go to `http://localhost:5173`.

---


## Deployment

To deploy the application:

1. Set up Firebase Hosting in your Firebase project.
2. Build the app:
   ```bash
   npm run build
   ```
3. Deploy to Firebase Hosting:
   ```bash
   firebase deploy
   ```

---

## Author

Created by Mayank. 