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
        origin: [
          `${process.env.NEXT_PUBLIC_URL}`,
          "http://localhost:8080",
          "http://localhost:3000",
          `https://${process.env.NEXT_PUBLIC_URL}`,
          `http://${process.env.NEXT_PUBLIC_URL}`,
        ],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true,
      },
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default ioHandler;
