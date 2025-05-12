// src\views\AdminPanelPage.vue
<template>
  <div>
    <h1>Admin Panel - Manage Roles</h1>
    
    <!-- List of users with their current roles -->
    <div v-if="users.length > 0">
      <div v-for="user in users" :key="user.uid" class="user-item">
        <div>
          <strong>Email:</strong> {{ user.email }} <br />
          <strong>Username:</strong> {{ user.username }} <br />
          <strong>Current Role:</strong> {{ user.role }} <br />
          
          <!-- Only show the role change button if the admin is logged in -->
          <button @click="openRoleChangeModal(user)">Change Role</button>
        </div>
      </div>
    </div>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Role change modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>Select New Role for {{ selectedUser.username }}</h3>
        <select v-model="newRole">
          <option value="user">User</option>
          <option value="subadmin">Subadmin</option>
          <option value="admin">Admin</option>
        </select>
        <button @click="changeUserRole">Change Role</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { auth } from "../firebaseConfig"; // Firebase auth import
import { useStore } from "vuex";

const db = getFirestore(); // Initialize Firestore

export default {
  data() {
    return {
      users: [], // List of users
      error: "", // Error message if any
      showModal: false, // To control the visibility of the modal
      selectedUser: null, // Selected user to change role
      newRole: "user", // New role selected from dropdown
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  async created() {
    if (!this.isAdmin) {
      this.error = "You do not have permission to access this page.";
      return;
    }
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        // Get all users from Firestore
        const querySnapshot = await getDocs(collection(db, "users"));
        this.users = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          uid: doc.id, // Add the UID of the user
        }));
      } catch (error) {
        this.error = "Failed to fetch users: " + error.message;
      }
    },
    
    openRoleChangeModal(user) {
      this.selectedUser = user;
      this.newRole = user.role; // Set the current role as default in the modal
      this.showModal = true;
    },
    
    async changeUserRole() {
      try {
        // Get the reference to the user's document in Firestore
        const userRef = doc(db, "users", this.selectedUser.uid);
        
        // Update the user's role in Firestore
        await updateDoc(userRef, {
          role: this.newRole,
        });
        
        // Update the role locally in the users array
        this.selectedUser.role = this.newRole;
        
        // Close the modal and reset the selected user
        this.closeModal();
        
        alert("Role updated successfully.");
      } catch (error) {
        this.error = "Failed to update role: " + error.message;
      }
    },
    
    closeModal() {
      this.showModal = false;
      this.selectedUser = null;
    },
  },
};
</script>

<style scoped>
/* Basic styling for the Admin Panel */
.user-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

button {
  margin-top: 10px;
}

.error {
  color: red;
}
</style>