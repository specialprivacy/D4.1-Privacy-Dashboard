import React, {Component} from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import ActionSend from 'material-ui/svg-icons/content/send';

class MessageDialog extends Component {

    render() {
        return(
            <Dialog
                open={this.props.messageOpen}
                onRequestClose={this.props.handleMessageDialoge.bind(null, false)}
                actions={[
                    <FlatButton
                        label="Cancel"
                        secondary={true}
                        onClick={this.props.handleMessageDialoge.bind(null, false)}
                    />,
                    <FlatButton
                        label="Send request"
                        icon={<ActionSend/>}
                        primary={true}
                        onClick={this.props.handleMessageDialoge.bind(null, true)}
                    />,
                ]}
            >
                <TextField
                    floatingLabelText="Message"
                    multiLine={true}
                    fullWidth={true}
                    rows={2}
                    rowsMax={7}
                    defaultValue={this.props.text}
                />
            </Dialog>
        );
    }

}

export default MessageDialog;