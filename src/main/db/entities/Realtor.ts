import { IsEmail, Length } from "class-validator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Realtor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", unique: true, nullable: false})
  @Index()
  @Length(11, 11)
  phone: string;

  @Column({type: "varchar", unique: true, nullable: false})
  @Index()
  @Length(5, 40)
  @IsEmail()
  email: string

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