<template>
    <div>
      <h2>Add New Character</h2>
      <form @submit.prevent="submitCharacterForm">
        <div>
          <label for="name">Name</label>
          <input type="text" v-model="character.name" id="name" required />
        </div>
  
        <div>
          <label for="description">Description</label>
          <textarea v-model="character.description" id="description" required></textarea>
        </div>
  
        <div>
          <label for="image">Upload Image</label>
          <input type="file" @change="handleImageUpload" id="image" accept="image/*" required />
        </div>
  
        <div v-if="character.imageBase64">
          <p>Preview:</p>
          <img :src="character.imageBase64" alt="Preview" style="max-width: 300px;" />
        </div>
  
        <div>
          <button type="submit" :disabled="loading">Add Character</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { db } from "../firebaseConfig";
  import { collection, addDoc, serverTimestamp } from "firebase/firestore";
  
  export default {
    data() {
      return {
        character: {
          name: "",
          description: "",
          imageBase64: "", // Image data as Base64 string
        },
        loading: false, // Handle loading state
      };
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0]; // Get the file from the input
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file); // Convert file to Base64
  
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
  
              const maxWidth = 500; // Set max width for image
              const scaleFactor = maxWidth / img.width;
              const newHeight = img.height * scaleFactor;
  
              canvas.width = maxWidth;
              canvas.height = newHeight;
              ctx.drawImage(img, 0, 0, maxWidth, newHeight);
  
              this.character.imageBase64 = canvas.toDataURL(file.type);
            };
            img.src = reader.result;
          };
        }
      },
  
      async submitCharacterForm() {
        this.loading = true;
        try {
          await addDoc(collection(db, "characters"), {
            name: this.character.name,
            description: this.character.description,
            imageBase64: this.character.imageBase64,
            createdAt: serverTimestamp(),
          });
  
          this.$router.push("/characters");
        } catch (error) {
          console.error("Error adding character: ", error);
          alert("Failed to add character.");
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  </style>
  