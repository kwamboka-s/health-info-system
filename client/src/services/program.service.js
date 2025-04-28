import api from './api'

class ProgramService {
  async getAllPrograms() {
    try {
      const response = await api.get('/programs')
      // const response = {data: [
      //   {
      //     id: 1,
      //     name: "Sample Program",
      //     description: "This is a sample program description.",
      //     duration: 30,
      //     status: "active",
      //     category: "Education",
      //     startDate: "2023-01-01",
      //     endDate: "2023-12-31",
      //     createdBy: 101,
      //     createdAt: "2023-01-01T00:00:00Z",
      //   }
      // ]}
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch programs')
    }
  }
  
  async getProgramById(id) {
    try {
      const response = await api.get(`/programs/${id}`)
      // const response = {
      //   data: {
      //     id: id,
      //     name: "Sample Program",
      //     description: "This is a sample program description.",
      //     duration: 30,
      //     status: "active",
      //     category: "Education",
      //     startDate: "2023-01-01",
      //     endDate: "2023-12-31",
      //     createdBy: 101,
      //     createdAt: "2023-01-01T00:00:00Z",
      //   }
      // }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch program details')
    }
  }
  
  async createProgram(programData) {
    try {
      const response = await api.post('/programs', programData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create program')
    }
  }
  
  async updateProgram(id, programData) {
    try {
      const response = await api.put(`/programs/${id}`, programData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update program')
    }
  }
}

export default new ProgramService()
