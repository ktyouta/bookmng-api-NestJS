import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({ name: 'bookshelf_transaction', schema: 'bookmng' })
export class BookshelfTransaction extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'user_id' })
    userId!: number;

    @PrimaryColumn({ type: 'varchar', length: 255, name: 'book_id' })
    bookId!: string;

    @Column({ type: 'text', name: 'review', nullable: true })
    review?: string;

    @Column({ type: 'text', name: 'highlights', nullable: true })
    highlights?: string;

    @Column({ type: 'varchar', length: 1, name: 'delete_flg' })
    deleteFlg!: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_date' })
    createDate!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_date' })
    updateDate!: Date;
}
