<template>
    <div>
      <h2>Edit Blog</h2>
      
      <!-- Blog Editor Component -->
      <BlogEditor v-if="blog" :blog="blog" @submit="submitEditBlog" />
    
      <!-- Tags Dropdown for selecting tags -->
      <div class="tags-dropdown">
        <label for="tags">Select Tags:</label>
        <select v-model="selectedTags" multiple>
          <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
        </select>
      </div>
    
      <!-- Submit Button -->
      <button @click="submitEditBlog">Save Changes</button>
    </div>
  </template>
  
  <script>
  import { getTags, updateBlog } from '../blogService'; 
  import BlogEditor from '../components/BlogEditor.vue';
  import { doc, getDoc } from 'firebase/firestore'; 
  import { db } from '../firebaseConfig';  
  
  export default {
    components: { BlogEditor },
    data() {
      return {
        blog: null,  // The blog being edited
        tags: [],    // List of available tags
        selectedTags: [],  // Selected tags (IDs)
      };
    },
    async created() {
      await this.fetchTags();
      await this.fetchBlog();  // Load the blog details based on the URL ID
    },
    methods: {
      async fetchTags() {
        this.tags = await getTags(); // Get all tags
      },
      async fetchBlog() {
        const blogId = this.$route.params.id;
        if (!blogId) {
          console.error('Blog ID is undefined or invalid!');
          return;
        }
  
        const docRef = doc(db, "blogs", blogId);  // Referencing the blog document
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          this.blog = docSnap.data();
          this.selectedTags = this.blog.tags; // Set selected tags
        } else {
          console.error('Blog not found');
        }
      },
      async submitEditBlog(updatedBlog) {
        updatedBlog.tags = this.selectedTags;  // Add the selected tags
        await updateBlog(this.blog.id, updatedBlog); // Update the blog in Firebase
        this.$router.push(`/blog/${this.blog.id}`);  // Redirect to the blog page
      },
    },
  };
  </script>
  