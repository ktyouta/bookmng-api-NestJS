import { Entity, PrimaryColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({ name: 'bookshelf_memo_transaction', schema: 'bookmng' })
export class BookshelfMemoTransaction extends BaseEntity {
    @PrimaryColumn({ type: 'int', name: 'user_id' })
    userId!: number;

    @PrimaryColumn({ type: 'varchar', length: 255, name: 'book_id' })
    bookId!: string;

    @PrimaryColumn({ type: 'int', name: 'seq' })
    seq!: number;

    @Column({ type: 'text', name: 'memo', nullable: true })
    memo?: string;

    @Column({ type: 'varchar', length: 1, name: 'delete_flg' })
    deleteFlg!: string;

    @CreateDateColumn({ type: 'timestamp', name: 'create_date' })
    createDate!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'update_date' })
    updateDate!: Date;
}
