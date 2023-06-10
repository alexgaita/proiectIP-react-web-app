const functions = require('firebase-functions')
const { getFirestore } = require('firebase-admin/firestore')
const admin = require('firebase-admin')
const dayjs = require('dayjs')
// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//

admin.initializeApp()

exports.helloWorld = functions.https.onRequest(async (req, res) => {
  functions.logger.info('Query Params!', req.query)

  await getFirestore()
    .collection('/pacients/BWE1dzRokyYam4m8O3oyBp8QXL72/measure')
    .add({ ...req.query, date: dayjs().format() })

  res.send(req.query)
})
