// src\store\index.js


import { createStore } from "vuex";
import { auth } from "../firebaseConfig";
import { getDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default createStore({
  state: {
    user: null,
    username: "",
    role: "user",
    characters: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setRole(state, role) {
      state.role = role;
    },
    setCharacters(state, characters) {
      state.characters = characters;
    },
  },
  
  actions: {
    async fetchUserRole({ commit }) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          commit("setUsername", userData.username);
          commit("setRole", userData.role);
        }
      }
    },
    async fetchAllCharacters({ commit }) {
      const querySnapshot = await getDocs(collection(db, "characters"));
      const characters = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      commit("setCharacters", characters);
    },
  },
  getters: {
    isAdmin(state) {
      return state.role === "admin";
    },
    getCharacters(state) {
      return state.characters;
    },
  },
  async updateCharacter() {
    this.loading = true;
    try {
      const characterRef = doc(db, "characters", this.character.id);
      await updateDoc(characterRef, {
        name: this.character.name,
        description: this.character.description,
        imageBase64: this.character.imageBase64, 
      });
  

      this.$router.push('/characters'); 
    } catch (error) {
      console.error("Error updating character:", error);
      alert("Failed to update character.");
    } finally {
      this.loading = false;
    }
  }
  
});
