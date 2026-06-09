import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('decimal')
  price!: number;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string;

  @Column()
  category!: string;

  @Column({ default: true })
  isAvailable!: boolean;
}
