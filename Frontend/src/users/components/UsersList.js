import React from 'react';
import UsersItem from './UsersItem';

const UsersList = props => {

    if (props.items.length === 0)
        return <div className="center">
            <h2>No Record Found</h2>
        </div>

    return (
        <ul style={{ listStyleType: 'none' }}>
            {props.items.map(user => (
                <UsersItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places}
                />
            ))}
        </ul>
    )
}

export default UsersList;