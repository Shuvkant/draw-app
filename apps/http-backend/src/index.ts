import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware"
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"

const app = express()
app.use(express.json())
app.get("/", (req, res) => {
  const parsedSignup = CreateUserSchema.safeParse(req.body)
  if (!parsedSignup.success) {
    return res.status(411).json({
      msf: "Invalid format "
    })
  }
  res.status(200).json({
    msg: "You are welcome"
  })
})
app.post("/signup", (req, res) => {
  res.status(200).json({
    msg: "Successfully signed up"
  })


})

app.post("/signin", (req, res) => {
  const parsedSignin = SigninSchema.safeParse(req.body)
  if (!parsedSignin.success) {
    return res.status(411).json({
      msf: "Invalid format "
    })
  }
  const userId = 12

  const token = jwt.sign({ userId }, JWT_SECRET)
  res.status(200).json({
    token: token
  })


})

app.post("/room", middleware, (req, res) => {

  const parsedRoom = CreateRoomSchema.safeParse(req.body)
  if (!parsedRoom.success) {
    return res.status(411).json({
      msf: "Invalid format "
    })
  }
})
app.listen(3000, () => {
  console.log("Server started ")
})
