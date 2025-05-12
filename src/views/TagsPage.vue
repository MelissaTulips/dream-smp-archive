<template>
    <div class="tags-page">
      <h2>Tags Management</h2>
  
      <div v-if="!canView">
        <p>You do not have permission to view this page.</p>
      </div>
  
      <div v-else>
        <!-- Tag Input - only for Admin -->
        <div v-if="isAdmin" class="add-tag-form">
          <input v-model="newTag" placeholder="Enter new tag" />
          <button @click="addTag">Add Tag</button>
        </div>
  
        <!-- Tags List -->
        <div class="tag-list">
          <div v-for="tag in tags" :key="tag.id" class="tag-item">
            <span>{{ tag.name }}</span>
            <span v-if="isAdmin">
              <button @click="editTag(tag)">Edit</button>
              <button @click="deleteTag(tag.id)">Delete</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "../firebaseConfig";
  import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    serverTimestamp,
  } from "firebase/firestore";
  import { mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        tags: [],
        newTag: "",
      };
    },
    computed: {
      ...mapGetters(["isAdmin"]),
      role() {
        return this.$store.state.role;
      },
      canView() {
        return this.role === "admin" || this.role === "subadmin";
      },
    },
    async created() {
      if (this.canView) {
        await this.fetchTags();
      }
    },
    methods: {
      async fetchTags() {
        const snapshot = await getDocs(collection(db, "tags"));
        this.tags = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      },
      async addTag() {
        if (!this.newTag.trim()) return;
        await addDoc(collection(db, "tags"), {
          name: this.newTag.trim(),
          createdAt: serverTimestamp(),
        });
        this.newTag = "";
        this.fetchTags();
      },
      async deleteTag(id) {
        await deleteDoc(doc(db, "tags", id));
        this.fetchTags();
      },
      async editTag(tag) {
        const newName = prompt("Edit tag name:", tag.name);
        if (newName && newName.trim()) {
          await updateDoc(doc(db, "tags", tag.id), {
            name: newName.trim(),
          });
          this.fetchTags();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .tags-page {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  .add-tag-form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  .tag-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .tag-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background: #eee;
    border-radius: 4px;
  }
  </style>
  