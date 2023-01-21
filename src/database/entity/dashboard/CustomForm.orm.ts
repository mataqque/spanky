import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm';

@Entity()
export class CustomFieldForm extends BaseEntity {
    @Column({unique: true})
    uuid:string;
    @Column()
    type:string;
    @Column()
    title = "";
    @Column()
    placeholder = '';
    @Column()
    value = '';
    @Column()
    groupForm = "";
    @Column()
    enable = false
    @Column()
    dateAt = "";
    @Column()
    dateUpdate = "";
}

export class CustomForm extends BaseEntity {
    @Column()
    uuid: string;

    @Column()
    name: string;
    
}