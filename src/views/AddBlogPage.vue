<template>
    <div>
      <h2>Add New Blog</h2>
  
      <!-- Blog Editor Component -->
      <BlogEditor ref="blogEditor" @submit="createBlog" />
  
      <!-- Tags Dropdown for selecting tags -->
      <div class="tags-dropdown">
        <label for="tags">Select Tags:</label>
        <select v-model="selectedTags" multiple>
          <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
        </select>
      </div>
  
      <!-- Submit Button (Single Button) -->
      <button @click="submitBlog">Submit Blog</button>
    </div>
  </template>
  
  <script>
  import BlogEditor from '../components/BlogEditor.vue'
  import { getTags, addBlog } from '../blogService'
  
  export default {
    components: { BlogEditor },
    data() {
      return {
        tags: [],           // List of all available tags
        selectedTags: [],   // Stores selected tag IDs (this is what you want to save)
      }
    },
    async created() {
      // Fetch tags from Firebase
      await this.fetchTags();
    },
    methods: {
      async fetchTags() {
        this.tags = await getTags();  // Fetch all tags from the database
      },
      async submitBlog() {
        // Get blog details from the BlogEditor component
        const { title, content } = this.$refs.blogEditor.getContent();
        const characterId = this.$route.params.id;
  
        // Ensure selectedTags is an array of tag IDs
        const validTags = Array.isArray(this.selectedTags) ? this.selectedTags : [];
  
        // Submit the blog with the selected tags
        await addBlog({ title, content, tags: validTags, characterId });
  
        // Redirect back to the character page
        this.$router.push(`/character/${characterId}`);
      },
    }
  }
  </script>
  
  
  
  <style scoped>
  .tags-dropdown {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  select {
    width: 100%;
    padding: 8px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  option {
    padding: 8px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  