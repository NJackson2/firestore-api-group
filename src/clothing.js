import dbConnect from "./dbConnect.js";


export function createClothing(req, res) {
    // connect to firestore
    const db = dbConnect()
    // add a new doc to clothing collection
    db.collection('clothing').add(req.body)
    // send back a response(err / not)
        .then(doc => res.status(201).send({ success: true, message: 'Created clothing: ' + doc.id }))
        .catch(err => res.send.status(500).send({success: false, message: err}))

}

export function getAllClothing(req, res) {
    const db = dbConnect()
    db.collection('clothing').get()
        .then(collection => {
            const clothingList = collection.docs.map(doc => doc.data())
            res.send(clothingList)
        })
        .catch(err => res.send.status(500).send({success: false, message: err}))
}
