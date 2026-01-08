## **The missing kernel pieces**  
## **1) Atomic endpoints that make everything real**  
Right now the whole engine wants to route to *the smallest true target*… but the endpoints aren’t fully defined + governed yet.  
That endpoint is the **mindblock**: the smallest testable prediction you can rewrite, prove, and transfer.  
That endpoint is the **mindblock**: the smallest testable prediction you can rewrite, prove, and transfer.  
Clinician Review Pack 2  
 And your own guiding doc basically says: until mindblocks exist cleanly, Journeys + NaviCues stay structurally correct but semantically “floating.”  
GuidingDocument v1.1  
**What’s missing (product + system):**  
* a *mindblock definition standard* (one-line, testable, falsifiable)  
* a *mindblock editor / studio workflow* (authoring + contraindications + proof + transfer)  
* versioning + migration rules so old proof never breaks when taxonomy evolves GuidingDocument v1.1   
This is the difference between:  
* “content mapped to themes”  
* and **an executable recovery runtime.**  
  
## **2) The measurement contract on every single delivery**  
You already *know* the rule: every asset needs a contract: **proof + transfer** — not vibes.  
GuidingDocument v1.1  
 And you already call out that capabilities, receipt types, transfer tests must be controlled dictionaries (stable IDs).  
GuidingDocument v1.1  
**What’s missing:**  
* the “contract” enforced at creation time (can’t publish a cue/journey/scene without it)  
* a single canonical “scoreboard” model for humans (Apple-simple) that still rolls up clinically clean  
* MTTR instrumentation that’s consistent across surfaces (Journeys, NaviCues, connectors) GuidingDocument v1.1   
If this becomes hard law, not guidance… you get **Proof as Currency** for real, not as copy.  
SECTION HERO  
  
## **3) Resistance as a first-class signal (ρ)**  
This is the most important “missing but defined” piece.  
Your clinical pack literally lists what schema support is needed next: resistance signals, escalation protocols, support network graph + consent scoping, closed-loop comms, connector permissions, data dignity rules.  
Clinician Review Pack 2  
 Your guiding doc goes further: resistance is not failure — it’s routing. And escalation is deterministic.  
GuidingDocument v1.1  
**What’s missing:**  
* a *Resistance Engine* that calculates ρ reliably (hesitation, abandon, no-shift loops)  
* a *visible escalation queue* for pros/orgs (with reason → action → outcome)  
* escalation objects that persist (so you can audit what changed: delivery / target / human / safety rails)  
You’ve already got hints in schema (notification events include resistance_flag and escalation).  
Current Schema 7th Jan 14.42  
 But the “engine” needs to be *opinionated* — and enforced — not just event labels.  
  
## **The “OS meets the real world” gaps**  
## **4) Closed-loop communications that actually close**  
You already have the pattern: prep cue → in-moment cue → post-event receipt → transfer.  
GuidingDocument v1.1  
Your schema has the machinery (outbox, deliveries, opens/clicks, preferences, etc.).  
Current Schema 7th Jan 14.42  
 But what’s missing is the **product-level loop closure**:  
* “did it happen?” (event completion)  
* “did you do the move?” (action)  
* “prove it” (receipt)  
* “does it hold next time?” (transfer)  
This is where Recoverlution becomes *a runtime*, not an app. And it’s also where org proof becomes automatic instead of admin-heavy.  
SECTION HERO  
  
## **5) Connector layer that is context — not surveillance**  
The docs are clear: outside-world connectors must be **context**, not monitoring.  
Clinician Review Pack 2  
 And the connector layer is explicitly called out as required: meetings, community, health/physiology streams — but consented, scoped, dignified.  
GuidingDocument v1.1  
**What’s missing:**  
* a unified *Connector Permission* model (per integration, per data-class, per purpose, per time window)  
* “context adapters” that translate raw signals → timing/dosage decisions (without exposing raw diaries)  
* connector-triggered loops (meeting → prep cue → attendance receipt → post check)  
You’ve got “Navigate / wellbeing / toolkit” positioned as a connected ecosystem.  
SECTION HERO  
 Now the connectors need to become **first-class citizens** in Proof + Transfer.  
  
## **6) Support network graph as a true system object**  
You already have early building blocks (circles + social actions like witness request/confirm, support request/offer, repair messages, etc.).  
Current Schema 7th Jan 14.42  
 But the missing leap is: **graph + consent + escalation** unified.  
