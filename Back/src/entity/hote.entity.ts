import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('hotes')
export class Hotes {

    @PrimaryGeneratedColumn('uuid')
    id_hote : string

    @Column()
    nom : string

    @Column()
    adresse : string

    @Column()
    telephone : string

    @Column()
    email : string

}

