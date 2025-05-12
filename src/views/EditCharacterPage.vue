<template>
    <div class="edit-character">
      <h2>Edit Character</h2>
      <form @submit.prevent="updateCharacter">
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
          <input type="file" @change="handleImageUpload" id="image" accept="image/*" />
        </div>
  
        <div v-if="character.imageBase64">
          <p>Preview:</p>
          <img :src="character.imageBase64" alt="Character Image Preview" style="max-width: 300px;" />
        </div>
  
        <div>
          <button type="submit" :disabled="loading">Update Character</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { db } from "../firebaseConfig";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        character: {
          id: "",
          name: "",
          description: "",
          imageBase64: "",
        },
        loading: false,
      };
    },
    async created() {
      const characterId = this.$route.params.id;
      try {
        // Fetch character data from Firestore
        const characterRef = doc(db, "characters", characterId);
        const characterDoc = await getDoc(characterRef);
  
        if (characterDoc.exists()) {
          this.character = { id: characterId, ...characterDoc.data() };
        } else {
          console.log("Character not found.");
        }
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    },
    methods: {
      handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
  
              const maxWidth = 500;
              const scaleFactor = maxWidth / img.width;
              const newHeight = img.height * scaleFactor;
  
              canvas.width = maxWidth;
              canvas.height = newHeight;
              ctx.drawImage(img, 0, 0, maxWidth, newHeight);
  
              const compressedBase64 = canvas.toDataURL(file.type);
              this.character.imageBase64 = compressedBase64;
            };
            img.src = reader.result;
          };
        }
      },
      async updateCharacter() {
        this.loading = true;
        try {
          // Update character data in Firestore
          const characterRef = doc(db, "characters", this.character.id);
          await updateDoc(characterRef, {
            name: this.character.name,
            description: this.character.description,
            imageBase64: this.character.imageBase64, // Save the Base64 image
          });
  
          // Redirect to the character list page after updating
          this.$router.push('/characters'); // Redirect to the character list page
        } catch (error) {
          console.error("Error updating character:", error);
          alert("Failed to update character.");
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-character form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: auto;
  }
  
  .edit-character label {
    margin-top: 10px;
  }
  
  .edit-character input,
  .edit-character textarea {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .edit-character button {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-character button:hover {
    background-color: #45a049;
  }
  
  .character-image-preview {
    max-width: 300px;
    height: auto;
    margin-bottom: 10px;
  }
  </style>
  