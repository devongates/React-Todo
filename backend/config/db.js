const mongoose = require('mongoose')

const MONGOURI =
	'mongodb+srv://dvtrn:dvtrn@cluster0.gqu5h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const initiateMongoServer = async () => {
	try {
		await mongoose.connect(MONGOURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('Established connection to MongoDB')
	} catch (err) {
		console.log(err)
		throw err
	}
}

module.exports = initiateMongoServer
