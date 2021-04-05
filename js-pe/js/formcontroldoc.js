// Het script is zodanig opgebouwd dat elke melding gestructureerd op zijn eigen plaats blijft.
// Hierdoor heb ik niet echt gebruik moeten maken van arrays bij het checken van velden,
// Toch heb ik om te laten zien dat het mogelijk is deze wel aangemaakt in arraygebied1 en 2.

// overruled declaratie
let foutenlijst = []; // foutenlijst array aangemaakt
let arraygebied1 = ["voornaam", "achternaam"]; //array voor checken lege velden voornaam en achternaam
let arraygebied2 = ["adres", "land", "provincie"]; // array voor checken lege velden adres land en provincie

//-----------------------------------------------------------------------------------------------------------------------------//

// klikken op de knop start validateform functie:
// hoofdprogramma alles gebeurd via hier stap per stap.
function validateForm() {
    //declaratie
    const voornaam = document.getElementById('voornaam').value;// nodig om voornaam mee te geven in alles goed melding
    const gebruikersnaam = document.getElementById('gebruikersnaam').value; // nodig om gebruikers te controleren
    const email = document.getElementById('email').value;// nodig om emailadres te controleren
    const wachtwoord = document.getElementById('wachtwoord').value; // nodig om wachtwoord te controleren
    const wachtwoordherhaling = document.getElementById('wachtwoordherhaling').value; //nodig om wachtwoord herhaling te controleren
    let betalingen = getValueRadio(); // opvragen value radio button
    let errorlist = document.getElementById('fouten'); // error melding met lijst
    let paylist = document.getElementById('betalingswijze');// melding betalingswijze met lijst
    let gelukt = document.getElementById('gelukt'); // melding dat alles gelukt is


    // aanpassen klasse meldingsblok , hierdoor word de rechterkolom met de juiste melding weer gegeven.
    document.getElementById("meldingblok").className = "col-md-5";


    //<<<<<<<<<<<<<<<<<---------------------- CHECKS----------------------------->>>>>>>>>>>>>

    checkEmptyFieldArray1();  //controle of voor en achternaam ingevuld is.

    checkGebruiker(gebruikersnaam); //controle of gebruikers ingevuld is + nakijken dat  niet begint met .,-,_

    validateEmail(email); // controle emailadres ingevuld + juist.

    validatePassword(wachtwoord, wachtwoordherhaling); // controle dat wachtwoord ingevuld is + lang genoeg is + overeenkomt

    checkEmptyFieldArray2(); // controle dat land provincie en adres ingevuld is

    checkPC("postcode"); // controle dat postcode ingevuld is + tussen 1000 en 9999 ligt

    checkEmptyField(betalingen, "betalingen"); //controle dat betalingen ingevuld is (veld,melding)

    CheckAlgemeneVoorwaarden(); // controle dat algemene voorwaarden geaccepteerd zijn


    // opbouw foutenlijst

    //opbouwtekstlijstfout
    if (foutenlijst != 0) {
        errorlist.innerHTML = foutenFormulier(foutenText()); // fout aanwezig toon foutenkader + tekst
    }
    else {
        errorlist.innerHTML = ""; // fout niet aanwezig verberg foutenkader + tekst
    }

    // opbouw tekstlijst gelukt
    if (foutenlijst.length == 0) {

        paylist.innerHTML = validatePayment(betalingen); // Betalingswijze weergeven gelukt

        gelukt.innerHTML = allesGelukt(voornaam); // Groen kader weergeven gelukt
    }
    else {
        paylist.innerHTML = ""; // als er fout is kader betalingswijze niet tonen

        gelukt.innerHTML = ""; // als er fout aanwezig is gelukt kader niet tonen
    }

    foutenlijst = [];
}

//---------------------------------------------------------------------------------------------------//
// enkel geprogrammeerd op deze manier om te laten zien dat het mogelijk is , 
// velden voornaam en familienaam nakijken
function checkEmptyFieldArray1() {
let i,veld,melding;

    for (i = 0; i <= (arraygebied1.length - 1); i++) {
        veld = arraygebied1[i];
        melding = veld;
        checkEmptyField(veld, melding);
    }
}
// velden land provincie postcode nakijken
function checkEmptyFieldArray2() {
    let i,veld,melding;
    for (i = 0; i <= (arraygebied2.length - 1); i++) {
        veld = arraygebied2[i];
        melding = veld;
        checkEmptyField(veld, melding);
    }
}




