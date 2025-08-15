@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinRoom')
  handleJoin(client: any, roomId: string) {
    client.join(roomId);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: any, payload: { roomId: string; senderId: string; content: string }) {
    const message = await this.chatService.saveMessage(payload);
    this.server.to(payload.roomId).emit('newMessage', message);
  }
}