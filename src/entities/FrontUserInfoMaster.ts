import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({ name: 'front_user_info_master', schema: 'bookmng' })
export class FrontUserInfoMaster extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'user_id' })
    userId!: number;

    @Column({ type: 'varchar', length: 255, name: 'user_name' })
    userName!: string;

    @Column({ type: 'varchar', length: 8, name: 'user_birthday' })
    userBirthday!: string;

    @Column({ type: 'varchar', length: 1, name: 'delete_flg' })
    deleteFlg!: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_date' })
    createDate!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_date' })
    updateDate!: Date;
}
