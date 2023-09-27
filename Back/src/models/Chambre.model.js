class Chambres{constructor(nom, description, capacite, prix, disponibilite, equipements, avis, mots_cles, id_hote){             
    this.nom = nom;
    this.description = description;
    this.capacite = capacite;
    this.prix = prix;
    this.disponibilite = disponibilite;
    this.avis = avis;
    this.equipements = equipements;
    this.mots_cles = mots_cles;
    }    
}

module.exports = {Chambres}
