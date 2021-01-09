import React, { useState, useEffect } from 'react';
import './displayTrashNote.scss';
import FormDialog from '../dialog/dialog.jsx';
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardIcons from '../card-Icons/cardIcons.jsx';


const DisplayTrashNote = (props) => {

    return (
        <>
            <div className="displayCard" >
                {props.trash.filter(item => item.isDeleted === true).map((trashNote) => (
                    <Card key={trashNote.id} >
                        <CardContent>
                            <h4 >{trashNote.title} </h4>
                            <p>{trashNote.description}</p>
                            <CardIcons />
                        </CardContent>

                    </Card>
                ))}
            </div>
            <FormDialog   />
        </>
    )
}

export default DisplayTrashNote;

