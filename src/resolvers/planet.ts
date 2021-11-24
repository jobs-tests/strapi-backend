import { spaceCenters as spaceCenterData } from "../data";

export const Planet = {
    spaceCenters: (parent: any, arg: any, context: any) => {
        const { limit } = arg;
        const _limit = ((limit || 5) > 10) ? 10 : (limit || 5);
        return spaceCenterData.filter(spaceCenter => spaceCenter.planet_code == parent.code).slice(0, _limit);
    }

};
