import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({ name: 'seq_master', schema: 'bookmng' })
export class SeqMaster extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 1000, name: 'key' })
    key!: string;

    @Column({ type: 'int', name: 'next_id', nullable: true })
    nextId!: number;

    @CreateDateColumn({ type: 'timestamp', name: 'create_date' })
    createDate!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_date' })
    updateDate!: Date;
}
