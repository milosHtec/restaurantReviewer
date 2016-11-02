import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { deleteReview, updateReview } from '../../actions/reviews.actions';
import ManageReview from './manage-review/ManageReview';
import RestaurantReviews from './restaurant-reviews/RestaurantReviews';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import _ from 'lodash';

class ManageRestaurant extends React.Component {
    constructor(props) {
        super(props);

        this.updateReview = this.updateReview.bind(this);
        this.deleteReview = this.deleteReview.bind(this);
    }

    updateReview(item) {
        this.props.updateReview(item);
    }

    deleteReview(item) {
        this.props.deleteReview(item);
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader
                        title={this.props.restaurant.name}
                        actAsExpander={false}
                        showExpandableButton={false}
                    />
                    <CardText expandable={false}>
                        {this.props.restaurant.description}

                        <ManageReview restaurant={this.props.restaurant} title="Add a Review" />

                        <h4 className="content-subtitle">Reviews:</h4>
                        <ul className="reviews">
                            <RestaurantReviews reviews={this.props.reviews} currentUser={this.props.currentUser} updateReview={this.updateReview} deleteReview={this.deleteReview} />
                        </ul>
                    </CardText>
                </Card>
            </div>
        );
    }
}

ManageRestaurant.propTypes = {
    restaurant: PropTypes.object,
    reviews: PropTypes.array,
    currentUser: PropTypes.object.isRequired,
    deleteReview: PropTypes.func.isRequired,
    updateReview: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    const restaurantId = ownProps.params.id;
    let defaultRestaurant = {_id: null, name: '', rating: 0};
    let restaurant =  _.find(state.restaurants, {_id: restaurantId}) || defaultRestaurant;

    return {
        restaurant: restaurant,
        reviews: _.filter(state.reviews, {restaurant: restaurant._id}) || [],
        currentUser: state.currentUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        deleteReview: (data) => {
            dispatch(deleteReview(data));
        },
        updateReview: (data) => {
            dispatch(updateReview(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRestaurant);
