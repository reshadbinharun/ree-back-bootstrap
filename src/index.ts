import "reflect-metadata";
import { createConnection, ConnectionOptions } from "typeorm";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors'; 

const PORT = 8080;

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());
app.set('port', process.env.PORT || PORT);
app.use(bodyParser.urlencoded({ extended: false }));

// cors setup
const CORS_ALLOW_REGEX = /.*localhost.*/;
const CORS_ALLOW_ORIGIN = 'localhost'

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CORS_ALLOW_ORIGIN)
    next();
})

let corsOptions = {
    // TODO: enforce before deploying
    // origin: ['http://localhost:3000','https://onefootin-beta.herokuapp.com/'],
    origin: CORS_ALLOW_REGEX,
    credentials: true,
  }
app.use(cors(corsOptions));
 

/*
Including typeorm options for Heroku deploy
SETTING UP DATABASE LOCALLY
createdb -U postgres -O <user> <database_name>
THEN ENTER DATABASE
psql -U <user> -d <database_name>
*/
createConnection(<ConnectionOptions>{
    type: "postgres",
    // We need add the extra SSL to use heroku on localhost
    // extra: {
    //     ssl: true,
    // },
    // Change the next line to use the Heroku postgresql from other environment like localhost, remenber that heroku changes this data periodically for security reasons
    // fix when database set up correctly
    url: process.env.DATABASE_URL || 'postgres://reshad:password@localhost:5432/genospace',
    entities: ["src/entity/**/*.ts"],
    subscribers: [],
    synchronize: true,
}).then(async connection => {
    /*
    add routes here
    */
    app.get('/test', (req, res) => {
        console.log("ping from client...");
        res.status(200).send({
            message: 'What\'s up?'
        })
   })

    app.listen(app.get('port'), () => {
        console.log('Express server listening on port ' + app.get('port'))
    });

}).catch(error => console.log(error));


