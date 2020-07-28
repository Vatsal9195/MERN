import { Button } from '@material-ui/core';
import React from 'react';
import PlaceItem from './PlaceItem';

const PlaceList = props => {

    if (props.items.length === 0)
        return <div className="center">
            <h2>No Record Found. May be Create one?</h2>
            <Button varient="inherit">Share Place</Button>
        </div>

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