import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'ws';
import { BillsService } from '../bills.service'
import { Bill } from '../entities/bill.entity';
import { CreateBillDto } from '../dto/create-bill.dto';
import { BillCreatedEvent } from '../events/bill-created.event';

@WebSocketGateway(8080)
export class BillCreatedGateway {
  constructor(public readonly billsService: BillsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('bill.create')
  onEvent(client: any, data: CreateBillDto) {
    return this.billsService.create(data)
      .then((bill: Bill) => {
        const billCreatedEvent = new BillCreatedEvent();
        billCreatedEvent.id = bill.id;
        billCreatedEvent.status = bill.status;
        billCreatedEvent.description = bill.description;
        billCreatedEvent.paid = bill.paid;
        billCreatedEvent.total = bill.total;
        billCreatedEvent.chargeId = bill.chargeId;
        billCreatedEvent.licenseKeyId = bill.licenseKeyId;
        billCreatedEvent.tenantId = bill.tenantId;
        
        console.log('gateway: bill.created', billCreatedEvent);
        this.billsService.eventEmitter.emit('bill.created', billCreatedEvent)
        return { event: 'bill.create', payload: data };
      })
  }
}