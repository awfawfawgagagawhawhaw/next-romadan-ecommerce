import database from 'sources/database'
import Carts from 'models/carts'

export default async (req, res) => {
	await database.connect()

	const { id } = req.query
	const cart = await Carts.findOne({ userID: id })
	
	res.status(200).send(cart)

	await database.disconnect()
}