import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Students from "./components/Students";
import AddStudent from "./components/AddStudent";
import EditStudent from "./components/EditStudent";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import NavBar from './components/NavBar';
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    appbar: {
        backgroundColor:'#007ED8'
    },
    root: {
        display: 'flex',
    },
});

function App() {
    const classes = useStyles();
      return (
          <div className={classes.root}>
              <Container maxWidth="xl">

                  <Router>

                      <AppBar position="static" className={classes.appbar}>
                          <Toolbar>
                              <Typography variant="h6">

                                  <NavBar />
                              </Typography>
                          </Toolbar>
                      </AppBar>
                      <Switch>
                          <Route exact path="/" component={Students} />
                          <Route path="/AddStudent" component={AddStudent}/>
                          <Route path="/EditStudent/:studentId" component={EditStudent}/>
                      </Switch>
                  </Router>


              </Container>
          </div>
    );
}

export default App;
