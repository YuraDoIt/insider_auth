// src/participants/participant.entity.ts
import { EventEntity } from 'src/events/entity/event.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity('participants')
export class ParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EventEntity, (event) => event.participants)
  @JoinColumn({ name: 'eventId' })
  event: EventEntity;

//   @ManyToOne(() => UserEntity, (user) => user.participants)
//   @JoinColumn({ name: 'userId' })
//   user: UserEntity;

  @Column()
  eventId: number;

  @Column()
  userId: number;
}
