import React, {Component} from 'react';

import MessageDialog from './MessageDialog';

import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import Toggle from 'material-ui/Toggle';
import FlatButton from 'material-ui/FlatButton';

import theme from "../data/controller.json";

class ConsentDialog extends Component {

    state = {
        unchecked: [],
        dialogKey: -1,
        isInputChecked: false,
        messageOpen: false,
        text: "",
    };

    openMessageDialog = (purpose, key, event, isInputChecked) => {
        this.setState({
            dialogKey: key,
            isInputChecked: isInputChecked,
            messageOpen: !this.state.messageOpen,
            text: this.formulateMessage(isInputChecked, purpose),
        });
    };

    handleMessageDialog = (confirmed, e) => {
        this.setState({messageOpen: !this.state.messageOpen});
        if (!confirmed)
            return;

        if (this.state.isInputChecked) {
            this.state.unchecked.splice(this.state.unchecked.indexOf(this.state.dialogKey), 1);
            this.setState({
                unchecked: this.state.unchecked,
            });
        } else {
            this.setState({
                unchecked: this.state.unchecked.concat([this.state.dialogKey]),
            });
        }
    };

    formulateMessage = (isInputChecked, purpose) => {
        if (isInputChecked) {
            return "I hereby freely give informed consent to process my personal data for " + purpose;
        } else {
            return "I hereby withdraw consent prior given for the purpose of " + purpose
                + " according to the GDPR Article 7(3). Please respond to this request within one month ("
                + new Date(Date.now() + 2592000000).toDateString() + ") as ruled by the GDPR Article 12(3).";
        }
    };

    render() {
        return (
            <div>
                <Dialog
                    title={<div>Consent given to {theme.controller.name}</div>}
                    modal={false}
                    open={this.props.consentOpen}
                    onRequestClose={this.props.toggleConsent}
                    actions={[
                        <FlatButton
                            label="Cancel"
                            secondary={true}
                            onClick={this.props.toggleConsent}
                        />,
                        <FlatButton
                            label="Apply"
                            primary={true}
                            onClick={this.props.toggleConsent}
                        />,
                    ]}
                >
                    <List>
                        {
                            theme.consents.map(function (self, e) {
                                return (
                                    <ListItem
                                        key={theme.consents.indexOf(e)}
                                        primaryText={e.label}
                                        secondaryText={e.description}
                                        rightToggle={<Toggle toggled={self.state.unchecked.indexOf(theme.consents.indexOf(e)) === -1} onToggle={self.openMessageDialog.bind(null, e.label, theme.consents.indexOf(e))}/>}
                                    />
                                );
                            }.bind(null, this))
                        }
                    </List>
                </Dialog>
                <MessageDialog
                    messageOpen={this.state.messageOpen}
                    text={this.state.text}
                    handleMessageDialoge={this.handleMessageDialog}
                />
            </div>
        );
    }

}

export default ConsentDialog;