import type { QuestData } from '../types/guide';
import limgrave from "./base-game/part1-limgrave.json";
import liurnia from "./base-game/part2-liurnia.json";
import caelidaltus from "./base-game/part3-caelid-altus.json";
import mtgelmir from "./base-game/part4-mt-gelmir.json";
import volcanomanorleyndell from "./base-game/part5-volcano-manor-leyndell.json";
import mountaintopssnowfield from "./base-game/part6-mountaintops-snowfield.json";
import haligtreeforge from "./base-game/part7-haligtree-forge.json";
import farumazula from "./base-game/part8-farum-azula.json";
import postgamengplus from "./base-game/part9-post-game-ng-plus.json";

import gravesitebelurat from "./dlc/dlc-part1-gravesite-belurat.json"

const REGION_DATA = [
  { json: limgrave, part: 1 },
  { json: liurnia, part: 2 },
  { json: caelidaltus, part: 3 },
  { json: mtgelmir, part: 4 },
  { json: volcanomanorleyndell, part: 5 },
  { json: mountaintopssnowfield, part: 6 },
  { json: haligtreeforge, part: 7 },
  { json: farumazula, part: 8 },
  { json: postgamengplus, part: 9 },
] as const;

const ERDTREE_DLC_DATA = [{ json: gravesitebelurat, part: 1 }] as const;

export const QUEST_DATA: QuestData = {
  regions: REGION_DATA.map(({ json, part }) => ({
    ...json,
    part,
  })),
};

export const DLC_QUEST_DATA: QuestData = {
  regions: ERDTREE_DLC_DATA.map(({ json, part }) => ({
    ...json,
    part,
  })),
};
