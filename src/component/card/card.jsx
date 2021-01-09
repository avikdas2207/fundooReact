import React from 'react';
import './card.scss';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import BrushSharpIcon from '@material-ui/icons/BrushSharp';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';


export default function SimpleCard() {

  return (
    <Card className="cardFirst" >
        <input id="inputFirst" placeholder="Take a Note" />
        <div className="iconArea">
        <CheckBoxOutlinedIcon />
        <BrushSharpIcon />
        <CropOriginalIcon />
        </div>
    </Card>
  );
}
