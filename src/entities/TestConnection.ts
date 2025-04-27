import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('test_connection')
export class TestConnection extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: string;
}