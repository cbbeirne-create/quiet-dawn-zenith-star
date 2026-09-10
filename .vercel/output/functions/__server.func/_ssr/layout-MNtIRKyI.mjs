import { o as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as getWorkspace, r as saveWorkspace } from "./workspace-api-BMGfX7t3.mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { a as hasGateSessionMarker } from "./server-C1BWQei4.mjs";
import { t as cn } from "./cn-Ccejyh36.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/layout-MNtIRKyI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var always = (_p) => true;
function limitedCompany(p) {
	return p.form === "limited";
}
function sme(p) {
	return p.employees <= 249;
}
function microOrSmall(p) {
	return p.employees >= 1 && p.employees <= 50;
}
function trading6m(p) {
	return p.tradingMonths >= 6;
}
function notEi(p) {
	return !p.eiClient;
}
function startup18(p) {
	return p.stage === "startup" || p.tradingMonths <= 18;
}
function established(p) {
	return p.stage === "established" || p.tradingMonths > 18;
}
function exportOrRd(p) {
	return p.goals.includes("export") || p.goals.includes("rd") || p.sector === "software" || p.sector === "manufacturing";
}
var GRANTS = [
	{
		id: "leo-feasibility",
		name: "LEO Feasibility Grant",
		shortName: "Feasibility",
		agency: "Local Enterprise Office",
		category: "Start & validate",
		amountLabel: "Up to €15,000",
		amountMax: 15e3,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "Open year-round via your county LEO",
		summary: "Funds market research, technical assessment, prototyping and testing so you can prove an idea before you spend on it. Rates rise to 60% in Border, Midlands and West.",
		covers: [
			"Market research",
			"Consultancy",
			"Prototyping",
			"Technical feasibility"
		],
		nextSteps: [
			"Contact your Local Enterprise Office",
			"Complete a business support request",
			"Submit quotes and a short project plan"
		],
		documents: [
			"Project outline",
			"Quotes for consultants or research",
			"Financial snapshot"
		],
		sections: [
			{
				id: "summary",
				title: "Project summary",
				hint: "What you will test and why it matters now."
			},
			{
				id: "market",
				title: "Market evidence",
				hint: "Who the customer is and how you will learn from them."
			},
			{
				id: "budget",
				title: "Budget",
				hint: "Itemised costs and the match you will contribute."
			}
		],
		winRate: .41,
		winBySector: {
			software: .44,
			food: .39,
			professional: .42,
			manufacturing: .4
		},
		typicalAward: "€8,000–€12,000",
		difficulty: "straightforward",
		officialUrl: "https://www.localenterprise.ie",
		goals: [
			"feasibility",
			"rd",
			"digital"
		],
		rules: [
			{
				id: "sme",
				label: "Small enterprise in a LEO catchment",
				test: (p) => p.employees <= 50,
				knockout: true
			},
			{
				id: "not-ei",
				label: "Not an Enterprise Ireland or IDA client",
				test: notEi,
				knockout: true
			},
			{
				id: "idea",
				label: "Early-stage or new product line",
				test: always
			}
		]
	},
	{
		id: "leo-priming",
		name: "LEO Priming Grant",
		shortName: "Priming",
		agency: "Local Enterprise Office",
		category: "Start & validate",
		amountLabel: "Up to €150,000",
		amountMax: 15e4,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "Evaluated by your LEO approvals committee",
		summary: "Capital, salary and development support for businesses in their first 18 months. Typically linked to job creation, with around €15,000 per full-time role.",
		covers: [
			"Capital equipment",
			"Salary contributions",
			"Business development costs"
		],
		nextSteps: [
			"Confirm eligibility with your LEO",
			"Prepare 3-year projections and job plan",
			"Submit via the LEO application portal"
		],
		documents: [
			"Business plan",
			"3-year financial projections",
			"CVs of promoters",
			"Quotes over €5,000"
		],
		sections: [
			{
				id: "summary",
				title: "Business case",
				hint: "What you are building and the jobs you will create."
			},
			{
				id: "market",
				title: "Market & competition",
				hint: "Demand, competitors, and why you win locally."
			},
			{
				id: "jobs",
				title: "Employment plan",
				hint: "Roles, timing, and salaries you will support."
			},
			{
				id: "budget",
				title: "Investment budget",
				hint: "Eligible costs and your 50% match."
			}
		],
		winRate: .33,
		winBySector: {
			food: .36,
			manufacturing: .35,
			retail: .28,
			software: .31
		},
		typicalAward: "€25,000–€80,000",
		difficulty: "moderate",
		officialUrl: "https://www.localenterprise.ie",
		goals: ["hire", "equipment"],
		rules: [
			{
				id: "age",
				label: "Trading 18 months or less",
				test: startup18,
				knockout: true
			},
			{
				id: "size",
				label: "Small enterprise, not an EI client",
				test: (p) => microOrSmall(p) && notEi(p),
				knockout: true
			},
			{
				id: "jobs",
				label: "Plan to hire or invest in capital",
				test: (p) => p.goals.includes("hire") || p.goals.includes("equipment")
			}
		]
	},
	{
		id: "leo-expansion",
		name: "LEO Business Expansion Grant",
		shortName: "Expansion",
		agency: "Local Enterprise Office",
		category: "Scale locally",
		amountLabel: "Up to €150,000",
		amountMax: 15e4,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "Open to established LEO clients",
		summary: "The primary LEO route for businesses past startup. Covers training, development expenses and salary costs tied to a growth plan.",
		covers: [
			"Training",
			"Salary support",
			"Business development"
		],
		nextSteps: [
			"Discuss the growth plan with your LEO mentor",
			"Compile accounts and quotes",
			"Apply through the LEO portal"
		],
		documents: [
			"Recent accounts",
			"Growth plan",
			"Quotes",
			"Tax clearance"
		],
		sections: [
			{
				id: "summary",
				title: "Growth plan",
				hint: "What expansion looks like over 12–24 months."
			},
			{
				id: "jobs",
				title: "Team & capability",
				hint: "Roles you will add or upskill."
			},
			{
				id: "budget",
				title: "Budget",
				hint: "Eligible spend and match funding."
			}
		],
		winRate: .35,
		winBySector: {
			manufacturing: .38,
			food: .37,
			professional: .34
		},
		typicalAward: "€20,000–€70,000",
		difficulty: "moderate",
		officialUrl: "https://www.localenterprise.ie",
		goals: [
			"hire",
			"training",
			"equipment"
		],
		rules: [{
			id: "est",
			label: "Established business (past 18 months)",
			test: established,
			knockout: true
		}, {
			id: "leo",
			label: "Small enterprise, not an EI client",
			test: (p) => microOrSmall(p) && notEi(p),
			knockout: true
		}]
	},
	{
		id: "grow-digital",
		name: "Grow Digital Voucher",
		shortName: "Grow Digital",
		agency: "Local Enterprise Office",
		category: "Digital",
		amountLabel: "Up to €5,000",
		amountMax: 5e3,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "Requires a Digital for Business project in the last 2 years",
		summary: "50% towards off-the-shelf software that is new to the business: CRM, e-commerce, booking, accounting in the cloud, cybersecurity. Does not fund bespoke product development.",
		covers: [
			"New SaaS subscriptions (one year)",
			"IT configuration",
			"Staff training on the tool"
		],
		nextSteps: [
			"Complete Digital for Business with your LEO if you have not",
			"Choose software recommended in that report",
			"Pay the annual subscription, then claim"
		],
		documents: [
			"Digital for Business report",
			"Software quote/invoice",
			"Tax clearance"
		],
		sections: [
			{
				id: "summary",
				title: "Digital need",
				hint: "Which process this software replaces."
			},
			{
				id: "tool",
				title: "Chosen system",
				hint: "Why this tool, and that it is new to the business."
			},
			{
				id: "budget",
				title: "Costs",
				hint: "Subscription plus configuration, 50% match."
			}
		],
		winRate: .62,
		winBySector: {
			retail: .68,
			professional: .64,
			tourism: .66,
			food: .6
		},
		typicalAward: "€2,500–€5,000",
		difficulty: "straightforward",
		officialUrl: "https://www.localenterprise.ie/growdigital",
		goals: ["digital"],
		rules: [
			{
				id: "size",
				label: "1–50 employees, trading 6+ months",
				test: (p) => microOrSmall(p) && trading6m(p),
				knockout: true
			},
			{
				id: "not-ei",
				label: "Not an EI or IDA client",
				test: notEi,
				knockout: true
			},
			{
				id: "off-shelf",
				label: "Adopting off-the-shelf software, not building a product",
				test: always
			}
		]
	},
	{
		id: "innovation-voucher",
		name: "Enterprise Ireland Innovation Voucher",
		shortName: "Innovation Voucher",
		agency: "Enterprise Ireland",
		category: "R&D",
		amountLabel: "€10,000 (or €20,000 co-funded)",
		amountMax: 1e4,
		coFundRate: 1,
		deadlineKind: "rolling",
		deadlineNote: "Open all year; one active voucher at a time",
		summary: "€10,000 of expert time with a university, institute or Technology Gateway to prototype, test technical feasibility, or solve a product challenge. You keep the IP. Company typically pays VAT only on the standard voucher.",
		covers: [
			"Prototyping",
			"Technical feasibility",
			"UX / user research",
			"New product or process exploration"
		],
		nextSteps: [
			"Register as a limited company with CRO",
			"Pick a knowledge provider (Technology Gateway, IoT, university)",
			"Apply through the Enterprise Ireland online system"
		],
		documents: [
			"Company registration",
			"Short project brief",
			"Knowledge provider agreement"
		],
		sections: [
			{
				id: "summary",
				title: "Challenge",
				hint: "The technical or product question you cannot solve in-house."
			},
			{
				id: "provider",
				title: "Knowledge provider",
				hint: "Who you will work with and why they fit."
			},
			{
				id: "outcomes",
				title: "Expected outcomes",
				hint: "Prototype, data, or decision you need in 8–12 weeks."
			}
		],
		winRate: .71,
		winBySector: {
			software: .74,
			manufacturing: .72,
			food: .69,
			health: .7,
			green: .68
		},
		typicalAward: "€10,000 voucher",
		difficulty: "straightforward",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: [
			"rd",
			"feasibility",
			"digital"
		],
		rules: [{
			id: "ltd",
			label: "CRO-registered limited company",
			test: limitedCompany,
			knockout: true
		}, {
			id: "sme",
			label: "Fewer than 250 employees / under €50m turnover",
			test: sme,
			knockout: true
		}]
	},
	{
		id: "exploring-innovation",
		name: "Exploring Innovation Grant",
		shortName: "Exploring Innovation",
		agency: "Enterprise Ireland",
		category: "R&D",
		amountLabel: "Up to €35,000",
		amountMax: 35e3,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "Typical maximum support around €35k",
		summary: "Helps companies plan an R&D or innovation project: market research, technical assessment, IP review, and a research strategy before a larger programme.",
		covers: [
			"Innovation strategy",
			"IP review",
			"Technical assessment",
			"Market research"
		],
		nextSteps: [
			"Speak with an EI advisor or LEO about EI client status",
			"Scope a 3–6 month exploration",
			"Apply online"
		],
		documents: [
			"Project proposal",
			"Cost breakdown",
			"Company accounts"
		],
		sections: [
			{
				id: "summary",
				title: "Innovation question",
				hint: "What you need to know before a full R&D project."
			},
			{
				id: "plan",
				title: "Workplan",
				hint: "Activities, partners, and 3–6 month timeline."
			},
			{
				id: "budget",
				title: "Budget",
				hint: "Eligible costs at ~50% support."
			}
		],
		winRate: .38,
		winBySector: {
			software: .42,
			manufacturing: .4,
			health: .36
		},
		typicalAward: "€15,000–€30,000",
		difficulty: "moderate",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["rd", "feasibility"],
		rules: [{
			id: "ltd",
			label: "Limited company with an innovation project",
			test: limitedCompany,
			knockout: true
		}, {
			id: "rd",
			label: "Clear R&D or product exploration need",
			test: (p) => p.goals.includes("rd") || p.goals.includes("feasibility")
		}]
	},
	{
		id: "agile-innovation",
		name: "Agile Innovation Fund",
		shortName: "Agile Innovation",
		agency: "Enterprise Ireland",
		category: "R&D",
		amountLabel: "Up to €150,000",
		amountMax: 15e4,
		coFundRate: .45,
		deadlineKind: "rolling",
		deadlineNote: "Fast-track online application; project cost under €300,000",
		summary: "Supports development of new or substantially improved products, services or processes. Built for companies new to R&D or working in short product cycles. Grant rates 25–45% depending on company size.",
		covers: [
			"Staff costs",
			"Consultancy",
			"Materials",
			"Overheads",
			"Certification"
		],
		nextSteps: [
			"Confirm trading and cash resources for the match",
			"Define a scoped product or process project under €300k",
			"Apply via the EI online system (LEO clients can access this too)"
		],
		documents: [
			"Project plan",
			"Costed workstreams",
			"Evidence of match funding",
			"Accounts"
		],
		sections: [
			{
				id: "summary",
				title: "Product or process",
				hint: "What is new or substantially improved."
			},
			{
				id: "work",
				title: "Workstreams",
				hint: "Build, test, and release plan under 12 months."
			},
			{
				id: "team",
				title: "Team",
				hint: "Existing and new staff on the project."
			},
			{
				id: "budget",
				title: "Budget",
				hint: "Eligible costs, grant rate, and cash match."
			}
		],
		winRate: .29,
		winBySector: {
			software: .34,
			manufacturing: .31,
			health: .27,
			green: .28
		},
		typicalAward: "€40,000–€120,000",
		difficulty: "competitive",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["rd", "digital"],
		rules: [
			{
				id: "trading",
				label: "Established, trading company",
				test: (p) => p.tradingMonths >= 6,
				knockout: true
			},
			{
				id: "form",
				label: "Registered Irish company",
				test: (p) => p.form !== "sole",
				knockout: true
			},
			{
				id: "rd",
				label: "Building a new or improved product, service or process",
				test: (p) => p.goals.includes("rd") || p.goals.includes("digital")
			}
		]
	},
	{
		id: "digital-discovery",
		name: "Access Advice: Digital Discovery",
		shortName: "Digital Discovery",
		agency: "Enterprise Ireland",
		category: "Digital",
		amountLabel: "Up to €5,000",
		amountMax: 5e3,
		coFundRate: .8,
		deadlineKind: "rolling",
		deadlineNote: "3–7 days of digital expert time over 8–12 weeks",
		summary: "Explore-before-invest support. A digital expert maps AI, data, automation or new systems and leaves you with a 3–12 month action plan. Max daily rate supported €900.",
		covers: [
			"Digital / AI opportunity assessment",
			"Systems review",
			"Implementation roadmap"
		],
		nextSteps: [
			"Check manufacturing or internationally traded services eligibility",
			"Select an approved digital expert",
			"Apply under Access Advice"
		],
		documents: ["Short brief", "Company details"],
		sections: [{
			id: "summary",
			title: "Digital question",
			hint: "What you want to test before a capital spend."
		}, {
			id: "scope",
			title: "Focus areas",
			hint: "AI, ERP, automation, data, or process."
		}],
		winRate: .58,
		winBySector: {
			manufacturing: .62,
			software: .55,
			food: .57
		},
		typicalAward: "€3,500–€5,000",
		difficulty: "straightforward",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["digital", "rd"],
		rules: [{
			id: "sector",
			label: "Manufacturing or internationally traded services / HPSU",
			test: exportOrRd
		}, {
			id: "trading",
			label: "Irish-based trading business",
			test: (p) => p.tradingMonths >= 1
		}]
	},
	{
		id: "dpi",
		name: "Digital Process Innovation",
		shortName: "Digital Process",
		agency: "Enterprise Ireland",
		category: "Digital",
		amountLabel: "Up to €150,000",
		amountMax: 15e4,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "For defined operational digitalisation projects",
		summary: "Implements new lean-digital processes covering production, delivery or organisational methods. This is a project grant, not a voucher — you need a scoped, costed transformation.",
		covers: [
			"Process digitalisation",
			"New delivery methods",
			"Operational systems"
		],
		nextSteps: [
			"Complete discovery first if the scope is unclear",
			"Build a costed workplan",
			"Apply as an EI-supported project"
		],
		documents: [
			"Process map",
			"Costed workstreams",
			"ROI case",
			"Accounts"
		],
		sections: [
			{
				id: "summary",
				title: "Operational change",
				hint: "The process that will run differently after the project."
			},
			{
				id: "roi",
				title: "Return",
				hint: "Time, quality, or cost impact you will measure."
			},
			{
				id: "budget",
				title: "Budget",
				hint: "Eligible costs at 50% support."
			}
		],
		winRate: .26,
		winBySector: {
			manufacturing: .32,
			food: .28,
			software: .22
		},
		typicalAward: "€50,000–€120,000",
		difficulty: "competitive",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["digital"],
		rules: [{
			id: "est",
			label: "Trading SME with a defined digital process project",
			test: (p) => p.tradingMonths >= 12 && sme(p),
			knockout: true
		}, {
			id: "digital",
			label: "Digital process or operational change in scope",
			test: (p) => p.goals.includes("digital")
		}]
	},
	{
		id: "csf",
		name: "Competitive Start Fund",
		shortName: "CSF",
		agency: "Enterprise Ireland",
		category: "Startup equity",
		amountLabel: "Up to €50,000 equity",
		amountMax: 5e4,
		coFundRate: 0,
		deadlineKind: "window",
		deadlineNote: "Periodic competitive calls",
		summary: "Entry-level Enterprise Ireland equity for early-stage, innovative startups building a product for international markets. Competitive, not a grant.",
		covers: [
			"Early product development",
			"Go-to-market",
			"Founder salaries"
		],
		nextSteps: [
			"Confirm innovative, export-oriented product",
			"Prepare pitch and cap table",
			"Apply in an open CSF call"
		],
		documents: [
			"Pitch deck",
			"Financial model",
			"Founder CVs",
			"Cap table"
		],
		sections: [
			{
				id: "summary",
				title: "Product & market",
				hint: "What you sell and why it can travel."
			},
			{
				id: "team",
				title: "Team",
				hint: "Founders, gaps, and advisors."
			},
			{
				id: "use",
				title: "Use of funds",
				hint: "How €50k moves you to the next round."
			}
		],
		winRate: .18,
		winBySector: {
			software: .22,
			health: .16,
			green: .17
		},
		typicalAward: "€50,000 equity",
		difficulty: "competitive",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: [
			"rd",
			"export",
			"hire"
		],
		rules: [
			{
				id: "ltd",
				label: "Limited company, high-potential startup",
				test: limitedCompany,
				knockout: true
			},
			{
				id: "age",
				label: "Early-stage (typically under 3 years)",
				test: (p) => p.tradingMonths <= 36,
				knockout: true
			},
			{
				id: "export",
				label: "Innovative product with export ambition",
				test: (p) => p.goals.includes("export") || p.sector === "software"
			}
		]
	},
	{
		id: "pssf",
		name: "Pre-Seed Start Fund",
		shortName: "PSSF",
		agency: "Enterprise Ireland",
		category: "Startup equity",
		amountLabel: "Up to €100,000 CLN",
		amountMax: 1e5,
		coFundRate: 0,
		deadlineKind: "rolling",
		deadlineNote: "Via Business Innovation Centres; monthly webinars",
		summary: "Convertible loan note of up to €100,000 to cover business-plan development, MVP work, and milestones needed to raise seed in 6–18 months.",
		covers: [
			"MVP development",
			"Operating costs",
			"Investor readiness"
		],
		nextSteps: [
			"Engage an Irish BIC",
			"Attend a PSSF webinar",
			"Prepare investor-ready plan"
		],
		documents: [
			"Business plan",
			"MVP description",
			"Founder CVs"
		],
		sections: [
			{
				id: "summary",
				title: "Venture thesis",
				hint: "Problem, product, and international path."
			},
			{
				id: "milestones",
				title: "6–18 month milestones",
				hint: "What seed investors will need to see."
			},
			{
				id: "use",
				title: "Use of funds",
				hint: "How the CLN is spent."
			}
		],
		winRate: .21,
		winBySector: {
			software: .25,
			health: .2,
			green: .19
		},
		typicalAward: "€50,000–€100,000 CLN",
		difficulty: "competitive",
		officialUrl: "https://www.irishbics.ie",
		goals: [
			"rd",
			"export",
			"hire"
		],
		rules: [{
			id: "ltd",
			label: "Innovative early-stage limited company",
			test: (p) => limitedCompany(p) && p.tradingMonths <= 36,
			knockout: true
		}, {
			id: "ambition",
			label: "Path to seed funding and export markets",
			test: (p) => p.goals.includes("export") || p.goals.includes("rd")
		}]
	},
	{
		id: "market-discovery",
		name: "New Markets Validation Grant",
		shortName: "Market Validation",
		agency: "Enterprise Ireland",
		category: "Export",
		amountLabel: "Up to €150,000",
		amountMax: 15e4,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "For validating a selected export market",
		summary: "Funds structured market research to validate a chosen export market before you commit a full sales push.",
		covers: [
			"In-market research",
			"Customer interviews",
			"Channel mapping"
		],
		nextSteps: [
			"Select a target market",
			"Scope research with an EI advisor",
			"Apply as an EI-supported project"
		],
		documents: [
			"Market hypothesis",
			"Research plan",
			"Budget"
		],
		sections: [
			{
				id: "summary",
				title: "Target market",
				hint: "Country, segment, and why now."
			},
			{
				id: "method",
				title: "Validation method",
				hint: "How you will talk to real buyers."
			},
			{
				id: "budget",
				title: "Budget",
				hint: "Travel, research, and specialist costs."
			}
		],
		winRate: .31,
		winBySector: {
			food: .36,
			manufacturing: .33,
			software: .3
		},
		typicalAward: "€20,000–€80,000",
		difficulty: "moderate",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["export"],
		rules: [{
			id: "export",
			label: "Export market in scope",
			test: (p) => p.goals.includes("export"),
			knockout: true
		}, {
			id: "trading",
			label: "Trading company with a product to sell abroad",
			test: (p) => p.tradingMonths >= 6
		}]
	},
	{
		id: "rd-tax",
		name: "R&D Tax Credit",
		shortName: "R&D Tax Credit",
		agency: "Revenue",
		category: "Tax",
		amountLabel: "30% of qualifying R&D",
		amountMax: 5e5,
		coFundRate: .3,
		deadlineKind: "annual",
		deadlineNote: "Claimed on the corporation tax return",
		summary: "A 30% tax credit on qualifying R&D spend. Not a cash grant up front, but one of the most valuable supports once you are building a product. Can be payable in cash in certain cases.",
		covers: [
			"Qualifying staff costs",
			"Consumables",
			"Certain outsourced R&D"
		],
		nextSteps: [
			"Map qualifying activities against Revenue guidelines",
			"Keep contemporaneous records",
			"Claim via corporation tax return"
		],
		documents: [
			"R&D activity narrative",
			"Timesheets",
			"Cost schedules"
		],
		sections: [
			{
				id: "summary",
				title: "Technological uncertainty",
				hint: "What you did not know at the start."
			},
			{
				id: "work",
				title: "Systematic investigation",
				hint: "How the work was planned and recorded."
			},
			{
				id: "costs",
				title: "Qualifying costs",
				hint: "Staff, consumables, and subcontractors."
			}
		],
		winRate: .54,
		winBySector: {
			software: .58,
			manufacturing: .55,
			health: .52
		},
		typicalAward: "Depends on spend",
		difficulty: "moderate",
		officialUrl: "https://www.revenue.ie",
		goals: ["rd"],
		rules: [{
			id: "ltd",
			label: "Company within the charge to Irish corporation tax",
			test: limitedCompany,
			knockout: true
		}, {
			id: "rd",
			label: "Systematic R&D addressing technological uncertainty",
			test: (p) => p.goals.includes("rd") || p.sector === "software"
		}]
	},
	{
		id: "seai-sme",
		name: "SEAI SME Energy Upgrade Grants",
		shortName: "SEAI Energy",
		agency: "SEAI",
		category: "Energy",
		amountLabel: "Fixed measures, rapid approval",
		amountMax: 162600,
		coFundRate: .3,
		deadlineKind: "rolling",
		deadlineNote: "Immediate approval on selected measures",
		summary: "Grants for business energy upgrades including solar PV (non-domestic microgen up to €162,600), solar thermal, fabric, and controls. Some measures now have rapid approval.",
		covers: [
			"Solar PV",
			"Solar thermal",
			"Building fabric",
			"Heating controls"
		],
		nextSteps: [
			"Complete an energy audit if the project is large",
			"Choose measures",
			"Apply through SEAI"
		],
		documents: [
			"Building details",
			"Quotes from registered contractors",
			"BER / energy data if required"
		],
		sections: [{
			id: "summary",
			title: "Building & measures",
			hint: "Site, usage, and the upgrades you will install."
		}, {
			id: "budget",
			title: "Costs",
			hint: "Contractor quotes against published grant rates."
		}],
		winRate: .64,
		winBySector: {
			manufacturing: .67,
			retail: .61,
			tourism: .63,
			food: .66
		},
		typicalAward: "Depends on measures",
		difficulty: "straightforward",
		officialUrl: "https://www.seai.ie",
		goals: ["energy"],
		rules: [{
			id: "energy",
			label: "Planning energy or building upgrades",
			test: (p) => p.goals.includes("energy"),
			knockout: true
		}, {
			id: "premises",
			label: "Irish business premises",
			test: always
		}]
	},
	{
		id: "green-start",
		name: "GreenStart",
		shortName: "GreenStart",
		agency: "Enterprise Ireland",
		category: "Energy",
		amountLabel: "Up to €5,000",
		amountMax: 5e3,
		coFundRate: .8,
		deadlineKind: "rolling",
		deadlineNote: "Access Advice assignment with an environmental consultant",
		summary: "Introduces environmental best practice and a carbon baseline. Typical assignment ~€6,300 with support up to 80%, capped at €5,000.",
		covers: [
			"Environmental systems",
			"Carbon footprint",
			"Resource reduction plan"
		],
		nextSteps: [
			"Become or remain an EI client (or contact LEO if 1–50 manufacturing/ITS)",
			"Engage a GreenStart consultant",
			"Apply under Access Advice"
		],
		documents: ["Carbon calculator output", "Assignment proposal"],
		sections: [{
			id: "summary",
			title: "Environmental goal",
			hint: "Waste, energy, or carbon you need to baseline."
		}, {
			id: "scope",
			title: "Assignment scope",
			hint: "Days, sites, and deliverables."
		}],
		winRate: .49,
		winBySector: {
			manufacturing: .55,
			food: .52,
			green: .6
		},
		typicalAward: "€4,000–€5,000",
		difficulty: "straightforward",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["energy"],
		rules: [{
			id: "size",
			label: "SME or EI client with an environmental project",
			test: sme
		}, {
			id: "energy",
			label: "Energy, carbon or resource reduction in scope",
			test: (p) => p.goals.includes("energy") || p.sector === "green"
		}]
	},
	{
		id: "skillnet",
		name: "Skillnet Ireland training supports",
		shortName: "Skillnet",
		agency: "Skillnet Ireland",
		category: "People",
		amountLabel: "Subsidised training",
		amountMax: 15e3,
		coFundRate: .3,
		deadlineKind: "rolling",
		deadlineNote: "Via the relevant sector or regional Skillnet",
		summary: "Enterprise-led upskilling. Join a Skillnet network in your sector or region for subsidised courses, often stacked with MentorsWork.",
		covers: [
			"Management training",
			"Technical upskilling",
			"AI / digital courses"
		],
		nextSteps: [
			"Find the Skillnet for your sector",
			"Register the company",
			"Book funded programmes"
		],
		documents: ["Company details", "Learner list"],
		sections: [{
			id: "summary",
			title: "Skills gap",
			hint: "What the team cannot yet do."
		}, {
			id: "plan",
			title: "Training plan",
			hint: "Courses, people, and dates."
		}],
		winRate: .77,
		winBySector: {
			professional: .8,
			software: .76,
			manufacturing: .74
		},
		typicalAward: "Course subsidy",
		difficulty: "straightforward",
		officialUrl: "https://www.skillnetireland.ie",
		goals: ["training"],
		rules: [{
			id: "emp",
			label: "Employer with staff or owner-managers to train",
			test: (p) => p.employees >= 1 || p.goals.includes("training")
		}]
	},
	{
		id: "mentorswork",
		name: "MentorsWork",
		shortName: "MentorsWork",
		agency: "Skillnet Ireland",
		category: "People",
		amountLabel: "Fully subsidised 12-week programme",
		amountMax: 0,
		coFundRate: 1,
		deadlineKind: "window",
		deadlineNote: "Cohorts through SFA / Skillnet / Ibec partners",
		summary: "Award-winning 12-week programme: one-to-one mentoring, workshops and peer learning. Free to eligible SMEs. Over 3,500 businesses supported.",
		covers: [
			"Mentoring",
			"Workshops",
			"Peer network"
		],
		nextSteps: [
			"Register interest at mentorswork.ie",
			"Select priority areas",
			"Join the next cohort"
		],
		documents: ["Short application"],
		sections: [{
			id: "summary",
			title: "Priorities",
			hint: "The three business problems you want a mentor on."
		}],
		winRate: .69,
		winBySector: {
			retail: .7,
			professional: .72,
			food: .68
		},
		typicalAward: "Programme place",
		difficulty: "straightforward",
		officialUrl: "https://www.mentorswork.ie",
		goals: ["training"],
		rules: [{
			id: "sme",
			label: "Irish SME",
			test: sme,
			knockout: true
		}]
	},
	{
		id: "leader",
		name: "LEADER / rural enterprise",
		shortName: "LEADER",
		agency: "Pobal / LEADER",
		category: "Rural",
		amountLabel: "Varies by local action group",
		amountMax: 2e5,
		coFundRate: .5,
		deadlineKind: "window",
		deadlineNote: "Calls run by local action groups",
		summary: "Rural development funding for enterprises, community facilities and tourism projects outside the main urban centres. Rules and rates are local.",
		covers: [
			"Rural enterprise",
			"Community facilities",
			"Tourism projects"
		],
		nextSteps: [
			"Confirm you are in a LEADER area",
			"Meet the local action group",
			"Wait for an open call"
		],
		documents: [
			"Local application pack",
			"Match funding evidence",
			"Planning if relevant"
		],
		sections: [{
			id: "summary",
			title: "Rural impact",
			hint: "Jobs, visitors, or services the parish gains."
		}, {
			id: "budget",
			title: "Budget",
			hint: "Eligible costs against the local rate."
		}],
		winRate: .27,
		winBySector: {
			tourism: .34,
			food: .3,
			creative: .28
		},
		typicalAward: "Locally set",
		difficulty: "competitive",
		officialUrl: "https://www.pobal.ie",
		goals: [
			"equipment",
			"hire",
			"feasibility"
		],
		rules: [{
			id: "region",
			label: "Project in a rural / LEADER area (not core Dublin)",
			test: (p) => p.region !== "dublin"
		}]
	},
	{
		id: "trading-online-legacy",
		name: "Online retail / e-commerce supports",
		shortName: "Online retail",
		agency: "Enterprise Ireland",
		category: "Digital",
		amountLabel: "Scheme-dependent",
		amountMax: 4e4,
		coFundRate: .5,
		deadlineKind: "window",
		deadlineNote: "Check current Online Retail / digital calls",
		summary: "Periodic calls supporting Irish retailers to sell online, improve conversion, and fulfil nationally. Successor activity sits alongside Grow Digital for smaller firms.",
		covers: [
			"E-commerce platform",
			"UX",
			"Digital marketing capability"
		],
		nextSteps: ["Check if a current retail digital call is open", "Otherwise use Grow Digital for smaller builds"],
		documents: [
			"Website plan",
			"Quotes",
			"Accounts"
		],
		sections: [{
			id: "summary",
			title: "Online offer",
			hint: "What you will sell and to whom."
		}, {
			id: "budget",
			title: "Build budget",
			hint: "Platform, content, and launch marketing."
		}],
		winRate: .3,
		winBySector: {
			retail: .38,
			food: .32,
			tourism: .29
		},
		typicalAward: "€10,000–€40,000",
		difficulty: "moderate",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["digital"],
		rules: [{
			id: "retail",
			label: "Retail, food or consumer brand selling online",
			test: (p) => [
				"retail",
				"food",
				"tourism",
				"creative"
			].includes(p.sector)
		}]
	},
	{
		id: "innovation-partnership",
		name: "Innovation Partnership Programme",
		shortName: "Innovation Partnership",
		agency: "Enterprise Ireland",
		category: "R&D",
		amountLabel: "Up to 50% of collaborative R&D",
		amountMax: 2e5,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "Company + research institute collaboration",
		summary: "Collaborative R&D with a university, IoT or Teagasc. Larger and longer than a voucher — for a defined research project with a knowledge partner.",
		covers: [
			"Collaborative R&D",
			"Institute researcher time",
			"Project costs"
		],
		nextSteps: [
			"Find a research partner",
			"Co-write a technical proposal",
			"Apply jointly"
		],
		documents: [
			"Technical proposal",
			"Partner letter",
			"Budget",
			"IP heads of terms"
		],
		sections: [
			{
				id: "summary",
				title: "Research question",
				hint: "What the partnership will invent or prove."
			},
			{
				id: "partner",
				title: "Institute partner",
				hint: "Group, PI, and relevant facilities."
			},
			{
				id: "ip",
				title: "IP approach",
				hint: "How results will be used in the company."
			},
			{
				id: "budget",
				title: "Budget",
				hint: "Eligible costs and 50% support."
			}
		],
		winRate: .24,
		winBySector: {
			manufacturing: .28,
			food: .27,
			health: .25,
			green: .26
		},
		typicalAward: "€50,000–€150,000",
		difficulty: "competitive",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["rd"],
		rules: [{
			id: "ltd",
			label: "Limited company ready to co-fund research",
			test: limitedCompany,
			knockout: true
		}, {
			id: "rd",
			label: "R&D project that needs an institute partner",
			test: (p) => p.goals.includes("rd")
		}]
	},
	{
		id: "gradstart",
		name: "GradStart",
		shortName: "GradStart",
		agency: "Enterprise Ireland",
		category: "People",
		amountLabel: "Up to €15,000 per year",
		amountMax: 3e4,
		coFundRate: .5,
		deadlineKind: "rolling",
		deadlineNote: "Two-year graduate contract support",
		summary: "Up to €15,000 per year (or 50% of salary, whichever is lower) toward hiring a graduate on a two-year contract.",
		covers: ["Graduate salary contribution"],
		nextSteps: [
			"Identify a graduate role",
			"Confirm EI client pathway",
			"Apply around the hire"
		],
		documents: [
			"Role spec",
			"Salary details",
			"Graduate CV"
		],
		sections: [{
			id: "summary",
			title: "Role",
			hint: "What the graduate will own in year one."
		}, {
			id: "budget",
			title: "Salary",
			hint: "Gross salary and the 50% / €15k cap."
		}],
		winRate: .4,
		winBySector: {
			software: .44,
			professional: .41,
			manufacturing: .38
		},
		typicalAward: "€15,000/year",
		difficulty: "moderate",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["hire"],
		rules: [{
			id: "hire",
			label: "Planning to hire a graduate",
			test: (p) => p.goals.includes("hire")
		}, {
			id: "est",
			label: "Established employer",
			test: (p) => p.employees >= 1 && p.tradingMonths >= 6
		}]
	},
	{
		id: "climate-voucher",
		name: "Climate Action Voucher",
		shortName: "Climate Voucher",
		agency: "Enterprise Ireland",
		category: "Energy",
		amountLabel: "Voucher for climate action planning",
		amountMax: 9e3,
		coFundRate: .8,
		deadlineKind: "rolling",
		deadlineNote: "Check current EI climate offers",
		summary: "Short, expert-led climate action support so SMEs can plan decarbonisation before a capital project. Pair with SEAI measures once the plan exists.",
		covers: [
			"Climate action plan",
			"Emissions baseline",
			"Measure shortlist"
		],
		nextSteps: [
			"Run Climate Toolkit 4 Business",
			"Apply for the voucher",
			"Sequence SEAI capital after"
		],
		documents: ["Toolkit output", "Assignment proposal"],
		sections: [{
			id: "summary",
			title: "Climate starting point",
			hint: "Sites, fuels, and what you already measure."
		}],
		winRate: .46,
		winBySector: {
			manufacturing: .5,
			food: .48,
			green: .55
		},
		typicalAward: "€5,000–€9,000",
		difficulty: "straightforward",
		officialUrl: "https://www.enterprise-ireland.com",
		goals: ["energy"],
		rules: [{
			id: "energy",
			label: "Decarbonisation or climate planning in scope",
			test: (p) => p.goals.includes("energy") || p.sector === "green"
		}]
	},
	{
		id: "creative-ireland",
		name: "Creative Ireland / Arts Council project funds",
		shortName: "Creative funds",
		agency: "Arts Council",
		category: "Creative",
		amountLabel: "Project-dependent",
		amountMax: 8e4,
		coFundRate: .8,
		deadlineKind: "window",
		deadlineNote: "Periodic strategic and project calls",
		summary: "Project funding for creative practice, festivals, and cultural enterprises. Competitive and deadline-driven. Not a substitute for LEO priming.",
		covers: [
			"Project costs",
			"Artist fees",
			"Production"
		],
		nextSteps: [
			"Read the current Arts Council or Creative Ireland call",
			"Align to the published themes",
			"Apply in the window"
		],
		documents: [
			"Artistic proposal",
			"Budget",
			"Track record"
		],
		sections: [{
			id: "summary",
			title: "Artistic proposition",
			hint: "The work, audience, and public value."
		}, {
			id: "budget",
			title: "Budget",
			hint: "Fees, production, and match."
		}],
		winRate: .22,
		winBySector: {
			creative: .28,
			tourism: .18
		},
		typicalAward: "€5,000–€40,000",
		difficulty: "competitive",
		officialUrl: "https://www.artscouncil.ie",
		goals: ["feasibility"],
		rules: [{
			id: "creative",
			label: "Creative, cultural or festival activity",
			test: (p) => p.sector === "creative" || p.sector === "tourism"
		}]
	},
	{
		id: "dfb",
		name: "Digital for Business",
		shortName: "Digital for Business",
		agency: "Local Enterprise Office",
		category: "Digital",
		amountLabel: "Free digital assessment",
		amountMax: 2700,
		coFundRate: 1,
		deadlineKind: "rolling",
		deadlineNote: "Gateway to the Grow Digital Voucher",
		summary: "Free consultancy that scores digital maturity and recommends tools. Completing it in the last two years is required before a Grow Digital Voucher.",
		covers: [
			"Digital audit",
			"Roadmap",
			"Software recommendations"
		],
		nextSteps: [
			"Book Digital for Business with your LEO",
			"Implement quick wins",
			"Apply for Grow Digital if software is needed"
		],
		documents: ["None to start"],
		sections: [{
			id: "summary",
			title: "Current stack",
			hint: "Tools you already pay for and the gaps."
		}],
		winRate: .81,
		winBySector: {
			retail: .84,
			professional: .8,
			food: .79
		},
		typicalAward: "Funded consultancy",
		difficulty: "straightforward",
		officialUrl: "https://www.localenterprise.ie",
		goals: ["digital"],
		rules: [{
			id: "leo",
			label: "Small enterprise, not an EI client",
			test: (p) => microOrSmall(p) && notEi(p),
			knockout: true
		}]
	}
];
var CATALOGUE_REVIEWED_AT = "2026-09-06";
var CATALOGUE_TIER = "prototype";
function getGrant(id) {
	return GRANTS.find((g) => g.id === id);
}
var SECTOR_LABELS = {
	software: "Software & digital",
	manufacturing: "Manufacturing",
	food: "Food & drink",
	professional: "Professional services",
	retail: "Retail",
	green: "Climate & energy",
	tourism: "Tourism & hospitality",
	creative: "Creative & culture",
	health: "Health & medtech",
	construction: "Construction"
};
var GOAL_LABELS = {
	hire: "Hiring",
	equipment: "Equipment / capital",
	digital: "Digital tools",
	export: "Export",
	rd: "Product / R&D",
	energy: "Energy & climate",
	training: "Training",
	feasibility: "Feasibility / research"
};
var REGION_LABELS = {
	dublin: "Dublin",
	cork: "Cork",
	galway: "Galway",
	limerick: "Limerick",
	bmw: "Border, Midlands & West",
	other: "Rest of Ireland"
};
function uid() {
	try {
		if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
	} catch {}
	return `t4-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
var memory = {};
var safeStorage = {
	getItem: (name) => {
		try {
			return localStorage.getItem(name) ?? memory[name] ?? null;
		} catch {
			return memory[name] ?? null;
		}
	},
	setItem: (name, value) => {
		memory[name] = value;
		try {
			localStorage.setItem(name, value);
		} catch {}
	},
	removeItem: (name) => {
		delete memory[name];
		try {
			localStorage.removeItem(name);
		} catch {}
	}
};
var useT4 = create()(persist((set, get) => ({
	profile: null,
	applications: [],
	savedIds: [],
	setProfile: (p) => set({ profile: p }),
	toggleSaved: (id) => set((s) => ({ savedIds: s.savedIds.includes(id) ? s.savedIds.filter((x) => x !== id) : [...s.savedIds, id] })),
	startApplication: (grantId) => {
		const existing = get().applications.find((a) => a.grantId === grantId && a.status !== "declined");
		if (existing) return existing;
		const grant = getGrant(grantId);
		const now = (/* @__PURE__ */ new Date()).toISOString();
		const app = {
			id: uid(),
			grantId,
			status: "draft",
			sections: (grant?.sections ?? []).map((s) => ({
				id: s.id,
				title: s.title,
				content: ""
			})),
			checkedDocs: [],
			notes: "",
			createdAt: now,
			updatedAt: now
		};
		set((s) => ({ applications: [app, ...s.applications] }));
		return app;
	},
	updateApplication: (id, patch) => set((s) => ({ applications: s.applications.map((a) => a.id === id ? {
		...a,
		...patch,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	} : a) })),
	setSection: (appId, sectionId, content) => set((s) => ({ applications: s.applications.map((a) => a.id === appId ? {
		...a,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		sections: a.sections.map((sec) => sec.id === sectionId ? {
			...sec,
			content
		} : sec)
	} : a) })),
	toggleDoc: (appId, doc) => set((s) => ({ applications: s.applications.map((a) => a.id === appId ? {
		...a,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		checkedDocs: a.checkedDocs.includes(doc) ? a.checkedDocs.filter((d) => d !== doc) : [...a.checkedDocs, doc]
	} : a) })),
	setStatus: (appId, status) => set((s) => ({ applications: s.applications.map((a) => a.id === appId ? {
		...a,
		status,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	} : a) }))
}), {
	name: "t4-grants",
	storage: createJSONStorage(() => safeStorage)
}));
function CloudBridge() {
	const { user, isPending } = useCurrentUserState();
	const loadedFor = (0, import_react.useRef)(null);
	const ready = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) {
			loadedFor.current = null;
			ready.current = false;
			return;
		}
		if (loadedFor.current === user.id) return;
		loadedFor.current = user.id;
		ready.current = false;
		let cancelled = false;
		(async () => {
			try {
				const remote = await getWorkspace();
				if (cancelled) return;
				const local = useT4.getState();
				const remoteEmpty = !remote.profile && remote.applications.length === 0;
				const localHas = Boolean(local.profile) || local.applications.length > 0;
				if (remoteEmpty && localHas) await saveWorkspace({ data: {
					profile: local.profile,
					applications: local.applications,
					savedIds: local.savedIds
				} });
				else if (!remoteEmpty) useT4.setState({
					profile: remote.profile,
					applications: remote.applications,
					savedIds: remote.savedIds
				});
				if (!cancelled) ready.current = true;
			} catch {
				loadedFor.current = null;
				ready.current = false;
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	(0, import_react.useEffect)(() => {
		if (isPending || !user) return;
		let t;
		const unsub = useT4.subscribe((state) => {
			if (!ready.current || loadedFor.current !== user.id) return;
			if (t) clearTimeout(t);
			t = setTimeout(() => {
				saveWorkspace({ data: {
					profile: state.profile,
					applications: state.applications,
					savedIds: state.savedIds
				} }).catch(() => {});
			}, 800);
		});
		return () => {
			unsub();
			if (t) clearTimeout(t);
		};
	}, [user, isPending]);
	return null;
}
var links = [
	{
		to: "/",
		label: "Overview"
	},
	{
		to: "/match",
		label: "Match"
	},
	{
		to: "/grants",
		label: "Catalogue"
	},
	{
		to: "/pipeline",
		label: "Workspace"
	},
	{
		to: "/intelligence",
		label: "Intelligence"
	}
];
function AuthSlot() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "size-8 shrink-0 animate-pulse rounded-full bg-pine-soft",
		"aria-hidden": true
	});
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-40 truncate md:max-w-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: "min-h-11 shrink-0 rounded-md px-3 py-2 text-sm text-muted hover:text-ink",
		children: "Sign in"
	});
}
function Shell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-right",
				richColors: false
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 border-b border-border/80 bg-bg/90 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-medium tracking-tight",
								children: "T4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium uppercase tracking-widest text-muted",
								children: "Grants"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-1 md:flex",
							children: links.map((l) => {
								const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: l.to,
									className: cn("min-h-11 rounded-md px-3 py-2 text-sm transition-colors", active ? "bg-pine-soft text-pine-deep" : "text-muted hover:text-ink"),
									children: l.label
								}, l.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/match",
								className: "hidden min-h-11 rounded-md bg-pine px-3 py-2 text-sm font-medium text-surface sm:inline-flex sm:items-center",
								children: "Start matching"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-1 overflow-x-auto px-3 pb-2 md:hidden",
					children: links.map((l) => {
						const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: l.to,
							className: cn("min-h-11 shrink-0 rounded-full px-3 py-2 text-xs", active ? "bg-pine text-surface" : "border border-border bg-surface text-muted"),
							children: l.label
						}, l.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "mt-16 border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted md:flex-row md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "T4 Grants — funding operating system for Irish SMEs." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex flex-wrap gap-x-3 gap-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-ink",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "hover:text-ink",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/stand",
								className: "hover:text-ink",
								children: "Standing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Prototype. Confirm schemes with the awarding body." })
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { REGION_LABELS as a, getGrant as c, GRANTS as i, useCurrentUserState as l, CATALOGUE_TIER as n, SECTOR_LABELS as o, GOAL_LABELS as r, Shell as s, CATALOGUE_REVIEWED_AT as t, useT4 as u };
