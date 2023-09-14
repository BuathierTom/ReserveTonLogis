import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Clients {

    @PrimaryGeneratedColumn()
    id_client: number;

    @Column()
    prenom: string;

    @Column()
    nom: string;

    @Column()
    email: string;

    @Column()
    MotDePasse: string;

    @Column()
    telephone: string;

    @Column()
    adresse: string;

}
