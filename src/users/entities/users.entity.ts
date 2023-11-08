import {
  Entity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Tokens } from '../../tokens/entities/token.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Unique(['email'])
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ length: 255 })
  first_name: string;

  @Column({ length: 255 })
  last_name: string;

  @Column()
  phone_number: string;

  @Column()
  job_title: string;

  @Column()
  gender: number;

  @Column()
  company: string;

  @Column()
  avatar_url: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deleted_at: Date;

  @OneToMany(() => Tokens, (token) => token.user_id)
  token: Tokens[];
}
