import React, { useEffect, useState } from 'react';
import './dialog.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardIcons from '../card-Icons/cardIcons';
const services = require('../../service/note_service.js');

const FormDialog = (props) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descError, setDescError] = useState("");
    console.log("in Dialog", props.note);
    useEffect(()=>{
        setTitle(props.note ? props.note.title : "");
    },[props.note])
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
    let titleUpdate = (event) => {
        setTitle(event.target.value);
        console.log(event.target.value)
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
    const descUpdate = (event) => {
        setDesc(event.target.value);
        console.log(event.target.value);
    }

    const updateNote = () => {
        let values = {
            title: title,
            description: desc,
            noteId: props.note.id
        }
        if (titleValidate(title) && descValidate(desc)) {
            services.updatenotes(values).then((res) => {
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

    const onClick = (event) => {
        props.close();
        updateNote();
    }

    return (
        <div>
            <Dialog open={props.open} id="dialogContainer" aria-labelledby="form-dialog-title">
                <DialogContent>
                    <input className="title" value={title} onChange={titleUpdate} ></input>
                    <input className="desc" value={desc} onChange={descUpdate} ></input>
                </DialogContent>
                <DialogActions>
                    <CardIcons />
                    <Button onClick={onClick} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;
