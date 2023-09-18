import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('clients')
export class Client {

    @PrimaryGeneratedColumn('uuid')
    id_client : string

    @Column()
    nom : string

    @Column()
    prenom : string

    @Column()
    adresse : string

    @Column()
    telephone : string

    @Column()
    email : string

    @Column()
    password : string

}

