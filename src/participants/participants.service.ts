// src/participants/participants.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParticipantEntity } from './entity/participants.entity';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { EventEntity } from 'src/events/entity/event.entity';
import { UserEntity } from 'src/users/entity/user.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(ParticipantEntity)
    private readonly participantsRepository: Repository<ParticipantEntity>,
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) {}

  // regicter pariticipant for event
  async create(createParticipantDto: CreateParticipantDto): Promise<ParticipantEntity> {
    const participant = this.participantsRepository.create(createParticipantDto);
    return this.participantsRepository.save(participant);
  }

  // Get users by events
  async findByEvent(eventId: number): Promise<ParticipantEntity[]> {
    return this.participantsRepository.find({ where: { eventId } });
  }

  // get event by users
  async findByUser(userId: number): Promise<ParticipantEntity[]> {
    return this.participantsRepository.find({ where: { userId } });
  }

  async registerUserToEvent(user: UserEntity, eventId: number): Promise<ParticipantEntity> {
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const participantsCount = await this.participantsRepository.count({
      where: { eventId },
    });

    if (participantsCount >= event.maxParticipants) {
      throw new BadRequestException('Event has reached the maximum number of participants');
    }

    // Якщо подія ще має місце, реєструємо учасника
    const participant = new ParticipantEntity();
    participant.eventId = eventId;
    participant.userId = user.id;

    return this.participantsRepository.save(participant);
  }

  async getEventsForUser(userId: number): Promise<EventEntity[]> {
    const participantEvents = await this.participantsRepository.find({
      where: { userId: userId }, 
      relations: ['event'],  
    });
  
    const events = participantEvents.map(participant => participant.event);
  
    return events;
  }
  
}
