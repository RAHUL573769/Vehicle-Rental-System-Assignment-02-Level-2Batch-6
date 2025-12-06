import express from 'express'
import { HelloWorldRouter } from './Modules/HelloWorld/HelloWorld.route'
import config from './config'

import { initDb } from './shared/database'
const app = express()



app.use(express.json())
app.use("/", HelloWorldRouter)

initDb();

app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
})
