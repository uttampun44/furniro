import axios from 'axios'
import React, { useEffect, useState } from 'react'

function User() {

  const [user, setUser] = useState(null);

  useEffect(() =>{
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users');
        setUser(response.data);
     
      } catch (err) {
       
      }
    };

    fetchUser();
  }, [])
  return (
    <div>User</div>
  )
}

export default User