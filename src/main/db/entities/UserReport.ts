import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { User } from "./User";

@Entity()
export class UserReport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'realtor_id' })
  realtor: User;

  @Column({type: 'decimal', precision: 2, scale: 2})
  total_sales: number;

  @Column({type: 'integer'})
  deal_count: number;

  @Column({type: 'integer'})
  estate_count: number

  @Column({type: 'integer'})
  year: number;

  @Column({type: 'integer'})
  month: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  last_updated: Date;
}