import database from 'sources/database'
import Orders from 'models/orders'

export default async (req, res) => {
	await database.connect()

	const { id } = req.body
	console.log(id)
	await Orders.findOneAndUpdate({ _id: id }, { to_pay: false, to_ship: true })
	res.status(200).send('success')

	await database.disconnect()
}