import database from 'sources/database'
import Products from 'models/products'

export default async (req, res) => {
	await database.connect()

	const products = await Products.find()
	
	res.status(200).send(products)

	await database.disconnect()
}