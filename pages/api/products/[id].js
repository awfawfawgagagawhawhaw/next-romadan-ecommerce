import database from 'sources/database'
import Products from 'models/products'

export default async (req, res) => {
	await database.connect()

	const { id } = req.query
	const product = await Products.findById({ _id: id })
	
	res.status(200).send(product)

	await database.disconnect()
}