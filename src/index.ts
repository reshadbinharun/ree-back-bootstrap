import "reflect-metadata";
import {createConnection, ConnectionOptions} from "typeorm";
import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as cookieParser from 'cookie-parser';

const PORT = 8080;

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());
app.set('port', process.env.PORT || PORT);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

/*
Including typeorm options for Heroku deploy
*/
createConnection(<ConnectionOptions>{
    type: "postgres",
    // We need add the extra SSL to use heroku on localhost
    extra: {
        ssl: true,
    },
    // Change the next line to use the Heroku postgresql from other environment like localhost, remenber that heroku changes this data periodically for security reasons
    url: process.env.DATABASE_URL,
    entities: [ "src/entity/**/*.ts" ],
    subscribers: [],
    synchronize: true,
}).then(async connection => {

    /*
    add routes here
    */
    
}).catch(error => console.log(error));

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'))
});