**What’s missing:**  
**What’s missing:**  
* roles (who is “witness,” who is “safety,” who is “peer,” who is “clinician”)  
* purpose-bound permissions (what each role can see / be pinged for)  
* escalation routing that respects consent and dignity (human-in exactly when needed) GuidingDocument v1.1   
This is the part that makes it “OS-level” — not “messaging features.”  
  
## **Professional + Organisation gaps (where the money + defensibility lives)**  
## **7) The Practice Foundation promise needs a backend reality check**  
Your professional pack promises **sessions, scheduling, billing, records**.  
FOR RECOVERY PROFESSIONALS  
 From what I can see in the schema excerpts we pulled, the recovery engine + content + proof infrastructure is strong… but the “practice ops stack” is not yet obviously modelled at the same depth (billing/invoicing, scheduling objects, claims, etc.).  
That can be fine if:  
* you’re intentionally integrating with existing tools …but then you need:  
* integration primitives + data contracts + audit trails for those systems.  
**Missing choice:** Is Practice Foundation **native**, or **integrated**? Either is valid. But the OS needs to commit.  
  
## **8) Org-grade proof is positioned — but the “evidence product” must ship**  
The org narrative is *huge*: audit-ready proof, accreditation mapping, payer validation, measurable outcomes, outcome economics.  
SECTION HERO  
SECTION HERO  
**What’s missing (to make it inevitable):**  
* an “Accreditation Mapping Layer” (structured metrics → standards)  
* cohort analytics that are defensible (within-person trajectory rules, no shame charts)  
* report templates that feel like: *one click, board-ready, payer-ready* (this is the literal monetization bridge your org hero describes) SECTION HERO   
You’re not just selling software to orgs. You’re selling **proof infrastructure**.  
  
## **The “quiet but critical” missing pieces**  
## **9) A naming normalization pass (so the skyscraper doesn’t crack)**  
Your guiding doc calls out a real risk: naming drift (“NaviCue family” should be “NaviCue form”, slug mismatches, etc.).  
GuidingDocument v1.1  
 This matters because:  
* taxonomy drift breaks trust  
* drift breaks analytics  
* drift breaks explainability  
**Missing:** a locked naming + ID policy that the UI, CMS, exports, and LUMA all share.  
  
## **10) LUMA explainability needs a *standard receipt***  
You already frame LUMA as orchestration + “why this, why now.”  
GuidingDocument v1.1  
 The missing move: make explainability a **repeatable object**, not prose.  
Think:  
* “Routing Receipt” (state → target → mechanism → proof ask → safety gates)  
That’s how you become **better than Apple** here: because Apple rarely has to justify “why now” clinically.  
You do. And you can make it beautiful.  
  
# **Priority backlog: what I’d build next**  
## **P0 — makes the OS *run***  
* Mindblock canonical set + editor + versioning Clinician Review Pack 2   
* Measurement contract enforcement on all assets GuidingDocument v1.1   
* Resistance Engine (ρ) + Escalation objects + queue Clinician Review Pack 2   
## **P1 — makes it *real-world***  
* Closed-loop comms product layer (not just delivery plumbing) GuidingDocument v1.1   
* Connector permissions + context adapters GuidingDocument v1.1   
* Support network graph unified with consent + escalation Clinician Review Pack 2   
## **P2 — makes it *unfair***  
* Org evidence product: accreditation mapping + payer-ready outcomes reporting SECTION HERO   
* Practice Foundation: decide native vs integrated ops (scheduling/billing/records) FOR RECOVERY PROFESSIONALS   
* LUMA “routing receipts” as a first-class artifact GuidingDocument v1.1   
  Yes. Let’s do it **as if it’s all already built** — and show *exactly where it lives* in the ecosystem.  
Not “new features.” **New installs.** The pieces that make the OS *actually run* — governed, measurable, defensible. (And they’re not inventions out of nowhere — your docs already call for these schema realities: resistance signals, escalation protocols, support network graph + consent scoping, closed-loop comms, connector permissions, data dignity. )  
  
