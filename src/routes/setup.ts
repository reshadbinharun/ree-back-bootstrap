import { IRouter } from "express-serve-static-core";

export function addSetupRoute(router: IRouter, connection) {
    router.get('/test', (req, res) => {
        console.log("ping from client...");
        res.status(200).send({
            message: 'What\'s up?'
        })
    })

    router.post('/uploadDrugs', async (req, res) => {
        let file = req.body.file;
        console.log(file);
        res.status(200).send({message: 'Got the drugs!'})
    });
}