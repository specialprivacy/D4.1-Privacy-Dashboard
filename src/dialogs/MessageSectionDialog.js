import React, {Component} from 'react';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {Card, CardText, CardHeader} from 'material-ui/Card';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';

import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

import theme from "../data/controller.json";

class MessageSection extends Component {

    state = {
        selectedItem: null,
    };

    componentWillMount() {
        this.setState({selectedItem: theme.messages.filter(function (e) { return e.answers.length === 0; }).sort(function (a, b) { return a.date - b.date; })[0]});
    };

    xsToggleClass = (flag) => {
        if (flag) {
            this.refs["message-list"].classList.add("hidden-xs", "hidden-sm");
            this.refs["message"].classList.remove("hidden-xs", "hidden-sm");
        } else {
            this.refs["message-list"].classList.remove("hidden-xs", "hidden-sm");
            this.refs["message"].classList.add("hidden-xs", "hidden-sm");
        }
    };

    selectItem = (e) => {
        this.xsToggleClass(true);
        this.setState({selectedItem: e});
    };

    renderListItem = (e) => {
        return (
            <ListItem
                key={theme.messages.indexOf(e)}
                primaryText={e.subject}
                secondaryText={new Date(e.date).toDateString()}
                leftAvatar={<Avatar backgroundColor={theme.palette.avatarColor}>{e.subject.slice(0, 2).toUpperCase()}</Avatar>}
                onClick={this.selectItem.bind(null, e)}
            />
        );
    };

    renderCardItem = (e) => {
        return (
            <Card
                key={theme.messages.indexOf(e)}
                style={{marginBottom: "20px"}}
            >
                <CardHeader
                    title={e.subject}
                    subtitle={new Date(e.date).toDateString()}
                    avatar={<Avatar backgroundColor={theme.palette.avatarColor}>{e.subject.slice(0, 2).toUpperCase()}</Avatar>}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>{e.text}</CardText>
            </Card>
        );
    };

    render() {
        return(
            <Dialog
                title={<div>Messages to and from {theme.controller.name}</div>}
                open={this.props.messageSectionOpen}
                onRequestClose={this.props.toggleMessageSectionOpen}
                autoScrollBodyContent={true}
                contentStyle={{width: "85%", maxWidth: "none"}}
                actions={[
                    <FlatButton
                        label="Close"
                        primary={true}
                        onClick={this.props.toggleMessageSectionOpen}
                    />
                ]}
            >
                <div className="row" style={{marginTop: "20px", marginBottom: "20px"}}>
                    <div ref="message-list" className="col-md-4">
                        <List
                            style={{border: "1px solid rgb(224, 224, 224)"}}
                        >
                            <Subheader>Pending requests</Subheader>
                            <Divider/>
                            {
                                theme.messages.filter(function (e) {
                                    return e.answers.length === 0;
                                }).sort(function (a, b) {
                                    return a.date - b.date;
                                }).map(this.renderListItem)
                            }
                            <Divider/>
                            <Subheader>Answered requests</Subheader>
                            <Divider/>
                            {
                                theme.messages.filter(function (e) {
                                    return e.answers.length > 0;
                                }).sort(function (a, b) {
                                    return a.date - b.date;
                                }).map(this.renderListItem)
                            }
                        </List>
                    </div>
                    <div ref="message" className="col-md-8 hidden-xs hidden-sm">
                        <Toolbar
                            style={{
                                height: "48px",
                                boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px",
                                backgroundColor: theme.palette.accent1Color,
                                color: "white"
                            }}>
                            <IconButton
                                tooltip="Back to messages"
                                className="visible-xs visible-sm"
                                onClick={this.xsToggleClass.bind(null, false)}
                            >
                                <ArrowBack/>
                            </IconButton>
                            <ToolbarTitle text={
                                <span>
                                    {this.state.selectedItem.subject}
                                    from {new Date(this.state.selectedItem.date).toDateString()}
                                    <small>{(this.state.selectedItem.answers.length === 0) ? " (open)" : " (answered)"}</small>
                                </span>}
                            />
                        </Toolbar>
                        {
                            this.state.selectedItem.answers.sort(function (a, b) {
                                return b.date - a.date;
                            }).map(this.renderCardItem)
                        }
                        { this.renderCardItem(this.state.selectedItem) }
                    </div>
                </div>
            </Dialog>
        );
    }

}

export default MessageSection;