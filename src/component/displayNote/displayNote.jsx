import React, { useState, useEffect } from 'react';
import './displayNoote.scss';
import FormDialog from '../dialog/dialog.jsx';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardIcons from '../card-Icons/cardIcons.jsx';


const DisplayNote = (props) => {
    const [open, setOpen] = React.useState(false);
    const [card, setCard] = React.useState({});

    const openDialog = (note) => {
        setOpen(true);
        console.log(note);
        setCard(note);
    }

    const handleClose = () => {
        console.log("calling close");
        setOpen(false);
      };

    return (
        <>
            <div className="displayCard" >
                {props.notes.filter(item => item.isDeleted === false).map((note) => (
                    <Card key={note.id} >
                        <CardContent>
                            <h4 onClick={() => openDialog(note)} >{note.title} </h4>
                            <p>{note.description}</p>
                            <CardIcons note={note} getAllNotes={props.getAllNotes} />
                        </CardContent>

                    </Card>
                ))}
            </div>
            <FormDialog open={open} close={handleClose} note={card} getAllNotes={props.getAllNotes} />
        </>
    )
}

export default DisplayNote;

