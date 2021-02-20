const { Schema, model } = require('mongoose');

const HostCardSchema = new Schema({
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

HostCardSchema.index({ username: 1});

const HostCard = model("HostCard", HostCardSchema);

module.exports = HostCard;