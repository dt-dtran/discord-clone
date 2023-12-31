"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let url = ""; // blank = dev
    if (process.env.NODE_ENV === "production") {
      url = process.env.NEXT_PUBLIC_SITE_URL!;
    }

    const socketInstance = new (ClientIO as any)(url, {
      path: "/api/socket/io",
      addTrailingSlash: false,
      withCredentials: true,
      debug: true,
    });

    socketInstance.on("connect", () => {
      console.log("client connected to server");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("client disconnected to server");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      console.log("client disconnecting");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
