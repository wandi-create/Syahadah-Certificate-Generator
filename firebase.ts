
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { SyahadahData, NewSyahadahEntry } from './types';

// ===============================================================================================
// IMPORTANT: Replace with your actual Firebase project configuration
// You can get this from your project's settings in the Firebase console.
// ===============================================================================================
const firebaseConfig = {
  apiKey: "AIzaSyAa1blSO3EiPIKmmw_Sq_JSCLWnroVicvw",
  authDomain: "syahadahgenerator.firebaseapp.com",
  projectId: "syahadahgenerator",
  storageBucket: "syahadahgenerator.firebasestorage.app",
  messagingSenderId: "953608521775",
  appId: "1:953608521775:web:6c793556b7b107fa0a9eda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the 'syahadah' collection in Firestore
const syahadahCollectionRef = collection(db, "syahadah");

/**
 * Fetches the list of Syahadah data from Firestore, ordered by the creation date.
 */
export const getSyahadahList = async (): Promise<SyahadahData[]> => {
    try {
        const q = query(syahadahCollectionRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as SyahadahData));
    } catch (error) {
        console.error("Error fetching syahadah list: ", error);
        // In a real app, you might want to show a user-facing error.
        return [];
    }
};

/**
 * Adds a new Syahadah entry to Firestore.
 */
export const addSyahadah = async (entry: NewSyahadahEntry): Promise<void> => {
    try {
        await addDoc(syahadahCollectionRef, {
            ...entry,
            createdAt: serverTimestamp() // Add a server-side timestamp
        });
    } catch (error) {
        console.error("Error adding new syahadah: ", error);
        throw error; // Re-throw to be handled by the component
    }
};

// Note: In a full application, you would also add functions for updating and deleting documents here.
// export const updateSyahadah = async (id, data) => { ... };
// export const deleteSyahadah = async (id) => { ... };
