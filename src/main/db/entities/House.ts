import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Complex } from "./Complex";

@Entity('house')
@Unique('UQ_HOUSE_STREET_NUMBER', ['complex', 'street', 'house_number'])
export class House {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'integer', nullable: false})
  complex_id: number

  @ManyToOne(() => Complex, (complex) => complex.id, {eager: true})
  @JoinColumn({name: 'complex_id', referencedColumnName: 'id'})
  complex: Complex;

  @Column({type: 'varchar'})
  street: string;

  @Column({type: 'integer'})
  house_number: number;

  @Column({
    type: 'tsvector',
    select: false,
    generatedType: 'STORED',
    asExpression: `
      to_tsvector(
        'russian',
        coalesce("street", '') || ' ' ||
        coalesce("house_number"::text, '')
      )
    `,
  })
  search_vector: any
}
