import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
	
	name: {
		type: String
	},

	desc: {
		type: String
	},

	variant: {
		type: String
	},

	size: {
		type: String
	},

	price: {
		type: Number,
		default: 0
	},

	stock: {
		type: Number,
		default: 0
	},

	sold: {
		type: Number,
		default: 0
	},

	image: {
		type: String,
		default: ''
	}

}, { timestamps: true })

const Products = mongoose.models.Products || mongoose.model('Products', ProductSchema)

export default Products