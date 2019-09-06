import { IRouter } from "express-serve-static-core";
import DomainSearch from "../DomainSearch";

const RESULTS_PER_PAGE = 20;

function compare(a: DomainSearch, b: DomainSearch) {
    return a.name < b.name ? -1 : a.name == b.name ? 0 : 1;
}

function breakIntoSubArrays(arr: any[], arrSize: number): any[] {
    let subArrays = [];
    while (arr.length > arrSize) {
        subArrays.push(arr.splice(0, arrSize));
    }
    return subArrays;
}

function getByPageNum(results: DomainSearch[], pageNum: number): DomainSearch[] {
    results.sort(compare); // could be bottleneck for a lot of records!
    let subArrayRes = breakIntoSubArrays(results, RESULTS_PER_PAGE);
    return subArrayRes[pageNum + 1]; // pageNum has no zero offset
}

export function addSearchRoute(router: IRouter, connection) {
    router.post('/getSearchResults', async (req, res) => {
        let pageNum = req.body.pageNum;
        let searchTerms = req.body.searchTerms;
        // wild card for starts with drug%, wild card for contains %drug%
        let results = await connection.getRepository(DomainSearch).query(`SELECT * from "domain_search" WHERE 'name' LIKE '%${searchTerms}%;'`);
        res.status(200).send(getByPageNum(results, pageNum));
    });

    // add route to get results without pageNum complication
}