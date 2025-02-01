import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUsers = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/users");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return userData;
};
