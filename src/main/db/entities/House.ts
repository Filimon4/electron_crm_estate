import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Complex } from "./Complex";


@Entity('house')
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Complex, (complex) => complex.id)
  @JoinColumn({name: 'complex', referencedColumnName: 'id'})
  complex: number;

  @Column({type: 'varchar'})
  street: string;

  @Column({type: 'integer', unique: true})
  house_number: number;

}
