import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/Input';
import { Button, makeStyles, Paper } from '@material-ui/core'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/utils/validators';
// import './NewPlace.css';

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        marginTop: '10px',
        padding: '10px',
        width: '50%',
        overflow: 'auto'
    },
    button: {
        float: 'right'
    }
    // form: {
    //     listStyle: 'none',
    //     margin: '0 auto',
    //     padding: '1rem',
    //     width: '90%',
    //     maxWidth: '40rem',
    //     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)',
    //     borderRadius: '6px',
    //     background: 'white',
    // }
})

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default:
            return state;
    }
};

const NewPlace = () => {

    const classes = useStyles();

    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id
        });
    }, []);

    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    };

    return (
        <Paper elevation={3} className={classes.root}>
            <form onSubmit={placeSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />                
                    <Button className={classes.button} color="secondary" variant="contained" type="submit" disabled={!formState.isValid}>
                        ADD PLACE
                </Button>
            </form>
        </Paper>
    );
};

export default NewPlace;
