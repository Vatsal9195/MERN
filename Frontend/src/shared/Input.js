import { makeStyles, TextField } from '@material-ui/core';
import React, { useReducer, useEffect } from 'react';

import { validate } from './utils/validators';
// import './Input.css';

const useStyles = makeStyles({
    root: {
        margin: '10px 0px 20px 0'
    },
    textField: {
        width: '100%'
    }
})

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};

const Input = props => {

    const classes = useStyles();

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value || '',
        isTouched: false,
        isValid: props.valid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    // const element =
    //     props.element === 'input' ? (
    //         <input
    //             id={props.id}
    //             type={props.type}
    //             placeholder={props.placeholder}
    //             onChange={changeHandler}
    //             onBlur={touchHandler}
    //             value={inputState.value}
    //         />
    //     ) : (
    //             <textarea
    //                 id={props.id}
    //                 rows={props.rows || 3}
    //                 onChange={changeHandler}
    //                 onBlur={touchHandler}
    //                 value={inputState.value}
    //             />
    //         );

    
    // console.log(inputState);
    const element =
        props.element === 'input' ? (
            <TextField
                id={props.id}
                className={classes.textField}
                type={props.type}
                label={props.label}
                variant="outlined"
                // placeholder={props.value}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
                error={!inputState.isValid && inputState.isTouched && true}
                helperText={!inputState.isValid && inputState.isTouched && props.errorText}
            />
        ) : (
                <TextField
                    id={props.id}
                    className={classes.textField}
                    label={props.label}
                    variant="outlined"
                    multiline
                    rows={props.rows || 3}
                    // placeholder={props.value}
                    onChange={changeHandler}
                    onBlur={touchHandler}
                    value={inputState.value}
                    error={!inputState.isValid && inputState.isTouched && true}
                    helperText={!inputState.isValid && inputState.isTouched && props.errorText}
                />
            );

    return (
        <div className={classes.root}>
            {element}
        </div>
        // <div
        //     className={`form-control ${!inputState.isValid && inputState.isTouched &&
        //         'form-control--invalid'}`}
        // >
        //     <label htmlFor={props.id}>{props.label}</label>
        //     {element}
        //     {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        // </div>
    );
};

export default Input;
