<template>
    <div class="blog-item">
      <h4>{{ blog.title }}</h4>
      <div v-html="blog.content"></div>
  
      <!-- Display Tags -->
      <div v-if="resolvedTags.length">
        <span class="tags">
          Tags:
          <span v-for="(tag, index) in resolvedTags" :key="index">{{ tag }}</span>
        </span>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "../firebaseConfig";
  import { doc, getDoc } from "firebase/firestore";
  
  export default {
    props: ['blog'],
    data() {
      return {
        tagsMap: new Map(),  
        resolvedTags: []    
      };
    },
    async created() {
      try {

        this.resolvedTags = await Promise.all(
          this.blog.tags.map(async (tagId) => {
            if (!this.tagsMap.has(tagId)) {
  
              const tagDoc = await getDoc(doc(db, "tags", tagId));
              if (tagDoc.exists()) {
               
                this.tagsMap.set(tagId, tagDoc.data().name);
              }
            }
  
            return this.tagsMap.get(tagId);
          })
        );
      } catch (error) {
        console.error("Error resolving tags:", error);
      }
    },
  }
  </script>
  

  