import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'test_connection', schema: 'bookmng' })
export class TestConnection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;
}