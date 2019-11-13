import React, {Component} from 'react';
import DataTimeline from "../DataTimeline";
import data from '../data/data.json';

class DataTimelineContainer extends Component {

    state = {
        data: data
    };

    componentWillUpdate(nextProps, nextState) {
        nextState.data = data
            .filter(function (e) {
                return ((e.context === 1 && nextProps.controls.serviceChecked) ||
                    (e.context === 2 && nextProps.controls.intentionalChecked) ||
                    (e.context === 3 && nextProps.controls.incidentalChecked) ||
                    (e.context === 4 && nextProps.controls.behavioralChecked) ||
                    (e.context === 5 && nextProps.controls.derivedChecked)) &&

                    ((e.type === "text" && nextProps.controls.textChecked) ||
                        (e.type === "image" && nextProps.controls.imageChecked) ||
                        (e.type === "audio" && nextProps.controls.audioChecked) ||
                        (e.type === "video" && nextProps.controls.videoChecked) ||
                        (e.type === "location" && nextProps.controls.locationChecked)) &&

                    (e.date*1000 >= nextProps.controls.from && e.date*1000 <= nextProps.controls.to)
            });
    }

    render() {
        return (
            <DataTimeline data={this.state.data.sort(function (a, b) { return a.date - b.date; })}/>
        );
    }
}

export default DataTimelineContainer;