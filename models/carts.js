import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({

	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},

	products: [{
		productID: String,
		name: String,
		price: Number,
		size: String,
		image: String,
		quantity: Number
	}]

}, { timestamps: true })

const Carts = mongoose.models.Carts || mongoose.model('Carts', CartSchema)

export default Carts