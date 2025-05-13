<template>
  <div class="blog-editor">
    <div>
      <label for="title">Title</label>
      <input type="text" v-model="title" placeholder="Blog Title" />
    </div>
    
    <div>
      <label for="content">Content</label>
      <!-- Quill editor container -->
      <div ref="quillEditor"></div>
    </div>
  </div>
</template>

<script>
import Quill from "quill"; // Import Quill

export default {
  props: ['blog'],
  data() {
    return {
      title: '',
      content: '',  // For Quill editor content
      quill: null,  // Quill editor instance
    };
  },
  watch: {
    blog(newBlog) {
      if (newBlog) {
        this.title = newBlog.title || '';
        this.content = newBlog.content || '';
        if (this.quill) {
          this.quill.root.innerHTML = newBlog.content; // Set content to Quill
        }
      }
    }
  },
  methods: {
    getContent() {
      return {
        title: this.title,
        content: this.quill.root.innerHTML, // Get content from Quill editor
      };
    },
  },
  mounted() {
    // Initialize Quill editor
    this.quill = new Quill(this.$refs.quillEditor, {
      theme: "snow",  // Use the snow theme for Quill
      modules: {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'align': [] }],
          ['bold', 'italic', 'underline'],
          ['link'],
          ['image'],
        ],
      },
    });

    // If we have initial content (edit mode), set it into Quill editor
    if (this.blog && this.blog.content) {
      this.quill.root.innerHTML = this.blog.content;
    }
  },
};
</script>

<style scoped>
.blog-editor {
  margin: 20px 0;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.quillEditor {
  min-height: 300px;
}

.quill .ql-editor {
  min-height: 300px;
}
</style>