//---------------------------------------------------------------------------------------------------//
// omvormen array naar lijst fouten
function foutenText() {
    let i;
    let foutentext = "";
    for (i = 0; i < foutenlijst.length; i++) {
        foutentext += '<i class="fas fa-exclamation-triangle"></i> ' + foutenlijst[i] + "<br>";
    }
    return foutentext;
}

//---------------------------------------------------------------------------------------------------//

//nakijken of algemene voorwaarden aangeduid zijn
function CheckAlgemeneVoorwaarden() {

    let gecheckt = document.getElementById('algemenevoorwaarden');
    if (gecheckt.checked == false) {
        foutenlijst.push("Je moet de algemene voorwaarden accepteren!");
    }
}


//---------------------------------------------------------------------------------------------------//

// sluiten foutframe
function closeFouten() {
    document.getElementById("meldingblok").className = "d.none";
}

//---------------------------------------------------------------------------------------------------//
//sluiten registerframe + allesgoedframe teller voor 2 x te duwen
let sluitenteller = 0;

function closeTeller() {
    sluitenteller++;
    if (sluitenteller == 2) {
        document.getElementById("meldingblok").className = "d.none";
        sluitenteller = 0;
    }

}
//---------------------------------------------------------------------------------------------------//


// Controle lege velden
function checkEmptyField(veld, melding) {
    let waarde;
    if (melding == "betalingen") { // als veld waarde is moet waarde direct doorgegeven worden
        waarde = veld;
    }
    else {
        waarde = document.getElementById(veld).value; // anders is waarde = veldid;

    }
    if (waarde.length == 0) {
        foutenlijst.push("Het veld " + melding + " is vereist!");
    } // bij fout extra lijn in array met foutmelding
}

//---------------------------------------------------------------------------------------------------//


//Gebruikersnaam controle

function checkGebruiker(gebruikersnaam) {
    let streepcheck;
    let puntcheck;
    let koppelcheck;

    checkEmptyField("gebruikersnaam", "gebruikersnaam");

    // specialetekenplaatsen check
    streepcheck = gebruikersnaam.indexOf("_");// positie liggende streep
    puntcheck = gebruikersnaam.indexOf(".");// positie punt
    koppelcheck = gebruikersnaam.indexOf("-");// positie koppelteken

    // Speciale tekens gebruikersnaam nakijken
    if (streepcheck == 0 || puntcheck == 0 || koppelcheck == 0) {
        foutenlijst.push("Gebruikersnaam mag niet beginnen met punt , liggende streep of koppelteken!");
    }
}
//---------------------------------------------------------------------------------------------------//


//Email validatie selfmade
function validateEmail(email) {
    checkEmptyField("email", "email"); // nakijken of email ingevuld is 
    if (validateEmailcheck(email) == false && email.length != 0) { // nakijken of email correct is.
        foutenlijst.push("Het opgegeven e-mailadres is niet correct!");

    }
}
//---------------------------------------------------------------------------------------------------//


// Email validatie online gevonden https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

function validateEmailcheck(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}



//---------------------------------------------------------------------------------------------------//


//Passwoord controle

function validatePassword(wachtwoord, wachtwoordherhaling) {

    checkEmptyField("wachtwoord", "wachtwoord"); //checken of wachtwoordenveld 1 ingevuld is FOUTMELDING WACHTWOORD NIET INGEVULD

    if (wachtwoord.length < 7 && foutenlijst.length == 0) {       // als ingevuld checken op lengte FOUTMELDING LENGTE
        foutenlijst.push("Het opgegeven wachtwoord is te kort!");
    }

    checkEmptyField("wachtwoordherhaling", "herhaal wachtwoord"); // nakijken dat wachtwoord herhaling ingevuld is 

    //als de lengte Oke is is de foutmelding nog steeds string.empty dus dan checken of wachtwoorden gelijk zijn.
    if (wachtwoord != wachtwoordherhaling && foutenlijst.length == 0) {
        foutenlijst.push("Beide wachtwoorden komen niet overeen!");
    }
}
//------------------LAYOUTS---------------------------------------------------------//

