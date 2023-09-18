import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('reservations')
export class Reservation {

    @PrimaryGeneratedColumn('uuid')
    id_reservation: string;

    @Column()
    date_arrive : Date

    @Column()
    date_depart : Date

    @Column()
    nb_personnes : string

    @Column()
    prix_total : string

    // @Column()
    // id_client : string

    // @Column()
    // id_chambre : string

}

