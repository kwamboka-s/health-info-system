import api from './api'

class ClientService {
  async getAllClients() {
    try {
      const response = await api.get('/clients')
      // const response = {
      //   data: [
      //     {
      //       id: 1,
      //       firstName: "John",
      //       lastName: "Doe",
      //       email: "john.doe@example.com",
      //       phone: "123-456-7890",
      //       dateOfBirth: "1990-01-01",
      //       address: "123 Main St, Anytown, USA",
      //       notes: "Preferred contact time: afternoon",
      //       status: "active",
      //       createdBy: 101,
      //       createdAt: "2023-01-01T12:00:00Z",
      //     },
      //     {
      //       id: 2,
      //       firstName: "Jane",
      //       lastName: "Smith",
      //       email: "jane.smith@example.com",
      //       phone: "987-654-3210",
      //       dateOfBirth: "1985-05-15",
      //       address: "456 Elm St, Othertown, USA",
      //       notes: "Allergic to peanuts",
      //       status: "inactive",
      //       createdBy: 102,
      //       createdAt: "2023-02-01T12:00:00Z",
      //     },
      //   ],
      // };
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch clients')
    }
  }

  async getClientById(id) {
    try {
      const response = await api.get(`/clients/${id}`)
      // const response = {
      //   data: {
      //     id: id,
      //     firstName: "John",
      //     lastName: "Doe",
      //     email: "john.doe@example.com",
      //     phone: "123-456-7890",
      //     dateOfBirth: "1990-01-01",
      //     address: "123 Main St, Anytown, USA",
      //     notes: "Preferred contact time: afternoon",
      //     status: "active",
      //     createdBy: 101,
      //     createdAt: "2023-01-01T12:00:00Z",
      //   }
      // }
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch client details')
    }
  }

  async createClient(clientData) {
    try {
      const response = await api.post('/clients', clientData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create client')
    }
  }

  async updateClient(id, clientData) {
    try {
      const response = await api.put(`/clients/${id}`, clientData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update client')
    }
  }

  async searchClients(query) {
    try {
      const response = await api.get(`/clients/search?q=${encodeURIComponent(query)}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to search clients')
    }
  }
}

export default new ClientService()