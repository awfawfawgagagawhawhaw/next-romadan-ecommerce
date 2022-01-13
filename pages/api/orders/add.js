import database from 'sources/database'
import Orders from 'models/orders'
import Carts from 'models/carts'

export default async (req, res) => {
	await database.connect()

	const { userID, orders, date, subtotal, shipping, total_order, firstname, lastname, contact, houseno, street, barangay, city, region, country, payment_methods } = req.body
	const new_orders = new Orders({ userID, orders, date, subtotal, shipping, total_order, firstname, lastname, contact, houseno, street, barangay, city, region, country, payment_methods })

	const cart = await Carts.findOneAndDelete({ userID })

	await new_orders.save()

	res.send('success')

	await database.disconnect()
}