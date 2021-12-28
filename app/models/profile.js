const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
	{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    tag: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Tag',
      required: true
    },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Apartment'
    }
  }
)

module.exports = mongoose.model('Profile', profileSchema)