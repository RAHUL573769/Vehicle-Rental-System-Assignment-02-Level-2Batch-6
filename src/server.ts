import express from 'express'
import { HelloWorldRouter } from './Modules/HelloWorld/HelloWorld.route'
import config from './config'

import { initDb } from './shared/database'
import { UserRoute } from './Modules/Users/user.route'
import { AuthRoute } from './Modules/Auth/auth.route'
const app = express()
app.use(express.json())
app.use("/", HelloWorldRouter)
app.use("/users", UserRoute)
app.use("/auth", AuthRoute)
initDb();

app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${config.PORT}`)
})
