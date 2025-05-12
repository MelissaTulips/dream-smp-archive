<template>
  <nav class="navbar">
    <router-link to="/" class="logo">Dream SMP Archive</router-link>
    <div class="nav-links">
      <router-link to="/characters">Characters</router-link>

      <router-link v-if="isAdmin || isSubadmin" to="/admin">Admin Panel</router-link>

      <!-- Tags visible to admin and subadmin -->
      <router-link v-if="isAdmin || isSubadmin" to="/tags">Tags</router-link>

      <span v-if="isLoggedIn" class="username">Logged in as: {{ username }}</span>

      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["username"]),
    ...mapGetters(["isAdmin"]),
    isSubadmin() {
      return this.$store.state.role === "subadmin";
    },
    isLoggedIn() {
      return !!this.$store.state.user;
    },
  },
  methods: {
    async logout() {
      await signOut(auth);
      this.$store.commit("setUser", null);
      this.$store.commit("setUsername", "");
      this.$store.commit("setRole", "user");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  padding: 10px 20px;
  color: white;
}

.nav-links {
  display: flex;
  gap: 15px;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.logo {
  font-weight: bold;
  font-size: 20px;
  color: #4caf50;
  text-decoration: none;
}

.username {
  margin-left: 10px;
  font-size: 14px;
  color: #ccc;
}

button {
  background: none;
  border: none;
  color: #f44336;
  cursor: pointer;
}
</style>
