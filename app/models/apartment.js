const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        isAssigned: {
            type: Boolean,
            required: true,
        },
        tags: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Tag',
            required: true,
        },
        isPurchased: {
            type: Boolean,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
    },

    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Apartment', apartmentSchema)