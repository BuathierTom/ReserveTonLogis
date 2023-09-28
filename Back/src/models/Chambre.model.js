class Chambres{constructor(nom, description, capacite, superficie, prix, disponibilite, equipements, avis, mots_cles, id_hote, image1, image2, image3){             
    this.nom = nom;
    this.description = description;
    this.capacite = capacite;
    this.superficie = superficie;
    this.prix = prix;
    this.disponibilite = disponibilite;
    this.avis = avis;
    this.equipements = equipements;
    this.mots_cles = mots_cles;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    }    
}

module.exports = {Chambres}
