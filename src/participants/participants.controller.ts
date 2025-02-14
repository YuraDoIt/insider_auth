import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('participants')
@ApiTags('Participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a participant to an event' })
  @ApiBody({
    description: 'The data required to register a participant to an event',
    type: CreateParticipantDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Participant successfully registered',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, invalid data',
  })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get participants by event ID' })
  @ApiParam({ name: 'eventId', type: 'number', description: 'The event ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved participants for the event',
  })
  @ApiResponse({
    status: 404,
    description: 'Event not found',
  })
  findByEvent(@Param('eventId') eventId: number) {
    return this.participantsService.findByEvent(eventId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get events by user ID' })
  @ApiParam({ name: 'userId', type: 'number', description: 'The user ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved events for the user',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findByUser(@Param('userId') userId: number) {
    return this.participantsService.findByUser(userId);
  }
}
