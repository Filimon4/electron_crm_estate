import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { IsDate } from "class-validator";
import { Flat } from "./Flat";
import { Client } from "./Client";
import { User } from "./User";

export enum DealStatus {
  open = 'open',
  close = 'close'
}

@Entity('deal')
@Unique('UQ_DEAL_FLAT_CLIENT', ['flat', 'client'])
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Flat, (flat) => flat.id)
  @JoinColumn({name: 'flat'})
  flat: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({name: 'realtor', referencedColumnName: 'id'})
  realtor: number;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({name: 'client', referencedColumnName: 'id'})
  client: number;

  @Column({type: 'enum', enum: DealStatus, default: DealStatus.open})
  status: DealStatus

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;

  @Column({type: 'timestamp', nullable: true})
  @IsDate()
  closed_at: Date;
}
