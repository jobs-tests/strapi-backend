import { planets, flights, spaceCenters } from '../data'


export const Query = {
    flights: () => flights,
    planets: () => (parent: any, args: any, context: any) => {
        return planets;
    },
    planet: (parent: any, args: any, context: any) => {
        const { id } = args;
        return planets.find((planet) => planet.id == id)
    },
    spaceCenters: () => spaceCenters,
    spaceCenter: (parent: any, args: any, context: any) => {
        const { uid } = args;
        return spaceCenters.find(spaceCenter => spaceCenter.uid == uid);
    },
    flight: (parent: any, args: any, context: any) => {
        const { id } = args;
        return flights.find((flight) => flight.id == id)
    },
}
