// API Configuration
const API_URL = 'https://dvkvmjdefaytycdbsntd.supabase.co/rest/v1';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3ZtamRlZmF5dHljZGJzbnRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MjE1MjAsImV4cCI6MjA1OTI5NzUyMH0.wYHbfTAJyIp2CLfU4LcIJfJAMrVq41zUK6kw5GZ01ts';

// API Service
const api = {
  // Headers for API requests
  headers: {
    'apikey': API_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
    'Authorization': `Bearer ${API_KEY}`,
  },

  // Fetch all asignatures
  async getAsignatures() {
    try {
      const response = await fetch(`${API_URL}/asignatura?select=*`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch asignatures: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching asignatures:', error);
      throw error;
    }
  },

  async addAsignature(codigo, nombre, descripcion, creditos) {
    try {
      const response = await fetch(`${API_URL}/asignatura`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          codigo: codigo,
          nombre: nombre,
          descripcion: descripcion,
          creditos: creditos
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(`Failed to add asignature: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding asignature:', error);
      throw error;
    }
  },
  
  async updateAsign(codigo, nombre, descripcion, creditos) {
    try {
      const response = await fetch(`${API_URL}/asignatura?codigo=eq.${codigo}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          nombre: nombre,
          descripcion: descripcion,
          creditos: creditos
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(`Failed to update asignature: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating asignature:', error);
      throw error;
    }
  },

  async getAsignStudents(codigo_asignatura) {
    try {
      const response = await fetch(`${API_URL}/matricula?codigo_asignatura=eq.${codigo_asignatura}&select=*`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch students: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  async getStudent(codigo) {
    try {
      const response = await fetch(`${API_URL}/alumno?codigo=eq.${codigo}`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch student: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  },

  async getAllStudents() {
    try {
      const response = await fetch(`${API_URL}/alumno?select=*`, {
        method: 'GET',
        headers: this.headers
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch students: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },
  
  async addStudentToAsign(codigo_asignatura, codigo_alumno) {
    try {
      const response = await fetch(`${API_URL}/matricula`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          codigo_asignatura: codigo_asignatura,
          codigo_alumno: codigo_alumno
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        throw new Error(`Failed to add student to asignature: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding student to asignature:', error);
      throw error;
    }
  }
};