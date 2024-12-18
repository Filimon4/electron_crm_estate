import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Flat } from "./Flat";
import { Client } from "./Client";
import { IsDate } from "class-validator";
import { User } from "./User";

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Flat, (flat) => flat.id)
  @JoinColumn({name: 'flat', referencedColumnName: 'id'})
  flat: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({name: 'realtor', referencedColumnName: 'id'})
  realtor: number;

  @OneToOne(() => Client, (client) => client.id)
  @JoinColumn({name: 'client', referencedColumnName: 'id'})
  client: number;

  @Column({type: 'varchar'})
  status: string

  @CreateDateColumn()
  @IsDate()
  created_at: Date;

  @UpdateDateColumn()
  @IsDate()
  updated_at: Date;
}
