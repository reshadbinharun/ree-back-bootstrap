import { IRouter } from "express-serve-static-core";
import MolecularMechanism from "../entities/MolecularMechanism";
import Drug from "../entities/Drug";
import DevelopmentStatusSummary from "../entities/DevelopmentStatusSummary";
import DomainSearch from "../entities/DomainSearch";

const DRUG_DOMAIN = 'drug';
const MOLECULAR_MECH_DOMAIN = 'molecular mechanism';

export function addSetupRoute(router: IRouter, connection) {
    router.get('/test', (req, res) => {
        console.log("ping from client...");
        res.status(200).send({
            message: 'What\'s up?'
        })
    })

    router.post('/uploadDrugs', async (req, res) => {
        let drugData = req.body;
        /*
        Strategy to upload data:
        For each drug, add molecular mechanisms IF NOT IN TABLE
        Update all fields of drug

        Consider switching to mongo database
        */
       let drugToMech = new Map();

        drugData.forEach(async (drugObj) => {
            let drug = new Drug();
            let drugMechanisms = drugObj.molecularMechanism;
            let mechanismsForDrug = [];
            drugMechanisms.forEach(async (mechanism) => {
                // let insertWithoutDupeQuery = `INSERT INTO molecularMechanism (name)
                // SELECT * FROM (SELECT '${mechanism.name}') AS tmp
                // WHERE NOT EXISTS (
                //     SELECT name FROM molecularMechanism WHERE name = '${mechanism.name}'
                // ) LIMIT 1;`
                // TODO: might be rawData
                // let mechanismsAdded = await connection.getRepository(MolecularMechanism).query(insertWithoutDupeQuery);
                let molecularMechAfterSave = null
                if (!drugToMech.has(mechanism.name)) {
                    let molecularMech = new MolecularMechanism();
                    molecularMech.name = mechanism.name;
                    molecularMechAfterSave = await connection.manager.save(molecularMech);
                    let molecularMechSearch = new DomainSearch();
                    molecularMechSearch.relational_id = molecularMechAfterSave.id;
                    molecularMechSearch.name = molecularMechAfterSave.name;
                    molecularMechSearch.domain = MOLECULAR_MECH_DOMAIN;
                    await connection.manager.save(molecularMechSearch);
                    drugToMech.set(mechanism.name, molecularMechAfterSave);
                } else {
                    molecularMechAfterSave = drugToMech.get(mechanism.name);
                }
                mechanismsForDrug.push(molecularMechAfterSave);
            })
            drug.molecularMechanism = mechanismsForDrug;
            drug.name = drugObj.name;
            drug.namesBrand = drugObj.namesBrand;
            drug.namesCode = drugObj.namesCode;
            drug.namesGeneric = drug.namesGeneric;
            let devStatuses = drugObj.developmentStatusSummary;
            let developmentStatusToSave = [];
            devStatuses.forEach(async(devStat) => {
                let devStatus = new DevelopmentStatusSummary();
                devStatus.condition = devStat.condition;
                devStatus.highestPhase = devStat.highestPhase;
                devStatus.conditionInActiveDevelopment = devStat.conditionInActiveDevelopment;
                devStatus.year = devStat.year;
                devStatus.organizations = devStat.organizations;
                devStatus.administrationRoutes = devStatus.administrationRoutes;
                let devStatToSave = await connection.manager.save(devStatus);
                developmentStatusToSave.push(devStatToSave);
            })
            drug.developmentStatusSummary = developmentStatusToSave;
            let drugJustSaved = await connection.manager.save(drug);
            // make entry for storing in DomainSearchTable
            // save drug
            let drugSearchObject = new DomainSearch();
            drugSearchObject.relational_id = drugJustSaved.id;
            drugSearchObject.name = drugJustSaved.name;
            drugSearchObject.domain = DRUG_DOMAIN;
            await connection.manager.save(drugSearchObject);
        });
        res.status(200).send({message: 'Got the drugs!'})
    });
}