import database from 'sources/database'
import Accounts from 'models/accounts'
import bcrypt from 'bcrypt'

export default async (req, res) => {
	await database.connect()

	const { email, password } = req.body

	const hash = await bcrypt.hash(password, 12)
	await Accounts.findOneAndUpdate({ email, password: hash })

	res.send('success')

	await database.disconnect()
}