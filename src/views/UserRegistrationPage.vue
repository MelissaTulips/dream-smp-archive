
// src\views\UserRegistrationPage.vue


<template>
    <div>
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <input
          type="email"
          v-model="email"
          placeholder="Enter email"
          required
        />
        <input
          type="text"
          v-model="username"
          placeholder="Enter username"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Enter password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { auth, db } from "../firebaseConfig"; // Firebase imports
  import { setDoc, doc } from "firebase/firestore"; // Firestore imports
  
  export default {
    data() {
      return {
        email: "",
        username: "",
        password: "",
        error: "",
      };
    },
    methods: {
      async registerUser() {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            this.email,
            this.password
          );
          const user = userCredential.user;
  
          // Set the user's data in Firestore with a default role
          const role = this.email === "m.melisa@gmail.com" ? "admin" : "user"; // Set role to 'admin' for this email
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            username: this.username,
            role: role, // Assign role
          });
  
          console.log("User registered:", user);
          this.$router.push("/login"); // Redirect to login page after successful registration
        } catch (error) {
          console.error("Registration Error:", error.message);
          this.error = error.message; // Display the error message
        }
      },
    },
  };
  </script>

