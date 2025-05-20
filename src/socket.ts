"use client";

import { io } from "socket.io-client";
import { HOST_API_KEY } from "./config-global";

export const socket = io("https://app.talentsreach.com/");