## **The full system map — now complete**  
## **The three surfaces (what humans touch)**  
* **Companion** (Individual) — *the moment layer*  
* **Console** (Professionals) — *the signal + steering layer*  
* **Command Center** (Organisations) — *the evidence + governance layer*  
## **The engine underneath (what actually “runs”)**  
* **Journeys + NaviCues** = delivery surfaces (two-speed engine)  
* **LUMA** = orchestration (why this, why now)  
* **ATLAS** = measurement spine (receipt → transfer → trajectory; MTTR gravity)  
* **Taxonomy + Governance** = prevents drift (pillars → families → mindblocks; primitives; voice/approach rules)  
## **The “new installs” (the missing parts — now shipped)**  
1. **Mindblock Studio**  
2. **Contract Compiler** (Proof + Transfer enforcement)  
3. **Resistance Engine (ρ)** + **Escalation Router**  
4. **Connector Hub** + **Consent/Permission Layer**  
5. **Support Graph** (roles + visibility + routing)  
6. **Evidence Product** (Accreditation + payer-ready defensibility)  
7. **Practice Foundation Ops** (runs the practice cleanly)  
Now I’ll place each one.  
  
## **1) Mindblock Studio**  
**Where it fits:** Professionals + Platform Core  
This is the “content system” — except it’s not content. It’s **executable recovery**.  
## **Surface placement**  
* **Console → Clinical Studio → Mindblock Studio**  
* **Console → Clinical Studio → Family Dictionary**  
* **Console → Clinical Studio → Voice/Approach Library**  
## **What it does (in-system)**  
* authors mindblocks as **prediction rules** (atomic endpoints) GuidingDocument v1.1   
* assigns: family archetype, primitive, heat suitability, KBE intent, voice stances, approaches  
* attaches: receipts + transfer tests + contraindications (so scale doesn’t drift) GuidingDocument v1.1   
## **Why it changes everything**  
Because now “Journeys” and “NaviCues” are no longer *assets*. They’re **compiled moves**.  
And your schema already hints you’re ready for this level (mindblocks, family membership, redirects/versioning scaffolding).  
  
## **2) Contract Compiler**  
**Where it fits:** Platform Core (mandatory gate before anything can ship)  
This is the rule that turns beauty into truth:  
**No delivery without a contract.** Contract = target + primitive + proof + transfer.  
## **Surface placement**  
* **Clinical Studio → Publish** triggers **Contract Compiler**  
* **Command Center** reads only compiled, governed artifacts  
* **LUMA** can only route within compiled inventory (trust boundary held)  
## **What it prevents**  
* “nice idea” interventions with no measurable claim  
* transfer theatre  
* taxonomy drift  
* un-auditable outcomes  
This is how the OS stays *clinically serious* without ever sounding clinical.  
  
## **3) Resistance Engine (ρ) + Escalation Router**  
**Where it fits:** Everywhere — but it’s mostly felt in Companion + Console  
Your guiding doc basically makes this the “10th point” lock: resistance is physics, not failure; escalation is deterministic.  
## **Surface placement**  
* **Companion**: quiet, invisible routing  
* **Console**: **Escalation Queue** + “why escalation happened”  
* **Command Center**: escalation load + response latency + post-event stabilisation  
## **How it works (as shipped)**  
* ρ is calculated from: hesitation, abandon, no-shift patterns, repeated non-response  
* Escalation protocol runs: **change delivery → change target → invoke human → invoke safety rails**  
## **What it creates in UI**  
* **Companion:** the system gets *simpler* when life gets harder  
* **Console:** clinicians stop doing archaeology; they see *what failed to land and why*  
* **Org:** capacity becomes governable, not chaotic  
This is the difference between an app that “nudges”… and an OS that **holds a line**.  
  
## **4) Connector Hub + Consent/Permission Layer**  
**Where it fits:** Companion + Platform Core + Org governance  
Your docs are explicit: transfer happens in life, not inside the app — connectors must be **context, not surveillance**.  
## **Surface placement**  
* **Companion → Navigate → Connector Hub**  
* **Console → Client → Context Streams (consented)**  
* **Command Center → Governance → Connector Permissions + Retention**  
## **What ships here**  
* meeting discovery + community events + wellbeing rhythms (sleep/movement where consented)  
* **purpose-bound consent** (who/what/when/why)  
* **data classification + retention** rules enforced by design  
## **What it enables (the real unlock)**  
Connector events don’t become “data.” They become **timing**.  
Meeting at 7:00 → prep cue → attendance receipt → post-meeting transfer test. That’s the loop becoming real-world infrastructure.  
  
