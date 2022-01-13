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

	res.send('success')

	await database.disconnect()
}