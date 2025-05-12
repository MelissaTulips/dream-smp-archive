<template>
  <div>
    <!-- Add New Character Button -->
    <div v-if="isAdmin" class="add-character">
      <router-link to="/characters/add" class="add-button">Add New Character</router-link>
    </div>

    <!-- Character List -->
    <div class="character-list">
      <div class="character-item" v-for="character in characters" :key="character.id">
        <div class="character-card">
          <img :src="character.imageBase64" alt="Character Image" class="character-image" />
          <h3 class="character-name">{{ character.name }}</h3>
          <p class="character-description">{{ character.description }}</p>

          <!-- View, Edit and Delete buttons -->
          <router-link :to="'/characters/' + character.id" class="view-details">View Details</router-link>
          <router-link v-if="isAdmin" :to="'/characters/edit/' + character.id" class="edit-button">Edit</router-link>
          <button v-if="isAdmin" @click="deleteCharacter(character.id)" class="delete-button">Delete</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { mapState } from "vuex";

export default {
  data() {
    return {
      characters: [],
    };
  },
  computed: {
    ...mapState(["role"]),
    isAdmin() {
      return this.role === "admin";
    },
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, "characters"));
    this.characters = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
  methods: {
    async deleteCharacter(characterId) {
      try {
        await deleteDoc(doc(db, "characters", characterId));
        this.characters = this.characters.filter(character => character.id !== characterId); // Update the local state
        alert("Character deleted successfully!");
      } catch (error) {
        console.error("Error deleting character:", error);
        alert("There was an error deleting the character.");
      }
    }
  }
};
</script>

<style scoped>
.character-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.character-item {
  flex: 0 1 200px;
  margin: 10px;
}

.character-card {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  background-color: #f4f4f4;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.character-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.character-name {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}

.character-description {
  margin-top: 10px;
  font-size: 14px;
}

.view-details,
.edit-button,
.delete-button {
  margin-top: 10px;
  display: inline-block;
  padding: 8px 15px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
}

.edit-button {
  background-color: #007bff;
}

.delete-button {
  background-color: #dc3545;
}

/* Add New Character Button Styling */
.add-character {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* Space between the button and the list */
}

.add-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
}

.add-button:active {
  background-color: #003d7a;
}
</style>
