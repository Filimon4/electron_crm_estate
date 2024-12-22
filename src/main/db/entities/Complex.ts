import { Length, Max, Min } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('complex')
export class Complex {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', nullable: false, unique: true})
  @Length(3, 40)
  name: string;

  @Column({type: 'varchar', nullable: false})
  @Length(3, 40)
  city: string;

  @Column({type: 'varchar', nullable: false, unique: true})
  @Length(3, 40)
  district: string;

  @Column({
    type: 'tsvector',
    select: false,
    generatedType: 'STORED',
    asExpression: `
      to_tsvector(
        'russian',
        coalesce("name", '') || ' ' ||
        coalesce("city", '') || ' ' ||
        coalesce("district", '')
      )
    `,
  })
  search_vector: any
}
