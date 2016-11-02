import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const AddReviewForm = ({textChange, ratingChange, review}) => {
    return (
        <div>
            <TextField
                hintText="Review text"
                fullWidth={true}
                value={review.text}
                onChange={textChange}
            />
            <SelectField
                floatingLabelText="Rating"
                value={review.stars}
                onChange={ratingChange}
            >
                <MenuItem value={1} primaryText="1" />
                <MenuItem value={2} primaryText="2" />
                <MenuItem value={3} primaryText="3" />
                <MenuItem value={4} primaryText="4" />
                <MenuItem value={5} primaryText="5" />
            </SelectField>
        </div>
    );
};

AddReviewForm.propTypes = {
    textChange: PropTypes.func,
    ratingChange: PropTypes.func,
    review: PropTypes.object
};

export default AddReviewForm;
