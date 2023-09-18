import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservations')
export class Reservation {

    @PrimaryGeneratedColumn('uuid')
    id_reservation: string

    @Column()
    date_arrive : string

    @Column()
    date_depart : string

    @Column()
    nb_personnes : string

    @Column()
    prix_total : string

}

