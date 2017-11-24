import * as React from 'react';
import { connect, connectAdvanced } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { interfaces, bindInterfaces } from 'sdk';

export interface IStateProps {
}

export interface IDispatchProps {
    closeAction(streamId: string): interfaces.grid.ICloseAction
}

type ChatProps = interfaces.chat.IPassedProps & IStateProps & IDispatchProps;

interface ChatState {
}

const mapStateToProps = (state: any, ownProps: interfaces.chat.IPassedProps): IStateProps => {
    return { }
}

const mapDispatchToProps = (getIGrid: () => interfaces.grid.IGrid,
        dispatch: Dispatch<any>): IDispatchProps => {
    let grid = getIGrid();
    return {
        closeAction: (streamId: string) => dispatch(grid.close(streamId))
    }
};
let boundMapDispatchToProps = bindInterfaces(mapDispatchToProps, [ interfaces.Symbols.IGrid ] );

class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: ChatProps) {
        super(props);
    }

    render() {
        let divStyle = {
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

export default connect(mapStateToProps, boundMapDispatchToProps)(Chat);
