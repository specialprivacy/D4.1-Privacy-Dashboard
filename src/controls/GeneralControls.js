import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import ConsentDialog from "../dialogs/ConsentDialog";
import PrivacyPolicyDialog from "../dialogs/PrivacyPolicyDialog";
import ProcessorGraphDialog from "../dialogs/ProcessorGraphDialog";

import Description from 'material-ui/svg-icons/action/description';
import AccountBalance from 'material-ui/svg-icons/action/account-balance';
import DeviceHub from 'material-ui/svg-icons/hardware/device-hub';

import theme from "../data/controller.json";

class GeneralControls extends Component {

    state = {
        consentOpen: false,
        policyOpen: false,
        graphOpen: false,
    };

    toggleConsent = () => {
        this.setState({consentOpen: !this.state.consentOpen});
    };

    togglePolicy = () => {
        this.setState({policyOpen: !this.state.policyOpen});
    };

    toggleGraph = () => {
        this.setState({graphOpen: !this.state.graphOpen});
    };

    render() {
        return(
            <List>
                <Subheader>General</Subheader>
                <ListItem
                    primaryText="Review consent"
                    leftIcon={<Description color={theme.palette.primary1Color}/>}
                    onClick={this.toggleConsent}
                />
                <ListItem
                    primaryText="Privacy policy"
                    leftIcon={<AccountBalance color={theme.palette.primary1Color}/>}
                    onClick={this.togglePolicy}
                />
                <ListItem
                    primaryText="Involved third parties"
                    leftIcon={<DeviceHub color={theme.palette.primary1Color}/>}
                    onClick={this.toggleGraph}
                />

                <ConsentDialog
                    consentOpen={this.state.consentOpen}
                    toggleConsent={this.toggleConsent}
                />

                <PrivacyPolicyDialog
                    policyOpen={this.state.policyOpen}
                    togglePolicy={this.togglePolicy}
                />

                <ProcessorGraphDialog
                    graphOpen={this.state.graphOpen}
                    toggleGraph={this.toggleGraph}
                />

            </List>
        );
    }

}

export default GeneralControls;