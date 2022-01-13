import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({

	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},

	orders: [{
		productID: String,
		name: String,
		price: Number,
		size: String,
		image: String,
		quantity: Number
	}],

	date: String,

	subtotal: Number,
	shipping: Number,
	total_order: Number,

	firstname: String,
	lastname: String,
	contact: String,
	houseno: String,
	street: String,
	barangay: String,
	city: String,
	region: String,
	country: String,

	payment_methods: String,

	to_pay: {
		type: Boolean,
		default: true
	},

	to_ship: {
		type: Boolean,
		default: false
	},

	to_receive: {
		type: Boolean,
		default: false
	},

	success: {
		type: Boolean,
		default: false
	},

	cancelled: {
		type: Boolean,
		default: false
	},

	date_received: {
		type: String,
		default: ''
	}

}, { timestamps: true })

const Orders = mongoose.models.Orders || mongoose.model('Orders', OrderSchema)

export default Orders