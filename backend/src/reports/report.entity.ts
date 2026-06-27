import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  area!: string;

  @Column()
  category!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: 'float', nullable: true })
  lat!: number;

  @Column({ type: 'float', nullable: true })
  lng!: number;

  @Column({ default: 0 })
  votes!: number;

  @Column({ default: 'Pending' })
  status!: string;

  @Column({ default: 'Medium' })
  priority!: string;

  @Column({ default: 0 })
  score!: number;

  @Column({ nullable: true })
  photoUrl!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
