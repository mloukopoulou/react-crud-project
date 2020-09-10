import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
}));

export default function EditStudent(props) {
    const classes = useStyles();
    const history = useHistory();

    let studentId = props.match.params.studentId;

    const [student, setStudent] = useState({});

    useEffect(() => {
        const getStudent = async () => {
            const result = await axios(process.env.REACT_APP_API_URL + '/students/' + studentId)

            if (result.status !== 200) {
                alert('Πρόβλημα κατά την επικοινωνία με την βάση.');
            }
            setStudent(result.data);
        };

        getStudent();
    }, [studentId]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        event.persist();

        setStudent({ ...student, [name]: value })
    };

    const updateStudent = async (rowData) => {
        const result = await axios.post(process.env.REACT_APP_API_URL + '/students/' + studentId, rowData);

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
        updateStudent(student);
    };

    return (
        <>
            <br></br>
            <Typography variant="subtitle2" gutterBottom>
                Επεξεργασία μαθητή με κωδικό {studentId}
            </Typography>
            <br></br>
            <form className={classes.root} noValidate autoComplete="off"
                  onSubmit={handleOnSubmit}>
                <div>
                    <label>Όνομα</label>
                    <TextField id="first_name" name="first_name" variant="outlined" value={student.first_name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Επίθετο</label>
                    <TextField id="last_name" name="last_name" variant="outlined" value={student.last_name} onChange={handleInputChange}/>
                </div>
                <Button variant="contained" color="primary" type="submit" endIcon={<SaveIcon />}>Αποθήκευση</Button>
            </form>
        </>
    );
}