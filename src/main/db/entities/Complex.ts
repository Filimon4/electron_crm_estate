import { Length, Max, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Builder } from "./Builder";

@Entity()
export class Complex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false})
  @Length(3, 40)
  city: string;

  @Column({type: 'varchar', nullable: false})
  @Length(3, 40)
  distrito: string;

  @ManyToOne(() => Builder, (builder) => builder.id)
  @JoinColumn({name: 'builder', referencedColumnName: 'id'})
  builder: number;
}
