//affiche le message de la fonction retournerMessageScore
function afficherResultat(pScore, pNombreQuestions) {
    let zoneScore = document.querySelector(".zoneScore span");
    zoneScore.textContent = `${pScore}/${pNombreQuestions}`;
};

function afficherProposition (pProposition) {
    document.querySelector(".zoneProposition").innerHTML = `${pProposition}`;
};

//fonction donée dans le cours
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'AzerType !`
    location.href = mailto
};

//véfifie si le nom saisi correspond aux critères
function validerNom (pNom) {
    //let regexNom = new RegExp("\\w{2}"); Ne prend pas en compte les accents
    if (pNom.length < 2) {
        throw new Error("Le nom est trop court.");
    };
};

function validerEmail (pEMail) {
    //l'@ mail doit être composée d'un caractère ou plus puis @ puis un caractère ou plus puis . puis un caractère ou plus
    let regexMail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
    if (regexMail.test(pEMail) == false) {
        throw new Error("L'adresse mail n'est pas valide.");
    };
};

function gererFormulaire (pScoreAEnvoyer) {
    try {
        let nom = document.getElementById("nom").value;
        //cela efface les espaces avant et après le nom
        nom = nom.trim();
        let adresseMail = document.getElementById("email").value;

        //vérification du nom et de l'adresse mail
        validerNom(nom);
        validerEmail(adresseMail);

        afficherMessageErreur("");
        afficherEmail(nom, adresseMail, pScoreAEnvoyer);
    }
    catch (error) {
        console.log(error.message);
        afficherMessageErreur(error.message);
    };
};

function afficherMessageErreur (pMessageErreur) {
    let spanErreur = document.getElementById("messageErreur");
    if (!spanErreur) {
        let popup = document.querySelector(".popup");
        spanErreur = document.createElement('span');
        spanErreur.id = "messageErreur";
        
        popup.appendChild(spanErreur);
    };
    spanErreur.innerText = (pMessageErreur);
};

//fonction principale, lance les autres fonctions pour faire le jeu
function lancerJeu () {
    let listeChoisie = listeMots;
    let score = 0;
    let boutonValidation = document.getElementById("btnValiderMot");
    let zoneTexteSaisi = document.getElementById("inputEcriture");
    let i = 0;

    //permet le fonctionnement de la pop-up
    initAddEventListenerPopup()

    afficherProposition(listeChoisie[i]);
    boutonValidation.addEventListener("click", () => {

        if (zoneTexteSaisi.value === listeChoisie[i]) {
            score ++;
        };

        i ++
        afficherResultat(score, i);
        if (listeChoisie[i] === undefined) {
            afficherProposition("Le jeu est fini.");
            boutonValidation.disabled = true;
        }
        else {
            afficherProposition(listeChoisie[i]);
        };
        zoneTexteSaisi.value = "";
    });

    let listeInputRadio = document.querySelectorAll(".optionSource input");
    for (let j = 0; j < listeInputRadio.length; j ++) {
        listeInputRadio[j].addEventListener("change", (event) => {
            switch (event.target.id) {
                case ("mots") :
                    listeChoisie = listeMots;
                    break;
                case ("phrases") : 
                    listeChoisie = listePhrases;
                    break;
            };
            afficherProposition(listeChoisie[i]);
        });
    };

    let formPartager = document.querySelector("form");
    formPartager.addEventListener("submit", (event) => {
        //cela empêche le comportement par défaut du form pour me laisser le gérer
        event.preventDefault();
        let scoreAEnvoyer = `${score} / ${i}`;
        gererFormulaire(scoreAEnvoyer);
    });
};