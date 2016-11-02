import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import ListItemBubble from './../shared/list-item-bubble/ListItemBubble';
import {List, ListItem} from 'material-ui/List';
import {Card, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import './Sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.listItem = this.listItem.bind(this);
    }

    listItem(item, index) {
        let link = '/restaurant/' + item._id;
        let restaurantReviews = _.filter(this.props.reviews, {restaurant: item._id});
        let restaurantReviewsSum = restaurantReviews.reduce((all, item) => {
            return all + item.stars;
        }, 0);
        let rating = restaurantReviewsSum ? (restaurantReviewsSum / restaurantReviews.length).toFixed(2) : null;
        return <ListItem key={index} primaryText={item.name} containerElement={<Link to={link} />} rightIcon={<ListItemBubble rating={rating} />} />;
    }

    render() {
        return (
            <div className="sidebar">
                <Card>
                    <CardText expandable={false}>
                        <List>
                            <Subheader>Restaurants</Subheader>
                            {this.props.restaurants.map(this.listItem)}
                        </List>
                    </CardText>
                </Card>
            </div>
        );
    }
}

Sidebar.propTypes = {
    children: PropTypes.element,
    restaurants: PropTypes.array.isRequired,
    reviews: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        restaurants: state.restaurants,
        reviews: state.reviews
    };
}

export default connect(mapStateToProps)(Sidebar);
