import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client";
import { Flat } from "./Flat";
import { User } from "./User";

@Entity()
export class DealReport {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Flat)
  @JoinColumn({ name: 'flat_id' })
  flat: Flat;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'realtor_id' })
  realtor: User;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column("decimal", { precision: 10, scale: 2 })
  total_price: number; // Общая стоимость сделки

  @Column()
  deal_count: number; // Количество сделок с этим клиентом

  @Column()
  year: number; // Год отчёта

  @Column()
  month: number; // Месяц отчёта

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  last_updated: Date; // Дата последнего обновления отчёта
}