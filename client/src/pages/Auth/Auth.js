import React, { useState, useContext } from "react";
import { FormControl, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import { Marginer } from "./marginer";
import { AuthContext } from './../../shared/context/auth-context';
import { 
  InnerContainer, BoxContainer, 
  MutedLink, SubmitButton 
}  from './../../components/AuthElements/AuthElements';

const useStyles = makeStyles((theme) => ({
  formControl: { 
    margin: theme.spacing(1),
  }
}));

const Auth = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [ isSigninMode, setIsSigninMode ] = useState(true);

  const [ input, setInput ] = useState({});

  const handleInputChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let data = {};
    data[`${name}`] = value;

    setInput(oldState => {
      return ({ ...oldState, ...data });
    })
  }

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    
    // Checking signin mode or signup
    if(isSigninMode) {
      try {
        let signinData = await axios.post('http://localhost:5000/api/users/login', {username: input.username, password: input.password});
        auth.login(signinData.data.role, signinData.data.userId, signinData.data.token);
      } catch (error) {
        console.error("Error: ", error);
      }
    } else {
      try {
        let data = {
          firstname: input.firstname,
          lastname: input.lastname, 
          username: input.username, 
          password: input.password
        };
        
        let result = await axios.post('http://localhost:5000/api/users/signup', data);
        auth.login(result.data.role, result.data.userId, result.data.token)
      } catch (error) {
        console.error(error);
      }
    }  
  }

  // fields for signup mode
  let signUp = (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          required
          name="firstname"
          label="First name"
          id="outlined-basic"
          variant="outlined"
          onBlur={(event) => handleInputChange(event)}
        />
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <TextField
          required
          name="lastname"
          label="Last name"
          id="outlined-basic"
          variant="outlined"
          onBlur={(event) => handleInputChange(event)}
        />
      </FormControl>
    </div>
  );
  
  return (
    <div>
      <div style={{weight: 'auto', textAlign: 'center'}}>
        <BoxContainer>
        <h5>{ isSigninMode ? "Login To Your Profile" : "Register Your Profile"}</h5>
          <InnerContainer>
            <form onSubmit={authSubmitHandler}>
              { !isSigninMode && signUp }
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  name="username"
                  label="Username"
                  id="outlined-basic"
                  variant="outlined"
                  onBlur={(event) => handleInputChange(event)}
                />
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                  required
                  type="password"
                  name="password"
                  label="Password"
                  id="outlined-basic"
                  variant="outlined"
                  onBlur={(event) => handleInputChange(event)}
                />
              </FormControl>
              <Marginer direction="vertical" margin="1.6em" />
              <SubmitButton type="submit">{ isSigninMode ? "Signin" : "Signup" }</SubmitButton>
              <Marginer direction="vertical" margin={10} />
              <MutedLink to="#" href="#" onClick={() => setIsSigninMode(!isSigninMode)}>{!isSigninMode ? "Signin" : "Signup"}</MutedLink>
            </form>
          </InnerContainer>
        </BoxContainer>        
      </div>
    </div>
  );
}


export default Auth;