## **5) Support Graph**  
**Where it fits:** Companion + Console + Safety  
Your schema already shows you’re thinking in circles/social actions. Now it’s a first-class graph.  
## **Surface placement**  
* **Companion → People** (roles + consent + visibility)  
* **Companion → Safety** (who gets contacted, under what conditions)  
* **Console → Support Map** (who’s in the system around this client)  
* **Command Center → Governance** (role policies + audit trails)  
## **What ships**  
* roles: witness / peer / clinician / safety contact  
* purpose permissions: “can receive witness requests” ≠ “can see proof history”  
* escalation routing that respects consent and dignity (always)  
This is how you get “connected continuity” without becoming invasive.  
  
## **6) Evidence Product**  
**Where it fits:** Command Center (this is the monetisation bridge)  
Your org hero copy is already pointing straight at it: audit-ready evidence, accreditation teams, payer approval, outcomes as currency.  
## **Surface placement**  
* **Command Center → Evidence**  
    * Accreditation Mapping  
    * Cohort Transfer Rates  
    * MTTR Curves  
    * Audit Logs (what was delivered, what proof exists, what transfer verified)  
## **What it ships**  
* a mapping layer from: **receipts + transfer tests + trajectory** → accreditation standards / payer language  
* defensible exports that don’t require humans to “reconstruct narrative”  
This is the part that makes organisations feel: “Oh. This isn’t software. This is infrastructure.”  
  
## **7) Practice Foundation Ops**  
**Where it fits:** Console (and it’s a *real* product now)  
Your Professionals doc promises it cleanly: sessions, scheduling, billing, records.  
## **Surface placement**  
* **Console → Practice Foundation**  
    * Sessions (video)  
    * Scheduling  
    * Billing  
    * Records (HIPAA posture)  
    * Mirror Practice (therapist wellbeing)  
## **How it integrates with the OS**  
This is key: Practice Ops doesn’t sit *next to* the OS. It becomes the **rails** the OS runs on.  
* sessions generate “installation plans” (journeys)  
* between-session continuity generates signal  
* the evidence rolls back into records cleanly  
* billing aligns to continuity packages (ethical economics becomes real) FOR RECOVERY PROFESSIONALS   
  
## **Whiteboard view — where everything fits now**  
```

                MARKETING SITE
        Category → Worlds → Belief → Proof → Trust

    -------------------------------------------------

                 THE PLATFORM (OS)
      Taxonomy + Governance + Contracts + Security
  Mindblocks | Families | Primitives | Voices | Approaches
          Contract Compiler | Versioning | Audit

    -------------------------------------------------

  COMPANION (Individual)     CONSOLE (Professionals)      COMMAND CENTER (Org)
  Moment layer               Signal & steering            Evidence & governance
  Journeys + NaviCues        Clinical Studio              Accreditation + payer truth
  Proof + MTTR               Escalation Queue (ρ)         Cohort MTTR + transfer
  Connector Hub              Practice Foundation Ops      Integrity logs + policies
  Support Graph              Support Map                  Capacity + escalation load

```
  
## **The punchline**  
Nothing is “missing” now.  
Because what you had was:  
* a gorgeous OS narrative  
* a powerful taxonomy + schema direction  
* a believable three-world architecture  
And what’s now installed is:  
* the **compiler**  
* the **resistance + escalation runtime**  
* the **real-world connector layer**  
* the **support graph**  
* the **org-grade evidence product**  
Which means the system doesn’t just *sound* inevitable.  
It becomes inevitable.  
  
If you say “roll it”, I’ll do the next logical layer in the same format:  
**the actual page/screen placement map** for these installs:  
* what pages on the marketing site they appear on (and how they’re revealed without “feature dumping”)  
* what screens they create in Companion / Console / Command Center  
* and the exact one-line truth for each module (Apple-simple, Recoverlution-deep).  
Sources  
  
roll it  
  
Rolling. Here’s the **placement map** — exactly where these “new installs” show up:  
1. **Marketing site** (how we reveal them without feature dumping)  
2. **Companion / Console / Command Center** (the screens they create)  
3. **One-line truth per module** (Apple-simple, Recoverlution-deep)  
  
