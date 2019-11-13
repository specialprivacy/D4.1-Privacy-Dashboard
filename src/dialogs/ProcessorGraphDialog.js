import React, {Component} from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Graph from 'react-graph-vis';

class ProcessorGraphDialog extends Component {

    render() {

        var graph = {
            nodes: [
                {id: 1, label: "You", level: 0},
                {id: 2, label: "Controller", level: 1},
                {id: 3, label: "Processor", level: 2},
                {id: 4, label: "Processor", level: 2},
                {id: 5, label: "Processor", level: 2},
                {id: 6, label: "Processor", level: 3},
                {id: 7, label: "Processor", level: 3},
                {id: 8, label: "Processors", level: 2},
            ],
            edges: [
                {from: 1, to: 2, label: "Service data \n Data you provide \n Data of your behavior"},
                {from: 2, to: 3, label: "Service data"},
                {from: 2, to: 4, label: "Service data"},
                {from: 2, to: 5, label: "Service data \n Data of your behavior"},
                {from: 2, to: 8, label: "Data of your behavior \n Derived data"},
                {from: 5, to: 6, label: "Service data \n Derived data"},
                {from: 5, to: 7, label: "Derived data"},
            ]
        };

        var options = {
            layout: {
                hierarchical: {
                    enabled: true,
                    direction: "LR",
                    levelSeparation: 250
                }
            },
            nodes: {
                color: {
                    border: "#000",
                    background: "#fff"
                },
                shape: "circle",
                font: {
                    size: 16,
                }
            },
            edges: {
                color: "#000",
                font: {
                    size: 16,
                },
            }
        };

        return(
            <Dialog
                title="Internal and external data flows"
                open={this.props.graphOpen}
                onRequestClose={this.props.toggleGraph}
                contentStyle={{width: "85%", maxWidth: "none"}}
                autoDetectWindowHeight={false}
                actions={[
                    <FlatButton
                        label="Close"
                        primary={true}
                        onClick={this.props.toggleGraph}
                    />
                ]}
            >
                <Graph
                    graph={graph}
                    options={options}
                    style={{height: Math.ceil((window.innerHeight / 100) * 50) + "px"}}
                />
            </Dialog>
        );
    }

}

export default ProcessorGraphDialog;