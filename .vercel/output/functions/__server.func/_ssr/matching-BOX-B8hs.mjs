import { i as GRANTS } from "./layout-MNtIRKyI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/matching-BOX-B8hs.js
function matchGrants(profile) {
	return GRANTS.map((grant) => {
		const reasons = grant.rules.map((rule) => ({
			ok: rule.test(profile),
			label: rule.label,
			knockout: rule.knockout
		}));
		const knockout = reasons.some((r) => r.knockout && !r.ok);
		const passed = reasons.filter((r) => r.ok).length;
		const goalHits = grant.goals.filter((g) => profile.goals.includes(g)).length;
		const sectorWin = grant.winBySector[profile.sector] ?? grant.winRate;
		const bmwBoost = profile.region === "bmw" && grant.agency === "Local Enterprise Office" ? 6 : 0;
		let score = 0;
		if (!knockout) {
			score += 38;
			score += passed / Math.max(grant.rules.length, 1) * 18;
			score += Math.min(goalHits, 3) * 10;
			score += sectorWin * 22;
			score += bmwBoost;
			if (grant.difficulty === "straightforward") score += 6;
			if (grant.difficulty === "competitive") score -= 4;
			if (profile.eiClient && grant.agency === "Enterprise Ireland") score += 5;
			if (!profile.eiClient && grant.agency === "Local Enterprise Office") score += 4;
		} else score = Math.round(passed / Math.max(grant.rules.length, 1) * 18);
		const fitNotes = [];
		if (goalHits > 0) fitNotes.push(`Aligns with ${goalHits} of your stated goals.`);
		if (profile.region === "bmw" && grant.agency === "Local Enterprise Office") fitNotes.push("BMW location can mean a higher aid rate on some LEO grants.");
		if (sectorWin >= .4) fitNotes.push(`${Math.round(sectorWin * 100)}% modelled success rate in ${profile.sector.replace("_", " ")}.`);
		if (grant.difficulty === "straightforward" && !knockout) fitNotes.push("Usually the fastest path — start here.");
		if (knockout) fitNotes.push("A hard eligibility rule currently fails. Revisit if the company form or stage changes.");
		return {
			grant,
			score: Math.max(0, Math.min(99, Math.round(score))),
			eligible: !knockout,
			reasons,
			fitNotes
		};
	}).sort((a, b) => {
		if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
		return b.score - a.score;
	});
}
var DEMO_PROFILE = {
	companyName: "Greenfield Robotics Ltd",
	form: "limited",
	stage: "established",
	employees: 8,
	tradingMonths: 22,
	region: "cork",
	sector: "software",
	goals: [
		"rd",
		"digital",
		"export",
		"hire"
	],
	eiClient: false,
	description: "We are building an AI matching layer for industrial maintenance SMEs in Ireland, with a first export beachhead in the UK."
};
//#endregion
export { matchGrants as n, DEMO_PROFILE as t };
