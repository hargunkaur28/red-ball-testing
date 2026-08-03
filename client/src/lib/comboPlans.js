// Shared helpers for combo / specialty membership plans.
//
// These are MembershipPlans with isStandalone === true — packages created by
// hand in Super Admin → Sports → Combo Plans, rather than auto-generated from a
// single sport's pricing fields. Each package exists as one plan per duration
// tier ("Gym + Badminton Monthly", "Gym + Badminton Yearly", …); these helpers
// group those tiers back into a single family for display.

export const PLAN_TIERS = [
  { suffix: 'Monthly', duration: '1 Month', durationValue: 1, durationUnit: 'months', label: 'Monthly' },
  { suffix: 'Quarterly', duration: '3 Months', durationValue: 3, durationUnit: 'months', label: '3 Months' },
  { suffix: 'Half-Yearly', duration: '6 Months', durationValue: 6, durationUnit: 'months', label: '6 Months' },
  { suffix: 'Yearly', duration: '1 Year', durationValue: 1, durationUnit: 'years', label: 'Yearly' },
];

// "Gym + Badminton Monthly" -> "Gym + Badminton"
export function stripTierSuffix(name = '') {
  const tier = PLAN_TIERS.find((t) => name.endsWith(` ${t.suffix}`));
  return tier ? name.slice(0, -(tier.suffix.length + 1)) : name;
}

export function isComboPlan(plan) {
  return !!plan?.isStandalone && !plan?.isKidsAcademy;
}

const tierIndex = (plan) => {
  const idx = PLAN_TIERS.findIndex((t) => t.duration === plan.duration);
  return idx === -1 ? PLAN_TIERS.length : idx;
};

/**
 * Group a flat list of plans into combo families, shortest duration first.
 * Non-combo plans are ignored.
 *
 * @returns {Array<{ baseName, slugs, plans, fromPrice, monthlyPlan, entryPlan }>}
 */
export function groupComboFamilies(plans = []) {
  const families = plans.filter(isComboPlan).reduce((acc, plan) => {
    const baseName = stripTierSuffix(plan.name);
    if (!acc[baseName]) {
      acc[baseName] = { baseName, slugs: plan.sportsIncluded || [], plans: [], image: plan.image || '' };
    }
    acc[baseName].plans.push(plan);
    if (plan.image && !acc[baseName].image) {
      acc[baseName].image = plan.image;
    }
    return acc;
  }, {});

  return Object.values(families)
    .map((family) => {
      const sorted = [...family.plans].sort((a, b) => tierIndex(a) - tierIndex(b));
      const monthlyPlan = sorted.find((p) => p.duration === '1 Month') || null;
      const customImage = family.image || sorted.find((p) => p.image)?.image || '';
      return {
        ...family,
        plans: sorted,
        image: customImage,
        // Cheapest tier — what the public card advertises
        fromPrice: sorted.length ? Math.min(...sorted.map((p) => p.price)) : 0,
        monthlyPlan,
        // Where a "buy this" link should land
        entryPlan: monthlyPlan || sorted[0] || null,
      };
    })
    .sort((a, b) => a.baseName.localeCompare(b.baseName));
}
