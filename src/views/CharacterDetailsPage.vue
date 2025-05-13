<template>
  <div class="character-details">
    <div v-if="character" class="character-info">
      <img :src="character.imageBase64" alt="Character Image" class="character-image" />
      <h2>{{ character.name }}</h2>
      <p>{{ character.description }}</p>

      <!-- Create Blog Button -->
      <router-link
        v-if="canCreateBlog"
        :to="`/character/${$route.params.id}/blog/new`"
        class="btn"
      >
        Create Blog
      </router-link>

      <div class="character-blogs">
        <div v-for="blog in blogs" :key="blog.id" class="blog-item">
          <BlogItem :blog="blog" />
          
          <!-- Edit Blog Button -->
          <router-link
            v-if="canEditBlog"
            :to="`/blog/${blog.id}/edit`"
            class="btn"
          >
            Edit Blog
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getBlogsForCharacter } from '../blogService'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import BlogItem from '../components/BlogItem.vue'
import { mapState } from 'vuex'

export default {
  components: { BlogItem },
  data() {
    return {
      character: null,
      blogs: [],
    }
  },
  computed: {
    ...mapState(['role']),
    canCreateBlog() {
      return this.role === 'admin' || this.role === 'subadmin'
    },
    canEditBlog() {
      return this.role === 'admin' || this.role === 'subadmin'
    }
  },
  async created() {
    const id = this.$route.params.id
    const docRef = doc(db, 'characters', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      this.character = docSnap.data()
      this.fetchBlogs()
    } else {
      console.log('No such document!')
    }
  },
  methods: {
    async fetchBlogs() {
      this.blogs = await getBlogsForCharacter(this.$route.params.id)
    }
  }
}
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

.btn {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
