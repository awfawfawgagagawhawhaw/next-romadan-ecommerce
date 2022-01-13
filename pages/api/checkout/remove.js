import database from 'sources/database'
import Carts from 'models/carts'

export default async (req, res) => {
	await database.connect()

	const { userID, productUID, productID } = req.body

	let cart = await Carts.findOne({ userID })

	if ( cart ) {
		// cart exists for user
		const itemIndex = cart.products.findIndex(x => x.productID == productID)

		if ( itemIndex > -1 ) {
			cart.products.pull({ _id: productUID })
		}

		cart = await cart.save()
		return res.status(201).send(cart)
	}

	await database.disconnect()
}