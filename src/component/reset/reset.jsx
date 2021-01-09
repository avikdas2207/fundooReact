import React , { useState } from 'react';
import { useParams } from "react-router-dom";
import './reset.scss';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fundoo from '../fundooHeader/fundoo';
const services = require('../../service/user_service');


const regexPassword = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);

const Reset = () => {

  const [pswd, setPswd] = useState("");
  const [cpswd, setCpswd] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [cpswdError, setCpswdError] = useState("");

  let { token } = useParams();
  console.log(token);
  const pswdValidate = (value) => {
    const pswd = value;
    if(!regexPassword.test(pswd)){
      console.log('pswd not match');
      setPswdError("password not valid");
      return false;
    }else{
      setPswdError("");
      return true;
    }
  }
  const pswdChange = (event) => {
    setPswd(event.target.value);
    pswdValidate(event.target.value);
  }
  const cpswdValidate = (value) => {
    const cpswd = value;
    if (pswd !== cpswd) {
      console.log("not match");
      setCpswdError("Password is Invalid")
      return false;
    } else {
      setCpswdError("");
      return true;
    }
  }

  const cpswdChange = (event) => {
    setCpswd(event.target.value);
    cpswdValidate(event.target.value);
  }

  const reset = () => {
    pswdValidate(pswd);
    cpswdValidate(cpswd);

    let values = {
      newPassword: pswd,
    }

    if(
        pswdValidate(pswd) && cpswdValidate(cpswd)
    ){
      let token = window.location.pathname.slice(15);
    services.reset(values,token).then((res) => {
      console.log(res);
      alert("Password Changed");
    })
    .catch((err) => {
      console.log(err);
      alert("give correct password");
    })

  }
    }
    

  return (
    <div className="login-container" >
      <Grid>
        <Paper className='gridBox'>
          <Fundoo />
          <p id="signIn" >Reset Password</p>
          <span id="continue">Continue to Fundoo</span>
          <div className="inputArea">
            <form className="" noValidate autoComplete="off">
            <TextField className="passwd" id="outlined-size-normal" name="pswd" error={pswdError.length !== 0} onChange={pswdChange} helperText={pswdError} label="Password" value={pswd} type="password" variant="outlined" size="medium" />
            <TextField className="cpasswd" id="outlined-size-normal" error={cpswdError.length !== 0} value={cpswd} onChange={cpswdChange} helperText={cpswdError} type="password" label="Confirm Password" variant="outlined" size="medium" />
            </form>
          </div>
          <div className="last" >
            <p id="create">Create Account</p>
            <Button variant="contained" id="button" onClick={reset} >Next</Button>
          </div>
        </Paper>
      </Grid>
    </div>
  )
};

export default Reset;

