import { Check, Column, Entity, Exclusion, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { House } from "./House";
import { Min } from "class-validator";

@Entity('flat')
@Unique("UQ_Flat_One", ['house_id', 'flat'])
export class Flat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'integer', name: 'house_id', nullable: false})
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

  @Column({
    type: 'tsvector',
    select: false,
    generatedType: 'STORED',
    asExpression: `
      to_tsvector(
        'russian',
        coalesce("flat"::text, '') || ' ' ||
        coalesce("room_amount"::text, '') || ' ' ||
        coalesce("size"::text, '') || ' ' ||
        coalesce("price"::text, '') || ' ' ||
        coalesce("floor"::text, '')
      )
    `,
  })
  search_vector: any
}
