import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class CreateParticipantDto {
  @ApiProperty({
    description: 'The ID of the event that the participant is registering for',
    example: 1,
  })
  @IsInt()
  eventId: number;

  @ApiProperty({
    description: 'The ID of the user who is registering for the event',
    example: 1,
  })
  @IsInt()
  userId: number;
}