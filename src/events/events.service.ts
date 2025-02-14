import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entity/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) { }

  async findAll(): Promise<EventEntity[]> {
    return this.eventsRepository.find();
  }


  async findOne(id: number): Promise<EventEntity> {
    const event = await this.eventsRepository.findOne({ where: { id } });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    const event = this.eventsRepository.create(createEventDto);

    const savedEvent = await this.eventsRepository.save(event);

    return savedEvent;
  }

  async update(id: number, updateEventDto: UpdateEventDto): Promise<EventEntity> {
    await this.eventsRepository.update(id, updateEventDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.eventsRepository.delete(id);
  }
}
