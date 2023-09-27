class Reservation{constructor(id_reservation, date_arrive, date_depart, nb_personnes, prix_total){             
    this.id_reservation = id_reservation;
    this.date_arrive = date_arrive;
    this.date_depart = date_depart;
    this.nb_personnes = nb_personnes;
    this.prix_total = prix_total;
    }    
}

module.exports = {Reservation}
