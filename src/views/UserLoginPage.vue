
<template>
  <div>
    <div v-if="username">
      <h2>Welcome, {{ username }}!</h2>
    </div>
    <div v-else>
      <h1>Login</h1>
      <form @submit.prevent="loginUser">
        <input
          type="email"
          v-model="email"
          placeholder="Enter email"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Enter password"
        />
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Firebase auth import
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firebase Firestore import
import { useStore } from "vuex";

const db = getFirestore(); // Initialize Firestore instance

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      username: "",
      role: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        const user = userCredential.user;

        // Fetch the username and role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.username = userData.username;
          this.role = userData.role; // Get the role from Firestore

          // Store user data and role in the Vuex store
          this.$store.commit("setUser", user);
          this.$store.commit("setUsername", this.username);
          this.$store.commit("setRole", this.role);

          console.log("User logged in:", user);
          console.log("Username:", this.username);
          console.log("Role:", this.role);

          // Optionally redirect to another page after login
          // Example: this.$router.push('/home');
        } else {
          this.error = "No user found in database.";
        }
      } catch (error) {
        console.error("Login Error:", error.message);
        this.error = error.message; // Display the error message
      }
    },
  },
};
</script>
