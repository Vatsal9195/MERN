import { Button, makeStyles, Paper, CircularProgress, Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
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

    const [isLoginMode, setisLoginMode] = useState(true);
    const [isLoading, setisLoading] = useState(false);
    const [error, seterror] = useState(null);

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

    const authenticationSubmitHandler = async event => {
        event.preventDefault();
        setisLoading(true);
        if (isLoginMode) {
            try {
                const response = await fetch('http://localhost:5000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                })
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                console.log(responseData);
                setisLoading(false);
                auth.login();
            } catch (err) {
                setisLoading(false);
                seterror(err.message || 'Something went Wrong!!');
            }
        }
     else {
        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })
            })
                const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message);
    }
    console.log(responseData);
    setisLoading(false);
    auth.login();
} catch (err) {
    setisLoading(false);
    seterror(err.message || 'Something went Wrong!!');
}
        }
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
            {isLoading ? <CircularProgress /> : <React.Fragment>
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
                    <Collapse in={!!error}>
                        <Alert severity="error">{error}</Alert>
                    </Collapse>
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }} disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                    <hr />
                    <div>
                        <h5 className={classes.signup} onClick={switchLoginHandler}>Dont have an Account? Signup</h5>
                    </div>
                </form></React.Fragment>}
        </Paper>
    </React.Fragment>
)
};

export default Auth;