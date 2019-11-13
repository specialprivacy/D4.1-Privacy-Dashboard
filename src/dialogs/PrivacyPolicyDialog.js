import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import theme from "../data/controller.json";

class ConsentDialog extends Component {

    render() {
        return(
            <Dialog
                title={<div>Privacy policy of {theme.controller.name}</div>}
                modal={false}
                open={this.props.policyOpen}
                onRequestClose={this.props.togglePolicy}
                autoScrollBodyContent={true}
                actions={[
                    <FlatButton
                        label="Close"
                        primary={true}
                        onClick={this.props.togglePolicy}
                    />
                ]}
            >
                {theme.controller.policy}
            </Dialog>
        );
    }

}

export default ConsentDialog;