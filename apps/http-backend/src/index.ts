import express from "express"
import jwt from "jsonwebtoken"
import { middleware } from "./middleware.js"
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types"
import { prisma } from "@repo/db"
import "dotenv/config"

const app = express()
app.use(express.json())
app.get("/", async (req, res) => {
  console.log(prisma)
  const data = await prisma.user.findFirst()
  res.status(200).json({
    msg: data?.email
  })
})
app.post("/signup", async (req, res) => {

  const parsedSignup = CreateUserSchema.safeParse(req.body)
  if (!parsedSignup.success) {
    return res.status(411).json({
      msg: "Invalid format "
    })
  }
  try {

    const data = await prisma.user.create({
      data: {
        name: parsedSignup.data?.name,
        email: parsedSignup.data?.email,
        password: parsedSignup.data?.password,
        photo: parsedSignup.data?.photo
      }
    })
    res.status(200).json({
      msg: "Signup successful",
      id: data.id
    })

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);

      return res.status(500).json({
        msg: error.message
      })
    } else {
      console.log("An unexpected error occurred:", error);
    }

  }
})

app.post("/signin", (req, res) => {
  const parsedSignin = SigninSchema.safeParse(req.body)
  if (!parsedSignin.success) {
    return res.status(411).json({
      msg: "Invalid format "
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
      msg: "Invalid format "
    })
  }
})
app.listen(3000, () => {
  console.log("Server started  at port 3000")
})
