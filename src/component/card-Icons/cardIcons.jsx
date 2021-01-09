import React from 'react';
import './cardIcons.scss';
import MenuListComposition from '../changeColor/changeColor';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
const services = require('../../service/note_service.js');

const CardIcons = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
      };

    const archiveCard = () => {
        let values = { isArchived: true, noteIdList: [props.note.id] }
        console.log(props.note.id);
        services.archiveNotes(values).then((res) => {
            console.log(res);
            props.getAllNotes();
        })
            .catch((err) => {
                console.log(err);
                alert("Archive Failed");
            })
    }

    const deleteNote = () => {
        let values = { isDeleted: true, noteIdList: [props.note.id] }
        console.log(values.isDeleted);
        services.deletenotes(values).then((res) => {
            console.log(res);
            props.getAllNotes();
        })
            .catch((err) => {
                console.log(err);
                alert("Delete Failed");
            })
    }
    const stateChange = () => {
        setOpen(false);
    }
    return (
        <>
            <div className="cardIcons">
                <AddAlertOutlinedIcon />
                <PersonAddOutlinedIcon />
                <MenuListComposition open={open} stateChange={stateChange}  />
                <ImageOutlinedIcon />
                <ArchiveOutlinedIcon onClick={archiveCard} />
                <MoreVertOutlinedIcon onClick={deleteNote} />
            </div>
            
        </>
    )
}

export default CardIcons;