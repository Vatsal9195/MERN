import { Button, makeStyles, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../shared/Input';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utils/validators';
import { useForm } from '../../shared/hooks/form-hook';

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
})

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous skyscrapper in the world',
        image: 'https://www.fcbarcelona.com/fcbarcelona/photo/2018/08/24/406a0759-4719-4b5d-b3e4-6bf36632b8ef/LFGcLkki.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484,
            lng: -73.9857
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous skyscrapper in the world',
        image: 'https://www.fcbarcelona.com/fcbarcelona/photo/2018/08/24/406a0759-4719-4b5d-b3e4-6bf36632b8ef/LFGcLkki.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    },
]

const UpdatePlace = () => {

    const classes = useStyles();

    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        if (identifiedPlace) {
            setFormData({
                title: {
                    value: identifiedPlace.title,
                    isValid: true
                },
                description: {
                    value: identifiedPlace.description,
                    isValid: true
                }
            }, true);
        }
        return () => {
        }
    }, [setFormData, identifiedPlace])


    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    };

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could not Find Place!!</h2>
            </div>
        );
    }

    console.log(identifiedPlace.title);

    return (
        <Paper elevation={3} className={classes.root}>
            <form onSubmit={placeUpdateSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                    value={formState.inputs.title.value}
                    valid={formState.inputs.title.isValid}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                    value={formState.inputs.description.value}
                    valid={formState.inputs.description.isValid}
                />
                <Button className={classes.button} color="secondary" variant="contained" type="submit" disabled={!formState.isValid}>
                    UPDATE PLACE
                </Button>
            </form>
        </Paper>
    )


}

export default UpdatePlace;