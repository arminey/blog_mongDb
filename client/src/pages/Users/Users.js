import React, { useEffect, useState, useContext } from 'react';
import DataTable from './../../components/Table/Table';
import { columns } from './constants';
import { AuthContext } from './../../shared/context/auth-context';

import axios from 'axios';

const Users = () => {
    const auth = useContext(AuthContext);
    const [ users, setUsers ] = useState([])

    useEffect(() => {
        const fetchUserList = async () => {
            
            try {
                let userList = await axios.get('http://localhost:5000/api/users', { headers: {  Authorization: 'Bearer ' + auth.token } });
                setUsers(userList.data);
                
            } catch (error) {  
                console.error("Error fetchUserList: ", error);
            }
        }
        fetchUserList();
    }, []);

    /** The table has name columns
     *  Function return updated element object (user), 
     *  to render name (concatinated firstname and lastname).
]   */
    const helper = (element) => element.name = `${element.firstname} ${element.lastname}`;
    return <DataTable 
                rows={users} 
                columns={columns} 
                helper={helper} 
                tableName={"Users"}
            />
}

export default Users;