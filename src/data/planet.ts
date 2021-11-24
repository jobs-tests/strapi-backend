import planetsJson from './planets.json';
const planets = planetsJson.map((planet, index) => {
    const id = index + 1;
    return { id, ...planet };
});

export { planets, planetsJson };
