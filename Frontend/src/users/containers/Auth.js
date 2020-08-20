import { Button, makeStyles, Paper } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import Input from '../../shared/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';

const useStyles = makeStyles({
    root: {
        margin: 'auto',
        marginTop: '10px',
        padding: '10px',
        width: '50%',
        overflow: 'auto'
    },
    signup: {
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            color: 'red',
            textDecoration: 'underline'
        }
    }
});

const Auth = () => {

    const classes = useStyles();

    const auth = useContext(AuthContext);

    const [isLoginMode, setisLoginMode] = useState(true)

    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false);

    const authenticationSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    const switchLoginHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid);
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    }
                }, false);
        }
        setisLoginMode(prevMode => !prevMode);
    }

    return (
        <React.Fragment>
            <Paper elevation={3} className={classes.root}>
                <h2>Account Login</h2>
                <hr />
                <form onSubmit={authenticationSubmitHandler}>
                    {!isLoginMode && <Input id="name"
                        element="input"
                        type="name"
                        label="Name"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a Name"
                        onInput={inputHandler}
                    />
                    }
                    <Input
                        id="email"
                        element="input"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid Email."
                        onInput={inputHandler}
                    />
                    <Input
                        id="password"
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid Password."
                        onInput={inputHandler}
                    />
                    <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                    <hr />
                    <div>
                        <h5 className={classes.signup} onClick={switchLoginHandler}>Dont have an Account? Signup</h5>
                    </div>
                </form>
            </Paper>
        </React.Fragment>
    )
};

export default Auth;