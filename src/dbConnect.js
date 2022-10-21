import { initializeApp, cert, getApps } from "firebase-admin/app";

import { getFirestore } from "firebase-admin/firestore";

import serviceAccount from "../credentials.js";

export default function dbConnect () {
    if(!getApps().length) {
        initializeApp ({
            credential: cert(serviceAccount)
        })
    }
    return getFirestore()
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