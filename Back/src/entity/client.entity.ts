import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable, ManyToMany } from "typeorm";
import { Reservation } from "./reservation.entity"

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

    // @OneToMany(() => Reservation, (reservation) => reservation.client)
    // reservations: Reservation[];

    @ManyToMany(() => Reservation, reservation => reservation.client)
    @JoinTable()
    reservations: Reservation[];

}

