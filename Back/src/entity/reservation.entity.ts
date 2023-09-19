import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Client } from "./client.entity";
import { Chambre } from "./chambre.entity";

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

    // @ManyToOne(() => Client, (client) => client.reservations)
    // client: Client;

    @ManyToMany(() => Client, client => client.reservations)
    @JoinTable()
    client: Client[];

    @OneToOne(() => Chambre, (chambre) => chambre.reservation)
    @JoinColumn() 
    chambre: Chambre;
}