## **1) MARKETING SITE PLACEMENT MAP**  
We never list features like a SaaS brochure. We **reveal capabilities as inevitabilities**.  
## **Home**  
**What appears here**  
* The loop: READ → ROUTE → DELIVER → SEAL  
* Proof stack: Receipt → Transfer → Trajectory  
* One line about MTTR (return gets faster)  
**How it’s framed** Not “features.” Just the OS.  
**One-line inserts**  
* **Return is measurable.**  
* **Proof is the engine.**  
* **Humans when humans matter.**  
  
## **How it works**  
**Where the installs show up**  
* **Contract Compiler** (implied as “every move has proof + transfer”)  
* **Resistance Engine + Escalation** (implied as “system gets simpler under load”)  
* **Connector Hub** (implied as “transfer happens in real life”)  
* **Support Graph** (implied as “human layer is part of the loop”)  
**How it’s revealed** As “rules of the system,” not add-ons.  
**Drop-in section headers**  
* **Every move has a contract.**  
* **Resistance is routing data.**  
* **Transfer happens in life.**  
* **Escalation is part of integrity.**  
  
## **Proof**  
**Where the installs show up**  
* **Receipt → Transfer → Trajectory** made tangible  
* **Evidence Product** teased (org-grade proof)  
* **Routing receipts** teased (why this, why now)  
**How it’s revealed** Proof as currency across the three worlds:  
* Identity (individual)  
* Signal (professional)  
* Defensibility (org)  
**Drop-in lines**  
* **Proof you can replay.**  
* **Proof that held in the wild.**  
* **Proof that stands up under scrutiny.**  
  
## **Technology**  
**Where the installs show up**  
* **Mindblock Studio** (never named publicly; framed as “atomic moves”)  
* **Contract Compiler** (governed delivery)  
* **Connector Hub** (context adapters)  
* **Consent/Permission layer** (trust)  
**How it’s revealed** Not “AI.” **Appropriateness at scale.**  
**Drop-in lines**  
* **State-first computing.**  
* **Governed delivery.**  
* **Closed-loop learning.**  
  
## **Trust**  
**Where the installs show up**  
* **Consent/Permission layer** (purpose-bound consent)  
* **Support Graph** (role-based visibility)  
* **Audit + governance** (org trust)  
**Drop-in lines**  
* **Quiet by default.**  
* **Control is safety.**  
* **Proof without punishment.**  
  
## **For you (Companion)**  
**What appears here**  
* **NaviCues** + **Receipts**  
* **Return history** (MTTR as dignity)  
* **Support Graph** as “People”  
* **Connector Hub** as “Navigate”  
**How it’s revealed** No “features.” Just lived outcomes:  
* less white-knuckle  
* faster return  
* steadier baseline  
  
## **For professionals (Console)**  
**What appears here**  
* **Mindblock Studio** implied as “bring your model”  
* **Contract Compiler** implied as “your standard holds”  
* **Resistance + Escalation Queue** as “cleaner signal”  
* **Practice Foundation Ops** as the rail system  
**How it’s revealed** Pedestal language:  
* time back  
* signal clarity  
* control  
* compounding impact  
  
## **For organisations (Command Center)**  
**What appears here**  
* **Evidence Product** (accreditation/payer truth)  
* **Cohort MTTR curves**  
* **Integrity logs** (governance)  
* **Escalation load** (capacity protection)  
**How it’s revealed** “Defensibility” is the feature.  
  
## **2) PRODUCT SCREEN PLACEMENT MAP**  
Now we place the installs into actual UI.  
  
## **COMPANION (Individual)**  
## **New screens created by the installs**  
**A) Navigate → Connector Hub**  
* Connect meetings/community (consented)  
* “Purpose” selection (why you’re connecting this)  
* Quiet hours + cadence rules  
**B) People → Support Graph**  
* Add person → choose role: Witness / Peer / Safety / Clinician  
* Choose visibility: “can receive requests” / “can see receipts”  
* Set escalation permissions (only if consented)  
**C) Return → Routing Receipt (Why this, why now)**  
* A tiny, replayable object after key interventions:  
    * “Heat high → short move → receipt requested”  
**D) Safety → Escalation Path**  
* Who gets contacted  
* What triggers it  
* What happens next (calm, non-scary)  
## **Where it shows up in everyday flow**  
* Cue appears → move → receipt  
* If resistance rises → system simplifies  
* If transfer opportunity appears (meeting) → prep cue → transfer receipt  
* If risk rises → safety + human  
**One-line truths in UI**  
* **Return is the skill.**  
* **A small receipt changes belief.**  
* **Held in the wild.**  
  
