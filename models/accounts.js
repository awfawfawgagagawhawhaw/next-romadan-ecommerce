import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({

	firstname: {
		type: String, required: true
	},

	lastname: {
		type: String, required: true
	},

	email: {
		type: String, unique: true, required: true
	},

	password: {
		type: String, required: true
	},

	contact: {
		type: String, default: ''
	},

	houseno: {
		type: String, default: ''
	},

	street: {
		type: String, default: ''
	},

	barangay: {
		type: String, default: ''
	},

	city: {
		type: String, default: ''
	},

	region: {
		type: String, default: ''
	},

	country: {
		type: String, default: 'philippines'
	},

	status: {
		type: Boolean, default: true
	},

	isAdmin: {
		type: Boolean, default: false
	},

	verified: {
		type: Boolean, default: false
	},

	avatar: {
		type: String, default: ''
	}

}, { timestamps: true })

const Accounts = mongoose.models.Accounts || mongoose.model('Accounts', AccountSchema)

export default Accounts