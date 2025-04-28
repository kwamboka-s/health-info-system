import api from './api'

class EnrollmentService {
  async getAllEnrollments() {
    try {
      const response = await api.get('/enrollments')
      // const response = {
      //   data: [
      //     {
      //   id: 1,
      //   clientId: 101,
      //   programId: 202,
      //   status: "active",
      //   enrolledAt: "2023-10-01T10:00:00Z",
      //   completedAt: null,
      //   notes: "Initial enrollment",
      //   enrolledBy: 301,
      //     },
      //     {
      //   id: 2,
      //   clientId: 102,
      //   programId: 203,
      //   status: "completed",
      //   enrolledAt: "2023-09-15T14:30:00Z",
      //   completedAt: "2023-10-01T12:00:00Z",
      //   notes: "Program completed successfully",
      //   enrolledBy: 302,
      //     },
      //   ],
      // }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch enrollments')
    }
  }

  async getClientEnrollments(clientId) {
    try {
      const response = await api.get(`/clients/${clientId}/enrollments`);
      // const response = {
      //   data: [
      //     {
      //   id: 1,
      //   clientId: clientId,
      //   programId: 202,
      //   status: "active",
      //   enrolledAt: "2023-10-01T10:00:00Z",
      //   completedAt: null,
      //   notes: "Initial enrollment",
      //   enrolledBy: 301,
      //     },
      //     {
      //   id: 2,
      //   clientId: clientId,
      //   programId: 203,
      //   status: "completed",
      //   enrolledAt: "2023-09-15T14:30:00Z",
      //   completedAt: "2023-10-01T12:00:00Z",
      //   notes: "Program completed successfully",
      //   enrolledBy: 302,
      //     },
      //   ],
      // }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch client enrollments')
    }
  }

  async getProgramEnrollments(programId) {
    try {
      const response = await api.get(`/programs/${programId}/enrollments`)

      // const response = {
      //   data: [
      //     {
      //   id: 1,
      //   clientId: 101,
      //   programId: programId,
      //   status: "active",
      //   enrolledAt: "2023-10-01T10:00:00Z",
      //   completedAt: null,
      //   notes: "Initial enrollment",
      //   enrolledBy: 301,
      //     },
      //     {
      //   id: 2,
      //   clientId: 102,
      //   programId: programId,
      //   status: "completed",
      //   enrolledAt: "2023-09-15T14:30:00Z",
      //   completedAt: "2023-10-01T12:00:00Z",
      //   notes: "Program completed successfully",
      //   enrolledBy: 302,
      //     },
      //   ],
      // }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch program enrollments')
    }
  }

  async enrollClient(enrollmentData) {
    try {
      const response = await api.post('/enroll', enrollmentData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to enroll client')
    }
  }
}

export default new EnrollmentService()