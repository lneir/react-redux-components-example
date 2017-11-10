import * as React from 'react';
import { connect, connectAdvanced } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { getContext } from 'recompose';

import { interfaces, Registrar } from 'sdk';

interface IStateProps {
}

interface IDispatchProps {
    closeAction(streamId: string): interfaces.grid.ICloseAction
}

interface registarViaContext {
    registrar: interfaces.IRegistrar;
}

type updatePassedProps = interfaces.chat.IPassedProps & registarViaContext;

type ChatProps = updatePassedProps & IStateProps & IDispatchProps;

interface ChatState {
}

const mapStateToProps = (state: any, ownProps: updatePassedProps): IStateProps => {
    return { }
}

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: updatePassedProps): IDispatchProps => {
    let registrar:interfaces.IRegistrar = ownProps.registrar;
    let grid = registrar.get<interfaces.grid.IGrid>(interfaces.Symbols.IGrid);
    return {
        closeAction: (streamId: string) => dispatch(grid.close(streamId))
    }
};

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

const connectedComp = connect(mapStateToProps, mapDispatchToProps)(Chat);
export default getContext({ registrar: Registrar })(connectedComp);
