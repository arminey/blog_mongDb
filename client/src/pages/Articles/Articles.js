import React, { useEffect, useContext, useState } from 'react';

import DataTable from './../../components/Table/Table';
import { columns } from './constants';
import { AuthContext } from './../../shared/context/auth-context';
import axios from 'axios';

const Articles = () => {

    const auth = useContext(AuthContext);
    const [ articles, setArticles ] = useState([]);
    const [ isAuthForUpdate, setIsAuthForUpdate ] = useState(false);
    const [ selectedRow, setSelectedRow ] = useState("");


    const handleSelectedRow = (rowId) => {
        if(rowId === selectedRow) {
            setSelectedRow("");
        } else {
            setSelectedRow(rowId);
        }
    }

    const publishArticle = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/articles/${selectedRow}`, {id: selectedRow}, { headers: {  Authorization: 'Bearer ' + auth.token } });
            setSelectedRow("");
        } catch (error) {  
            console.error(error)
        }
    }
  
    useEffect(() => {
        const fetchArticleList = async () => {
            
            try {
                let articleList = await axios.get('http://localhost:5000/api/articles', { headers: {  Authorization: 'Bearer ' + auth.token } });
                setArticles(articleList.data);
            } catch (error) {  
                console.error(error)
            }
        }
        fetchArticleList();
        setIsAuthForUpdate(auth.role === 'moderator');
                

    }, []);



    /** The table has _content, category, user columns
     *  Function return updated element object (article), 
     *  to render _content, category, user cells properly.
]    */
    const helper = (element) => {
        let content = element.content?.text ? 'There is text' : 'There is no text';
        let image = element.content?.image ? 'There is image' : 'There is no image';
        element._content = content + '\n' + image; 
        element.category = element.category_id.name;
        element.user = `${element.user_id.firstname} ${element.user_id.lastname}`;
        return element;
    }

    return <DataTable 
            rows={articles}
            columns={columns}
            helper={helper}
            operation={publishArticle}
            handleSelectedRow={handleSelectedRow} 
            selectedRow={selectedRow} 
            checkCircleIcon          
            checkbox={isAuthForUpdate}
            tableName={"Articles"}
           />
}

export default Articles;