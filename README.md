# To-Do App

![Alt text](/public/Mockup.png "a title")

## Overview

This To-Do application is built using React, Redux, and Firebase. It provides users with the ability to manage their tasks effectively, including features like user authentication, task creation, editing, deletion, and weather information based on the user's location.

## Features

- **User Authentication:** Users can sign in or sign up to access their tasks securely.
- **Task Management:** Users can create new tasks, edit existing ones, mark tasks as completed, or delete them.
- **Responsive Design:** The application is fully responsive and adapts to different screen sizes and devices.
- **Weather Information:** Users can view the current weather information based on their location.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/satish-kumar75/QuadB.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd QuadB
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Authentication and Firestore in your Firebase project.
   - Copy the Firebase configuration settings (apiKey, authDomain, projectId, etc.) into `src/store/firebase.js`.

5. **Run the development server:**

   ```bash
   npm run dev
   ```

6. **Open the application in your browser:**

   ```http
   http://localhost:5173
   ```

## Usage

- Sign in or sign up using your email and password.
- Once logged in, you can create new tasks, edit existing ones, or delete tasks.
- The application fetches your current location and displays the weather information.

## Folder Structure

![Alt text](/public/tree.png "a title")

## Technologies Used

- React
- Redux
- Firebase Authentication
- Firebase Firestore
- React Router
- Axios

## Credits

- Weather data provided by [OpenWeather](https://openweathermap.org/).
