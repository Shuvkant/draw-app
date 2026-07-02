import express from "express"
import * as z from "zod"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config"
import { middleware } from "./middleware"
const app = express()
app.use(express.json())
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "You are welcome"
  })
})
app.post("/signup", (req, res) => {
  const reqBody = z.object({
    userName: z.email(),
    password: z.string().min(5).max(50)
  })
  const parsedReqBody = reqBody.safeParse(req.body)
  if (!parsedReqBody.success) {
    return res.status(411).json({
      msg: "Invalid input format"
    })
  }
  res.status(200).json({
    msg: "Successfully signed up"
  })


})

app.post("/signin", (req, res) => {
  const reqBody = z.object({
    userName: z.email(),
    password: z.string().min(5).max(50)
  })
  const parsedReqBody = reqBody.safeParse(req.body)
  if (!parsedReqBody.success) {
    return res.status(411).json({
      msg: "Invalid input format"
    })
  }
  const userId = 12
  //@ts-ignore
  const token = jwt.sign({ userId }, JWT_SECRET)
  res.status(200).json({
    token: token
  })


})

app.post("/room", middleware, (req, res) => {

})
app.listen(3000, () => {
  console.log("Server started ")
})
