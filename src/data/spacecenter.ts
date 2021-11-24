import spaceCenterJson from "./space-centers.json";
const spaceCenters = spaceCenterJson.map((SpaceCenter, index) => {
    const id = index + 1;
    return { id, ...SpaceCenter };
});
export { spaceCenters, spaceCenterJson };
