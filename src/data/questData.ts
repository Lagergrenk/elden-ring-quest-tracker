import type { QuestData } from '../types/guide';
import limgraveJson from './limgrave.json';
import liurniaJson from './liurnia.json';
import caelidAltusJson from './caelid-altus.json';
import mtgelmirJson from './mtgelmir.json';
import volmanorleyndell from './volcanomanor-leyndell.json'
import mtntops from './mountaintops.json'
import haligtree from "./haligtree.json";
import farumazula from './farumazula.json'
import preng from './cleanuppreng.json'

const REGION_DATA = [
  { json: limgraveJson, part: 1 },
  { json: liurniaJson, part: 2 },
  { json: caelidAltusJson, part: 3 },
  { json: mtgelmirJson, part: 4 },
  { json: volmanorleyndell, part: 5 },
  { json: mtntops, part: 6 },
  { json: haligtree, part: 7 },
  { json: farumazula, part: 8 },
  { json: preng, part: 9 },
] as const;

export const QUEST_DATA: QuestData = {
  regions: REGION_DATA.map(({ json, part }) => ({
    ...json,
    part,
  })),
};
