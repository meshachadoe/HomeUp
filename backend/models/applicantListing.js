const { Schema, model } = require('mongoose');

const ApplicantListingSchema = new Schema({
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
    contactInfo: {
        type: String,
        required: true,
    },
    minimumStay: {
        type: String,
        required: true,
    },
    additionalInfo: String,
});

ApplicantListingSchema.index({ username: 1});

const ApplicantListing = model("ApplicantListing", ApplicantListingSchema);

module.exports = ApplicantListing;