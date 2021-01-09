import React from 'react';
import MiniDrawer from '../appbar/appbar.jsx';
import './dashboard.scss';
import { makeStyles } from '@material-ui/core/styles';



const Dashboard = () => {
    return (
        <div className="contain">
            <div className="appbar">
                <MiniDrawer />
            </div>
        </div>
    )
};

export default Dashboard;