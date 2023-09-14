class Clients{constructor(id_client, nom, prenom, age, sexe, adresse, ville, codePostal, telephone, email, motDePasse){             
    this.id_client = id_client;
    this.nom = nom;   
    this.prenom = prenom;
    this.age = age;
    this.sexe = sexe;
    this.adresse = adresse;
    this.ville = ville;
    this.codePostal = codePostal;
    this.telephone = telephone;
    this.email = email;
    this.motDePasse = motDePasse;
    }    
}

module.exports = {Clients}