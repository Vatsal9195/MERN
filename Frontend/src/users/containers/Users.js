import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';

const Users = () => {

    const [isLoading, setisLoading] = useState(false);
    const [error, seterror] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const sendRequest = async () => {
            console.log('effect');
            setisLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/users/')

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message)
                }

                setUser(responseData);
            } catch (err) {
                seterror(err.message);
                console.log(err);
            }
            setisLoading(false);
        }
        sendRequest();
    }, []);

    return (
        <React.Fragment>
            {isLoading && <CircularProgress />}
            {!isLoading && user && <UsersList items={user.users} />}
        </React.Fragment>
    )
};

export default Users;