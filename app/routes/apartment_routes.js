// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for apartments
const Apartment = require('../models/apartment')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404

// this is middleware that will remove blank fields from `req.body`, e.g.
// { apartment: { title: '', text: 'foo' } } -> { apartment: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
const profile = require('../models/profile')
// // passing this as a second argument to `router.<verb>` will make it
// // so that a token MUST be passed for that route to be available
// // it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()


// INDEX
// GET /apartments
router.get('/apartments', (req, res, next) => {
	Apartment.find()
		.then((apartments) => {
			// `apartments` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return apartments.map((apartment) => apartment.toObject())
		})
		// respond with status 200 and JSON of the apartments
		.then((apartments) => res.status(200).json({ apartments: apartments }))
		// if an error occurs, pass it to the handler
		.catch(next)
})


// CREATE
// POST /apartments
router.post('/apartments', requireToken, (req, res, next) => {

	req.body.apartment.userId = req.user._id

	Apartment.create(req.body.apartment)
		// respond to succesful `create` with status 201 and JSON of new "apartment"
		.then((apartment) => {
			res.status(201).json({ apartment: apartment.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /apartments/5a7db6c74d55bc51bdf39793
router.patch('/apartments/:id', requireToken, removeBlanks, (req, res, next) => {

	delete req.body.apartment.userId

	Apartment.findById(req.params.id)
	.then(handle404)
	.then((apartment) => {

		return apartment.updateOne(req.body.apartment)
	})

	.then((apartments) => res.status(200).json({ apartments: apartments }))

	.catch(next)
})

// DESTROY using apartment id
// DELETE /apartments/5a7db6c74d55bc51bdf39793
router.delete('/apartments/:id', (req, res, next) => {
	Apartment.findById(req.params.id)
		.then(handle404)
		.then((apartment) => {
			// delete the apartment ONLY IF the above didn't throw
			apartment.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})




module.exports = router