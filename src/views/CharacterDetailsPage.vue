// src\views\CharacterDetailsPage.vue

<template>
    <div class="character-details">
      <div v-if="character" class="character-info">
        <img :src="character.imageBase64" alt="Character Image" class="character-image" />
        <h2>{{ character.name }}</h2>
        <p>{{ character.description }}</p>
  
        <div class="character-blogs">
          <div v-for="blog in character.blogs" :key="blog.id" class="blog-item">
            <h4>{{ blog.title }}</h4>
            <p>{{ blog.content }}</p>
            <span class="tags">{{ blog.tags.join(", ") }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "../firebaseConfig";
  import { doc, getDoc } from "firebase/firestore";
  
  export default {
    data() {
      return {
        character: null,
      };
    },
    async created() {
      const id = this.$route.params.id;
      const docRef = doc(db, "characters", id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        this.character = docSnap.data();
      } else {
        console.log("No such document!");
      }
    },
  };
  </script>
  
  <style scoped>
  .character-details {
    text-align: center;
  }
  
  .character-info {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .character-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
  }
  
  .character-blogs {
    margin-top: 20px;
  }
  
  .blog-item {
    background-color: #ffffff;
    padding: 15px;
    margin-top: 10px;
    border-radius: 5px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  }
  
  .tags {
    margin-top: 10px;
    font-size: 14px;
    color: #28a745;
  }
  </style>
  