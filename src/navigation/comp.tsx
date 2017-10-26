import * as React from 'react';
import { connect, connectAdvanced } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { interfaces  } from '../sdk/interfaces';
import registrar from '../registrar';
import shallowEqual from '../utils/shallowEqual';

interface IStateProps {
}

interface IDispatchProps {
    openAction(streamId: string): interfaces.grid.IOpenAction
}

type NavProps = interfaces.nav.IPassedProps & IStateProps & IDispatchProps;

interface NavState {
}

// const mapStateToProps = (state: any, ownProps: IPassedProps): IStateProps => {
//     return {
//     }
// }
//
// const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => {
//     return {
//         openAction: (streamId: string) => dispatch(grid.actions.open(streamId))
//     }
// };

class Navigation extends React.Component<NavProps, NavState> {
    constructor(props: NavProps) {
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
                <label>Navigation</label>
                <div>
                    {this.getNavItems()}
                </div>
            </div>
        );
    }

    getNavItems() {
        let chats = []
        this.props.navItems.forEach((streamId) => {
            let chat = <button onClick={this.onClick.bind(this,streamId)}
                               key={streamId}>{streamId}</button>
            chats.push(chat);
        });
        return chats;
    }

    onClick(streamId) {
        this.props.openAction(streamId);
    }
}

function selectorFactory(dispatch) {
    let ownProps = {}
    let result = {}
    let grid = registrar.get<interfaces.grid.IGrid>(interfaces.grid.IGridSymbol);

    const actions = {
        openAction: (streamId: string) => dispatch(grid.open(streamId))
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
// export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
export default connectAdvanced(selectorFactory)(Navigation)
