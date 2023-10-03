import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import {User} from "@app/common/entity/users.entity";

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  friend_id!: number;

  @Column()
  friend_name!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updateAt!: Date;
}