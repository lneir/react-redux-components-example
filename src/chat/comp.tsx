import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as grid from '../grid/index';
import { CloseAction } from '../grid/index';

interface PassedProps {
    name: string;
}

interface StateProps {
}

interface DispatchProps {
    closeAction(streamId: string): CloseAction
}

type ChatProps = PassedProps & StateProps & DispatchProps;

interface ChatState {
}

const mapStateToProps = (state: any, ownProps: PassedProps): StateProps => {
    return { }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return {
        closeAction: (streamId: string) => dispatch(grid.actions.close(streamId))
    }
};

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
                <div>Chat:{this.props.name}</div>
                <button onClick={this.onClick.bind(this)}>Close</button>
            </div>
        );
    }

    onClick() {
        this.props.closeAction(this.props.name);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
