import React, {useEffect, useState} from 'react';

import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import { useHistory } from "react-router-dom";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function AddStudent(props) {
    const classes = useStyles();
    const history = useHistory();

    const [student, setStudent] = useState({});

    const handleInputChange = event => {
        const { name, value } = event.target;
        event.persist();

        setStudent({ ...student, [name]: value })
    };

    const saveStudent = async (rowData) => {
        const result = await axios.put(process.env.REACT_APP_API_URL + '/students', rowData);

        if (result.status !== 200) {
            alert('Πρόβλημα κατά την επικοινωνία με την βάση.');
        }

        history.push("/");
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (!student.first_name || !student.last_name) {
            alert('Πρέπει να συμπληρώσετε όλα τα πεδία της φόρμας');
            return;
        }
        saveStudent(student);
    };

    return (
        <>
            <br></br>
            <Typography variant="subtitle1" gutterBottom>
                Εισαγωγή Νέου Μαθητή
            </Typography>
            <br></br>
            <form className={classes.root} noValidate autoComplete="off"
                onSubmit={handleOnSubmit}>
                <div>
                    <label>Όνομα</label>
                    <TextField id="first_name" name="first_name" variant="outlined" onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Επίθετο</label>
                    <TextField id="last_name" name="last_name" variant="outlined" onChange={handleInputChange}/>
                </div>
                   <Button variant="outlined" color="primary" type="submit">Εισαγωγή</Button>
            </form>
        </>
    );
}