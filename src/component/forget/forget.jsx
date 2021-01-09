import React , { useState } from 'react';
import './forget.scss';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Fundoo from '../fundooHeader/fundoo';
const services = require('../../service/user_service');


const regexEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ;

const Forget = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailValidate = (value) => {
    const email = value;
    if (!regexEmail.test(email)) {
      console.log("not match");
      setEmailError("Email is Invalid");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  }

  const emailChange = (event) => {
    setEmail(event.target.value);
    emailValidate(event.target.value);
  }


  const forget = () => {
    emailValidate(email);

    let values = {
      service: "advance",
      email: email,
    }
    if(emailValidate(email))

    services.forgot(values).then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      alert("give correct email");
    })

  }

  return (
    <div className="forget-container" >
      <Grid>
        <Paper className='gridBox'>
          <Fundoo />
          <p id="signIn" >Account Recovery</p>
          <span id="continue">Continue to Fundoo</span>
          <div className="inputArea">
            <form className="" noValidate autoComplete="off">
            <TextField className="inputValue" id="outlined-size-normal" name="email" error={emailError.length !== 0} helperText={emailError} onChange={emailChange} value={email} label="Email" fullWidth variant="outlined" size="medium" />
            </form>
          </div>
          <div className="last" >
            <p id="create">Create Account</p>
            <Button variant="contained" id="button" onClick={forget} >Next</Button>
          </div>
        </Paper>
      </Grid>
    </div>
  )
};

export default Forget;

