import database from 'sources/database'
import Orders from 'models/orders'

export default async (req, res) => {
	await database.connect()

	const orders = await Orders.find().sort({ createdAt: -1 })
	res.status(200).send(orders)

	await database.disconnect()
}