import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Header, Button, Dropdown, Card, Transition } from 'semantic-ui-react';


function PollCard({poll: {title, id}}) { 
    console.log(title);
    console.log(id);
    return (
        <Card>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>3 days ago</Card.Meta>
                <Card.Description>
                {id}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default PollCard;