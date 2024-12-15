# MyGestor Web Application

## Overview
MyGestor is a web platform designed to support judicial professionals in the United States by streamlining case and document management. The platform provides tools to automate repetitive tasks, organize case files, and manage hearings efficiently. Leveraging modern technologies such as Vue.js, Node.js, Express, and Firebase, MyGestor aims to simplify judicial workflows while ensuring the security of sensitive citizen data.

## Movil application 
The github link of the movil application is here: https://github.com/cesarveraa/MyGestor  
and you cand download the application here: https://drive.google.com/drive/folders/1wof8lvaCnFzXkdKVWKQqGm2rafxD10xJ


## Features
- **Case and Hearing Management:** Easily organize and track judicial cases and their corresponding hearings.
- **Automated Assistance:** An integrated chatbot assistant simplifies repetitive tasks and provides support for managing cases.
- **Efficient Document Handling:** Sync with the mobile application to manage, update, and review digitized documents.
- **Secure Data Storage:** Data is securely stored in Firebase, ensuring reliability and access control.

## Tech Stack
- **Frontend:** Vue.js
- **Backend:** Node.js, Express
- **Database:** Firebase Firestore
- **APIs:** Axios for HTTP requests
- **Cross-Origin Resource Sharing (CORS):** Configured for secure API communication

## Installation
Follow these steps to set up the MyGestor web application on your local machine:

### Prerequisites
- Node.js and npm installed
- Firebase project set up
- A valid Firebase configuration file (`firebaseConfig.js`)

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/mygestor-web.git
   cd mygestor-web
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Set Up Firebase:**
   - Create a Firebase project and configure Firestore.
   - Enable authentication in Firebase.
   - Copy the Firebase config object into a new file named `firebaseConfig.js` under the `src` folder:
     ```javascript
     export const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     ```

4. **Start the Development Server:**
   ```bash
   npm run serve
   ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:8080`.

## Deployment
To deploy the application:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to a hosting provider or Firebase Hosting:
   ```bash
   firebase deploy
   ```

## Folder Structure
```
mygestor-web/
├── public/           # Static files
├── src/
│   ├── assets/       # Images, styles, etc.
│   ├── components/   # Vue components
│   ├── views/        # Application pages
│   ├── router.js     # Vue Router configuration
│   ├── store.js      # Vuex state management
│   ├── firebaseConfig.js # Firebase configuration
├── package.json
├── README.md
```

## API Endpoints
The backend API is built with Express and integrates seamlessly with Firebase. Below are some key endpoints:

### Authentication
- `POST /api/login`: Authenticates a user.
- `POST /api/register`: Registers a new user.

### Case Management
- `GET /api/cases`: Fetch all cases.
- `POST /api/cases`: Create a new case.
- `PUT /api/cases/:id`: Update case details.
- `DELETE /api/cases/:id`: Delete a case.

### Hearing Management
- `GET /api/hearings`: Fetch all hearings.
- `POST /api/hearings`: Schedule a new hearing.

## Security
- **CORS:** Configured to allow secure cross-origin requests.
- **Biometric Security:** Utilized through integration with the mobile app for enhanced data protection.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries or support, please contact [support@mygestor.com](mailto:support@mygestor.com).

