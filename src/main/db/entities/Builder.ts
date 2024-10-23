import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Developer } from "./Developer";
import { Length } from "class-validator";

@Entity()
export class Builder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", unique: true, nullable: false})
  @Index()
  @Length(11, 11)
  phone: string;

  @ManyToOne(() => Developer, (developer) => developer.id)
  @JoinColumn({name: 'developer', referencedColumnName: 'id'})
  developer: number;

  @Column({type: "varchar", nullable: false})
  @Length(2, 30)
  firstName: string;

  @Column({type: "varchar", nullable: false})
  @Length(2, 40)
  sureName: string;

  @Column({type: "varchar", nullable: false})
  @Length(2, 40)
  lastName: string;

}
