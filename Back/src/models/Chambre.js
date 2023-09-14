class Chambres{constructor(id_chambre, nom, description, capacite, prix_par_nuit, disponibilite, equipements, avis, mots_cles, id_hote){             
    this.nom = nom;
    this.description = description;
    this.capacite = capacite;
    this.prix_par_nuit = prix_par_nuit;
    this.disponibilite = disponibilite;
    this.avis = avis;
    this.equipements = equipements;
    this.mots_cles = mots_cles;
    this.id_hote = id_hote;
    }    
}

module.exports = {Chambres}
