import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import './card.scss';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushSharpIcon from '@material-ui/icons/BrushSharp';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
const services = require('../../service/note_service.js');


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const SimpleAccordion = (props) => {

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descError, setDescError] = useState("");

  let { token } = useParams();
  console.log(token);

  const titleValidate = (value) => {
    const title = value;
    console.log(title);
    if (title.length == 0) {
      console.log("not match");
      setTitleError("Title is Empty");
      return false;
    } else {
      setTitleError("");
      return true;
    }
  }

  const titleChange = (event) => {
    setTitle(event.target.value);
    titleValidate(event.target.value);
  }

  const descValidate = (value) => {
    const desc = value;
    console.log(desc);
    if (desc.length == 0) {
      console.log("not match");
      setDescError("Description is Empty");
      return false;
    } else {
      setDescError("");
      return true;
    }
  }

  const descChange = (event) => {
    setDesc(event.target.value);
    descValidate(event.target.value);
  }

  const addNote = () => {
    titleValidate(title);
    descValidate(desc);

    let values = {
      title: title,
      description: desc,
    }

    if (
      titleValidate(title) && descValidate(desc)
    ) {
      services.addnotes(values).then((res) => {
        console.log(res);
        props.getAllNotes()
        setTitle("");
        setDesc("");
      })
        .catch((err) => {
          console.log(err);
          alert("Auth Failed");
        })

    }
  }

  return (
    <div className={classes.root} id="wholeCard">
      <Accordion className="firstCard">
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" >
          <div className="fullTitle" id="fullTitle" >
            <input id="title" value={title} onChange={titleChange} placeholder="Take a Note" />
            <div id="icons" className="icons" >
              <CheckBoxOutlinedIcon />
              <BrushSharpIcon />
              <CropOriginalIcon />
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div id="expandPart">
            <input id="Description" onChange={descChange} value={desc} placeholder="Description" />
          </div>
        </AccordionDetails>
        <AccordionDetails id="lastPart" >
          <AddAlertOutlinedIcon />
            <PersonAddOutlinedIcon />
            <ColorLensOutlinedIcon />
            <ImageOutlinedIcon />
            <ArchiveOutlinedIcon />
            <MoreVertOutlinedIcon />
            <Button id="closeButton" onClick={addNote} >Close</Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default SimpleAccordion;
