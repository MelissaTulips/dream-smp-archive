import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Function to get all blogs for a specific character
export async function getBlogsForCharacter(characterId) {
  const querySnapshot = await getDocs(collection(db, 'blogs'));
  return querySnapshot.docs
    .map(doc => doc.data())
    .filter(blog => blog.characterId === characterId);
}

// Function to get a specific blog by its ID
export async function getBlogById(blogId) {
  const docRef = doc(db, 'blogs', blogId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such blog!');
    return null;
  }
}

// Function to add a new blog
export async function addBlog({ title, content, tags, characterId }) {
  // Ensure tags is an array of tag IDs
  if (!Array.isArray(tags)) {
    console.error('Tags must be an array of tag IDs');
    return;
  }

  await addDoc(collection(db, 'blogs'), {
    title,
    content,
    tags, 
    characterId,
    createdAt: new Date(),
  });
}

// Function to update an existing blog
export async function updateBlog(blogId, updatedBlog) {
  const blogRef = doc(db, 'blogs', blogId);
  await updateDoc(blogRef, updatedBlog);
}

// Function to delete a blog
export async function deleteBlog(blogId) {
  const blogRef = doc(db, 'blogs', blogId);
  await deleteDoc(blogRef);
}

// Function to get all tags
export async function getTags() {
  const tagsSnapshot = await getDocs(collection(db, 'tags'));
  return tagsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Function to get a tag by its ID
export async function getTagById(tagId) {
  const tagDocRef = doc(db, 'tags', tagId);
  const tagSnap = await getDoc(tagDocRef);
  if (tagSnap.exists()) {
    return tagSnap.data();
  } else {
    console.log('No such tag!');
    return null;
  }
}

// Function to add a new tag
export async function addTag(tagName) {
  if (!tagName.trim()) return;
  await addDoc(collection(db, 'tags'), {
    name: tagName.trim(),
    createdAt: new Date(),
  });
}

// Function to delete a tag
export async function deleteTag(tagId) {
  await deleteDoc(doc(db, 'tags', tagId));
}

// Function to edit an existing tag
export async function editTag(tagId, newName) {
  const tagRef = doc(db, 'tags', tagId);
  await updateDoc(tagRef, {
    name: newName.trim(),
  });
}
