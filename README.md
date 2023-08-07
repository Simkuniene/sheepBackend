# sheepBackend
This system is designed for sheep farmers. You can find the FrontEnd code here: https://github.com/Simkuniene/sheepFrontend Administrators will be able to create/view data about sheep, their productivity, medications used for treatment, and their condition before shearing or using milk for food. The Backend is written using NodeJS, and the database used is MongoDB.

Resources supported by this application:

GET /sheep retrieves all sheep from the 'sheep' table.

GET /sheep/:number retrieves data about a specific sheep based on its number from the 'sheep' table.

GET /meds retrieves all medications from the 'medicines' table.

GET /births/:number retrieves data about the births of a sheep specified by the given number from the 'births' table.

GET /treatment/:number retrieves data about the medications used for a sheep specified by the given number from the 'treatment' table.

POST /addSheep adds sheep data to the 'sheep' table.

POST /addMeds adds medication data to the 'medicines' table.

POST /addBirth adds data about a birth to the 'births' table.

POST /addTreatment adds data about medications used to the 'treatment' table.

DELETE /deleteSheep/:id deletes a sheep with the given ID from the 'sheep' table.

DELETE /deleteMed/:id deletes a medication with the given ID from the 'medicines' table.

PUT /sheepupdate/:number updates data about a sheep in the 'sheep' table.
