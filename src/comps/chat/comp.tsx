import * as React from 'react';
import { connect, connectAdvanced } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { interfaces, registrar, shallowEqual } from '../../sdk';

interface IStateProps {
}

interface IDispatchProps {
    closeAction(streamId: string): interfaces.grid.ICloseAction
}

type ChatProps = interfaces.chat.IPassedProps & IStateProps & IDispatchProps;

interface ChatState {
}

// const mapStateToProps = (state: any, ownProps: IPassedProps): IStateProps => {
//     return { }
// }

// const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => {
//     debugger;
//     return {
//         closeAction: (streamId: string) => dispatch(grid.close(streamId))
//     }
// };

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

function selectorFactory(dispatch) {
    let ownProps = {}
    let result = {}
    let grid = registrar.get<interfaces.grid.IGrid>(interfaces.grid.IGridSymbol);

    const actions = {
        closeAction: (streamId: string) => dispatch(grid.close(streamId))
    }
    return (nextState, nextOwnProps) => {
        const nextResult = { ...nextOwnProps, ...actions }
        ownProps = nextOwnProps
        if (!shallowEqual(result, nextResult)) {
            result = nextResult;
        }
        return result
    }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Chat);

export default connectAdvanced(selectorFactory)(Chat)
