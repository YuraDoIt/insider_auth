// src/participants/participants.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  // Реєстрація учасника на подію
  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  // Отримати учасників по події
  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: number) {
    return this.participantsService.findByEvent(eventId);
  }

  // Отримати події по учаснику
  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.participantsService.findByUser(userId);
  }
}
