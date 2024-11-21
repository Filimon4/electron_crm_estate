import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { House } from "./House";
import { Min } from "class-validator";

@Entity()
export class Flat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'integer', name: 'house_id', nullable: true})
  house_id: number

  @ManyToOne(() => House, (house) => house.id, {eager: true})
  @JoinColumn({name: 'house_id', referencedColumnName: 'id'})
  house: House;

  @Column({type: 'integer'})
  @Min(1)
  flat: number

  @Column({type: 'integer'})
  @Min(1)
  room_amount: number;

  @Column({type: 'integer'})
  @Min(1)
  floor: number

  @Column({type: 'integer'})
  @Min(1)
  size: number

  @Column({type: 'integer'})
  @Min(0)
  price: number;

  @Column({type: 'text', nullable: true})
  description: string
}
