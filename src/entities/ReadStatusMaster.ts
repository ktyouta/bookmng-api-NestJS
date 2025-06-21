import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({ name: 'read_status_master', schema: 'bookmng' })
export class ReadStatusMaster extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 2, name: 'id' })
    id!: number;

    @Column({ type: 'varchar', length: 255, name: 'label', nullable: true })
    label?: string;

    @Column({ type: 'varchar', length: 1, name: 'delete_flg' })
    deleteFlg!: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_date' })
    createDate!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_date' })
    updateDate!: Date;
}
