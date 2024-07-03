import axios from "axios"
import React from "react"
import { useNavigate } from "react-router-dom"


const UserDashboard: React.FC = () =>{

    const login = useNavigate();

    const logout = async(event: React.FormEvent) => {

        event.preventDefault()
        try {
            const response = await axios.post('/api/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("Login Token")}`
                }
            });

             if(response.status == 200)
                {
                    console.log("logout successfully")
                      localStorage.removeItem("Login Token");
                    login('/login')
                }
        } catch (error) {
            
        }
    }

    return(
        <>
          <form method="POST" onSubmit={logout}>
                 <button>Logout</button>
          </form>
        </>
    )
}
export default UserDashboard