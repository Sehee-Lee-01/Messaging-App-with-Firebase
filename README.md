# Messaging-App-with-Firebase

- ## `Firebase`?
  - Google's mobile application development platform
  - **I focus it in this document!**
- ## `ReactJS`?
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

```shell
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

- `Delete` documents

```javascript
import { doc, deleteDoc } from "firebase/firestore";

const MessageTextRef = doc(dbService, "collection_name", `${messageObj.id}`);
await deleteDoc(MessageTextRef);
```

- `Update` documents

```javascript
import { doc, updateDoc } from "firebase/firestore";

const MessageTextRef = doc(dbService, "collection_name", `${messageObj.id}`);
await updateDoc(MessageTextRef, {
  text: newMessage,
});
```

## FILE UPLOAD

### 1) Using Firebase Storage

```javascript
// src/fbase.js
import { getStorage } from "firebase/storage";

/* config information */

// Initialize Cloud Storage and get a reference to the service
const storageService = getStorage(app);
```

### 2) Uploading

- `uuid`

  - To save effectively image files in Storage.

  cf) [uuid in npm](https://www.npmjs.com/package/uuid)

  - Create a UUID

```javascript
import { v4 as uuidv4 } from "uuid";
uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

- `Upload` Files

```javascript
import { storageService } from "fbase";
import { ref, uploadString } from "@firebase/storage";

// Create a reference (Just file reference!)
// "userObj.uid" is user id.
const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);

// Put file address in string (Same as file upload method)
// The third parameter is upload type.
const response = await uploadString(fileRef, attachment, "data_url");
```

### 3) File URL and Message

- `Upload` a file at `Storage` and save the download URL of it at `Firestore`.

```javascript
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { dbService, storageService } from "fbase";

// After upload a file at `Storage`
// const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
// const response = await uploadString(attachmentRef, attachment, "data_url");

// We can take download URL
attachmentUrl = await getDownloadURL(response.ref);

// Make meaasge object for `save`
const messageObj = {
  text: "meaasge-info",
  createdAt: Date.now(),
  creatorId: userObj.uid, // user-id
  attachmentUrl, // Download URL
};

// Save download URL at `Firestore` with file information.
await addDoc(collection(dbService, "collection_name"), messageObj);
```

### 4) Deleting Files

```javascript
import { dbService, storageService } from "fbase";
import { ref, deleteObject } from "firebase/storage";

// Delete the file ans its information.
const onDeleteClick = async () => {
  // Delete at Firestore
  await deleteDoc(doc(dbService, `collection_name/${messageObj.id}`));
  // Delete at Storage
  if (messageObj.attachmentUrl !== "") {
    await deleteObject(ref(storageService, messageObj.attachmentUrl));
  }
};
```

## EDIT PROFILE

### 1) Filtering user messages in `firestore`

- `Query Filtering`

```javascript
import { authService, dbService } from "fbase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

// ...

// Make query
const q = query(
  // Location of messages
  collection(dbService, "collection_name"),
  // Messages of "user"
  where("creatorId", "==", userObj.uid),
  // Order messages
  orderBy("createdAt", "desc"),
  // Get three messages
  limit(3)
);

// Find messages(list) of "user" using query
const querySnapshot = await getDocs(q);
```

### 2) Update User Profile

```javascript
import { authService } from "fbase";
import { getAuth, updateProfile } from "firebase/auth";

// Change current user information
updateProfile(authService.currentUser, {
  displayName: "New Name",
  photoURL: "https://example.com/jane-q-user/profile.jpg",
});
```

## FINISHING UP

### 1) Deploying (GitHub Pages)

- [gh-pages](https://www.npmjs.com/package/gh-pages)
  - Publish files to a gh-pages branch on `GitHub` (or any other branch anywhere else).

```shell
npm install gh-pages --save-dev
```

- Add Instructions in `pakage.json`
  - `predeploy`: Make `build` folder
  - `deploy`: Make `build` folder in local and upload homepage at URL named `"homepage"`.
- Add our user name, repository name in homepage URL

```json
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
    "homepage": "https://Shee-Lee-01.github.io/messages"
```

### 2) Security on Firebase

- Add A URL named `"homepage"`and `firebase domain` in `Firebase Authorized domains`

  - `firebase domain` helps login process
  - **We can make other user `log in` this message service only in this URL!**

- Modify `Security Rule` of Firestore(or Storage)
  - We can allow others CRUD when they log in.

```rule
allow read, write: if request.auth != null;
```

### 3) [`API Key`](console.developers.google.com/apis/credentials) Security

- Add A URL named `"homepage"`, `localhost` and `firebase domain` in Website restrictions.
  - **We can make other user `use` this message service only in this URL!**

### 4) Firebase `Clould Functions`

- It can help us make some special API using Firestore(NoSQL).
  - We can not use `join` instruction in `Firestore`, because it is `NoSQL DB`.
  - ex) Counting number of likes
    - Use Functions!
  - ex) Looking for user display name of the message by UID.
    - Use Functions!
