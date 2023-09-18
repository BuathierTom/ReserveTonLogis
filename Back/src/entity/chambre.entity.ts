import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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

}

