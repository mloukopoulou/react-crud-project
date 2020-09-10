import React from 'react';
import {Link, Route, Switch, NavLink} from 'react-router-dom';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    link: {
        color:'#FFFFFF'
    },

});

export default function NavBar(props) {
    const classes = useStyles();

    return (
        <nav className="navBar">
            <ul>
                <li><NavLink exact to="/">Αρχική</NavLink></li>
                <li><NavLink to="/AddStudent">Εισαγωγή Μαθητή</NavLink></li>
            </ul>
        </nav>
    );
};