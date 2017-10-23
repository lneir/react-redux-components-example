import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as grid from '../grid/index';
import { OpenAction } from '../grid/index';

export interface PassedProps {
    initialChats: Array<string>;
}

interface StateProps {
}

interface DispatchProps {
    openAction(streamId: string): OpenAction
}

type NavProps = PassedProps & StateProps & DispatchProps;

interface NavState {
}

const mapStateToProps = (state: any, ownProps: PassedProps): StateProps => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return {
        openAction: (streamId: string) => dispatch(grid.actions.open(streamId))
    }
};

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
        this.props.initialChats.forEach((chatId) => {
            let chat = <button onClick={this.onClick.bind(this,chatId)}
                               key={chatId}>{chatId}</button>
            chats.push(chat);
        });
        return chats;
    }

    onClick(chatId) {
        this.props.openAction(chatId);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
