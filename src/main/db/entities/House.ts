import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Complex } from "./Complex";

@Entity('house')
@Unique('UQ_HOUSE_STREET_NUMBER', ['complex', 'street', 'house_number'])
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Complex, (complex) => complex.id, {nullable: false})
  @JoinColumn({name: 'complex', referencedColumnName: 'id'})
  complex: number;

  @Column({type: 'varchar'})
  street: string;

  @Column({type: 'integer'})
  house_number: number;

}
