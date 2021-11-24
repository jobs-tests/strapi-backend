import { PlanetDAO } from "../dao/planet";

export class PlanetService {
    planetDAO: PlanetDAO;

    constructor(_planetDAO: PlanetDAO) {
        this.planetDAO = _planetDAO;
    }

    async createPlanet(planetDTO: any) {
        const { name, code } = planetDTO;
        return this.planetDAO.createPlanet(name, code);
    }
}
