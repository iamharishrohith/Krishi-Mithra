type Profile = { landHoldingAcres: number; crop: string[]; isSmallFarmer?: boolean }

type Scheme = { code: string; name: string; short: string; match: (p: Profile) => boolean }

const SCHEMES: Scheme[] = [
  {
    code: "PMKISAN",
    name: "PM-Kisan",
    short: "Income support for eligible small and marginal farmers.",
    match: (p) => p.isSmallFarmer ?? p.landHoldingAcres <= 2,
  },
  {
    code: "CROPINS",
    name: "Crop Insurance",
    short: "Protection against crop loss due to natural calamities.",
    match: (_p) => true,
  },
  {
    code: "HORTI_SUB",
    name: "Horticulture Subsidy",
    short: "Subsidy for drip irrigation and mulching.",
    match: (p) => p.crop.some((c) => /tomato|banana/i.test(c)),
  },
]

export function computeEligibleSchemes(profile: Profile) {
  return SCHEMES.filter((s) => s.match(profile))
}
