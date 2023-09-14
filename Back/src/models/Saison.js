class Saison{constructor(id_saison, date_res, temparature, conditions_meteorologique, promotion, id_chambre){             
    this.id_saison = id_saison;
    this.date_res = date_res;
    this.temparature = temparature;
    this.conditions_meteorologique = conditions_meteorologique;
    this.promotion = promotion;
    this.id_chambre = id_chambre;
    }
}

module.exports = {Saison}