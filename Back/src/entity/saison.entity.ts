import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('saisons')
export class Saison {

    @PrimaryGeneratedColumn('uuid')
    id_saison: string;

    @Column()
    date_res : Date

    @Column()
    temperature : string

    @Column()
    conditions_meteorologiques : string

    @Column()
    promotion : string

    // @Column()
    // id_chambre : string

}

