import React, { PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import EditReviewModal from '../edit-review-modal/EditReviewModal';
import './RestaurantReviews.scss';

const ManageReviewForm = ({reviews, currentUser, deleteReview}) => {

    function actionButtons(review) {
        if (review.user._id === currentUser._id) {
            return (
                <CardActions>
                    <EditReviewModal review={review} />
                    <FlatButton secondary={true} label="Delete" onClick={() => deleteReview(review)} />
                </CardActions>
            );
        }
    }

    function reviewItem(item, index) {
        return (
            <li className="review" key={index}>
                <Card initiallyExpanded={true}>
                    <CardHeader
                        title={item.user.name}
                        avatar="../images/user-icon.png"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        {item.text}
                        <div className="rated">
                            Rated:
                            <span className="primary"> {item.stars}/5</span>
                        </div>
                    </CardText>
                    {actionButtons(item)}
                </Card>
            </li>
        );
    }

    return (
        <div>
            {reviews.map(reviewItem)}
        </div>
    );
};

ManageReviewForm.propTypes = {
    reviews: PropTypes.array,
    currentUser: PropTypes.object,
    deleteReview: PropTypes.func
};

export default ManageReviewForm;
