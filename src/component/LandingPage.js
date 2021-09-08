import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
    formControl: {
        minWidth: '30ch',
    },
}));

function LandingPage(props) {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);
    const classes = useStyles();

    return (
        <div>

            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" readOnly label="Celsius" color="secondary" value={props.celc} /> <br />
                <TextField id="standard-basic" readOnly label="Fahrenheit" color="secondary" value={props.fahr} />
            </form>
        </div>
    );
}

export default LandingPage