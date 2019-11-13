import React, {Component} from 'react';

import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';

import EventNote from 'material-ui/svg-icons/notification/event-note';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Assignment from 'material-ui/svg-icons/action/assessment';
import Fingerprint from 'material-ui/svg-icons/action/fingerprint';
import Hearing from 'material-ui/svg-icons/av/hearing';
import Visibility from 'material-ui/svg-icons/action/visibility';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';

import TextFormat from 'material-ui/svg-icons/content/text-format';
import InsertPhoto from 'material-ui/svg-icons/editor/insert-photo';
import AudioTrack from 'material-ui/svg-icons/image/audiotrack';
import PlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import LocationOn from 'material-ui/svg-icons/communication/location-on';

class FilterControls extends Component {

    render() {
        const tooltipPosition = "top-center";
        const tooltipStyles = { };

        return (
            <List>
                <Subheader>Processing context</Subheader>
                <ListItem
                    primaryText="Service data"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.serviceChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {serviceChecked: !this.props.controls.serviceChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="This is any data that is required in order to provide the service in question (e.g., name, address, payment information)."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <Assignment/>
                    </IconButton>}
                />
                <ListItem
                    primaryText="Data I provided"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.intentionalChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {intentionalChecked: !this.props.controls.intentionalChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="This includes any data you provided to the service intentionally (e.g., posts, likes, shares, comments, search queries)."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <Fingerprint/>
                    </IconButton>}
                />
                <ListItem
                    primaryText="Data of me provided by others"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.incidentalChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {incidentalChecked: !this.props.controls.incidentalChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="This shows data, which other users or other kinds of sources provided about you."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <Hearing/>
                    </IconButton>}
                />
                <ListItem
                    primaryText="Data of my behavior"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.behavioralChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {behavioralChecked: !this.props.controls.behavioralChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="This shows any data the service provider observes about you while you use the service (e.g., browsing behavior)."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <Visibility/>
                    </IconButton>}
                />
                <ListItem
                    primaryText="Infered data about me"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.derivedChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {derivedChecked: !this.props.controls.derivedChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="Shows data, which is derived from other data (e.g., profiles for marketing, location tracks, possible preferences)."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <ActionTimeline/>
                    </IconButton>}
                />

                <Divider/>
                <Subheader>Data type</Subheader>
                <ListItem
                    primaryText="Text"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.textChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {textChecked: !this.props.controls.textChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="Show or hide text data."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <TextFormat/>
                    </IconButton>}
                />
                <ListItem
                    primaryText="Image"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.imageChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {imageChecked: !this.props.controls.imageChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="Show or hide images."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <InsertPhoto/>
                    </IconButton>}
                />
                <ListItem
                    primaryText="Audio"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.audioChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {audioChecked: !this.props.controls.audioChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="Show or hide audio records."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <AudioTrack/>
                    </IconButton>}
                />
                <ListItem
                    primaryText="Video"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.videoChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {videoChecked: !this.props.controls.videoChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="Show or hide videos."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <PlayCircleFilled/>
                    </IconButton>}
                />
                <ListItem
                    primaryText="Location"
                    leftCheckbox={<Checkbox
                        checked={this.props.controls.locationChecked}
                        onCheck={this.props.toggleChecked.bind(null, null, {controls: {locationChecked: !this.props.controls.locationChecked}})}
                    />}
                    rightIconButton={<IconButton
                        tooltip="Show or hide location data."
                        tooltipPosition={tooltipPosition}
                        tooltipStyles={tooltipStyles}
                        touch={true}>
                        <LocationOn/>
                    </IconButton>}
                />

                <Divider/>
                <Subheader>Time range</Subheader>
                <ListItem rightIconButton={<IconButton
                    tooltip="Select a time range to review data from a specific time period."
                    tooltipPosition={tooltipPosition}
                    tooltipStyles={tooltipStyles}
                    touch={true}>
                    <ActionInfo/>
                </IconButton>}>
                    <DatePicker
                        hintText={<div><EventNote className="event-note" /><div style={{float: "left"}}>from</div></div>}
                        onChange={this.props.setTimerange.bind(null, null, 0)}
                        value={new Date(this.props.controls.from)}
                    />
                    <DatePicker
                        hintText={<div><EventNote className="event-note" /><div style={{float: "left"}}>to</div></div>}
                        onChange={this.props.setTimerange.bind(null, null, 1)}
                        value={new Date(this.props.controls.to)}
                    />
                </ListItem>
            </List>
        );
    };

}

export default FilterControls;