## **CONSOLE (Professionals)**  
## **New screens created by the installs**  
**A) Clinical Studio → Mindblock Studio**  
* Create mindblock  
* Set heat suitability  
* Attach primitive  
* Attach proof request + transfer test  
* Publish (only if contract passes)  
**B) Publish → Contract Compiler gate**  
* “Missing transfer test”  
* “Proof request undefined”  
* “Heat suitability missing” (These are calm, factual system messages.)  
**C) Signal → Escalation Queue (ρ)**  
* “Resistance rising” events  
* “Intervention mismatch” events  
* “No-shift loops”  
* Recommended next action (change delivery / change target / human)  
**D) Context → Connector Streams (consented)**  
* Meetings attended (as context)  
* Community touchpoints  
* Only what’s necessary; no surveillance vibe  
**E) Practice Foundation**  
* Sessions  
* Scheduling  
* Billing  
* Records  
* Mirror Practice  
## **Where it shows up in everyday flow**  
* Session produces plan (journeys)  
* Between sessions, system runs  
* Clinician sees only signal: what held / what slipped / why  
* Escalation queue is where care focuses, not admin  
**One-line truths in Console**  
* **Signal, not noise.**  
* **Your standard holds between sessions.**  
* **Escalation is part of integrity.**  
  
## **COMMAND CENTER (Organisations)**  
## **New screens created by the installs**  
**A) Evidence → Accreditation Mapping**  
* Standards view → mapped evidence types  
* Exportable defensibility pack  
**B) Outcomes → Cohort Return Curves (MTTR)**  
* Return curve trend  
* Segmentation (optional, minimal)  
**C) Transfer → Transfer Verification**  
* “Held in the wild” rates  
* Post-discharge continuity holding  
**D) Governance → Integrity Logs**  
* Consent adherence  
* Cadence governance  
* Delivery reliability  
* Escalation policy adherence  
**E) Capacity → Escalation Load**  
* Volume  
* response times  
* staffing load  
* stabilization curves  
## **Where it shows up in everyday flow**  
* You can answer the questions orgs actually get asked:  
    * Did it happen?  
    * Did it hold?  
    * Did you respond when it didn’t?  
    * Can you defend it?  
**One-line truths in Command Center**  
* **Defensibility, not dashboards.**  
* **Continuity becomes an asset.**  
* **Scale with integrity.**  
  
## **3) ONE-LINE TRUTHS PER “INSTALL”**  
This is the Apple-level naming layer — the line that carries the whole module.  
## **Mindblock Studio**  
**Recovery, compiled into atomic moves.**  
## **Contract Compiler**  
**No move ships without proof and transfer.**  
## **Resistance Engine (ρ)**  
**Resistance isn’t failure. It’s routing data.**  
## **Escalation Router**  
**When the loop doesn’t hold, the system escalates.**  
## **Connector Hub**  
**Real life becomes timing — not surveillance.**  
## **Consent & Permissions**  
**Control is part of safety.**  
## **Support Graph**  
**Humans are part of the infrastructure.**  
## **Evidence Product**  
**Outcomes you can defend.**  
## **Practice Foundation**  
**Your practice, finally on rails.**  
## **Routing Receipt (Explainability object)**  
**Why this. Why now. In one line.**  
  
## **The final meta-map (how it all feels)**  
Marketing reveals the OS. Product runs the OS. Proof seals the OS. Trust protects the OS. Evidence defends the OS.  
And the loop never breaks.  
  
If you want to go one step deeper: say “roll it” and I’ll write the **exact section copy** that introduces each of these installs on the site — *without naming them* — plus the **exact UI microcopy** for their screens so the whole system speaks one language.  
  
roll it  
  
Rolling. Two deliverables in one:  
1. **Exact site section copy** that introduces each install **without naming it** (Apple reveal, no feature dump).  
2. **Exact UI microcopy** for the screens those installs create — so the system speaks one language everywhere.  
  
