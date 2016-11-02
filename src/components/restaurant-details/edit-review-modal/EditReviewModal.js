import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { editReview } from '../../../actions/reviews.actions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import ManageReviewForm from '../ManageReviewForm';
import './EditReview.scss';

class DialogExampleModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            loading: false,
            review: Object.assign({}, this.props.review)
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.textChange = this.textChange.bind(this);
        this.ratingChange = this.ratingChange.bind(this);
        this.editReview = this.editReview.bind(this);
    }

    editReview() {
        if (this.state.review.text && this.state.review.stars) {
            this.setState({loading: true});
            this.props.editReview(this.state.review).then(() => {
                this.setState({loading: false});
                this.close();
            }).catch(() => {
                this.setState({loading: false});
                this.close();
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

    open = () => {
        this.setState({open: true});
    };

    close = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.close}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={false}
                onTouchTap={this.editReview}
            />,
            <CircularProgress
                size={30}
                thickness={3}
                style={{ verticalAlign: 'middle', marginLeft: '5px',  visibility: this.state.loading ? 'visible' : 'hidden' }}
            />
        ];

        return (
            <div className="edit-review">
                <FlatButton primary={true} label="Update" onTouchTap={this.open} />
                <Dialog
                    title="Edit Review"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <ManageReviewForm
                        textChange={this.textChange}
                        ratingChange={this.ratingChange}
                        review={this.state.review}
                    />
                </Dialog>
            </div>
        );
    }
}

DialogExampleModal.propTypes = {
    review: PropTypes.object,
    editReview: PropTypes.func
};

function mapStateToProps() {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        editReview: (data) => {
            return dispatch(editReview(data));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogExampleModal);
