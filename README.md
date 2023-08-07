# sheepBackend
Ši sistema skirta avių ūkio turėtojams. FrontEnd kodą galite rasti: https://github.com/Simkuniene/sheepFrontend
Administratoriai galės kurti/peržiūrėti duomenis apie avis, jų produktyvumą, gydymui naudotus vaistus ir jų išlauką prieš skerdimą ar pieno naudojimą maistui.
Backend'as rašytas su NodeJS.
Duomenų bazė: MongoDB.

Resursai, kuriuos palaiko ši aplikacija:

GET
/sheep paduoda visas avis iš 'sheep' lentelės.
/sheep/:number paduoda duomenis apie konkrečią avį, pagal avies numerį iš 'sheep' lentelės.
/meds paduoda visus vaistus iš 'medicines' lentelės.
/births/:number paduoda duomenis apie avies, kurios numeris nurodytas, gimdymus iš 'births' lentelės.
/treatment/:number paduoda duomenis apie avies, kurios numeris nurodytas, naudotus vaistus iš 'treatment' lentelės.


POST 
/addSheep įrašo duomenis apie avį į 'sheep' lentelę.
/addMeds įrašo duomenis apie medikamentą į 'medicines' lentelę.
/addBirth įrašo duomenis apie gimdymą į 'births' lentelę.
/addTreatment įrašo duomenis apie naudotus vaistus į 'treatment' lentelę.

DELETE
/deleteSheep/:id ištrina avį pagal ID iš 'sheep' lentelės.
/deleteMed/:id ištrina vaistą pagal ID iš 'medicines' lentelės.

PUT
/sheepupdate/:number atnaujina duomenis apie avį 'sheep' lentelėje.
