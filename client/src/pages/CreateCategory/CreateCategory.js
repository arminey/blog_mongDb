import React, { useState, useContext } from 'react';
import axios from 'axios';
import { 
    FormControl, TextField, 
    Paper, Typography, Button 
} from '@material-ui/core';

import { AuthContext } from './../../shared/context/auth-context';


const CreateCategory = () => {

    const auth = useContext(AuthContext);

    const [ category, setCategory ] = useState({});

    const handleInput = (e) => {
        e.preventDefault();
        let data = {};
        data[`${e.target.name}`] =  e.target.value;
        setCategory(oldState => ({...oldState, ...data}));
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/categories/createcategory', {...category}, { headers: {  Authorization: 'Bearer ' + auth.token } });
        } catch (error) {
            console.error(error);
        }
    }

    return <div style={{ width: '70%', height: 400, padding: '5% 15%' }}> 
        <form onSubmit={onSubmit}>
            <Paper >
                <Typography variant="h5" component="h3">
                    NEW CATEGORY
                </Typography>

                <div style={{ padding: '2% 25%'}}>
                    <FormControl variant="outlined">
                        <TextField
                            required
                            name="name"
                            label="Name"
                            id="filled-disabled"
                            variant="filled"
                            onChange={(event) => handleInput(event)}
                        />
                    </FormControl>
                </div>

                <div style={{ padding: '2% 25%' }}>
                    <FormControl variant="outlined">
                        <TextField
                            required
                            name="description"
                            label="Description"
                            id="filled-disabled"
                            variant="filled"
                            onChange={(event) => handleInput(event)}
                        />
                    </FormControl>
                </div>

                <div style={{ padding: '2% 25%' }}>
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </div>
            </Paper>   
        </form>
    </div>
}

export default CreateCategory;