## **1) MARKETING SITE — SECTION COPY (installs revealed, not listed)**  
## **A) How it works — “Every move has a contract”**  
## **Section header**  
**Every move has a contract.**  
## **Subhead**  
Not paperwork. Not policy. A simple rule: the system only delivers what it can prove.  
## **Body**  
Every intervention routes with intent. Every intervention asks for the right receipt. Every intervention tests transfer into real life.  
So progress isn’t a feeling. It’s evidence.  
## **Micro line**  
**Proof is the engine.**  
  
## **B) How it works — “Resistance is routing data”**  
## **Section header**  
**Resistance is data.**  
## **Subhead**  
When the nervous system pushes back, we don’t push harder.  
## **Body**  
We reduce load. We change dose. We change approach.  
And if the moment needs a person, the system brings a person.  
## **Micro line**  
**Humans when humans matter.**  
  
## **C) How it works — “The system gets simpler under pressure”**  
## **Section header**  
**It gets simpler when life gets harder.**  
## **Subhead**  
Because the moment doesn’t need options. It needs a move.  
## **Body**  
When heat rises, the UI tightens. One action. One step. One return.  
And then proof.  
## **Micro line**  
**Return is the skill.**  
  
## **D) Proof — “Receipt → Transfer → Trajectory”**  
## **Section header**  
**Proof, without punishment.**  
## **Subhead**  
Receipts aren’t surveillance. They’re reinforcement.  
## **Body**  
A receipt is evidence the move happened. Transfer is evidence it held in life. Trajectory is evidence it’s becoming default.  
## **Micro line**  
**When progress is visible, it becomes livable.**  
  
## **E) Technology — “Appropriate at scale”**  
## **Section header**  
**Built for timing.**  
## **Subhead**  
The right thing at the wrong time is still the wrong thing.  
## **Body**  
So the system reads state first. Routes the right dose. Delivers in the right voice. And explains “why this, why now” in one line.  
## **Micro line**  
**Not clever. Appropriate.**  
  
## **F) Trust — “Quiet by default”**  
## **Section header**  
**Quiet by default.**  
## **Subhead**  
Because honesty requires safety.  
## **Body**  
People choose what they share. People choose how the system shows up. And proof exists to reinforce return — not rank humans.  
## **Micro line**  
**Control is safety.**  
  
## **G) For Professionals — “Your standard holds”**  
## **Section header**  
**Your standard holds between sessions.**  
## **Subhead**  
Your model doesn’t get diluted by distance. It gets carried.  
## **Body**  
You don’t rebuild the week from memory. You receive signal: what held, what slipped, where return is getting faster.  
So session-time becomes depth.  
## **Micro line**  
**Signal, not noise.**  
  
## **H) For Organisations — “Defensibility by design”**  
## **Section header**  
**Outcomes you can defend.**  
## **Subhead**  
Not dashboards. Defensibility.  
## **Body**  
Evidence that care occurred. Evidence that it held post-discharge. Evidence that escalation happened when needed.  
So continuity becomes an asset.  
## **Micro line**  
**Scale with integrity.**  
  
## **2) UI MICROCOPY — Screen-by-screen (installs shipped)**  
Everything below is written in the same voice rules: short, calm, factual, verb-forward, no shame.  
  
## **Companion — Connector Hub (Navigate)**  
## **Screen title**  
**Connect real life.**  
## **Subhead**  
Context isn’t surveillance. It’s timing.  
## **Connection card (generic)**  
**Connect** Meetings, community, and rhythms — only with consent.  
CTA: **Connect**  
## **Purpose selector (required)**  
Title: **Why connect this?** Options:  
* **Better timing**  
* **Prep before moments**  
* **Proof of transfer**  
Button: **Continue**  
## **Consent lines (tiny)**  
* *You control what’s shared.*  
* *You can disconnect anytime.*  
## **Quiet hours**  
Title: **Keep it quiet** Toggle: **Quiet hours** Helper: *Support that respects your day.*  
Button: **Save**  
  
## **Companion — People (Support Graph)**  
## **Screen title**  
**Your people.**  
## **Subhead**  
Humans are part of the infrastructure.  
## **Add person flow**  
Title: **Add someone** Field: Name / Contact Button: **Continue**  
## **Role selector**  
Title: **Who are they to you?** Options:  
* **Witness**  
* **Peer**  
* **Safety**  
* **Clinician**  
Button: **Set role**  
## **Visibility selector (this is crucial)**  
Title: **What can they see?** Options:  
* **Nothing** (default)  
* **Only requests**  
* **Receipts you choose**  
Button: **Save**  
## **Escalation permission (only if role = Safety)**  
Title: **When things get heavy** Toggle: **Allow emergency contact** Helper: *Only when you choose — or when safety rules apply.*  
Button: **Done**  
  