// in de layout word heel de layout code mee gekoppieerd om zo het voor elkaar te krijgen dat de meldingen ook gesloten kunnen worden via de bootstrap alerts
//betalingswijze Layout
function validatePayment(betaalmethode) {
    let logo = "";

    // Extra logo toevoegen bij eindigen formulier
    if(betaalmethode == "Banking app" ){ 
        logo = '<i class="fas fa-mobile-alt fa-5x d-flex justify-content-center"></i>';
    }
    else if (betaalmethode == "Overschrijving"){
        logo = '<i class="fas fa-piggy-bank fa-5x d-flex justify-content-center"></i>';
    }
    else if(betaalmethode == "Visa card"){
        logo = '<i class="fab fa-cc-visa fa-5x d-flex justify-content-center"></i>';
    }
    else if(betaalmethode == "Paypal"){
        logo = '<i class="fab fa-paypal fa-5x d-flex justify-content-center"></i>';
    }
    else if(betaalmethode == "Bitcoin"){
        logo = '<i class="fab fa-bitcoin fa-5x d-flex justify-content-center">';
    }
    let betalingalert = '<div class="alert alert-primary alert-dismissible fade show" role="alert">' +
        ' <h4>Betalingswijze</h4>' + "<p>Je betalingswijze is " + betaalmethode + '</p>' + logo +

        '<button onclick="closeTeller()" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div>';


    return betalingalert;

}


// Alles is gelukt layout + kader
function allesGelukt(naam) {

    let geluktalert = '<div class="alert alert-success alert-dismissible fade show" role="alert">' +
        ' <h4>GOALLLLLL!</h4>' + "<p>Proficiat " + naam + " je bent succesvol geregistreerd!</p>" +
        '<button onclick="closeTeller()" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + '<img src="img/goal.jpg" class="mx-auto d-block"' + ' </div>';

    return geluktalert;
}
// Foutenformulier layout
function foutenFormulier(foutenlijst) {
    let foutalert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">' +
        ' <h4>Yikes,errors..</h4> <p>' + foutenlijst + '</p>' +

        '<button onclick="closeFouten()" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button> </div>';
    return foutalert;
}

//---------------------------------------------------------------------------------------------------//

//nakijken postcode
function checkPC(veld) {
    checkEmptyField(veld, veld); //nakijken dat postcode ingevuld is 
    let postcode = document.getElementById(veld).value;
    if (postcode < 1000 && foutenlijst.length == 0 || postcode > 10000 && foutenlijst.length == 0) { // nakijken dat postcode tussen 1000 en 9999 ligt
        foutenlijst.push("De waarde van postcode moet tussen 1000 en 9999 liggen!") ;
    }
}

//---------------------------------------------------------------------------------------------------//

// Check van radiobutton value: https://stackoverflow.com/questions/15839169/how-to-get-value-of-selected-radio-button -->

function getValueRadio() { //value van radiobutton opvragen
    let value = document.querySelector('input[name="optbetaling"]:checked').value;
    return value;
}

//---------------------------PASWOORD CHECKS-------------------------------------------//


// paswoord tonen of niet ww link https://bootstrapfriendly.com/blog/login-form-with-password-show-and-hide-button-using-javascript/
function password_show_hide() {
    var x = document.getElementById("wachtwoord");
    var show_eye = document.getElementById("show_eye");
    var hide_eye = document.getElementById("hide_eye");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
    } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";

    }
}


// paswoord tonen of niet  ww herhaling
function password_show_hidesecond() {
    var x = document.getElementById("wachtwoordherhaling");
    var show_eye = document.getElementById("show_eyesecond");
    var hide_eye = document.getElementById("hide_eyesecond");
    hide_eye.classList.remove("d-none");
    if (x.type === "password") {
        x.type = "text";
        show_eye.style.display = "none";
        hide_eye.style.display = "block";
    } else {
        x.type = "password";
        show_eye.style.display = "block";
        hide_eye.style.display = "none";

    }
}

