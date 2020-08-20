import { Button, Paper } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import PlaceItem from './PlaceItem';

const PlaceList = props => {

    if (props.items.length === 0)
        return <Paper elevation={3} style={{ width: '50%', margin: 'auto', marginTop: '20px', padding: '10px' }}>
            <div className="center">
                <h2>No Record Found. May be Create one?</h2>
                <Link to="/places/new" style={{ textDecoration: 'none' }}>
                    <Button variant="contained" color="secondary"> Share Place</Button>
                </Link>
            </div>
        </Paper>

    return (
        <ul style={{ listStyleType: 'none' }}>
            {props.items.map(place => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            ))}
        </ul>
    )
}

export default PlaceList;