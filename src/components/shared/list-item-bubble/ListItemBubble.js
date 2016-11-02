import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import './ListItemBubble.scss';

const ListItemBubble = (props) => {
    return (
        <div className="bubble">{props.rating}</div>
    );
};

ListItemBubble.propTypes = {
    rating: PropTypes.string
};

function mapStateToProps() {
    return {

    };
}

export default connect(mapStateToProps)(ListItemBubble);
