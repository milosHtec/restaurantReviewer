import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addReview } from '../../../actions/reviews.actions.js';
import ManageReviewForm from './../ManageReviewForm';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import './ManageReview.scss';

class ManageRestaurant extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurant: Object.assign({}, props.restaurant),
            review: Object.assign({}, props.review),
            error: '',
            loading: false
        };

        this.ratingChange = this.ratingChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.addReview = this.addReview.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.restaurant._id && this.props.restaurant._id !== newProps.restaurant._id) {
            this.setState({
                restaurant: Object.assign({}, newProps.restaurant),
                review: Object.assign({}, newProps.review, {restaurant: newProps.restaurant._id})
            });
        }
    }

    addReview() {
        if (this.state.review.text && this.state.review.stars) {
            this.setState({error: ''});
            this.setState({loading: true});
            this.props.addReview(this.state.review).then(() => {
                this.setState({loading: false});
            }).catch((error) => {
                this.setState({error: 'Error while posting a review'});
                this.setState({loading: false});
            });
        }
    }

    ratingChange(event, index, value) {
        let newLocalState = this.state.review;
        newLocalState.stars = value;

        return this.setState({review: newLocalState});
    }

    textChange(event, value) {
        let newLocalState = this.state.review;
        newLocalState.text = value;

        return this.setState({review: newLocalState});
    }

    render() {
        return (
            <div className="add-review">
                <Card>
                    <CardHeader
                        title={this.props.title}
                        actAsExpander={false}
                        showExpandableButton={this.state.loading}
                    />
                    <CardText expandable={false}>
                        <ManageReviewForm
                            textChange={this.textChange}
                            ratingChange={this.ratingChange}
                            review={this.state.review}
                        />
                    </CardText>
                    <CardActions>
                        <RaisedButton disabled={this.state.loading} primary={true} label="Post Review" onClick={() => this.addReview()} />
                        <span className="error">{this.state.error}</span>
                        <CircularProgress
                            size={30}
                            thickness={3}
                            style={{ verticalAlign: 'middle',  visibility: this.state.loading ? 'visible' : 'hidden' }}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

ManageRestaurant.propTypes = {
    review: PropTypes.object,
    restaurant: PropTypes.object,
    title: PropTypes.string,
    addReview: PropTypes.func
};

function mapStateToProps(state) {
    return {
        review: {
            text: '',
            stars: null,
            date: '',
            user: state.currentUser._id
        }
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addReview: (data) => {
            return dispatch(addReview(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRestaurant);
