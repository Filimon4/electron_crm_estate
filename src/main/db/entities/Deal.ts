import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Flat } from "./Flat";
import { Realtor } from "./Realtor";
import { Client } from "./Client";

@Entity()
export class Deal {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Flat, (flat) => flat.id)
  @JoinColumn({name: 'flat', referencedColumnName: 'id'})
  flat: number;

  @OneToOne(() => Realtor, (realtor) => realtor.id)
  @JoinColumn({name: 'realtor', referencedColumnName: 'id'})
  realtor: number;

  @OneToOne(() => Client, (client) => client.id)
  @JoinColumn({name: 'client', referencedColumnName: 'id'})
  client: number;

  @Column({type: "integer", nullable: false})
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}