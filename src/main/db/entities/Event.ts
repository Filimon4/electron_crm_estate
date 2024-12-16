import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: "timestamp" })
  start: Date;

  @Column({ type: "timestamp" })
  end: Date;

  @Column({ default: false })
  allDay: boolean;

  @Column({type: 'integer'})
  user_id: number

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({name: "user_id", referencedColumnName: "id"})
  user: User;
}