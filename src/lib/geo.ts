import type { Region } from "./types.ts";

export const COUNTIES = [
  "Carlow",
  "Cavan",
  "Clare",
  "Cork",
  "Donegal",
  "Dublin",
  "Galway",
  "Kerry",
  "Kildare",
  "Kilkenny",
  "Laois",
  "Leitrim",
  "Limerick",
  "Longford",
  "Louth",
  "Mayo",
  "Meath",
  "Monaghan",
  "Offaly",
  "Roscommon",
  "Sligo",
  "Tipperary",
  "Waterford",
  "Westmeath",
  "Wexford",
  "Wicklow",
] as const;

const BMW = new Set([
  "Cavan",
  "Donegal",
  "Leitrim",
  "Louth",
  "Monaghan",
  "Sligo",
  "Laois",
  "Longford",
  "Offaly",
  "Westmeath",
  "Galway",
  "Mayo",
  "Roscommon",
]);

export function regionFromCounty(county: string): Region {
  if (county === "Dublin") return "dublin";
  if (county === "Cork") return "cork";
  if (county === "Galway") return "galway";
  if (county === "Limerick") return "limerick";
  if (BMW.has(county)) return "bmw";
  return "other";
}
