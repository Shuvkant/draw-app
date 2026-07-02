import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";

const wss = new WebSocketServer({ port: 8080 })
wss.on("connection", function (ws, request) {
  const url = request.url;
  if (!url) {
    return
  }
  const queryParams = new URLSearchParams(url.split("?")[1])
  const token = queryParams.get("token") ?? ""
  const decoded = jwt.verify(token, JWT_SECRET)
  //@ts-ignore
  if (!decoded || !decoded.userId) {
    ws.close()
    return

  }
  ws.on("message", function (data) {
    ws.send(("pong"))
  })
})
