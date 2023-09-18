import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('chambres')
export class Chambres {

    @PrimaryGeneratedColumn('uuid')
    id_chambre : string

    @Column()
    nom : string

    @Column()
    description : string

    @Column()
    capacite : number

    @Column()
    prix : number

    @Column()
    disponibilite : string

    @Column()
    avis : string

    @Column()
    equipements : string

    @Column()
    mots_cles : string

}