## **Companion — Routing Receipt (“Why this, why now” object)**  
## **Card title**  
**Why this. Why now.**  
## **One-line explanations (rotate)**  
* *Heat is high. Short moves land best here.*  
* *You’ve returned this way before. We’re reinforcing it.*  
* *Evening drift is common for you. We’re routing earlier.*  
* *This is a repair moment. We’re sealing proof.*  
Button: **Make the move**  
  
## **Companion — Resistance Moment (soft handling)**  
## **Prompt title**  
**Keep it simple?**  
## **Body**  
One move is enough.  
CTA: **Make a return** Secondary (tertiary style): **Not now**  
If “Not now” tapped: **That’s data.** We’ll reroute when it’s quieter.  
  
## **Companion — Escalation (FRACTURE)**  
## **Screen title**  
**Bring in a human.**  
## **Body**  
This moment deserves care.  
Primary CTA: **Contact support** Secondary CTA: **Ground for 30 seconds**  
Grounding step title: **Feet. Breath. Room.** Body: *Name 3 things you can see.* CTA: **Continue**  
After contact initiated: **Repair started.** *Stay with one small step.*  
CTA: **Back to calm**  
  
## **Console — Mindblock Studio (authoring)**  
## **Studio header**  
**Build the smallest truth.**  
## **Subhead**  
Atomic moves. Transfer-ready. Governed.  
## **Fields (labels)**  
* **Mindblock line** (one sentence)  
* **Family**  
* **Heat suitability** (Calm / Heat / Both)  
* **Primitive** (the move)  
* **Proof request** (receipt type)  
* **Transfer test** (held in life)  
Button: **Compile**  
## **Compiler responses (calm, factual)**  
* **Missing proof request.** *Choose the receipt this move creates.*  
* **Missing transfer test.** *How will we know it held in life?*  
* **Heat suitability not set.** *When should this land?*  
Success message: **Compiled.** Ready for delivery.  
Button: **Publish**  
  
## **Console — Escalation Queue (ρ)**  
## **Screen title**  
**Escalations.**  
## **Subhead**  
Resistance is routing data.  
## **Queue item template**  
Title: **Return not holding** Meta: *Heat high · repeated hesitation · no-shift pattern* Suggested action: **Change dose** / **Change target** / **Bring in human**  
Button: **Open**  
## **Escalation detail**  
Header: **What happened**  
* *Cue delivered*  
* *Move not completed*  
* *Heat sustained*  
Header: **What we’re routing next**  
* *Shorter move* / *Different target* / *Human contact*  
Button: **Apply route**  
  
## **Console — Practice Foundation (ops surface)**  
## **Nav label**  
**Practice**  
## **Module tiles**  
* **Sessions**  
* **Schedule**  
* **Billing**  
* **Records**  
* **Mirror** *(your baseline matters too)*  
Micro line under tiles: *Your practice, on rails.*  
  
## **Command Center — Evidence**  
## **Screen title**  
**Evidence.**  
## **Subhead**  
Outcomes you can defend.  
## **Evidence modules**  
* **Accreditation mapping** *Evidence tied to standards.*  
* **Transfer verification** *Held post-discharge.*  
* **Return curves (MTTR)** *Time-to-recovery trending.*  
* **Integrity logs** *Governance you can audit.*  
Buttons:  
* **View**  
* **Export** *(if needed)*  
Export confirmation: **Ready.** Board-ready. Payer-ready.  
  
## **Command Center — Integrity Logs**  
## **Screen title**  
**Designed to hold up.**  
## **Modules (with one-line status)**  
* Consent adherence — *stable*  
* Cadence governance — *within rules*  
* Delivery reliability — *consistent*  
* Escalation adherence — *on protocol*  
No charts. Just certainty.  
  
## **3) The “Apple reveal” pattern (use everywhere)**  
Whenever we introduce a module, we do:  
**Truth line** **Human truth** **Single move**  
Example: **Resistance is data.** When the system meets pushback, it reroutes. **See how escalation works →**  
