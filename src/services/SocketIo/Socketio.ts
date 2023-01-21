import {SocketIo} from "../../../index";
import { Server,Socket } from "socket.io";

export default class SocketService{
    public socketio;
    public prove;
    constructor(){
        this.prove = "teste"
        this.socketio = SocketIo;
    }
}