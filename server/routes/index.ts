// server/routes/index.ts
import { Router } from 'express';
import {
  login,
  register,
  getUser,
  getClients,
  getClient,
  addClient,
  updateClientData,
  searchClientsData,
  getPrograms,
  getProgram,
  addProgram,
  updateProgramData,
  getEnrollments,
  getClientEnrollmentsData,
  getProgramEnrollmentsData,
  createEnrollment
} from '../controllers';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return a token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Authentication failed
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/login', login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: User registration
 *     description: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - role
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               role:
 *                type: string
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 *       409:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/register', register);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get user information
 *     description: Retrieve user information by email
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User's email
 *     responses:
 *       200:
 *         description: User information
 *       400:
 *         description: Email parameter is required
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/user', getUser);

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Get all clients
 *     description: Retrieve a list of all clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: List of clients
 *       500:
 *         description: Server error
 */
router.get('/clients', getClients);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Get a client by ID
 *     description: Retrieve client details by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client details
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.get('/clients/:id', getClient);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Create a new client
 *     description: Add a new client to the system
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               address:
 *                 type: string
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/clients', addClient);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Update a client
 *     description: Update client information
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               address:
 *                 type: string
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.put('/clients/:id', updateClientData);

/**
 * @swagger
 * /clients/search:
 *   get:
 *     summary: Search for clients
 *     description: Search for clients by query string
 *     tags: [Clients]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query
 *     responses:
 *       200:
 *         description: Search results
 *       400:
 *         description: Search query parameter is required
 *       500:
 *         description: Server error
 */
router.get('/clients/search', searchClientsData);

/**
 * @swagger
 * /programs:
 *   get:
 *     summary: Get all programs
 *     description: Retrieve a list of all programs
 *     tags: [Programs]
 *     responses:
 *       200:
 *         description: List of programs
 *       500:
 *         description: Server error
 */
router.get('/programs', getPrograms);

/**
 * @swagger
 * /programs/{id}:
 *   get:
 *     summary: Get a program by ID
 *     description: Retrieve program details by ID
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Program ID
 *     responses:
 *       200:
 *         description: Program details
 *       404:
 *         description: Program not found
 *       500:
 *         description: Server error
 */
router.get('/programs/:id', getProgram);

/**
 * @swagger
 * /programs:
 *   post:
 *     summary: Create a new program
 *     description: Add a new program to the system
 *     tags: [Programs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               status:
 *                 type: string
 *               category:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *               createdBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Program created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/programs', addProgram);

/**
 * @swagger
 * /programs/{id}:
 *   put:
 *     summary: Update a program
 *     description: Update program information
 *     tags: [Programs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Program ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: number
 *               status:
 *                 type: string
 *               category:
 *                 type: string
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Program updated successfully
 *       404:
 *         description: Program not found
 *       500:
 *         description: Server error
 */
router.put('/programs/:id', updateProgramData);

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Get all enrollments
 *     description: Retrieve a list of all enrollments
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: List of enrollments
 *       500:
 *         description: Server error
 */
router.get('/enrollments', getEnrollments);

/**
 * @swagger
 * /clients/{clientId}/enrollments:
 *   get:
 *     summary: Get client enrollments
 *     description: Retrieve all enrollments for a specific client
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: clientId
 *         schema:
 *           type: string
 *         required: true
 *         description: Client ID
 *     responses:
 *       200:
 *         description: List of client enrollments
 *       500:
 *         description: Server error
 */
router.get('/clients/:clientId/enrollments', getClientEnrollmentsData);

/**
 * @swagger
 * /programs/{programId}/enrollments:
 *   get:
 *     summary: Get program enrollments
 *     description: Retrieve all enrollments for a specific program
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: programId
 *         schema:
 *           type: string
 *         required: true
 *         description: Program ID
 *     responses:
 *       200:
 *         description: List of program enrollments
 *       500:
 *         description: Server error
 */
router.get('/programs/:programId/enrollments', getProgramEnrollmentsData);

/**
 * @swagger
 * /enroll:
 *   post:
 *     summary: Enroll a client in a program
 *     description: Create a new enrollment record
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - programId
 *             properties:
 *               clientId:
 *                 type: string
 *               programId:
 *                 type: string
 *               status:
 *                 type: string
 *                 default: active
 *               notes:
 *                 type: string
 *               enrolledBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client enrolled successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/enroll', createEnrollment);

export default router;