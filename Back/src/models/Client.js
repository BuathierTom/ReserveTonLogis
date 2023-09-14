class Clients{constructor(id_client, nom, prenom, adresse, telephone, email, motDePasse){             
    this.id_client = id_client;
    this.nom = nom;   
    this.prenom = prenom;
    this.adresse = adresse;
    this.telephone = telephone;
    this.email = email;
    this.motDePasse = motDePasse;
    }    
}

module.exports = {Clients}