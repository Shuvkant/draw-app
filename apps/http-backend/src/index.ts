import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware.js";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prisma } from "@repo/db";

const app = express();
app.use(express.json());
app.get("/", async (req, res) => {
  console.log(prisma);
  const data = await prisma.user.findFirst();
  res.status(200).json({
    msg: data?.email,
  });
});
app.post("/signup", async (req, res) => {
  const parsedSignup = CreateUserSchema.safeParse(req.body);
  if (!parsedSignup.success) {
    return res.status(411).json({
      msg: "Invalid format ",
    });
  }
  try {
    const data = await prisma.user.create({
      data: {
        name: parsedSignup.data?.name,
        email: parsedSignup.data?.email,
        password: parsedSignup.data?.password,
        photo: parsedSignup.data?.photo,
      },
    });
    res.status(200).json({
      msg: "Signup successful",
      id: data.id,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);

      return res.status(500).json({
        msg: `The ${parsedSignup.data?.email} already exists`,
      });
    } else {
      console.log("An unexpected error occurred:", error);
    }
  }
});

app.post("/signin", async (req, res) => {
  console.log(`signin jwt is ${JWT_SECRET}`)
  const parsedSignin = SigninSchema.safeParse(req.body);
  if (!parsedSignin.success) {
    return res.status(411).json({
      msg: "Invalid format ",
    });
  }
  const user = await prisma.user.findFirst({
    where: {
      email: parsedSignin.data?.email,
      password: parsedSignin.data?.password
    },
  })
  //@ts-ignore
  const userId = user.id;

  const token = jwt.sign({ userId }, JWT_SECRET);
  res.status(200).json({
    userId: userId,
    token: token,
  });
});

app.post("/room", middleware, async (req, res) => {
  console.log("control to rooom")
  const parsedRoom = CreateRoomSchema.safeParse(req.body);
  if (!parsedRoom.success) {
    return res.status(411).json({
      msg: "Invalid format ",
    });
  }
  try {
    //@ts-ignore
    const userId = req.userId
    const room = await prisma.room.create({
      data: {
        slug: parsedRoom.data?.name,
        adminId: userId
      }
    })
    res.status(200).json({
      roomId: room.id
    })
  } catch (error) {
    return res.status(200).json({
      msg: error
    })
  }
});
app.listen(3000, () => {
  console.log("Server started  at port 3000");
});
