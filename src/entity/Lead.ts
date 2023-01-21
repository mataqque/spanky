const { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } = require("typeorm");

@Entity({name: "leads"})
export class Lead extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    fname: string;

    @Column({length: 100})
    lname: string;

    @Column()
    email: string;

    @Column({length: 20})
    phone: string;

    @Column({length: 20, nullable: true, default: null})
    rooms_amount: string;

    @Column({length: 20, nullable: true})
    motive: string;

    @CreateDateColumn()
    created_at: Date;
 
    @UpdateDateColumn()
    updated_at: Date;
}