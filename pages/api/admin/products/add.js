import database from 'sources/database'
import Products from 'models/products'

export default async (req, res) => {
	await database.connect()

	const { name, price, size, stock, image } = req.body
	const new_products = new Products({ name, price, size, stock, image })
	await new_products.save()

	res.send('success')

	await database.disconnect()
}