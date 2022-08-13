# react_firebase

- ## Firebase?
  - Google's mobile application development platform
- ## ReactJS?
  - A JavaScript library for building user interfaces

## SETUP

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

Then, move `App.js` from root folder to `components` folder. Make a file named `Router.js` to use ReactJS Router. I made this file with reference to the official 'react-router-dom' site.

**Note: They don't have `Switch`,`Redirect` in new version!**

## AUTHENTICATION

### 1) Using Firebase Auth

```javascript
// src/fbase.js
import "firebase/auth";

/* config information */

export const authService = firebase.auth();
```

### 2) Login Form

- Make Login Page and import at `Router.js`.

### 3) Creating Account

- `getAuth()`

Returns the `authentication instance` associated with the provided FirebaseApp. If the instance does not exist, it initializes the authentication instance with the default platform-specific dependencies.

```javascript
// get auth
const auth = getAuth();
```

- `createUserWithEmailAndPassword()`

```javascript
// Make New Account
await authService.createUserWithEmailAndPassword(email, password);
```

- `signInWithEmailAndPassword()`

```javascript
// Sign in
await authService.signInWithEmailAndPassword(email, password);
```

### 4) Log In

- `onAuthStateChanged()`

```javascript
// Sign in
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    const uid = user.uid;
  } else {
    // User is signed out
  }
});
```

### 4) Social Login

- Export Firebase Instance

```javascript
// src/fbase.js
export const firebaseInstance = firebase;
```

- Make Social Login ID

```javascript
// Google
const provider = new GoogleAuthProvider();
// Github
const provider = new GithubAuthProvider();
```

### 5) Log Out

- `signOut()`

```javascript
//Sign Out
await authService.signOut(auth);
```

## MESSAGING

### 1) Form and Databse Setup

```javascript
// src/fbase.js
import "firebase/database";

/* config information */

export const dbService = firebase.firestore();
```

### 2) Messaging

- Add a data(`Document`) to `Firestore`

```javascript
import { collection, addDoc } from "firebase/firestore";

// Add a new document with a generated id.
const docRef = await addDoc(collection(dbService, "collection_name"), {
  data1: "data1",
  data2: "data2",
});
```

### 3) Getting the Messages

- Get all documents in a `collection` from `Firestore`

```javascript
import { collection, getDocs } from "firebase/firestore";

const querySnapshot = await getDocs(collection(dbService, "collection_name"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});
```

### 4) Realtime Messages

- Get `realtime` updates with Cloud `Firestore`

Use `onSnapshot()` instead of `getDocs()` to listen to the results of a query.

```javascript
// Listen to multiple documents in a collection
import { collection, query, where, onSnapshot } from "firebase/firestore";

const q = query(
  collection(dbService, "collection_name"),
  where("data1", "==", "1234")
);
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const d = [];
  querySnapshot.forEach((doc) => {
    d.push(doc.data().name);
  });
});
```

### 5) Delete and Update

## FILE UPLOAD

### 1) Preview Images

### 2) Uploading

### 3) File URL and Message

### 4) Deleting Files

## EDIT PROFILE

### 1) Get My Own Message

### 2) Update Profile

## FINISHING UP

### 1) Deploying

### 2) Security on Firebase

### 3) API Key Security
