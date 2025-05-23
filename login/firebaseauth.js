// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updatePassword
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDlR815Lyc6dLrCUVnQ_GnChVHNKSUROQ",
  authDomain: "dental-d3b8b.firebaseapp.com",
  projectId: "dental-d3b8b",
  storageBucket: "dental-d3b8b.appspot.com",
  messagingSenderId: "458829928920",
  appId: "1:458829928920:web:690369fb87c570cac8faad"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// ================= SIGN UP ====================
const signUp = document.getElementById('submitSignUp');

signUp?.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('rEmail').value.trim();
  const password = document.getElementById('rPassword').value;
  const confirmPassword = document.getElementById('confirmSignUpPassword').value;
  const firstName = document.getElementById('fName').value.trim();
  const lastName = document.getElementById('lName').value.trim();
  const phoneNumber = document.getElementById('phoneNumber')?.value.trim() || '';

  if (!email || !password || !confirmPassword || !firstName || !lastName) {
    showMessage('Please fill in all fields.', 'signUpMessage');
    return;
  }

  if (password !== confirmPassword) {
    showMessage('Passwords do not match.', 'signUpMessage');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const docRef = doc(db, "users", user.uid);
      return setDoc(docRef, {
        email,
        firstName,
        lastName,
        phoneNumber
      });
    })
    .then(() => {
      showMessage('Account created successfully!', 'signUpMessage');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email already in use.', 'signUpMessage');
      } else if (errorCode === 'auth/invalid-email') {
        showMessage('Invalid email format.', 'signUpMessage');
      } else if (errorCode === 'auth/weak-password') {
        showMessage('Password should be at least 6 characters.', 'signUpMessage');
      } else {
        showMessage('Error creating account.', 'signUpMessage');
        console.error(error);
      }
    });
});


// ================= SIGN IN ====================
const signIn = document.getElementById('submitSignIn');
signIn?.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (!email || !password) {
    showMessage('Please fill in both fields.', 'signInMessage');
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Redirect to main dashboard page
      window.location.href = "/systemhtml/index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password') {
        showMessage('Invalid email or password.', 'signInMessage');
      } else {
        showMessage('Incorrect Email or Password.', 'signInMessage');
        console.error(error);
      }
    });
});

// =============== PASSWORD RESET (AFTER OTP) ===============
const resetForm = document.getElementById('resetForm');
resetForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const user = auth.currentUser;

  if (user) {
    updatePassword(user, newPassword)
      .then(() => {
        alert('Password updated successfully.');
        window.location.href = 'index.html';
      })
      .catch((error) => {
        console.error(error);
        alert('Error updating password. Please sign in again.');
      });
  } else {
    alert('No user is currently signed in.');
  }
});
