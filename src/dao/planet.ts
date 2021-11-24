import { Knex } from "knex";


export class PlanetDAO {

    DB: Knex;

    constructor(_DB: Knex) {
        this.DB = _DB;

    }

    async createPlanet(name: string, code: string) {
        const [id] = await this.DB("planet").insert({ name, code }).returning("id");
        return id;
    }

}
