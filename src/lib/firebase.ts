import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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
export const db = getFirestore(app);

// Function to save application to Firestore
export const saveApplication = async (applicationData: any) => {
  try {
    const docRef = await addDoc(collection(db, "application_enq"), {
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: "new"
    });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Function to save contact form submission to Firestore
export const saveContact = async (contactData: any) => {
  try {
    const docRef = await addDoc(collection(db, "contact_enq"), {
      ...contactData,
      submittedAt: new Date().toISOString(),
      status: "new"
    });
    console.log("Contact form submitted with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error submitting contact form: ", e);
    throw e;
  }
};
