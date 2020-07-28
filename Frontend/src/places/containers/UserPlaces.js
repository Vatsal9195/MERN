import React from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';

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

const UserPlaces = () => {

    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    return (
        <PlaceList items={loadedPlaces} />
    );
};

export default UserPlaces;