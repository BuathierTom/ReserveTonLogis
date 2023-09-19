import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Reservation } from "./reservation.entity";

@Entity('chambres')
export class Chambre {

    @PrimaryGeneratedColumn('uuid')
    id_chambre : string

    @Column()
    nom : string

    @Column()
    description : string

    @Column()
    capacite : string

    @Column()
    prix : string

    @Column()
    disponibilite : string

    @Column()
    avis : string

    @Column()
    equipements : string

    @Column()
    mots_cles : string

    @OneToOne(() => Reservation, (reservation) => reservation.chambre)
    @JoinColumn()
    reservation: Reservation;

}

