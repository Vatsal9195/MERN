import React from 'react';
import UsersList from '../components/UsersList';

const USERS = [
    {
        id: 'u1',
        name: 'John Doe',
        image: 'https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg',
        places: 3
    }
]

const Users = () => {


    return <UsersList items={USERS} />
};

export default Users;