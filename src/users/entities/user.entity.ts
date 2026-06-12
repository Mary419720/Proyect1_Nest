import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;
  @Column({ default: true })
  isActive!: boolean;
}
