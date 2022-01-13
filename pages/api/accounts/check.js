import database from 'sources/database'
import Accounts from 'models/accounts'

export default async (req, res) => {
	await database.connect()

	const { email, password } = req.body
	const users = await Accounts.findOne({ email })

	if ( !users ) {
		return res.status(400).send({ message: 'Email address does not exist.' })
	}

	res.send('success')

	await database.disconnect()
}