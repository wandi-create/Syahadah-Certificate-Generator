
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, orderBy, doc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { SyahadahData, NewSyahadahEntry } from './types';

// ===============================================================================================
// FIX KONEKSI UTAMA: Mengganti process.env dengan import.meta.env
// ===============================================================================================
const firebaseConfig = {
    // HARUS menggunakan import.meta.env di lingkungan Vite/Browser
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
        return querySnapshot.docs.map(doc => {
            const data = doc.data();

            // Sanitize data to ensure it is fully serializable before being stored in React state.
            // Firebase Timestamp objects can cause errors ("circular structure to JSON") if they are
            // inadvertently passed back in an update operation.
            const sanitizedData = { ...data };
            for (const key in sanitizedData) {
                if (sanitizedData[key] instanceof Timestamp) {
                    // Convert Timestamp to a serializable ISO string.
                    sanitizedData[key] = sanitizedData[key].toDate().toISOString();
                }
            }

            return {
                id: doc.id,
                ...sanitizedData,
            } as SyahadahData;
        });
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
        // FIX: Explicitly construct a clean payload to prevent passing non-serializable
        // or unexpected properties (which can cause a "circular structure" error) to
        // the add function. This mirrors the safe implementation of `updateSyahadah`.
        const payload = {
            namaSiswa: entry.namaSiswa,
            kelas: entry.kelas,
            gender: entry.gender,
            juz: entry.juz,
            tanggalUjian: entry.tanggalUjian,
            tanggalUjianHijriah: entry.tanggalUjianHijriah,
            jmlKetuk: entry.jmlKetuk,
            jmlTuntun: entry.jmlTuntun,
            jmlTajwid: entry.jmlTajwid,
            nilaiAkhir: entry.nilaiAkhir,
            predikat: entry.predikat,
            status: entry.status,
            createdAt: serverTimestamp() // Add a server-side timestamp
        };
        await addDoc(syahadahCollectionRef, payload);
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
        
        // FIX: Explicitly construct a clean payload to prevent passing non-serializable
        // objects (which cause the "circular structure" error) to the update function.
        // This ensures that only the intended data fields are updated.
        const payload: { [key: string]: any } = {};
        
        // Map all possible fields from the entry to the payload
        const fields: (keyof NewSyahadahEntry)[] = [
            'namaSiswa', 'kelas', 'gender', 'juz', 'tanggalUjian', 'tanggalUjianHijriah',
            'jmlKetuk', 'jmlTuntun', 'jmlTajwid', 'nilaiAkhir', 
            'predikat', 'status'
        ];

        fields.forEach(field => {
            if (entry[field] !== undefined) {
                payload[field] = entry[field];
            }
        });

        payload.updatedAt = serverTimestamp(); // Add an updated timestamp

        await updateDoc(syahadahDoc, payload);
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
