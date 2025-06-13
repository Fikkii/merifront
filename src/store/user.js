import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    role: localStorage.getItem('user-role') || null, // e.g., 'admin', 'student'
    token: localStorage.getItem('jwt-token') || null, // e.g., 'admin', 'student'
    topics: null //For keeping all topics id for navigation
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setRole(role) {
      this.role = role
    },
    setTopics(topics) {
      this.topics = topics
    },
    logout() {
      this.role = null
      this.token = null
      localStorage.removeItem('user-role')
      localStorage.removeItem('jwt-token')
    }
  }
})
