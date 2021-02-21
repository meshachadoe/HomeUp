const { Schema, model } = require('mongoose');

const AppCardSchema = new Schema({
    username: {
        type: String,
        index: true,
    },
    hostUsername: {
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
    approved: {
        type: Boolean,
        default: false,
    }
});

AppCardSchema.index({ username: 1, hostUsername: 1});

const AppCard = model("AppCard", AppCardSchema);

module.exports = AppCard;