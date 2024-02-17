class ValidatorService {

    static enumEducationValidator = (value) => {
        if (value == 'TK') {
            return value
        }
        else if (value == 'SD') {
            return value
        }
        else if (value == 'SMP') {
            return value
        }
        else if (value == 'SMA') {
            return value
        }
        else if (value == 'Strata 1') {
            return value
        }
        else if (value == 'Strata 2') {
            return value
        }
        else if (value == 'Strata 3') {
            return value
        }
        else if (value == 'Doktor') {
            return value
        }
        else if (value == 'Profesor') {
            return value
        }
        else {
            return false
        }
    }

    static enumGenderValidator = (value) => {
        if(value == 'Laki-laki') {
            return value
        }
        else if (value == 'Perempuan') {
            return value
        }
        else {
            return false
        }
    }

    static enumReligionValidator = (value) => {
        if (value == 'Islam') {
            return value
        }
        else if (value == 'Katolik') {
            return value
        }
        else if (value == 'Buda') {
            return value
        }
        else if (value == 'Protestan') {
            return value
        }
        else if (value == 'Konghucu') {
            return value
        }
        else {
            return false
        }
    }
    
    static enumRelationValidator = (value) => {
        if (value == 'Suami') {
            return value
        }
        else if (value == 'Istri') {
            return value
        }
        else if (value == 'Anak') {
            return value
        }
        else if (value == 'Anak Sambung') {
            return value
        }
        else {
            return false
        }
    }

}

module.exports = ValidatorService