import database from 'sources/database'
import Accounts from 'models/accounts'
import bcrypt from 'bcrypt'

export default async (req, res) => {
	await database.connect()

	const { email, password } = req.body
	const users = await Accounts.findOne({ email })

	if ( !users ) return res.status(400).send({ emailError: 'Email address does not exist.' })

	const isMatch = await bcrypt.compare(password, users.password)
	
	if(!isMatch) return res.status(400).send({ passwordError: 'Incorrect password.' })

	if ( !users.isAdmin ) {
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
	} else {
		res.send({ verify: true })
	}

	await database.disconnect()
}
