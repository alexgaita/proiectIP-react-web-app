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

  const userId = 'BWE1dzRokyYam4m8O3oyBp8QXL72'

  await getFirestore()
    .collection(`/pacients/${userId}/measure`)
    .add({ ...req.query, date: dayjs().format() })

  const snapshot = await getFirestore()
    .collection(`/pacients/${userId}/warnings`)
    .get()

  functions.logger.log('Snapshot', snapshot)

  let warningsArray = []

  snapshot.forEach((doc) => {
    warningsArray.push(doc.data())
  })

  functions.logger.info('Warnings for user: ', warningsArray)

  let sendAlarm = false

  warningsArray.forEach((warning) => {
    Object.keys(warning).forEach((key) => {
      const values = warning[key].split(',')
      functions.logger.info(`key: ${key} values: `, values)
      functions.logger.info(`Send value:`, req.query[key.toLowerCase()])

      functions.logger.info(
        `First condition ${
          parseInt(values[0]) > parseInt(req.query[key.toLowerCase()]) &&
          parseInt(values[0])
        }:`
      )

      functions.logger.info('1: ', parseInt(values[0]))
      functions.logger.info('2: ', parseInt(req.query[key.toLowerCase()]))

      if (
        parseInt(values[0]) > parseInt(req.query[key.toLowerCase()]) &&
        parseInt(values[0])
      ) {
        functions.logger.info('Intra in prima')
        sendAlarm = true
      }

      if (
        parseInt(values[1]) < parseInt(req.query[key.toLowerCase()]) &&
        parseInt(values[1])
      ) {
        functions.logger.info('Intra in a doua')
        sendAlarm = true
      }
    })
  })

  functions.logger.info(`Send alarm: ${sendAlarm}`)

  await getFirestore()
    .collection(`/alerts`)
    .doc(userId)
    .set({ sendAlarm }, { merge: true })

  res.send(req.query)
})
