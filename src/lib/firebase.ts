// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7Y_Jqs67wbAomdmoCN00wNoa-5InSddw",
  authDomain: "ces-website-7f978.firebaseapp.com",
  projectId: "ces-website-7f978",
  storageBucket: "ces-website-7f978.firebasestorage.app",
  messagingSenderId: "108451789843",
  appId: "1:108451789843:web:bb5a53c02d223bec2053e6",
  measurementId: "G-6J1KVYD1EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

// Function to save application to Firestore
const saveApplication = async (applicationData: any) => {
  try {
    const docRef = await addDoc(collection(db, "application_enq"), {
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: "new"
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Function to save contact form submission to Firestore
const saveContact = async (contactData: any) => {
  try {
    const docRef = await addDoc(collection(db, "contact_enq"), {
      ...contactData,
      submittedAt: new Date().toISOString(),
      status: "new"
    });
    console.log("Contact form submitted with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact form: ", error);
    throw error;
  }
};

// Function to get all applications
const getApplications = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "application_enq"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Function to get all contacts
const getContacts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "contact_enq"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting contact messages: ", error);
    throw error;
  }
};

// Function to get gallery images
const getGalleryImages = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error getting gallery images: ", error);
    throw error;
  }
};

// Function to add a new gallery image
const addGalleryImage = async (collectionName: string, imageData: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...imageData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding gallery image: ", error);
    throw error;
  }
};

// Function to get images from Firebase Storage
const getStorageImages = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    const result = await listAll(storageRef);
    
    const imagePromises = result.items.map(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      return {
        id: itemRef.name,
        url,
        name: itemRef.name,
        path: itemRef.fullPath
      };
    });

    return await Promise.all(imagePromises);
  } catch (error) {
    console.error("Error fetching images from storage: ", error);
    throw error;
  }
};

// Export the initialized services and functions
export { 
  app, 
  db, 
  auth, 
  storage,
  saveApplication, 
  saveContact,
  getApplications,
  getContacts,
  getGalleryImages,
  addGalleryImage,
  getStorageImages
};