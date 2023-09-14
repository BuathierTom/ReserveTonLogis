class Chambres{constructor(nom, disponibilite, description, capacite, nb_lits, equipement, avis, mots_cles, id_client, id_reservation){             
    this.nom = nom;
    this.disponibilite = disponibilite;
    this.description = description;
    this.capacite = capacite;
    this.nb_lits = nb_lits;
    this.equipement = equipement;
    this.avis = avis;
    this.mots_cles = mots_cles;
    this.id_client = id_client;
    this.id_reservation = id_reservation;
    }    
}

module.exports = {Chambres}
