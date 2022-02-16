# react_firebase

- ## Firebase?
  - Google's mobile application development platform
- ## ReactJS?
  - A JavaScript library for building user interfaces

## Initialize

---

### 1) Ckeck node.js

```
node -v
```

### 2) Make npm

```
npm init
```

### 3) Make git repo.(local, remote)

```
#local
git init
git add .
git commit -m <project_name>

#remote(Make repo in GitHub before push!)
git remote add origin  <REMOTE_URL>
```

### 4) Install create-react-app & react-router-dom

Please leave the nessesary files along new files.

(You don't have to use files named like `.css`,`.html` etc.)

```
npx create-react-app <file_name>
npm install react-router-dom
```

### 5) Install & Sign in firebase

Please sign in firebase. you do it in [https://firebase.google.com/](https://firebase.google.com/) and make your new project. Then, make `fbase` file for using firebase in `src` folder

```
npm install firebase --save
```

**Note: Some method is not available in `firebase ver.9`**

### 6) Securing the Keys

Make `.env` file in root, so you can hide the keys of firebase project. Then, write `.env` in `.gitignore` for hide your project keys and you can make `fbase` file like this

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};
initializeApp(firebaseConfig);
export const authService = getAuth();
```

### 7) Router Setup

- cf) What is react Router used for? (from [https://www.javatpoint.com/react-router](https://www.javatpoint.com/react-router))
  - ReactJS Router is mainly used for developing Single Page Web Applications. React Router is used to define multiple routes in the application. When a user types a specific URL into the browser, and if this URL path matches any 'route' inside the router file, the user will be redirected to that particular route.

First, make two folder named `components` and `routes` in `src` folder.

Then, move `App.js` from root to `components` and make a file named `Router.js` to use ReactJS Router. I made this file with reference to the official 'react-router-dom' site.

**Note: They don't have `Switch`,`Redirect` in new version!**
