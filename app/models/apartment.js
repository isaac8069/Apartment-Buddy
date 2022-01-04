const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
        },
        rent: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },

        bedrooms: {
            type: String,
            required: true
        },
        bathrooms: {
            type: String,
            required: true,
        },
        // tags: {
        //     type: [mongoose.Schema.Types.ObjectId],
        //     ref: 'Tag',
        //     required: true,
        // },
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