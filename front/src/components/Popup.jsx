import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


// Pop up de confirmation de déconnexion
export function disconnectPopup() {
    return MySwal.fire({
        icon: 'success',
        title: 'Vous êtes déconnecté(e) !',
        showConfirmButton: false,
        timer: 3000
    })
}

// Pop up de confirmation de modification de mot de passe
export function modifPasswordPopup() {
    MySwal.fire({
        icon: 'success',
        title: 'Votre mot de passe a bien été modifié !',
        showConfirmButton: false,
        timer: 3000
    })
}

// Pop up d'erreur de modification de mot de passe
export function modifPasswordErrorPopup() {
    return MySwal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Le nouveau mot de passe est identique à l\'ancien !',
        showConfirmButton: true,
        confirmButtonColor: '#4BAB77',
    })
}


// Pop up de confirmation de demande de confirmation de réservation
export function deleteAccountPopup() {

    return MySwal.fire({
        title: 'Êtes-vous sûr(e) ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'question',
        iconColor: '#4BAB77',
        showCancelButton: true,
        confirmButtonColor: '#4BAB77',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui, supprimer mon compte !'
    })
}

// Pop up de confirmation de réservation
export function reservationPopup(){
    return MySwal.fire({
        icon: 'success',
        title: 'Votre réservation a bien été prise en compte !',
        showConfirmButton: true,
        confirmButtonColor: '#4BAB77',
    })
}

// Pop up de confirmation de connexion
export function connectPopup(){
    return MySwal.fire({
        icon: 'success',
        title: 'Vous êtes connecté !',
        showConfirmButton: false,
        timer: 3000
    })
}

// Pop up d'erreur de connexion
export function connectErrorPopup(){
    MySwal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Email ou mot de passe incorrect !',
        showConfirmButton: true,
        confirmButtonColor: '#4BAB77',
    })
}

// Pop up de confirmation de création de compte
export function createAccountPopup(){
    return MySwal.fire({
        icon: 'success',
        title: 'Votre compte a bien été créé, vous pouvez vous connecter !',
        showConfirmButton: false,
        timer: 3000
    })
}

// Pop up d'erreur de création de compte
export function createAccountErrorPopup(){
    MySwal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Une erreur s\'est produite, veuillez réessayer',
    })
}

// Pop up de confirmation d'envoi de message
export function contactPopup(){
    return MySwal.fire({
        icon: 'success',
        title: 'Votre message a bien été envoyé !',
        showConfirmButton: false,
        timer: 3000
    })
}

// Pop up d'erreur d'envoi de message
export function contactErrorPopup(){
    MySwal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Le message n\'a pas pu être envoyé',
        showConfirmButton: true,
        confirmButtonColor: '#4BAB77',
    })
}

export function reservationConnectPopup(){
    return MySwal.fire({
        icon: 'error',
        title: 'Erreur...',
        text: 'Vous devez être connecté pour réserver une chambre',
        showConfirmButton: true,
        confirmButtonColor: '#4BAB77'
    })
}



