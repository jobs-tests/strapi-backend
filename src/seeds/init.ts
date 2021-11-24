import { Knex } from "knex";
import { planetsJson, flightsJson, spaceCenterJson } from '../data'

export async function seed(knex: Knex): Promise<void> {

    await Promise.all([
        knex('booking').del(),
        knex('flight').del(),
        knex('space_center').del(),
        knex('planet').del(),

    ]);

    await createPlanet(knex);
    await createSpaceCenter(knex);
    await createFlight(knex);
}

const createPlanet = (knex: Knex) => {
    const planetPromises: any[] = [];
    planetsJson.forEach(planet => {
        const { name, code } = planet;
        planetPromises.push(
            knex('planet').insert({ name, code })
        )
    })
    return Promise.all(planetPromises);
}

const createSpaceCenter = (knex: Knex) => {
    const spaceCenterPromises: any[] = [];
    spaceCenterJson.forEach(spaceCenter => {
        const { name, uid, description, latitude, longitude, planet_code } = spaceCenter;

        spaceCenterPromises.push(
            knex('space_center').insert({ name, uid, description, latitude, longitude, planet_code })
        )
    })
    return Promise.all(spaceCenterPromises);
}

const createFlight = (knex: Knex) => {
    const flightPromises: any[] = [];
    flightsJson.forEach(flight => {
        const { code, departure_at, seat_count, launch_site, landing_site } = flight;
        flightPromises.push(
            knex('flight').insert({ code, departure_at, seat_count, launch_site, landing_site })
        )
    })
    return Promise.all(flightPromises);
}
