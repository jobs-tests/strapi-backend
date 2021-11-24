import { planets, spaceCenters } from "../data";
export const SpaceCenter = {
    planet: (parent: any, arg: any, context: any) => {
        const { uid } = parent;
        const spacecenter = spaceCenters.find(SpaceCenter => SpaceCenter.uid == uid);
        const planet = planets.find(planet => planet.code == spacecenter?.planet_code);
        return planet;
    }
};
