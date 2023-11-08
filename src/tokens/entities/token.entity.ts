import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Users } from '../../users/entities/users.entity';

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true, length: 1000 })
  token: string;

  @Column({ nullable: true })
  refrresh_token: string;

  @Column({ nullable: true })
  expired_in: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Users, (user) => user.token)
  user: Users;
}
