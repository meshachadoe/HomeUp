const { Schema, model } = require('mongoose');

const ContributorListingSchema = new Schema({
    username: {
        type: String,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    maximumStay: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

ContributorListingSchema.index({ username: 1});

const ContributorListing = model("ContributorListing", ContributorListingSchema);

module.exports = ContributorListing;