import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class KanbanGateway {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  @SubscribeMessage('joinProject')
  async joinProject(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { projectId: string },
  ) {
    await client.join(payload.projectId);
    const tasks = await this.prisma.task.findMany({
      where: { projectId: payload.projectId },
    });
    client.emit('tasks', tasks);
  }

  @SubscribeMessage('createTask')
  async createTask(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      projectId: string;
      title: string;
      description?: string;
      assignedTo?: string;
    },
  ) {
    const task = await this.prisma.task.create({
      data: {
        title: payload.title,
        description: payload.description,
        projectId: payload.projectId,
        assignedTo: payload.assignedTo,
      },
    });
    this.server.to(payload.projectId).emit('taskCreated', task);
  }

  @SubscribeMessage('updateTask')
  async updateTask(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    payload: {
      id: string;
      projectId: string;
      status?: string;
      title?: string;
      description?: string;
    },
  ) {
    const task = await this.prisma.task.update({
      where: { id: payload.id },
      data: {
        title: payload.title,
        description: payload.description,
      },
    });
    this.server.to(payload.projectId).emit('taskUpdated', task);
  }

  @SubscribeMessage('deleteTask')
  async deleteTask(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { id: string; projectId: string },
  ) {
    await this.prisma.task.delete({ where: { id: payload.id } });
    this.server.to(payload.projectId).emit('taskDeleted', payload.id);
  }
}
