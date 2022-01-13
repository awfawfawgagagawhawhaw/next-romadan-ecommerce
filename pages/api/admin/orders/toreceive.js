import database from 'sources/database'
import Orders from 'models/orders'

export default async (req, res) => {
	await database.connect()

	const { id } = req.body
	await Orders.findOneAndUpdate({ _id: id }, { to_ship: false, to_receive: true })
	res.status(200).send('success')

	await database.disconnect()
}