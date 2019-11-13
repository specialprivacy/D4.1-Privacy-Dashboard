import React, {Component} from 'react';

import MessageDialog from './dialogs/MessageDialog';

import {Timeline, TimelineEvent} from 'react-event-timeline';

import IconButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import Assignment from 'material-ui/svg-icons/action/assessment';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import Hearing from 'material-ui/svg-icons/av/hearing';
import Visibility from 'material-ui/svg-icons/action/visibility';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentClear from 'material-ui/svg-icons/content/clear';
import PanTool from 'material-ui/svg-icons/action/pan-tool';

import {Map, TileLayer, Marker} from 'react-leaflet';

import theme from "./data/controller.json";

class DataTimeline extends Component {

    state = {
        messageOpen: false,
        text: "",
    };

    toggleMessage = (text, e) => {
        this.setState({messageOpen: !this.state.messageOpen, text: text});
    };

    handleMessageDialog = (confirmed, e) => {
        this.toggleMessage("", null);
    };

    formulateMessage = (sw, purpose) => {
        var content = " Please respond to this request within one month (" + new Date(Date.now() + 2592000000).toDateString() + ") as ruled by the GDPR Article 12(3).";
        switch (sw) {
            case 1:
                content = "I hereby withdraw consent prior given for the purpose of " + purpose + " according to the GDPR Article 7(3)." + content;
                break;
            case 2:
                content = "I hereby request rectification of inaccurate personal data according to GDPR Article 16." + content;
                break;
            case 3:
                content = "I hereby request erasure of my personal data according to GDPR Article 17." + content;
                break;
            default:
                content = "";
                break;
        }
        return content;
    };

    render() {
        const iconStyle = {marginLeft: "-4px", marginTop: "-4px"};
        const iconColor = theme.palette.iconColor;
        const cardHeaderStyle = {backgroundColor: theme.palette.cardHeader1Color, color: "white"};
        const moreMenuStyle = {position: "absolute", top: "12px", right: "12px"};
        const moreButtonStyle = {minWidth: "auto", height: "auto", lineHeight: "auto"};
        const menuOrigin = {horizontal: 'right', vertical: 'top'};
        const typeArray = {
            1: <Assignment style={iconStyle}/>,
            2: <Fingerprint style={iconStyle}/>,
            3: <Hearing style={iconStyle}/>,
            4: <Visibility style={iconStyle}/>,
            5: <ActionTimeline style={iconStyle}/>
        };

        return (
            <Timeline style={{position: "relative", padding: "10px 2px", width: "95%", margin: "0px auto"}}>
                {
                    this.props.data.map(function (self, e) {
                        var content;
                        switch (e.type) {
                            case "image":
                                content = <img className="img-responsive img-thumbnail" src={e.data} style={{width: "100%"}} alt={e.title}/>;
                                break;
                            case "audio":
                                content = <audio controls style={{width: "100%"}}><source src={e.data}/></audio>;
                                break;
                            case "video":
                                content = <video className="img-thumbnail" controls style={{width: "100%"}}><source src={e.data}/></video>;
                                break;
                            case "location":
                                content = <Map className="img-thumbnail"
                                               center={e.data}
                                               zoom={18}
                                               zoomControl={false}
                                               animate={false}
                                               dragging={false}
                                               touchZoom={false}
                                               doubleClickZoom={false}
                                               scrollWheelZoom={false}
                                               boxZoom={false}
                                               keyboard={false}
                                               tap={false}
                                >
                                    <TileLayer
                                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={e.data}/>
                                </Map>;
                                break;
                            default:
                                content = e.data;
                        }

                        return (
                            <TimelineEvent
                                key={e.key}
                                title={e.title}
                                createdAt={new Date(e.date*1000).toDateString()}
                                icon={typeArray[e.context]}
                                iconColor={iconColor}
                                cardHeaderStyle={cardHeaderStyle}
                                container="card"
                                buttons={<IconMenu
                                    iconButtonElement={<IconButton style={moreButtonStyle}><MoreVertIcon style={{color: "white"}}/></IconButton>}
                                    style={moreMenuStyle}
                                    targetOrigin={menuOrigin}
                                    anchorOrigin={menuOrigin}
                                >
                                    <MenuItem primaryText={<div><b>Purpose:</b><br/>{e.purpose}</div>}/>
                                    <Divider/>
                                    <MenuItem leftIcon={<PanTool/>} onClick={self.toggleMessage.bind(null, self.formulateMessage(1, e.purpose))}>Withdraw consent</MenuItem>
                                    <MenuItem leftIcon={<ContentCreate/>} onClick={self.toggleMessage.bind(null, self.formulateMessage(2, ""))}>Rectify</MenuItem>
                                    <MenuItem leftIcon={<ContentClear/>} onClick={self.toggleMessage.bind(null, self.formulateMessage(3, ""))}>Erase</MenuItem>
                                </IconMenu>}>
                                    {content}
                            </TimelineEvent>
                        );
                    }.bind(null, this))
                }
                <MessageDialog
                    messageOpen={this.state.messageOpen}
                    text={this.state.text}
                    handleMessageDialoge={this.handleMessageDialog}
                />
            </Timeline>
        );
    }

}

export default DataTimeline;