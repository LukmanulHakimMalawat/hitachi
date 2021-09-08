import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LandingPage from './LandingPage';

const redux = require('redux');

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '30ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '30ch',
    },
}));

function Location() {
    // Declare a new state variable, which we'll call "count"
    const [flag, setFlag] = useState(false);
    const classes = useStyles();
    const defaultApiKey = 'ff9f895b2e884d6680530135202710';
    const [city, setCity] = useState('');
    const [open, setOpen] = useState(false);
    const [celc, setCelc] = useState('');
    const [fahr, setFahr] = useState('');

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        fetch("http://api.weatherapi.com/v1/current.json?key= " + defaultApiKey + "&q=" + city)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCelc(result.current.temp_c)
                    setFahr(result.current.temp_f)

                    const createStore = redux.createStore;

                    const initState = {
                        celci: result.current.temp_c,
                        fahre: result.current.temp_f
                    }

                    const rootReducer = (state = initState, action) => {
                        return state;
                    }

                    const store = createStore(rootReducer);
                    setFlag(true)
                    console.log(store.getState());
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            {flag ? <LandingPage celc={celc} fahr={fahr} /> : <form className={classes.root} noValidate autoComplete="off">
                <TextField id="standard-basic" readOnly label="Your API Key" value={defaultApiKey} color="secondary" /> <br />
                <FormControl className={classes.formControl} color="secondary">
                    <InputLabel id="demo-controlled-open-select-label">City Name</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={city}
                        onChange={handleChange}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Kuala Lumpur'}>Kuala Lumpur</MenuItem>
                        <MenuItem value={'Singapore'}>Singapore</MenuItem>
                    </Select>
                </FormControl> <br />
                <Button onClick={handleSubmit}
                    variant="contained" color="secondary">
                    Submit
                </Button>
            </form>}
        </div>
    );
}

export default Location