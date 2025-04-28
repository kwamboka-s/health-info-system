// server/models/index.ts
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, query, where, Timestamp, DocumentData } from 'firebase/firestore';
import app from '../firebaseinit';

// Initialize Firestore
const db = getFirestore(app);

// User Model
export interface User {
  id?: string;
  username: string;
  email: string;
  role: string;
  fullname: string;
  createdAt?: Timestamp;
}

// Client Model
export interface Client {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  notes: string;
  status: string;
  createdBy: number | string;
  createdAt?: Timestamp | string;
}

// Program Model
export interface Program {
  id?: string;
  name: string;
  description: string;
  duration: number;
  status: string;
  category: string;
  startDate: string;
  endDate: string;
  createdBy: number | string;
  createdAt?: Timestamp | string;
}

// Enrollment Model
export interface Enrollment {
  id?: string;
  clientId: number | string;
  programId: number | string;
  status: string;
  enrolledAt: Timestamp | string;
  completedAt: Timestamp | string | null;
  notes: string;
  enrolledBy: number | string;
}

// User Functions
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const user = querySnapshot.docs[0].data() as User;
    user.id = querySnapshot.docs[0].id;
    return user;
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw error;
  }
};

export const createUser = async (userData: User): Promise<User> => {
  try {
    userData.createdAt = Timestamp.now();
    const usersRef = collection(db, 'users');
    const docRef = await addDoc(usersRef, userData);
    
    return {
      id: docRef.id,
      ...userData
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Client Functions
export const getAllClients = async (): Promise<Client[]> => {
  try {
    const clientsRef = collection(db, 'clients');
    const querySnapshot = await getDocs(clientsRef);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as Client;
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error getting all clients:', error);
    throw new Error('Failed to fetch clients');
  }
};

export const getClientById = async (id: string): Promise<Client | null> => {
  try {
    const clientRef = doc(db, 'clients', id);
    const clientDoc = await getDoc(clientRef);
    
    if (!clientDoc.exists()) {
      return null;
    }
    
    return { id: clientDoc.id, ...clientDoc.data() as Client };
  } catch (error) {
    console.error('Error getting client by id:', error);
    throw new Error('Failed to fetch client details');
  }
};

export const createClient = async (clientData: Client): Promise<Client> => {
  try {
    clientData.createdAt = Timestamp.now();
    const clientsRef = collection(db, 'clients');
    const docRef = await addDoc(clientsRef, clientData);
    
    return {
      id: docRef.id,
      ...clientData
    };
  } catch (error) {
    console.error('Error creating client:', error);
    throw new Error('Failed to create client');
  }
};

export const updateClient = async (id: string, clientData: Partial<Client>): Promise<Client> => {
  try {
    const clientRef = doc(db, 'clients', id);
    await updateDoc(clientRef, clientData);
    
    const updatedClient = await getDoc(clientRef);
    return { id, ...updatedClient.data() as Client };
  } catch (error) {
    console.error('Error updating client:', error);
    throw new Error('Failed to update client');
  }
};

export const searchClients = async (query: string): Promise<Client[]> => {
  try {
    // Basic implementation - in a real app, you might want to use Firebase's 
    // more advanced querying capabilities or a search service like Algolia
    const clientsRef = collection(db, 'clients');
    const querySnapshot = await getDocs(clientsRef);
    
    const searchTerm = query.toLowerCase();
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() as Client }))
      .filter(client => 
        client.firstName.toLowerCase().includes(searchTerm) ||
        client.lastName.toLowerCase().includes(searchTerm) ||
        client.email.toLowerCase().includes(searchTerm) ||
        client.phone.includes(searchTerm)
      );
  } catch (error) {
    console.error('Error searching clients:', error);
    throw new Error('Failed to search clients');
  }
};

// Program Functions
export const getAllPrograms = async (): Promise<Program[]> => {
  try {
    const programsRef = collection(db, 'programs');
    const querySnapshot = await getDocs(programsRef);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as Program;
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error getting all programs:', error);
    throw new Error('Failed to fetch programs');
  }
};

export const getProgramById = async (id: string): Promise<Program | null> => {
  try {
    const programRef = doc(db, 'programs', id);
    const programDoc = await getDoc(programRef);
    
    if (!programDoc.exists()) {
      return null;
    }
    
    return { id: programDoc.id, ...programDoc.data() as Program };
  } catch (error) {
    console.error('Error getting program by id:', error);
    throw new Error('Failed to fetch program details');
  }
};

export const createProgram = async (programData: Program): Promise<Program> => {
  try {
    programData.createdAt = Timestamp.now();
    const programsRef = collection(db, 'programs');
    const docRef = await addDoc(programsRef, programData);
    
    return {
      id: docRef.id,
      ...programData
    };
  } catch (error) {
    console.error('Error creating program:', error);
    throw new Error('Failed to create program');
  }
};

export const updateProgram = async (id: string, programData: Partial<Program>): Promise<Program> => {
  try {
    const programRef = doc(db, 'programs', id);
    await updateDoc(programRef, programData);
    
    const updatedProgram = await getDoc(programRef);
    return { id, ...updatedProgram.data() as Program };
  } catch (error) {
    console.error('Error updating program:', error);
    throw new Error('Failed to update program');
  }
};

// Enrollment Functions
export const getAllEnrollments = async (): Promise<Enrollment[]> => {
  try {
    const enrollmentsRef = collection(db, 'enrollments');
    const querySnapshot = await getDocs(enrollmentsRef);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as Enrollment;
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error getting all enrollments:', error);
    throw new Error('Failed to fetch enrollments');
  }
};

export const getClientEnrollments = async (clientId: string): Promise<Enrollment[]> => {
  try {
    const enrollmentsRef = collection(db, 'enrollments');
    const q = query(enrollmentsRef, where('clientId', '==', clientId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as Enrollment;
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error getting client enrollments:', error);
    throw new Error('Failed to fetch client enrollments');
  }
};

export const getProgramEnrollments = async (programId: string): Promise<Enrollment[]> => {
  try {
    const enrollmentsRef = collection(db, 'enrollments');
    const q = query(enrollmentsRef, where('programId', '==', programId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as Enrollment;
      return { id: doc.id, ...data };
    });
  } catch (error) {
    console.error('Error getting program enrollments:', error);
    throw new Error('Failed to fetch program enrollments');
  }
};

export const enrollClient = async (enrollmentData: Enrollment): Promise<Enrollment> => {
  try {
    if (!enrollmentData.enrolledAt) {
      enrollmentData.enrolledAt = Timestamp.now();
    }
    
    const enrollmentsRef = collection(db, 'enrollments');
    const docRef = await addDoc(enrollmentsRef, enrollmentData);
    
    return {
      id: docRef.id,
      ...enrollmentData
    };
  } catch (error) {
    console.error('Error enrolling client:', error);
    throw new Error('Failed to enroll client');
  }
};