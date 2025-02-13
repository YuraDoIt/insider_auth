import { Injectable } from '@nestjs/common';
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
  ) {}

  async findAll(): Promise<EventEntity[]> {
    return this.eventsRepository.find();
  }

  async findOne(id: number): Promise<EventEntity> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  async create(createEventDto: CreateEventDto): Promise<EventEntity> {
    const event = this.eventsRepository.create(createEventDto);
    
    // Save the event and get the saved entity, including the generated id
    const savedEvent = await this.eventsRepository.save(event);
    
    // Return the saved event (which includes the id)
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
