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
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_URL,
      },
    });
    // console.log(io);
    io.on("connection", function (socket) {
      socket.on("SOCKET_RECEIVED", ({ notification }) => {
        io.emit(`SOCKET_RECEIVED`, notification);
      });
    });
    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
