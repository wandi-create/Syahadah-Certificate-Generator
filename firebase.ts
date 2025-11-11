
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { SyahadahData, NewSyahadahEntry } from './types';

// ===============================================================================================
// IMPORTANT: Replace with your actual Firebase project configuration
// You can get this from your project's settings in the Firebase console.
// ===============================================================================================
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
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

/**
 * Updates a Syahadah entry in Firestore.
 */
export const updateSyahadah = async (id: string, entry: Partial<NewSyahadahEntry>): Promise<void> => {
    try {
        const syahadahDoc = doc(db, "syahadah", id);
        await updateDoc(syahadahDoc, {
            ...entry,
            updatedAt: serverTimestamp() // Add an updated timestamp
        });
    } catch (error) {
        console.error("Error updating syahadah: ", error);
        throw error;
    }
};

/**
 * Deletes a Syahadah entry from Firestore.
 */
export const deleteSyahadah = async (id: string): Promise<void> => {
    try {
        const syahadahDoc = doc(db, "syahadah", id);
        await deleteDoc(syahadahDoc);
    } catch (error) {
        console.error("Error deleting syahadah: ", error);
        throw error;
    }
};
