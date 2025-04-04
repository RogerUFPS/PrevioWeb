// API Configuration
const API_URL = 'https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts';
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
// API Service
const api = {
  // Headers for API requests
  headers: {
    'apikey': API_KEY,
    'Content-Type': 'application/json; charset=UTF-8',
    'Prefer': 'return=representation',
    'Authorization': `Bearer ${API_KEY}`,
  },

  // Fetch all students
  async getAsignatures() {
    try {
      const response = await fetch(`${API_URL}/asignatura`, {
        method: 'GET',
        headers: api.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  async addAsignature(code, name, description) {
    try {

      const response = await fetch(`${API_URL}/asignatura`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
          code: code,
          name: name,
          description: description,
        }),
      });

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  
  async updateAsign(befCode, name, description) {

    try {
      const response = await fetch(`${API_URL}/asignatura?codigo=eq.${befCode}`, {
        method: 'PATCH',
        headers: api.headers,
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  async getAsignStudents(code) {
    try {
      const response = await fetch(`${API_URL}/matricula?codigo_asignatura=eq.${code}`, {
        method: 'GET',
        headers: api.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  async getStudents(code) {
    try {
      const response = await fetch(`${API_URL}/alumno?codigo=eq.${code}`, {
        method: 'GET',
        headers: api.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  async getAllStudents() {
    try {
      const response = await fetch(`${API_URL}/alumno`, {
        method: 'GET',
        headers: api.headers
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  
  async addStudentToAsign(code, studentC, name) {
    try {
      const response = await fetch(`${API_URL}/matricula?codigo_asignatura=eq.${code}`, {
        method: 'POST',
        headers: api.headers,
        body: JSON.stringify({
          code: studentC,
          name: name,
        }),
      });

      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}