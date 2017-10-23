import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import * as grid from '../grid';
import { ICloseAction } from '../grid';

interface PassedProps {
    streamId: string;
}

interface StateProps {
}

interface DispatchProps {
    closeAction(streamId: string): ICloseAction
}

type ChatProps = PassedProps & StateProps & DispatchProps;

interface ChatState {
}

const mapStateToProps = (state: any, ownProps: PassedProps): StateProps => {
    return { }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
    closeAction: grid.actions.close
}, dispatch);


class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
    }

    render() {
        var divStyle = {
            border: '2px solid black',
            margin: '2px',
            padding: '2px'
        }
        return (
            <div style={divStyle}>
                <div>Chat:{this.props.streamId}</div>
                <button onClick={this.onClick.bind(this)}>Close</button>
            </div>
        );
    }

    onClick() {
        this.props.closeAction(this.props.streamId);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
