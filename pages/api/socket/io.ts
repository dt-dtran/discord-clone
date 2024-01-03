import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIo } from "@/types";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;

    httpServer.listen(8080, () => {
      console.log("server is listening at port 8080");
    });

    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: {
        origin: [
          `${process.env.NEXT_PUBLIC_URL}`,
          "http://localhost:8080",
          `https://${process.env.NEXT_PUBLIC_URL}`,
        ],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true,
      },
    });

    res.socket.server.io = io;

    // console.log(io);
    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("message", (message) => {
        console.log(message);
        io.emit("message", `${socket.id}: ${message}`);
      });
    });

    res.socket.server.listen(8080, () => {
      console.log("res server is listening at port 8080");
    });
  }
  res.end();
};

export default ioHandler;
