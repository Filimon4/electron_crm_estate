import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { House } from "./House";

@Entity()
export class Flat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => House, (house) => house.id)
  @JoinColumn({name: 'house', referencedColumnName: 'id'})
  house: number;

  @Column({type: 'integer', unique: true})
  flat_number: number;

}
