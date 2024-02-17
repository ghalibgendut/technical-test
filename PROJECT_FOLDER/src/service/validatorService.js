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


}

module.exports = ValidatorService