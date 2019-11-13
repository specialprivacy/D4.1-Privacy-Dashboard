import React, {Component} from 'react';
import './styles/App.css';
import FilterControls  from './controls/FilterControls';
import GeneralControls  from './controls/GeneralControls';
import DataTimelineContainer from './container/DataTimelineContainer';
import ControllerInfo from './ControllerInfo';
import MessageSection from './dialogs/MessageSectionDialog';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import {Card, CardText} from 'material-ui/Card';
import Badge from 'material-ui/Badge';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import DirectionsRun from 'material-ui/svg-icons/maps/directions-run';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

import getMuiTheme from "material-ui/styles/getMuiTheme";
import theme from "./data/controller.json";

const muiTheme = getMuiTheme(theme);

class App extends Component {

    state = {
        open: false,

        controls: {
            // processing context
            serviceChecked: true,
            intentionalChecked: true,
            incidentalChecked: true,
            behavioralChecked: true,
            derivedChecked: true,

            // data types
            textChecked: true,
            imageChecked: true,
            audioChecked: true,
            videoChecked: true,
            locationChecked: true,

            // time range
            from: 0,
            to: Date.now(),
        },

        numberMessages: 0,
        showMessageBadge: false,
        messageSectionOpen: false
    };

    handleToggle = () => this.setState({open: !this.state.open});

    toggleChecked = (isInputChecked, newState, event) => {
        this.setState({controls: Object.assign(this.state.controls, newState.controls)});
        this.forceUpdate();
    };

    setTimerange = (event, origin, e, newDate) => {
        if (origin < 1) {
            this.setState({controls: Object.assign(this.state.controls, {from: Date.parse(newDate)})});
        } else {
            this.setState({controls: Object.assign(this.state.controls, {to: Date.parse(newDate)})});
        }
        this.forceUpdate();
    };

    toggleMessageSectionOpen = () => {
        this.setState({messageSectionOpen: !this.state.messageSectionOpen});
    };

    render() {
        const iconMenu = <div>
            <Badge
                badgeContent={this.state.numberMessages}
                secondary={true}
                badgeStyle={{top: -4, right: -4,zIndex: 9}}
                style={{padding: 0, display: (this.state.showMessageBadge) ? "inline-block" : "none"}}
            >
                <IconButton
                    iconStyle={{color: "white"}}
                    onClick={this.toggleMessageSectionOpen}
                >
                    <CommunicationEmail/>
                </IconButton>
            </Badge>
            <IconButton
                iconStyle={{color: "white"}}
                style={{display: (this.state.showMessageBadge) ? "none" : "inline-block"}}
                onClick={this.toggleMessageSectionOpen}
            >
                <CommunicationEmail/>
            </IconButton>
            <IconMenu
                iconButtonElement={<IconButton iconStyle={{color: "white"}}><MoreVertIcon/></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem leftIcon={<AccountCircle/>}>My profile</MenuItem>
                <MenuItem leftIcon={<Settings/>}>Settings</MenuItem>
                <MenuItem leftIcon={<DirectionsRun/>}>Logout</MenuItem>
            </IconMenu>
        </div>;

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="container-fluid">
                    <div className="row">
                        <AppBar
                            title="Privacy dashboard"
                            className="hidden-xs hidden-sm"
                            showMenuIconButton={false}
                            style={{display: "flex"}}
                            iconElementRight={iconMenu}
                        />
                        <AppBar
                            title="Privacy dashboard"
                            className="hidden-md hidden-lg"
                            showMenuIconButton={true}
                            style={{display: "flex"}}
                            iconElementRight={iconMenu}
                            onLeftIconButtonTouchTap={this.handleToggle}
                        >
                            <Drawer open={this.state.open} width="75%">
                                <AppBar
                                    title="Privacy dashboard"
                                    className="hidden-md hidden-lg"
                                    showMenuIconButton={true}
                                    style={{display: "flex"}}
                                    onLeftIconButtonTouchTap={this.handleToggle}
                                />
                                <GeneralControls />
                                <FilterControls
                                    controls={this.state.controls}
                                    toggleChecked={this.toggleChecked}
                                    setTimerange={this.setTimerange}
                                />
                            </Drawer>
                        </AppBar>
                        <MessageSection
                            messageSectionOpen={this.state.messageSectionOpen}
                            toggleMessageSectionOpen={this.toggleMessageSectionOpen}
                        />
                    </div>
                    <div className="row" style={{marginTop: "20px"}}>
                        <div className="col-md-4 col-lg-3 hidden-xs hidden-sm">
                            <Card style={{marginBottom: "20px"}}>
                                <CardText>
                                    <GeneralControls />
                                </CardText>
                            </Card>
                            <Card>
                                <CardText>
                                    <FilterControls
                                        controls={this.state.controls}
                                        toggleChecked={this.toggleChecked}
                                        setTimerange={this.setTimerange}
                                    />
                                </CardText>
                            </Card>
                        </div>
                        <div className="col-md-3 col-md-push-5 col-lg-3 col-lg-push-6">
                            <Card>
                                <CardText>
                                    <ControllerInfo/>
                                </CardText>
                            </Card>
                        </div>
                        <div className="col-md-5 col-md-pull-3 col-lg-6 col-lg-pull-3">
                            <DataTimelineContainer
                                controls={this.state.controls}
                            />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;