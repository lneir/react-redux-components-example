import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { chatsSelector } from './selectors';

import { component as Chat } from '../chat/index';

export interface PassedProps {
}

interface StateProps {
    chats: Array<string>;
}

interface DispatchProps {
}

type GridProps = PassedProps & StateProps & DispatchProps;

interface GridState {
}

const mapStateToProps = (state: any, ownProps: PassedProps): StateProps => {
    return {
        chats: chatsSelector(state)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => {
    return {
    }
};

class Grid extends React.Component<GridProps, GridState> {
    constructor(props: GridProps) {
        super(props);
    }

    render() {
        var divStyle = {
            border: '2px solid black',
            margin: '2px',
            padding: '2px'
        }
        let chats = this.getChats();
        if (!chats || chats.length === 0) {
            chats = [ <div key={1}>Empty</div> ]
        }
        return (
            <div style={divStyle}>
                <label>Grid</label>
                <div>{chats}</div>
            </div>
        );
    }

    getChats() {
        var chats = [];
        this.props.chats.forEach((streamId) => {
            chats.push(<Chat key={streamId} streamId={streamId}/>);
        })
        return chats;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
