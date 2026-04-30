import { atom } from "jotai";

export const placeAtom = atom("Myanmar");
export const loadingCityAtom = atom(false);
export const coordAtom = atom<{ lat: number; lon: number } | null>(null);
