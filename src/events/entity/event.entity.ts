// src/events/event.entity.ts
import { ParticipantEntity } from 'src/participants/entity/participants.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('timestamp')
  date: Date;

  @Column()
  location: string;

  @Column()
  maxParticipants: number;

  @OneToMany(() => ParticipantEntity, (participant) => participant.event)
  participants: ParticipantEntity[];
}
