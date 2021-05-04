import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from './../../shared/context/auth-context';
import DataTable from './../../components/Table/Table';
import { columns } from './constants';

const Categories = () => {
    const auth = useContext(AuthContext);
    const [ categories, setCategories ] = useState([]);
    const [ isAuthForCreate, setIsAuthForCreate ] = useState(false);
    const [ isAuthForDelete, setIsAuthForDelete ] = useState(false);
    const [ selectedRow, setSelectedRow ] = useState("");

    const handleSelectedRow = (rowId) => {
        if(rowId === selectedRow) {
            setSelectedRow("");
        } else {
            setSelectedRow(rowId);
        }
    }

    const deleteCategory = async () => {
        try {
            let deletedCategory = await axios.delete(`http://localhost:5000/api/categories/${selectedRow}`, { headers: {  Authorization: 'Bearer ' + auth.token } });
            setCategories(oldState => oldState.filter(elem => elem._id !== deletedCategory.data._id));
            setSelectedRow("");
        } catch (error) {  
            console.error(error)
        }
    }


    useEffect(() => {
        const fetchCategoryList = async () => {
            
            try {
                let categoryList = await axios.get('http://localhost:5000/api/categories', { headers: {  Authorization: 'Bearer ' + auth.token } });
                setCategories(categoryList.data);
            } catch (error) {  
                console.error(error)
            }
        }
        fetchCategoryList();
        setIsAuthForCreate(auth.role === 'admin' || auth.role === 'moderator');
        setIsAuthForDelete(auth.role === 'admin');

    }, []);

    return <DataTable 
                rows={categories}
                columns={columns}
                addElement={isAuthForCreate}
                handleSelectedRow={handleSelectedRow}
                selectedRow={selectedRow}
                operation={deleteCategory}
                deleteIcon={isAuthForDelete}
                checkbox={isAuthForDelete}
                tableName={"Categories"}
           />
}

export default Categories;