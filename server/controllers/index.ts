// server/controllers/index.ts
import { Request, Response } from 'express';
import { 
  createUser, 
  getUserByEmail, 
  getAllClients, 
  getClientById, 
  createClient, 
  updateClient, 
  searchClients,
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  getAllEnrollments,
  getClientEnrollments,
  getProgramEnrollments,
  enrollClient
} from '../models';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../firebaseinit';

// Initialize Firebase Auth
const auth = getAuth(app);

// Authentication Controllers
export const login = async (req: Request, res: Response) => {
  try {
<<<<<<< HEAD
    let email, password;

    console.log('Request body:', req.body); // Log the request body for debugging
    try {
      ({ email, password } = req.body);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON payload' });
    }
=======
    const { email, password} = req.body;
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Check if user exists in Firestore
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Sign in with Firebase Auth
    // In a real application, you would use password authentication
    // Here we're just checking if the email exists since password isn't provided
    try {
      // This would normally be a sign-in operation like:
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      
      // For now, we'll just return the user data
      return res.status(200).json({
        success: true,
        message: 'Login successful',
<<<<<<< HEAD
        user,
        token
=======
        user
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
      });
    } catch (error) {
      console.error('Auth error:', error);
      return res.status(401).json({ message: 'Authentication failed' });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ message: error.message || 'An error occurred during login' });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, role, fullname, password } = req.body;
    
    if (!email || !username) {
      return res.status(400).json({ message: 'Email and username are required' });
    }
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }
    
    // In a real application, you would create a Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    
    // Create user in Firestore
    const newUser = await createUser({
      username,
      email,
      role: role || 'user',
      fullname: fullname || username
    });
    
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
<<<<<<< HEAD
      user: newUser,
      token: await userCredential.user.getIdToken()
=======
      user: newUser
>>>>>>> 88da31ceca2d2edc344ba8cb1051b4725c20fd1b
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: error.message || 'An error occurred during registration' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    // In a real application, you would get the user ID from the authenticated session
    const email = req.query.email as string;
    
    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' });
    }
    
    const user = await getUserByEmail(email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error: any) {
    console.error('Get user error:', error);
    return res.status(500).json({ message: error.message || 'Failed to get user information' });
  }
};

// Client Controllers
export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await getAllClients();
    return res.status(200).json(clients);
  } catch (error: any) {
    console.error('Get clients error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch clients' });
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await getClientById(id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    return res.status(200).json(client);
  } catch (error: any) {
    console.error('Get client error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch client details' });
  }
};

export const addClient = async (req: Request, res: Response) => {
  try {
    const clientData = req.body;
    
    if (!clientData.firstName || !clientData.lastName || !clientData.email) {
      return res.status(400).json({ message: 'First name, last name, and email are required' });
    }
    
    const newClient = await createClient(clientData);
    return res.status(201).json({
      success: true,
      message: 'Client created successfully',
      client: newClient
    });
  } catch (error: any) {
    console.error('Add client error:', error);
    return res.status(500).json({ message: error.message || 'Failed to create client' });
  }
};

export const updateClientData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientData = req.body;
    
    const client = await getClientById(id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    const updatedClient = await updateClient(id, clientData);
    
    return res.status(200).json({
      success: true,
      message: 'Client updated successfully',
      client: updatedClient
    });
  } catch (error: any) {
    console.error('Update client error:', error);
    return res.status(500).json({ message: error.message || 'Failed to update client' });
  }
};

export const searchClientsData = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: 'Search query parameter is required' });
    }
    
    const clients = await searchClients(q as string);
    return res.status(200).json(clients);
  } catch (error: any) {
    console.error('Search clients error:', error);
    return res.status(500).json({ message: error.message || 'Failed to search clients' });
  }
};

// Program Controllers
export const getPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await getAllPrograms();
    return res.status(200).json(programs);
  } catch (error: any) {
    console.error('Get programs error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch programs' });
  }
};

export const getProgram = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const program = await getProgramById(id);
    
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    
    return res.status(200).json(program);
  } catch (error: any) {
    console.error('Get program error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch program details' });
  }
};

export const addProgram = async (req: Request, res: Response) => {
  try {
    const programData = req.body;
    
    if (!programData.name || !programData.description) {
      return res.status(400).json({ message: 'Program name and description are required' });
    }
    
    const newProgram = await createProgram(programData);
    return res.status(201).json({
      success: true,
      message: 'Program created successfully',
      program: newProgram
    });
  } catch (error: any) {
    console.error('Add program error:', error);
    return res.status(500).json({ message: error.message || 'Failed to create program' });
  }
};

export const updateProgramData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const programData = req.body;
    
    const program = await getProgramById(id);
    
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }
    
    const updatedProgram = await updateProgram(id, programData);
    
    return res.status(200).json({
      success: true,
      message: 'Program updated successfully',
      program: updatedProgram
    });
  } catch (error: any) {
    console.error('Update program error:', error);
    return res.status(500).json({ message: error.message || 'Failed to update program' });
  }
};

// Enrollment Controllers
export const getEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await getAllEnrollments();
    return res.status(200).json(enrollments);
  } catch (error: any) {
    console.error('Get enrollments error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch enrollments' });
  }
};

export const getClientEnrollmentsData = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;
    const enrollments = await getClientEnrollments(clientId);
    return res.status(200).json(enrollments);
  } catch (error: any) {
    console.error('Get client enrollments error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch client enrollments' });
  }
};

export const getProgramEnrollmentsData = async (req: Request, res: Response) => {
  try {
    const { programId } = req.params;
    const enrollments = await getProgramEnrollments(programId);
    return res.status(200).json(enrollments);
  } catch (error: any) {
    console.error('Get program enrollments error:', error);
    return res.status(500).json({ message: error.message || 'Failed to fetch program enrollments' });
  }
};

export const createEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollmentData = req.body;
    
    if (!enrollmentData.clientId || !enrollmentData.programId) {
      return res.status(400).json({ message: 'Client ID and Program ID are required' });
    }
    
    const newEnrollment = await enrollClient(enrollmentData);
    return res.status(201).json({
      success: true,
      message: 'Client enrolled successfully',
      enrollment: newEnrollment
    });
  } catch (error: any) {
    console.error('Create enrollment error:', error);
    return res.status(500).json({ message: error.message || 'Failed to enroll client' });
  }
};