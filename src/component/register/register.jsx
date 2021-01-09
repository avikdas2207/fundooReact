import React from 'react';
import './register.scss';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Fundoo from '../fundooHeader/fundoo';
import googleImage from '../../assets/googleImage.jpg';
import { useState } from "react";
const services = require('../../service/user_service');

const fnameRegex = new RegExp(/^[A-Z]{1}[a-z]{2,}/);
const lnameRegex = new RegExp(/^[A-Z]{1}[a-z]{2,}/);
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPswd = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);


const Register = () => {

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [cpswd, setCpswd] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pswdError, setPswdError] = useState("");
  const [cpswdError, setCpswdError] = useState("");

  const fnameValidate = (value) => {
    
    const fname = value;
    if (!fnameRegex.test(fname)) {
      console.log("not match");
      setFnameError("First Name is Invalid")
      return false;
    } else {
      setFnameError("");
      return true;
    }
  }

  const firstNameChange = (event) => {
    setFname(event.target.value);
    fnameValidate(event.target.value);
  }

  const lnameValidate = (value) => {
    const lname = value;
    if (!lnameRegex.test(lname)) {
      console.log("not match");
      setLnameError("Lirst Name is Invalid")
      return false;
    } else {
      setLnameError("");
      return true;

    }
  }

  const lastNameChange = (event) => {
    setLname(event.target.value);
    lnameValidate(event.target.value);
  }

  const emailValidate = (value) => {
    const email = value;
    if (!regexEmail.test(email)) {
      console.log("not match");
      setEmailError("Email is Invalid")
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


  const pswdValidate = (value) => {
    const pswd = value;
    if (!regexPswd.test(pswd)) {
      console.log("not match");
      setPswdError("Password is Invalid")
      return false;
    } else {
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

  

  const register = () => {
    lnameValidate(lname);
    emailValidate(email);
    pswdValidate(pswd);
    cpswdValidate(cpswd);

    let values ={
      firstName: fname,
      lastName: lname,
      service: "advance",
      email: email,
      password: pswd,
    };
    if(
      fnameValidate(fname) && lnameValidate(lname) && emailValidate(email) && pswdValidate(pswd) && cpswdValidate(cpswd)
    )
    services.register(values).then((res) => {
      console.log(res);
      alert("Registered Sucseccfully")
    })
    .catch((err) => {
      console.log(err);
      alert("All Feilds are Required")
    })

  }


  return (
    <div className="register-container" >
      
        <Paper id="wholeBox" >
          <div className='gridBox'>
          <Fundoo />
          <p id="createFundoo">Create Your Fundoo Account</p>
          <p id="continue">Continue to Fundoo</p>
          <form className="" noValidate autoComplete="off">
            <TextField className="fname" id="outlined-size-small" error={fnameError.length !== 0} value={fname} onChange={firstNameChange} helperText={fnameError} label="First Name" variant="outlined" size="small" />
            <TextField className="lname" id="outlined-size-small" error={lnameError.length !== 0} value={lname} onChange={lastNameChange} helperText={lnameError} label="Last Name" variant="outlined" size="small" />
            <TextField id="outlined-full-width" label="Username" error={emailError.length !== 0} value={email} onChange={emailChange} helperText={emailError} helperText="You can use Letters and Numbers" fullWidth size="small" margin="normal" variant="outlined" />
            <TextField className="paswd" id="outlined-size-small" error={pswdError.length !== 0} value={pswd} onChange={pswdChange} helperText={pswdError} type="password" label="Password" variant="outlined" size="small" />
            <TextField className="cnfpswd" id="outlined-size-small" error={cpswdError.length !== 0} value={cpswd} onChange={cpswdChange} helperText={cpswdError} type="password" label="Confirm Password" variant="outlined" size="small" />
          </form>
          <div className="endPart" >
            <p id="create">Sign in Instead</p>
            <Button variant="contained" id="button" onClick={register} >Next</Button>
          </div>
          </div>
          <div className="googleImage">
            <img id="gImage" src={googleImage} alt="gImage" />
            <span id="oneAcc" >One account. All of Google working for you.</span>
          </div>
        </Paper>
      
    </div>
  )
}

export default Register;