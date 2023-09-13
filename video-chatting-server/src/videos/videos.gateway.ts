import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({ cors: true })
export class VideosGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  users = [];
  rooms = {};

  handleConnection(client: any): any {
    this.users.push({ client, name: '' });
    // this.server.emit('users');
    console.log(`[Connect] Current users: "${this.users.length}"`);
  }

  @SubscribeMessage('setting')
  handleSetting(client: any, payload: any) {
    const requestUser = this.users.find((user) => user.client.id === client.id);
    requestUser.name = payload.name;
    requestUser.room = payload.room;

    if (this.rooms[payload.room]) {
      this.rooms[payload.room].push(client);
    } else {
      this.rooms[payload.room] = [client];
    }

    this.rooms[payload.room].forEach((user) =>
      user.emit('welcome', `${payload.name}님이 입장하셨습니다.`),
    );
  }

  handleDisconnect(client: any): any {
    const exitUser = this.users.find((user) => user.client.id === client.id);
    this.rooms[exitUser.room].forEach((user) =>
      user.emit('welcome', `${exitUser.name}님이 퇴장하셨습니다.`),
    );
    this.users = this.users.filter((user) => user.client.id !== client.id);
    console.log(`[Disconnect] Current users: "${this.users.length}"`);
  }
}
