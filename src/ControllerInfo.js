import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import theme from "./data/controller.json";

class ControllerInfo extends Component {

    render() {
        return(
            <List>
                <Subheader>Logo:</Subheader>
                <ListItem style={{textAlign: "center"}}><img src={theme.controller.logo} alt=""/></ListItem>
                <Subheader>Name:</Subheader>
                <ListItem primaryText={theme.controller.name}/>
                <Subheader>Address:</Subheader>
                <ListItem primaryText={<span>{theme.controller.address}</span>}/>
                <Subheader>Email address:</Subheader>
                <ListItem primaryText={<a href={theme.controller.email}>support@example.com</a>}/>
            </List>
        );
    }

}

export default ControllerInfo;