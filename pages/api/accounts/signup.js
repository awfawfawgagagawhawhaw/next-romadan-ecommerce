import database from 'sources/database'
import Accounts from 'models/accounts'
import bcrypt from 'bcrypt'

export default async (req, res) => {
	await database.connect()

	const { firstname, lastname, email, password } = req.body
	const hash = await bcrypt.hash(password, 12)
	const new_account = new Accounts({ firstname, lastname, email, password: hash })

	await new_account.save()

	res.status(200).send({
		id: new_account._id,
		firstname: new_account.firstname,
		lastname: new_account.lastname,
		email: new_account.email,
		contact: new_account.contact,
		houseno: new_account.houseno,
		street: new_account.street,
		barangay: new_account.barangay,
		city: new_account.city,
		region: new_account.region,
		country: new_account.country,
		verified: new_account.verified,
		avatar: new_account.avatar,
		isAdmin: new_account.isAdmin
	})

	await database.disconnect()
}