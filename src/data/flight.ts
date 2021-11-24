import flightsJson from './flights.json';
const flights = flightsJson.map((flight, index) => {
    const id = index + 1;
    return { id, ...flight };
});
export { flights, flightsJson };
