class Chambres{constructor(nom, disponibilite, description, capacite, nb_lits, equipement, avis, mots_cles, Id_client, Id_reservation){             
    this.nom = nom;
    this.disponibilite = disponibilite;
    this.description = description;
    this.capacite = capacite;
    this.nb_lits = nb_lits;
    this.equipement = equipement;
    this.avis = avis;
    this.mots_cles = mots_cles;
    this.Id_client = Id_client;
    this.Id_reservation = Id_reservation;
    }    
}

module.exports = {Chambres}
