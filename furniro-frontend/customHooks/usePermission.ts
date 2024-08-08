import React, { useEffect, useState } from 'react'
import { useContext } from "react";
import { Context } from "../context/ContextProvider";

const usePermission = () =>{
   
    const context = useContext(Context);
    const user = context?.user
    
    const [permissions, setPermissions] = useState<string[]>([]);

    useEffect(() => {
        if (user) {
            
            const allPermissions =user?.roles.map((permission) => permission.permissions.filter((name) => name.permission_name))
            setPermissions(allPermissions);
        } else {
            setPermissions([]);
        }
    }, [user]);

    const hasPermission = (permission: string) => permissions.includes(permission);

    return { permissions, hasPermission };

}
export default usePermission