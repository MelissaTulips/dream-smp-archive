<template>
    <div class="blog-editor">
      <div>
        <label for="title">Title</label>
        <input type="text" v-model="title" placeholder="Blog Title" />
      </div>
      <div>
        <label for="content">Content</label>
        <textarea v-model="content" placeholder="Write your content here..."></textarea>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['blog'],
    data() {
      return {
        title: '',  // Initialize empty
        content: '', // Initialize empty
      };
    },
    watch: {
      // Watch for changes to the `blog` prop and update fields accordingly
      blog(newBlog) {
        if (newBlog) {
          this.title = newBlog.title || '';
          this.content = newBlog.content || '';
        }
      }
    },
    methods: {
      getContent() {
        return {
          title: this.title,
          content: this.content,
        };
      },
    },
    // Use the `created` lifecycle hook to initialize data when `blog` prop changes
    created() {
      if (this.blog) {
        this.title = this.blog.title || '';
        this.content = this.blog.content || '';
      }
    }
  };
  </script>
  
  <style scoped>
  .blog-editor {
    margin: 20px 0;
  }
  
  input, textarea {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  textarea {
    min-height: 200px;
  }
  </style>
  