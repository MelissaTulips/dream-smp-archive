// src/store/index.js

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
    isSubAdmin(state) {
      return state.role === "subadmin";
    },
    canCreateOrEditBlog(state) {
      return state.role === "admin" || state.role === "subadmin";
    },
    getCharacters(state) {
      return state.characters;
    },
  }
});
