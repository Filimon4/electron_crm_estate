import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { House } from "./House";
import { Min } from "class-validator";

@Entity()
export class Flat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => House, (house) => house.id)
  @JoinColumn({name: 'house', referencedColumnName: 'id'})
  house: number;

  @Column({type: 'integer', unique: true})
  flat_number: number;

  @Column({type: 'integer'})
  @Min(0)
  price: number
}
