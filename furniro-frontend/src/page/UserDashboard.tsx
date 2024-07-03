import axios from "axios"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const UserDashboard: React.FC = () =>{

    const login = useNavigate();

    const logout = async(event: React.FormEvent) => {

        event.preventDefault()
        try {
            const response = await axios.post('/api/logout', {}, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('Token')}`
                }
              });
        

             if(response.status === 200)
                {
                    console.log("logout successfully")
                      localStorage.removeItem("Token");
                      window.localStorage.removeItem("isLogin");
                    login('/login')
                }
        } catch (error) {
            
        }
    }

    useEffect(() =>{
      const token = localStorage.getItem("Token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer `;
      }
    }, [])

    return(
        <>
          <form method="POST" onSubmit={logout}>
                 <button>Logout</button>
          </form>
        </>
    )
}
export default UserDashboard