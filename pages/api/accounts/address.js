import database from 'sources/database'
import Accounts from 'models/accounts'

export default async (req, res) => {
	await database.connect()

	const { id, contact, houseno, street, barangay, city, region, country } = req.body
	await Accounts.findOneAndUpdate({ _id: id }, { contact, houseno, street, barangay, city, region, country })
	
	const users = await Accounts.findById({ _id: id })

	res.status(200).send({
		id: users._id,
		firstname: users.firstname,
		lastname: users.lastname,
		email: users.email,
		contact: users.contact,
		houseno: users.houseno,
		street: users.street,
		barangay: users.barangay,
		city: users.city,
		region: users.region,
		country: users.country,
		verified: users.verified,
		avatar: users.avatar,
		isAdmin: users.isAdmin
	})

	await database.disconnect()
}