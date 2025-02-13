// src/participants/dto/create-participant.dto.ts
import { IsInt } from 'class-validator';

export class CreateParticipantDto {
  @IsInt()
  eventId: number;

  @IsInt()
  userId: number;
}
