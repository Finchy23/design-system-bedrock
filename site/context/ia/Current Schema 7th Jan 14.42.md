\-- WARNING: This schema is for context only and is not meant to be run.

\-- Table order and constraints may not be valid for execution.

CREATE TABLE public.Mindblock\_Families\_v0.3 (

  family\_id text,

  schema\_code text,

  schema\_name text,

  family\_index bigint,

  family\_code text,

  family\_name text,

  archetype text,

  routing\_default text

);

CREATE TABLE public.Mindblock\_Family\_Membership\_v0.3 (

  family\_id text,

  family\_code text,

  family\_name text,

  mindblock\_id text,

  mindblock\_code text

);

CREATE TABLE public.Mindblocks\_v0.3 (

  mindblock\_id text,

  mindblock\_code text,

  mindblock\_name text,

  schema\_code text,

  schema\_name text,

  family\_code text,

  family\_name text,

  archetype text,

  limiting\_prediction text,

  replacement\_truth text,

  best\_primitive text,

  best\_voice\_stances text,

  heat\_band text,

  kbe\_target text,

  proof\_artifacts text,

  transfer\_test text

);

CREATE TABLE public.Schemas\_v0.3 (

  schema\_code text,

  schema\_name text,

  schema\_desc text

);

CREATE TABLE public.\_journeys\_mb\_family\_stage (

  template\_id text NOT NULL,

  scene\_number integer NOT NULL,

  mindblock\_id uuid NOT NULL,

  family\_id uuid NOT NULL

);

CREATE TABLE public.\_journeys\_mb\_stage (

  template\_id text NOT NULL,

  scene\_number integer NOT NULL,

  mb\_key text NOT NULL,

  mindblock\_id uuid

);

CREATE TABLE public.\_journeys\_schema\_stage (

  template\_id text NOT NULL,

  scene\_number integer NOT NULL,

  schema\_key text NOT NULL,

  schema\_id text

);

CREATE TABLE public.\_stg\_navicues\_seed (

  navicue\_id text NOT NULL,

  name text,

  title text,

  family text,

  pillar\_id text,

  kbe\_layer text,

  track text,

  text\_line text NOT NULL,

  response\_type text NOT NULL,

  response\_options jsonb,

  voice\_archetype text,

  delivery\_mechanism text,

  intent\_primary text,

  intent\_secondary text,

  schemas ARRAY,

  mindblock\_codes ARRAY,

  tags ARRAY,

  batch\_id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  source\_file text,

  loaded\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT \_stg\_navicues\_seed\_pkey PRIMARY KEY (navicue\_id, batch\_id)

);

CREATE TABLE public.access\_audit\_log (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  actor\_id uuid,

  actor\_role text,

  individual\_id uuid,

  purpose text NOT NULL CHECK (purpose \= ANY (ARRAY\['care'::text, 'personalization'::text, 'safety'::text, 'research'::text, 'billing'::text, 'support'::text\])),

  object\_type text NOT NULL,

  object\_id text NOT NULL,

  fields\_accessed ARRAY DEFAULT '{}'::text\[\],

  access\_mode text NOT NULL CHECK (access\_mode \= ANY (ARRAY\['read'::text, 'write'::text, 'delete'::text, 'export'::text\])),

  allowed boolean NOT NULL DEFAULT true,

  decision jsonb DEFAULT '{}'::jsonb,

  occurred\_at timestamp with time zone DEFAULT now(),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT access\_audit\_log\_pkey PRIMARY KEY (id),

  CONSTRAINT access\_audit\_log\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.activities (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  actor\_id uuid NOT NULL,

  subject\_type text NOT NULL,

  subject\_id text NOT NULL,

  verb text NOT NULL,

  metadata jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT activities\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.activity\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  event\_type text NOT NULL,

  status USER-DEFINED DEFAULT 'scheduled'::event\_status,

  occurred\_at timestamp with time zone DEFAULT now(),

  metadata jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT activity\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT activity\_events\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT activity\_events\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.adverse\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  occurred\_at timestamp with time zone NOT NULL DEFAULT now(),

  kind USER-DEFINED NOT NULL,

  severity smallint DEFAULT 3 CHECK (severity \>= 1 AND severity \<= 5),

  content\_kind text DEFAULT 'block'::text CHECK (content\_kind \= ANY (ARRAY\['block'::text, 'sequence'::text, 'navicue'::text, 'article'::text, 'lesson'::text, 'practice'::text, 'other'::text\])),

  content\_id text,

  deployment\_kind text,

  deployment\_id text,

  notes\_md text,

  meta jsonb DEFAULT '{}'::jsonb,

  individual\_id uuid,

  CONSTRAINT adverse\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT adverse\_events\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.alerts (

  id bigint NOT NULL DEFAULT nextval('alerts\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  severity text,

  routed\_to jsonb,

  ts timestamp with time zone DEFAULT now(),

  individual\_id uuid,

  CONSTRAINT alerts\_pkey PRIMARY KEY (id),

  CONSTRAINT alerts\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.anchor\_points (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  label text NOT NULL,

  description text,

  weight numeric,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT anchor\_points\_pkey PRIMARY KEY (id),

  CONSTRAINT anchor\_points\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT anchor\_points\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.app\_admins (

  user\_id uuid NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  note text,

  CONSTRAINT app\_admins\_pkey PRIMARY KEY (user\_id),

  CONSTRAINT app\_admins\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES auth.users(id)

);

CREATE TABLE public.app\_config (

  key text NOT NULL,

  value text NOT NULL,

  CONSTRAINT app\_config\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.app\_storage (

  key text NOT NULL,

  value jsonb NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT app\_storage\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.arousal\_episodes (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  opened\_at timestamp with time zone NOT NULL,

  closed\_at timestamp with time zone,

  peak\_at timestamp with time zone,

  spike\_index numeric CHECK (spike\_index IS NULL OR spike\_index \>= 0::numeric AND spike\_index \<= 1::numeric),

  mttr\_seconds integer,

  open\_trigger jsonb DEFAULT '{}'::jsonb,

  closure\_rule jsonb DEFAULT '{}'::jsonb,

  confidence numeric DEFAULT 0.7 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  trace\_id uuid,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT arousal\_episodes\_pkey PRIMARY KEY (id),

  CONSTRAINT arousal\_episodes\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.article\_blocks (

  article\_id bigint NOT NULL,

  block\_id text NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT article\_blocks\_pkey PRIMARY KEY (article\_id, block\_id),

  CONSTRAINT article\_blocks\_article\_id\_fkey FOREIGN KEY (article\_id) REFERENCES public.articles(id),

  CONSTRAINT article\_blocks\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id)

);

CREATE TABLE public.article\_mindblocks (

  article\_id bigint NOT NULL,

  mindblock\_id uuid NOT NULL,

  relevance\_strength numeric,

  CONSTRAINT article\_mindblocks\_pkey PRIMARY KEY (article\_id, mindblock\_id),

  CONSTRAINT article\_mindblocks\_article\_id\_fkey FOREIGN KEY (article\_id) REFERENCES public.articles(id),

  CONSTRAINT article\_mindblocks\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.articles (

  id bigint NOT NULL DEFAULT nextval('articles\_id\_seq'::regclass),

  slug text UNIQUE,

  title text NOT NULL,

  summary\_md text,

  body\_md text,

  level USER-DEFINED DEFAULT 'patient'::content\_level,

  status USER-DEFINED NOT NULL DEFAULT 'draft'::content\_status,

  est\_read\_min integer,

  pillar\_id text,

  concept\_id text,

  theme\_id text,

  block\_id text,

  tags ARRAY DEFAULT '{}'::text\[\],

  navicue\_types ARRAY DEFAULT '{}'::text\[\],

  hero\_media\_id bigint,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  status\_text text,

  subtitle text,

  pillar\_name text,

  concept\_name text,

  theme\_name text,

  thought\_leader text,

  read\_time\_minutes integer,

  hero\_image text,

  difficulty text,

  summary text,

  sections jsonb,

  related\_content jsonb,

  blocks ARRAY,

  keywords jsonb,

  external\_id text UNIQUE,

  CONSTRAINT articles\_pkey PRIMARY KEY (id),

  CONSTRAINT articles\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT articles\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT articles\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id),

  CONSTRAINT articles\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id),

  CONSTRAINT articles\_hero\_media\_id\_fkey FOREIGN KEY (hero\_media\_id) REFERENCES public.media\_assets(id)

);

CREATE TABLE public.authors (

  id bigint NOT NULL DEFAULT nextval('authors\_id\_seq'::regclass),

  given\_name text,

  family\_name text,

  affiliation text,

  CONSTRAINT authors\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.bandit\_candidates (

  decision\_id uuid NOT NULL,

  rank integer NOT NULL,

  content\_type text NOT NULL,

  content\_id text NOT NULL,

  propensity numeric NOT NULL CHECK (propensity \> 0::numeric AND propensity \<= 1::numeric),

  score numeric,

  features jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT bandit\_candidates\_pkey PRIMARY KEY (decision\_id, rank),

  CONSTRAINT bandit\_candidates\_decision\_id\_fkey FOREIGN KEY (decision\_id) REFERENCES public.bandit\_decisions(id)

);

CREATE TABLE public.bandit\_decisions (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  made\_at timestamp with time zone NOT NULL DEFAULT now(),

  policy\_id text NOT NULL,

  context jsonb NOT NULL DEFAULT '{}'::jsonb,

  chosen\_type text NOT NULL,

  chosen\_id text NOT NULL,

  chosen\_propensity numeric NOT NULL CHECK (chosen\_propensity \> 0::numeric AND chosen\_propensity \<= 1::numeric),

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT bandit\_decisions\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.bandit\_rewards (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  decision\_id uuid NOT NULL,

  exposure\_id uuid,

  user\_id uuid NOT NULL,

  reward\_key text NOT NULL,

  reward\_value numeric NOT NULL,

  window\_hours integer NOT NULL DEFAULT 24,

  computed\_at timestamp with time zone NOT NULL DEFAULT now(),

  components jsonb NOT NULL DEFAULT '{}'::jsonb,

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT bandit\_rewards\_pkey PRIMARY KEY (id),

  CONSTRAINT bandit\_rewards\_decision\_id\_fkey FOREIGN KEY (decision\_id) REFERENCES public.bandit\_decisions(id)

);

CREATE TABLE public.belief\_ladders (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  schema\_id text NOT NULL,

  title text NOT NULL,

  description\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT belief\_ladders\_pkey PRIMARY KEY (id),

  CONSTRAINT belief\_ladders\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.block\_assignments (

  user\_id uuid NOT NULL,

  block\_id text NOT NULL,

  week\_start date NOT NULL,

  phase text NOT NULL,

  status text NOT NULL DEFAULT 'pending'::text,

  started\_at timestamp with time zone,

  completed\_at timestamp with time zone,

  organization\_id uuid,

  CONSTRAINT block\_assignments\_pkey PRIMARY KEY (user\_id, block\_id, week\_start, phase),

  CONSTRAINT block\_assignments\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id),

  CONSTRAINT block\_assignments\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id),

  CONSTRAINT block\_assignments\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.block\_assignments\_audit (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  operation text NOT NULL,

  old\_data jsonb,

  changed\_by uuid,

  changed\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT block\_assignments\_audit\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.block\_deployments (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  block\_id text NOT NULL,

  delivered\_at timestamp with time zone NOT NULL DEFAULT now(),

  completed\_at timestamp with time zone,

  status text NOT NULL DEFAULT 'started'::text CHECK (status \= ANY (ARRAY\['started'::text, 'completed'::text, 'skipped'::text, 'abandoned'::text\])),

  source\_type text,

  source\_id text,

  sequence\_id text,

  context jsonb DEFAULT '{}'::jsonb,

  context\_tags ARRAY DEFAULT '{}'::text\[\],

  voice\_id text,

  pre\_state\_checkin\_ts timestamp with time zone,

  post\_state\_checkin\_ts timestamp with time zone,

  transfer\_receipt\_id bigint,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  exposure\_id uuid,

  queue\_id uuid,

  rationale jsonb DEFAULT '{}'::jsonb CHECK (rationale IS NULL OR jsonb\_typeof(rationale) \= 'object'::text),

  experiment\_key text,

  experiment\_id uuid,

  variant\_key text,

  variant\_id uuid,

  decision\_source USER-DEFINED DEFAULT 'policy\_ai'::decision\_source\_enum,

  individual\_id uuid,

  CONSTRAINT block\_deployments\_pkey PRIMARY KEY (id),

  CONSTRAINT block\_deployments\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id),

  CONSTRAINT block\_deployments\_sequence\_id\_fkey FOREIGN KEY (sequence\_id) REFERENCES public.cue\_sequences(id),

  CONSTRAINT block\_deployments\_voice\_id\_fkey FOREIGN KEY (voice\_id) REFERENCES public.voice\_archetypes(id),

  CONSTRAINT block\_deployments\_transfer\_receipt\_id\_fkey FOREIGN KEY (transfer\_receipt\_id) REFERENCES public.receipts(id),

  CONSTRAINT block\_deployments\_exposure\_fk FOREIGN KEY (exposure\_id) REFERENCES public.feed\_exposures(id),

  CONSTRAINT block\_deployments\_queue\_fk FOREIGN KEY (queue\_id) REFERENCES public.user\_feed\_queue\_v2(id),

  CONSTRAINT block\_deployments\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.block\_followups (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  block\_id text NOT NULL,

  followup USER-DEFINED NOT NULL,

  scheduled\_at timestamp with time zone NOT NULL DEFAULT now(),

  completed\_at timestamp with time zone,

  state\_checkin\_ts timestamp with time zone,

  durability\_score numeric CHECK (durability\_score IS NULL OR durability\_score \>= 0::numeric AND durability\_score \<= 1::numeric),

  deltas jsonb DEFAULT '{}'::jsonb,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT block\_followups\_pkey PRIMARY KEY (id),

  CONSTRAINT block\_followups\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id),

  CONSTRAINT block\_followups\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id)

);

CREATE TABLE public.block\_mechanism\_markers (

  block\_id text NOT NULL,

  mechanism text NOT NULL,

  predicted\_markers jsonb DEFAULT '{}'::jsonb,

  expected\_signature jsonb DEFAULT '{}'::jsonb,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT block\_mechanism\_markers\_pkey PRIMARY KEY (block\_id, mechanism),

  CONSTRAINT block\_mechanism\_markers\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id)

);

CREATE TABLE public.blocks (

  id text NOT NULL,

  theme\_id text,

  name text NOT NULL,

  status USER-DEFINED NOT NULL DEFAULT 'draft'::block\_status,

  version text NOT NULL DEFAULT '1.0.0'::text,

  state\_targets jsonb,

  day\_type ARRAY,

  context\_tags ARRAY,

  skill\_tags ARRAY,

  safety\_flags ARRAY,

  contraindications text,

  era jsonb NOT NULL,

  measures jsonb NOT NULL,

  navicue\_hits ARRAY,

  rescue\_links ARRAY,

  explore\_weight double precision DEFAULT 0.5,

  created\_at timestamp with time zone DEFAULT now(),

  era\_script jsonb DEFAULT '{}'::jsonb CHECK (era\_script IS NULL OR jsonb\_typeof(era\_script) \= 'object'::text AND era\_script ? 'context'::text AND era\_script ? 'experience'::text AND era\_script ? 'recognize'::text AND era\_script ? 'align'::text AND era\_script ? 'reflection'::text),

  status\_text text,

  CONSTRAINT blocks\_pkey PRIMARY KEY (id),

  CONSTRAINT blocks\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id)

);

CREATE TABLE public.calc\_assoc\_v01 (

  user\_id uuid NOT NULL,

  assoc\_type text NOT NULL,

  left\_key text NOT NULL,

  right\_key text NOT NULL,

  strength numeric NOT NULL,

  confidence numeric NOT NULL,

  evidence\_count integer NOT NULL DEFAULT 0,

  evidence\_status text NOT NULL DEFAULT 'emerging'::text,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  trace\_id uuid,

  CONSTRAINT calc\_assoc\_v01\_pkey PRIMARY KEY (user\_id, assoc\_type, left\_key, right\_key)

);

CREATE TABLE public.calc\_hot\_context\_scores\_v01 (

  user\_id uuid NOT NULL,

  context\_key text NOT NULL,

  score numeric NOT NULL,

  confidence numeric NOT NULL,

  evidence\_count integer NOT NULL DEFAULT 0,

  evidence\_status text NOT NULL DEFAULT 'emerging'::text,

  last\_seen\_at timestamp with time zone,

  computed\_at timestamp with time zone NOT NULL DEFAULT now(),

  trace\_id uuid,

  CONSTRAINT calc\_hot\_context\_scores\_v01\_pkey PRIMARY KEY (user\_id, context\_key)

);

CREATE TABLE public.calc\_proof\_scores\_by\_scope\_v01 (

  user\_id uuid NOT NULL,

  scope\_type text NOT NULL,

  scope\_key text NOT NULL,

  score numeric NOT NULL,

  confidence numeric NOT NULL,

  evidence\_count integer NOT NULL DEFAULT 0,

  evidence\_status text NOT NULL DEFAULT 'emerging'::text,

  computed\_at timestamp with time zone NOT NULL DEFAULT now(),

  trace\_id uuid,

  CONSTRAINT calc\_proof\_scores\_by\_scope\_v01\_pkey PRIMARY KEY (user\_id, scope\_type, scope\_key, computed\_at)

);

CREATE TABLE public.calc\_proof\_scores\_v01 (

  user\_id uuid NOT NULL,

  stability\_score numeric NOT NULL,

  growth\_score numeric NOT NULL,

  reliability\_score numeric NOT NULL,

  computed\_at timestamp with time zone NOT NULL DEFAULT now(),

  trace\_id uuid,

  CONSTRAINT calc\_proof\_scores\_v01\_pkey PRIMARY KEY (user\_id, computed\_at)

);

CREATE TABLE public.calc\_risk\_windows\_v01 (

  user\_id uuid NOT NULL,

  risk\_score numeric NOT NULL,

  risk\_band text NOT NULL,

  window\_start timestamp with time zone NOT NULL,

  window\_end timestamp with time zone NOT NULL,

  confidence numeric NOT NULL,

  computed\_at timestamp with time zone NOT NULL DEFAULT now(),

  trace\_id uuid,

  CONSTRAINT calc\_risk\_windows\_v01\_pkey PRIMARY KEY (user\_id)

);

CREATE TABLE public.candidate\_embeddings (

  candidate\_type text NOT NULL,

  candidate\_id text NOT NULL,

  embedding USER-DEFINED,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT candidate\_embeddings\_pkey PRIMARY KEY (candidate\_type, candidate\_id)

);

CREATE TABLE public.candidate\_scores (

  decision\_id uuid NOT NULL,

  rank integer NOT NULL CHECK (rank \>= 1),

  content\_type text NOT NULL,

  content\_id text NOT NULL,

  hard\_filter\_pass boolean NOT NULL DEFAULT true,

  score\_total numeric,

  score\_breakdown jsonb NOT NULL DEFAULT '{}'::jsonb,

  bucket text,

  eliminated\_by text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT candidate\_scores\_pkey PRIMARY KEY (decision\_id, rank),

  CONSTRAINT candidate\_scores\_decision\_id\_fkey FOREIGN KEY (decision\_id) REFERENCES public.bandit\_decisions(id)

);

CREATE TABLE public.candidate\_variants (

  candidate\_type text NOT NULL,

  candidate\_id text NOT NULL,

  variant\_key text NOT NULL,

  is\_active boolean NOT NULL DEFAULT true,

  meta\_patch jsonb,

  payload\_patch jsonb,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT candidate\_variants\_pkey PRIMARY KEY (candidate\_type, candidate\_id, variant\_key)

);

CREATE TABLE public.case\_formulations (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  version integer NOT NULL DEFAULT 1,

  status text NOT NULL DEFAULT 'active'::text CHECK (status \= ANY (ARRAY\['draft'::text, 'active'::text, 'archived'::text\])),

  summary\_md text,

  maintaining\_loops jsonb NOT NULL DEFAULT '{}'::jsonb,

  protective\_strategies ARRAY NOT NULL DEFAULT '{}'::text\[\],

  strengths ARRAY NOT NULL DEFAULT '{}'::text\[\],

  values ARRAY NOT NULL DEFAULT '{}'::text\[\],

  goals jsonb NOT NULL DEFAULT '\[\]'::jsonb,

  active\_schema\_ids ARRAY NOT NULL DEFAULT '{}'::text\[\],

  active\_mindblock\_ids ARRAY NOT NULL DEFAULT '{}'::uuid\[\],

  hot\_contexts ARRAY NOT NULL DEFAULT '{}'::text\[\],

  risk\_flags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT case\_formulations\_pkey PRIMARY KEY (id),

  CONSTRAINT case\_formulations\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT case\_formulations\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.case\_formulations\_history (

  hist\_id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  id uuid NOT NULL,

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  version integer NOT NULL,

  status text NOT NULL,

  snapshot jsonb NOT NULL,

  changed\_by uuid DEFAULT auth.uid(),

  changed\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT case\_formulations\_history\_pkey PRIMARY KEY (hist\_id)

);

CREATE TABLE public.change\_log (

  id bigint NOT NULL DEFAULT nextval('change\_log\_id\_seq'::regclass),

  entity\_type text NOT NULL,

  entity\_id text NOT NULL,

  version text,

  change\_summary text,

  changed\_by uuid,

  changed\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT change\_log\_pkey PRIMARY KEY (id),

  CONSTRAINT change\_log\_changed\_by\_fkey FOREIGN KEY (changed\_by) REFERENCES public.profiles(id)

);

CREATE TABLE public.circle\_members (

  circle\_id uuid NOT NULL,

  profile\_id uuid NOT NULL,

  role text NOT NULL CHECK (role \= ANY (ARRAY\['owner'::text, 'member'::text, 'witness'::text, 'support'::text, 'clinician'::text, 'moderator'::text\])),

  consent\_state text NOT NULL DEFAULT 'invited'::text CHECK (consent\_state \= ANY (ARRAY\['invited'::text, 'accepted'::text, 'declined'::text, 'revoked'::text\])),

  joined\_at timestamp with time zone,

  revoked\_at timestamp with time zone,

  meta jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT circle\_members\_pkey PRIMARY KEY (circle\_id, profile\_id),

  CONSTRAINT circle\_members\_circle\_id\_fkey FOREIGN KEY (circle\_id) REFERENCES public.circles(id),

  CONSTRAINT circle\_members\_profile\_id\_fkey FOREIGN KEY (profile\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.circles (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  organization\_id uuid,

  circle\_type text NOT NULL CHECK (circle\_type \= ANY (ARRAY\['inner'::text, 'care'::text, 'peer'::text, 'program'::text\])),

  name text NOT NULL,

  purpose\_md text,

  privacy text NOT NULL DEFAULT 'private'::text CHECK (privacy \= ANY (ARRAY\['private'::text, 'invite\_only'::text\])),

  data\_tier text DEFAULT 'tier1'::text CHECK (data\_tier \= ANY (ARRAY\['tier0'::text, 'tier1'::text, 'tier2'::text, 'tier3'::text, 'tier4'::text\])),

  is\_active boolean DEFAULT true,

  created\_by uuid,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT circles\_pkey PRIMARY KEY (id),

  CONSTRAINT circles\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT circles\_created\_by\_fkey FOREIGN KEY (created\_by) REFERENCES public.profiles(id)

);

CREATE TABLE public.citations (

  id bigint NOT NULL DEFAULT nextval('citations\_id\_seq'::regclass),

  target\_type USER-DEFINED NOT NULL,

  target\_id text NOT NULL,

  relation USER-DEFINED NOT NULL,

  source\_id bigint NOT NULL,

  quote\_md text,

  page text,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT citations\_pkey PRIMARY KEY (id),

  CONSTRAINT citations\_source\_id\_fkey FOREIGN KEY (source\_id) REFERENCES public.sources(id)

);

CREATE TABLE public.claim\_evidence\_links (

  claim\_id uuid NOT NULL,

  evidence\_key text NOT NULL,

  relation text NOT NULL CHECK (relation \= ANY (ARRAY\['supports'::text, 'contradicts'::text, 'qualifies'::text, 'background'::text\])),

  strength numeric DEFAULT 1.0 CHECK (strength \>= 0::numeric AND strength \<= 2::numeric),

  applicability text DEFAULT 'general'::text CHECK (applicability \= ANY (ARRAY\['general'::text, 'addiction'::text, 'trauma'::text, 'depression'::text, 'anxiety'::text, 'psychosis'::text, 'youth'::text, 'adult'::text, 'older\_adult'::text\])),

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT claim\_evidence\_links\_pkey PRIMARY KEY (claim\_id, evidence\_key, relation),

  CONSTRAINT claim\_evidence\_links\_claim\_id\_fkey FOREIGN KEY (claim\_id) REFERENCES public.claims(id),

  CONSTRAINT claim\_evidence\_links\_evidence\_key\_fkey FOREIGN KEY (evidence\_key) REFERENCES public.evidence\_registry(key)

);

CREATE TABLE public.claim\_reviews (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  claim\_id uuid NOT NULL,

  reviewer\_id uuid,

  reviewer\_role text DEFAULT 'expert'::text CHECK (reviewer\_role \= ANY (ARRAY\['expert'::text, 'clinician'::text, 'researcher'::text, 'editor'::text\])),

  verdict text NOT NULL CHECK (verdict \= ANY (ARRAY\['approve'::text, 'request\_changes'::text, 'contest'::text\])),

  confidence numeric CHECK (confidence IS NULL OR confidence \>= 0::numeric AND confidence \<= 1::numeric),

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT claim\_reviews\_pkey PRIMARY KEY (id),

  CONSTRAINT claim\_reviews\_claim\_id\_fkey FOREIGN KEY (claim\_id) REFERENCES public.claims(id),

  CONSTRAINT claim\_reviews\_reviewer\_id\_fkey FOREIGN KEY (reviewer\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.claims (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  slug text UNIQUE,

  statement text NOT NULL,

  scope text DEFAULT 'general'::text CHECK (scope \= ANY (ARRAY\['general'::text, 'population'::text, 'clinical'::text, 'mechanistic'::text\])),

  discipline\_id text,

  pillar\_id text,

  concept\_id text,

  lens\_id text,

  schema\_id text,

  claim\_type text NOT NULL CHECK (claim\_type \= ANY (ARRAY\['mechanism'::text, 'phenomenology'::text, 'intervention'::text, 'risk'::text, 'measurement'::text, 'developmental'::text, 'social'::text\])),

  status text DEFAULT 'draft'::text CHECK (status \= ANY (ARRAY\['draft'::text, 'evidence\_pending'::text, 'reviewed'::text, 'published'::text, 'contested'::text, 'retired'::text\])),

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT claims\_pkey PRIMARY KEY (id),

  CONSTRAINT claims\_discipline\_id\_fkey FOREIGN KEY (discipline\_id) REFERENCES public.disciplines(id),

  CONSTRAINT claims\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT claims\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT claims\_lens\_id\_fkey FOREIGN KEY (lens\_id) REFERENCES public.lens\_catalog(id),

  CONSTRAINT claims\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.classify\_rules\_concepts (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  pattern text NOT NULL,

  concept text NOT NULL,

  weight integer NOT NULL DEFAULT 1,

  active boolean NOT NULL DEFAULT true,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT classify\_rules\_concepts\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.classify\_rules\_guardrails (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  pattern text NOT NULL,

  caution text NOT NULL,

  active boolean NOT NULL DEFAULT true,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT classify\_rules\_guardrails\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.classify\_rules\_moods (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  pattern text NOT NULL,

  mood text NOT NULL,

  weight integer NOT NULL DEFAULT 1,

  active boolean NOT NULL DEFAULT true,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT classify\_rules\_moods\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.client\_assignments (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  professional\_id uuid NOT NULL,

  client\_id uuid NOT NULL,

  relationship text NOT NULL DEFAULT 'therapist-client'::text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT client\_assignments\_pkey PRIMARY KEY (id),

  CONSTRAINT client\_assignments\_professional\_id\_fkey FOREIGN KEY (professional\_id) REFERENCES public.profiles(id),

  CONSTRAINT client\_assignments\_client\_id\_fkey FOREIGN KEY (client\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.comb\_tags (

  tag\_key text NOT NULL CHECK (tag\_key \= ANY (ARRAY\['C'::text, 'O'::text, 'M'::text\])),

  label text NOT NULL,

  description\_md text,

  CONSTRAINT comb\_tags\_pkey PRIMARY KEY (tag\_key)

);

CREATE TABLE public.comms\_channels (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  name text NOT NULL,

  channel\_type text NOT NULL,

  config jsonb,

  created\_by uuid,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT comms\_channels\_pkey PRIMARY KEY (id),

  CONSTRAINT comms\_channels\_created\_by\_fkey FOREIGN KEY (created\_by) REFERENCES auth.users(id)

);

CREATE TABLE public.comms\_messages (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  template\_id uuid,

  channel\_id uuid,

  recipient text NOT NULL,

  payload jsonb,

  status text NOT NULL DEFAULT 'queued'::text,

  error text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  created\_by uuid,

  CONSTRAINT comms\_messages\_pkey PRIMARY KEY (id),

  CONSTRAINT comms\_messages\_template\_id\_fkey FOREIGN KEY (template\_id) REFERENCES public.comms\_templates(id),

  CONSTRAINT comms\_messages\_channel\_id\_fkey FOREIGN KEY (channel\_id) REFERENCES public.comms\_channels(id)

);

CREATE TABLE public.comms\_templates (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  key text NOT NULL,

  version integer NOT NULL DEFAULT 1,

  format text NOT NULL DEFAULT 'markdown'::text,

  subject text,

  body text NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT comms\_templates\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.component\_type\_catalog (

  component\_type text NOT NULL,

  label text NOT NULL,

  defaults jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT component\_type\_catalog\_pkey PRIMARY KEY (component\_type)

);

CREATE TABLE public.concept\_citations (

  concept\_id text NOT NULL,

  citation\_id bigint NOT NULL,

  relation text DEFAULT 'theory'::text,

  CONSTRAINT concept\_citations\_pkey PRIMARY KEY (concept\_id, citation\_id),

  CONSTRAINT concept\_citations\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT concept\_citations\_citation\_id\_fkey FOREIGN KEY (citation\_id) REFERENCES public.citations(id)

);

CREATE TABLE public.concept\_disciplines (

  concept\_id text NOT NULL,

  discipline\_id text NOT NULL,

  CONSTRAINT concept\_disciplines\_pkey PRIMARY KEY (concept\_id, discipline\_id),

  CONSTRAINT concept\_disciplines\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT concept\_disciplines\_discipline\_id\_fkey FOREIGN KEY (discipline\_id) REFERENCES public.disciplines(id)

);

CREATE TABLE public.concept\_tags (

  concept\_id text NOT NULL,

  tag\_id uuid NOT NULL,

  CONSTRAINT concept\_tags\_pkey PRIMARY KEY (concept\_id, tag\_id),

  CONSTRAINT concept\_tags\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT concept\_tags\_tag\_id\_fkey FOREIGN KEY (tag\_id) REFERENCES public.tags(id)

);

CREATE TABLE public.concepts (

  id text NOT NULL,

  pillar\_id text,

  name text NOT NULL,

  mechanisms jsonb DEFAULT '\[\]'::jsonb,

  description text,

  mechanism text,

  sort\_order integer,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT concepts\_pkey PRIMARY KEY (id),

  CONSTRAINT concepts\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id)

);

CREATE TABLE public.connection\_contracts (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  circle\_id uuid,

  from\_id uuid NOT NULL,

  to\_id uuid NOT NULL,

  contract\_type text NOT NULL CHECK (contract\_type \= ANY (ARRAY\['witness'::text, 'accountability'::text, 'support'::text, 'checkin'::text\])),

  frequency text DEFAULT 'weekly'::text CHECK (frequency \= ANY (ARRAY\['daily'::text, 'weekly'::text, 'as\_needed'::text\])),

  channels ARRAY DEFAULT '{in\_app}'::text\[\],

  boundaries jsonb NOT NULL DEFAULT '{}'::jsonb,

  sla\_minutes integer CHECK (sla\_minutes IS NULL OR sla\_minutes \>= 1 AND sla\_minutes \<= 10080),

  is\_active boolean DEFAULT true,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT connection\_contracts\_pkey PRIMARY KEY (id),

  CONSTRAINT connection\_contracts\_circle\_id\_fkey FOREIGN KEY (circle\_id) REFERENCES public.circles(id),

  CONSTRAINT connection\_contracts\_from\_id\_fkey FOREIGN KEY (from\_id) REFERENCES public.profiles(id),

  CONSTRAINT connection\_contracts\_to\_id\_fkey FOREIGN KEY (to\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.consent\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  consent\_grant\_id uuid NOT NULL,

  event\_type text NOT NULL CHECK (event\_type \= ANY (ARRAY\['granted'::text, 'modified'::text, 'revoked'::text, 'expired'::text\])),

  occurred\_at timestamp with time zone NOT NULL DEFAULT now(),

  actor\_id uuid,

  details jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT consent\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT consent\_events\_consent\_grant\_id\_fkey FOREIGN KEY (consent\_grant\_id) REFERENCES public.consent\_grants(id)

);

CREATE TABLE public.consent\_grants (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  grantor\_user\_id uuid NOT NULL,

  grantee\_profile\_id uuid,

  grantee\_circle\_id uuid,

  scope\_id text NOT NULL,

  purposes ARRAY NOT NULL DEFAULT '{}'::text\[\],

  tier text,

  starts\_at timestamp with time zone NOT NULL DEFAULT now(),

  ends\_at timestamp with time zone,

  revoked\_at timestamp with time zone,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  meta jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT consent\_grants\_pkey PRIMARY KEY (id),

  CONSTRAINT consent\_grants\_grantor\_user\_id\_fkey FOREIGN KEY (grantor\_user\_id) REFERENCES public.profiles(id),

  CONSTRAINT consent\_grants\_grantee\_profile\_id\_fkey FOREIGN KEY (grantee\_profile\_id) REFERENCES public.profiles(id),

  CONSTRAINT consent\_grants\_grantee\_circle\_id\_fkey FOREIGN KEY (grantee\_circle\_id) REFERENCES public.circles(id),

  CONSTRAINT consent\_grants\_scope\_id\_fkey FOREIGN KEY (scope\_id) REFERENCES public.consent\_scopes(scope\_id)

);

CREATE TABLE public.consent\_ledger (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  consent\_type text NOT NULL CHECK (consent\_type \= ANY (ARRAY\['data\_storage'::text, 'research'::text, 'wearables'::text, 'calendar'::text, 'location'::text, 'care\_team\_share'::text, 'org\_reporting'::text, 'ai\_processing'::text\])),

  scope jsonb NOT NULL DEFAULT '{}'::jsonb,

  tier text NOT NULL DEFAULT 'tier1'::text CHECK (tier \= ANY (ARRAY\['tier0'::text, 'tier1'::text, 'tier2'::text, 'tier3'::text, 'tier4'::text\])),

  status text NOT NULL DEFAULT 'granted'::text CHECK (status \= ANY (ARRAY\['granted'::text, 'revoked'::text, 'expired'::text\])),

  granted\_at timestamp with time zone DEFAULT now(),

  expires\_at timestamp with time zone,

  revoked\_at timestamp with time zone,

  method text DEFAULT 'in\_app'::text,

  meta jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT consent\_ledger\_pkey PRIMARY KEY (id),

  CONSTRAINT consent\_ledger\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.consent\_scopes (

  scope\_id text NOT NULL,

  name text NOT NULL,

  description\_md text,

  allowed\_purposes ARRAY NOT NULL DEFAULT '{}'::text\[\],

  default\_tier text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT consent\_scopes\_pkey PRIMARY KEY (scope\_id)

);

CREATE TABLE public.construct\_catalog (

  construct\_key text NOT NULL,

  label text NOT NULL,

  definition\_md text,

  citations jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT construct\_catalog\_pkey PRIMARY KEY (construct\_key)

);

CREATE TABLE public.construct\_links (

  construct\_key text NOT NULL,

  target\_level USER-DEFINED NOT NULL,

  target\_id text NOT NULL,

  weight numeric,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT construct\_links\_pkey PRIMARY KEY (construct\_key, target\_level, target\_id),

  CONSTRAINT construct\_links\_construct\_key\_fkey FOREIGN KEY (construct\_key) REFERENCES public.construct\_catalog(construct\_key)

);

CREATE TABLE public.content\_assets (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  source\_object\_id uuid UNIQUE,

  bucket\_id text,

  collection text,

  content\_key text,

  storage\_path text,

  file\_name text,

  mime\_type text,

  inferred\_kind text,

  metadata jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT content\_assets\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.content\_engagements (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  content\_type text NOT NULL,

  content\_id text NOT NULL,

  action text NOT NULL,

  duration\_seconds integer,

  context\_tags ARRAY DEFAULT '{}'::text\[\],

  metadata jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT content\_engagements\_pkey PRIMARY KEY (id),

  CONSTRAINT content\_engagements\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT content\_engagements\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.content\_injections (

  parent\_content\_id uuid NOT NULL,

  practice\_content\_id uuid NOT NULL,

  placement text NOT NULL DEFAULT 'inline'::text,

  order\_index integer NOT NULL DEFAULT 1,

  CONSTRAINT content\_injections\_pkey PRIMARY KEY (parent\_content\_id, practice\_content\_id),

  CONSTRAINT content\_injections\_parent\_content\_id\_fkey FOREIGN KEY (parent\_content\_id) REFERENCES public.content\_items(id),

  CONSTRAINT content\_injections\_practice\_content\_id\_fkey FOREIGN KEY (practice\_content\_id) REFERENCES public.content\_items(id)

);

CREATE TABLE public.content\_items (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  code text UNIQUE,

  kind USER-DEFINED NOT NULL,

  status USER-DEFINED NOT NULL DEFAULT 'draft'::content\_status,

  title text NOT NULL,

  summary text,

  config jsonb NOT NULL DEFAULT '{}'::jsonb,

  tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT content\_items\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.content\_length\_targets (

  id integer NOT NULL DEFAULT 1,

  spark\_target integer NOT NULL DEFAULT 50,

  spark\_min integer NOT NULL DEFAULT 35,

  spark\_max integer NOT NULL DEFAULT 70,

  flame\_target integer NOT NULL DEFAULT 250,

  flame\_min integer NOT NULL DEFAULT 200,

  flame\_max integer NOT NULL DEFAULT 300,

  ember\_target integer NOT NULL DEFAULT 500,

  ember\_min integer NOT NULL DEFAULT 425,

  ember\_max integer NOT NULL DEFAULT 575,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT content\_length\_targets\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.content\_navicues (

  id bigint NOT NULL DEFAULT nextval('content\_navicues\_id\_seq'::regclass),

  content\_kind text NOT NULL CHECK (content\_kind \= ANY (ARRAY\['article'::text, 'video'::text, 'lesson'::text\])),

  content\_id bigint NOT NULL,

  navicue\_id text NOT NULL,

  relation text DEFAULT 'reinforces'::text,

  CONSTRAINT content\_navicues\_pkey PRIMARY KEY (id),

  CONSTRAINT content\_navicues\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues(id)

);

CREATE TABLE public.content\_people (

  content\_id uuid NOT NULL,

  person\_id text NOT NULL,

  role text NOT NULL DEFAULT 'featured'::text,

  weight numeric NOT NULL DEFAULT 1.0,

  CONSTRAINT content\_people\_pkey PRIMARY KEY (content\_id, person\_id, role),

  CONSTRAINT content\_people\_content\_id\_fkey FOREIGN KEY (content\_id) REFERENCES public.content\_items(id),

  CONSTRAINT content\_people\_person\_id\_fkey FOREIGN KEY (person\_id) REFERENCES public.people(id)

);

CREATE TABLE public.content\_refs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  ref\_type text NOT NULL CHECK (ref\_type \= ANY (ARRAY\['template'::text, 'scene'::text\])),

  ref\_id text NOT NULL,

  ref\_extra text,

  title text,

  slug text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  unique\_key text DEFAULT ((((ref\_type || ':'::text) || ref\_id) || ':'::text) || COALESCE(ref\_extra, ''::text)) UNIQUE,

  CONSTRAINT content\_refs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.content\_registry (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  content\_kind USER-DEFINED NOT NULL,

  source\_table text NOT NULL,

  source\_pk text NOT NULL,

  title text,

  pillar\_id text,

  theme\_id text,

  status text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  reading\_time\_minutes integer CHECK (reading\_time\_minutes IS NULL OR reading\_time\_minutes \>= 1 AND reading\_time\_minutes \<= 120),

  difficulty\_level text,

  clinical\_metadata jsonb DEFAULT '{}'::jsonb,

  canonical\_id uuid,

  version text,

  is\_active boolean DEFAULT true,

  safety\_flags ARRAY,

  contraindications ARRAY,

  targeting\_rules jsonb DEFAULT '{}'::jsonb,

  response\_contract jsonb DEFAULT '{}'::jsonb CHECK (rc\_has\_minimum\_keys(response\_contract)),

  source\_of\_truth text,

  search\_tsv tsvector,

  arousal\_fit text DEFAULT 'amber'::text CHECK (arousal\_fit \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text, 'downshift\_first'::text\])),

  tags ARRAY DEFAULT '{}'::text\[\],

  content\_type text NOT NULL DEFAULT 'content'::text,

  supersedes\_content\_ref uuid,

  change\_log text,

  min\_client\_version text,

  allowed\_state\_bands ARRAY,

  harm\_types ARRAY,

  response\_failure\_policy jsonb CHECK (response\_failure\_policy\_valid(response\_failure\_policy)),

  rescue\_contract jsonb,

  organization\_id uuid,

  professional\_id uuid,

  visibility\_scope text NOT NULL DEFAULT 'platform'::text CHECK (visibility\_scope \= ANY (ARRAY\['platform'::text, 'org'::text, 'professional'::text, 'private'::text\])),

  CONSTRAINT content\_registry\_pkey PRIMARY KEY (id),

  CONSTRAINT content\_registry\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT content\_registry\_supersedes\_content\_ref\_fkey FOREIGN KEY (supersedes\_content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT content\_registry\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT content\_registry\_professional\_id\_fkey FOREIGN KEY (professional\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.content\_relationships (

  id uuid NOT NULL DEFAULT uuid\_generate\_v4(),

  content\_type\_source text NOT NULL,

  content\_id\_source text NOT NULL,

  content\_type\_target text NOT NULL,

  content\_id\_target text NOT NULL,

  relationship\_type text DEFAULT 'related'::text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT content\_relationships\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.content\_seeds (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  title text NOT NULL,

  seed\_text text NOT NULL,

  target\_subtype text NOT NULL DEFAULT 'insight'::text,

  params jsonb DEFAULT '{}'::jsonb,

  created\_by uuid,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT content\_seeds\_pkey PRIMARY KEY (id),

  CONSTRAINT content\_seeds\_created\_by\_fkey FOREIGN KEY (created\_by) REFERENCES auth.users(id)

);

CREATE TABLE public.content\_tags (

  content\_id uuid NOT NULL,

  tag\_id uuid NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT content\_tags\_pkey PRIMARY KEY (content\_id, tag\_id),

  CONSTRAINT content\_tags\_content\_id\_fkey FOREIGN KEY (content\_id) REFERENCES public.content\_registry(id),

  CONSTRAINT content\_tags\_tag\_id\_fkey FOREIGN KEY (tag\_id) REFERENCES public.tags(id)

);

CREATE TABLE public.content\_targets (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  content\_id uuid NOT NULL,

  scope\_type USER-DEFINED NOT NULL,

  pillar\_id text,

  schema\_id text,

  family\_id uuid,

  concept\_id text,

  theme\_id text,

  mindblock\_id uuid,

  weight numeric NOT NULL DEFAULT 1.0,

  is\_primary boolean NOT NULL DEFAULT false,

  brain\_coordinate jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT content\_targets\_pkey PRIMARY KEY (id),

  CONSTRAINT content\_targets\_content\_id\_fkey FOREIGN KEY (content\_id) REFERENCES public.content\_items(id),

  CONSTRAINT content\_targets\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT content\_targets\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT content\_targets\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT content\_targets\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT content\_targets\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id),

  CONSTRAINT content\_targets\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.content\_versions (

  content\_ref uuid NOT NULL,

  version text NOT NULL,

  review\_state text NOT NULL DEFAULT 'draft'::text,

  reviewed\_by uuid,

  reviewed\_at timestamp with time zone,

  clinical\_signoff boolean DEFAULT false,

  snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT content\_versions\_pkey PRIMARY KEY (content\_ref, version),

  CONSTRAINT content\_versions\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT content\_versions\_reviewed\_by\_fkey FOREIGN KEY (reviewed\_by) REFERENCES public.profiles(id)

);

CREATE TABLE public.context\_catalog (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  slug text NOT NULL UNIQUE,

  label text NOT NULL,

  kind text DEFAULT 'situation'::text CHECK (kind \= ANY (ARRAY\['situation'::text, 'place'::text, 'people'::text, 'time'::text, 'emotion'::text, 'body'::text, 'other'::text\])),

  synonyms ARRAY DEFAULT '{}'::text\[\],

  parent\_id uuid,

  tags ARRAY DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT context\_catalog\_pkey PRIMARY KEY (id),

  CONSTRAINT context\_catalog\_parent\_id\_fkey FOREIGN KEY (parent\_id) REFERENCES public.context\_catalog(id)

);

CREATE TABLE public.context\_detections\_v24 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  detected\_at timestamp with time zone NOT NULL DEFAULT now(),

  context\_key text NOT NULL,

  confidence numeric NOT NULL DEFAULT 0.5 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  source text NOT NULL CHECK (source \= ANY (ARRAY\['self\_report'::text, 'calendar'::text, 'wearable'::text, 'device\_pattern'::text, 'location'::text, 'manual'::text, 'system'::text\])),

  mode text DEFAULT 'auto'::text CHECK (mode \= ANY (ARRAY\['auto'::text, 'confirm\_only'::text, 'manual'::text\])),

  confirmed boolean,

  evidence jsonb DEFAULT '{}'::jsonb,

  expires\_at timestamp with time zone,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT context\_detections\_v24\_pkey PRIMARY KEY (id),

  CONSTRAINT context\_detections\_v24\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.context\_dict (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  slug text NOT NULL UNIQUE,

  label text NOT NULL,

  kind USER-DEFINED NOT NULL DEFAULT 'situation'::context\_kind\_enum,

  synonyms ARRAY DEFAULT '{}'::text\[\],

  parent\_id uuid,

  tags ARRAY DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT context\_dict\_pkey PRIMARY KEY (id),

  CONSTRAINT context\_dict\_parent\_fk FOREIGN KEY (parent\_id) REFERENCES public.context\_dict(id)

);

CREATE TABLE public.context\_routing\_decisions\_v24 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  decided\_at timestamp with time zone DEFAULT now(),

  risk\_window\_id uuid,

  context\_key text,

  target\_type text NOT NULL CHECK (target\_type \= ANY (ARRAY\['navicue'::text, 'block'::text, 'sequence'::text, 'practice'::text, 'checkin'::text, 'journey\_scene'::text\])),

  target\_id text NOT NULL,

  policy\_id text,

  policy\_version text,

  safety\_decision\_id uuid,

  expected\_effect text,

  rationale jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT context\_routing\_decisions\_v24\_pkey PRIMARY KEY (id),

  CONSTRAINT context\_routing\_decisions\_v24\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT context\_routing\_decisions\_v24\_risk\_window\_id\_fkey FOREIGN KEY (risk\_window\_id) REFERENCES public.risk\_windows\_v24(id)

);

CREATE TABLE public.context\_training\_plans\_v24 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  context\_key text NOT NULL,

  status text NOT NULL DEFAULT 'active'::text CHECK (status \= ANY (ARRAY\['active'::text, 'paused'::text, 'completed'::text, 'abandoned'::text\])),

  horizon\_days integer NOT NULL DEFAULT 14 CHECK (horizon\_days \= ANY (ARRAY\[7, 14, 21, 28\])),

  target\_exposures integer NOT NULL DEFAULT 3 CHECK (target\_exposures \>= 1 AND target\_exposures \<= 20),

  plan jsonb NOT NULL DEFAULT '{}'::jsonb,

  started\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT context\_training\_plans\_v24\_pkey PRIMARY KEY (id),

  CONSTRAINT context\_training\_plans\_v24\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.context\_transfer\_results\_v24 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  context\_key text NOT NULL,

  content\_kind text NOT NULL CHECK (content\_kind \= ANY (ARRAY\['block'::text, 'sequence'::text, 'practice'::text, 'navicue'::text\])),

  content\_id text NOT NULL,

  attempt\_at timestamp with time zone DEFAULT now(),

  outcome text NOT NULL CHECK (outcome \= ANY (ARRAY\['held'::text, 'partial'::text, 'failed'::text, 'unknown'::text\])),

  friction integer CHECK (friction IS NULL OR friction \>= 0 AND friction \<= 10),

  transfer\_test\_id uuid,

  transfer\_test\_result\_id uuid,

  receipt\_id bigint,

  evidence jsonb DEFAULT '{}'::jsonb,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT context\_transfer\_results\_v24\_pkey PRIMARY KEY (id),

  CONSTRAINT context\_transfer\_results\_v24\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.conversation\_mindblocks (

  conversation\_id uuid NOT NULL,

  mindblock\_id uuid NOT NULL,

  evidence jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT conversation\_mindblocks\_pkey PRIMARY KEY (conversation\_id, mindblock\_id),

  CONSTRAINT conversation\_mindblocks\_conversation\_id\_fkey FOREIGN KEY (conversation\_id) REFERENCES public.luma\_conversations(id),

  CONSTRAINT conversation\_mindblocks\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.core\_beliefs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  belief text NOT NULL,

  origin text,

  strength numeric,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT core\_beliefs\_pkey PRIMARY KEY (id),

  CONSTRAINT core\_beliefs\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.cue\_sequence\_deployments (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  sequence\_id text NOT NULL,

  deployed\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  skipped boolean DEFAULT false,

  step\_results jsonb DEFAULT '{}'::jsonb,

  context jsonb DEFAULT '{}'::jsonb,

  status text CHECK (status IS NULL OR (status \= ANY (ARRAY\['started'::text, 'completed'::text, 'skipped'::text, 'abandoned'::text\]))),

  exposure\_id uuid,

  queue\_id uuid,

  rationale jsonb DEFAULT '{}'::jsonb CHECK (rationale IS NULL OR jsonb\_typeof(rationale) \= 'object'::text),

  experiment\_key text,

  experiment\_id uuid,

  variant\_key text,

  variant\_id uuid,

  decision\_source USER-DEFINED DEFAULT 'policy\_ai'::decision\_source\_enum,

  individual\_id uuid NOT NULL,

  CONSTRAINT cue\_sequence\_deployments\_pkey PRIMARY KEY (id),

  CONSTRAINT cue\_sequence\_deployments\_sequence\_id\_fkey FOREIGN KEY (sequence\_id) REFERENCES public.cue\_sequences(id),

  CONSTRAINT cue\_seq\_deployments\_exposure\_fk FOREIGN KEY (exposure\_id) REFERENCES public.feed\_exposures(id),

  CONSTRAINT cue\_seq\_deployments\_queue\_fk FOREIGN KEY (queue\_id) REFERENCES public.user\_feed\_queue\_v2(id),

  CONSTRAINT cue\_sequence\_deployments\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.cue\_sequence\_intents (

  sequence\_id text NOT NULL,

  intent text NOT NULL,

  CONSTRAINT cue\_sequence\_intents\_pkey PRIMARY KEY (sequence\_id, intent),

  CONSTRAINT cue\_sequence\_intents\_sequence\_id\_fkey FOREIGN KEY (sequence\_id) REFERENCES public.cue\_sequences(id)

);

CREATE TABLE public.cue\_sequence\_schema\_fit (

  sequence\_id text NOT NULL,

  schema\_id text NOT NULL,

  weight numeric DEFAULT 1.0,

  CONSTRAINT cue\_sequence\_schema\_fit\_pkey PRIMARY KEY (sequence\_id, schema\_id),

  CONSTRAINT cue\_sequence\_schema\_fit\_sequence\_id\_fkey FOREIGN KEY (sequence\_id) REFERENCES public.cue\_sequences(id),

  CONSTRAINT cue\_sequence\_schema\_fit\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.cue\_sequence\_steps (

  sequence\_id text NOT NULL,

  step\_no integer NOT NULL CHECK (step\_no \>= 1 AND step\_no \<= 20),

  prompt\_id text NOT NULL,

  voice\_override\_id text,

  required boolean DEFAULT true,

  expects\_receipt boolean DEFAULT false,

  receipt\_type text CHECK (receipt\_type \= ANY (ARRAY\['text'::text, 'voice'::text, 'photo'::text, 'video'::text\])),

  max\_duration\_sec integer,

  notes\_md text,

  tags jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT cue\_sequence\_steps\_pkey PRIMARY KEY (sequence\_id, step\_no),

  CONSTRAINT cue\_sequence\_steps\_sequence\_id\_fkey FOREIGN KEY (sequence\_id) REFERENCES public.cue\_sequences(id),

  CONSTRAINT cue\_sequence\_steps\_prompt\_id\_fkey FOREIGN KEY (prompt\_id) REFERENCES public.prompt\_templates(id),

  CONSTRAINT cue\_sequence\_steps\_voice\_override\_id\_fkey FOREIGN KEY (voice\_override\_id) REFERENCES public.voice\_archetypes(id)

);

CREATE TABLE public.cue\_sequence\_voice\_fit (

  sequence\_id text NOT NULL,

  voice\_id text NOT NULL,

  weight numeric DEFAULT 1.0,

  notes\_md text,

  CONSTRAINT cue\_sequence\_voice\_fit\_pkey PRIMARY KEY (sequence\_id, voice\_id),

  CONSTRAINT cue\_sequence\_voice\_fit\_sequence\_id\_fkey FOREIGN KEY (sequence\_id) REFERENCES public.cue\_sequences(id),

  CONSTRAINT cue\_sequence\_voice\_fit\_voice\_id\_fkey FOREIGN KEY (voice\_id) REFERENCES public.voice\_archetypes(id)

);

CREATE TABLE public.cue\_sequences (

  id text NOT NULL,

  title text NOT NULL,

  description\_md text,

  kbe\_target text DEFAULT 'believing'::text CHECK (kbe\_target \= ANY (ARRAY\['knowing'::text, 'believing'::text, 'embodying'::text\])),

  arousal\_fit text DEFAULT 'amber'::text CHECK (arousal\_fit \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text, 'downshift\_first'::text\])),

  time\_horizon text DEFAULT 'session'::text CHECK (time\_horizon \= ANY (ARRAY\['immediate'::text, 'session'::text, 'same\_day'::text, 'multi\_day'::text, 'weeks'::text\])),

  is\_curveball boolean DEFAULT false,

  tags jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT cue\_sequences\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.data\_classification (

  key text NOT NULL,

  sensitivity text NOT NULL CHECK (sensitivity \= ANY (ARRAY\['low'::text, 'medium'::text, 'high'::text, 'critical'::text\])),

  default\_tier text NOT NULL CHECK (default\_tier \= ANY (ARRAY\['tier0'::text, 'tier1'::text, 'tier2'::text, 'tier3'::text, 'tier4'::text\])),

  retention\_days integer,

  allowed\_purposes ARRAY NOT NULL DEFAULT '{}'::text\[\],

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT data\_classification\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.decision\_feature\_snapshots (

  decision\_id uuid NOT NULL,

  policy\_id text,

  policy\_version text,

  user\_features jsonb NOT NULL DEFAULT '{}'::jsonb,

  context\_features jsonb NOT NULL DEFAULT '{}'::jsonb,

  proof\_features jsonb NOT NULL DEFAULT '{}'::jsonb,

  safety\_features jsonb NOT NULL DEFAULT '{}'::jsonb,

  computed\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT decision\_feature\_snapshots\_pkey PRIMARY KEY (decision\_id),

  CONSTRAINT decision\_feature\_snapshots\_decision\_id\_fkey FOREIGN KEY (decision\_id) REFERENCES public.bandit\_decisions(id)

);

CREATE TABLE public.decision\_traces (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  signals jsonb NOT NULL,

  candidates jsonb NOT NULL,

  why\_this text NOT NULL,

  why\_now text NOT NULL,

  why\_variant text,

  expected\_proof text,

  ranker\_version text,

  policy\_version text,

  experiment\_id uuid,

  content\_ref uuid NOT NULL,

  delivery\_id uuid,

  policy\_outcome text NOT NULL CHECK (policy\_outcome \= ANY (ARRAY\['allow'::text, 'allow\_with\_modification'::text, 'hold'::text, 'block\_and\_route'::text, 'require\_support'::text\])),

  CONSTRAINT decision\_traces\_pkey PRIMARY KEY (id),

  CONSTRAINT decision\_traces\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT decision\_traces\_delivery\_id\_fkey FOREIGN KEY (delivery\_id) REFERENCES public.delivery\_registry(id)

);

CREATE TABLE public.definitions (

  slug text NOT NULL,

  term text NOT NULL,

  definition\_md text NOT NULL,

  clinician\_note\_md text,

  pillar\_id text,

  aliases ARRAY DEFAULT '{}'::text\[\],

  tags ARRAY DEFAULT '{}'::text\[\],

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT definitions\_pkey PRIMARY KEY (slug),

  CONSTRAINT definitions\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id)

);

CREATE TABLE public.delivery\_registry (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  content\_ref uuid NOT NULL,

  delivery\_key text NOT NULL,

  delivery\_kind text NOT NULL CHECK (delivery\_kind \= ANY (ARRAY\['feed\_card'::text, 'inline\_player'::text, 'modal'::text, 'push'::text, 'email'::text, 'sms'::text, 'clinician\_portal'::text\])),

  channel text NOT NULL CHECK (channel \= ANY (ARRAY\['in\_app'::text, 'push'::text, 'email'::text, 'sms'::text\])),

  player\_mode text NOT NULL CHECK (player\_mode \= ANY (ARRAY\['text'::text, 'audio'::text, 'video'::text, 'mixed'::text\])),

  cta\_label text,

  preview\_payload jsonb DEFAULT '{}'::jsonb CHECK (\_is\_json\_object(preview\_payload)),

  estimated\_cost\_seconds integer,

  expiry\_seconds integer,

  response\_contract\_override jsonb,

  activation\_rules jsonb,

  is\_active boolean DEFAULT true,

  created\_at timestamp with time zone DEFAULT now(),

  organization\_id uuid,

  professional\_id uuid,

  visibility\_scope text NOT NULL DEFAULT 'platform'::text CHECK (visibility\_scope \= ANY (ARRAY\['platform'::text, 'org'::text, 'professional'::text, 'private'::text\])),

  CONSTRAINT delivery\_registry\_pkey PRIMARY KEY (id),

  CONSTRAINT delivery\_registry\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT delivery\_registry\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT delivery\_registry\_professional\_id\_fkey FOREIGN KEY (professional\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.disciplines (

  id text NOT NULL,

  name text NOT NULL UNIQUE,

  CONSTRAINT disciplines\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.diversity\_caps (

  key text NOT NULL,

  value numeric NOT NULL,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT diversity\_caps\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.engagement\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  content\_type text NOT NULL,

  content\_id text NOT NULL,

  action text NOT NULL CHECK (action \= ANY (ARRAY\['viewed'::text, 'started'::text, 'completed'::text, 'skipped'::text, 'saved'::text, 'shared'::text, 'rated'::text\])),

  duration\_seconds integer,

  context\_tags ARRAY DEFAULT '{}'::text\[\],

  metadata jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  content\_ref uuid NOT NULL,

  CONSTRAINT engagement\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT engagement\_events\_patient\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT engagement\_events\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id)

);

CREATE TABLE public.engagements (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  engagement\_type text NOT NULL CHECK (engagement\_type \= ANY (ARRAY\['content'::text, 'navicue'::text, 'soundbite'::text, 'conversation'::text, 'practice'::text, 'service'::text\])),

  content\_id uuid,

  organization\_id uuid,

  professional\_id uuid,

  status text DEFAULT 'completed'::text CHECK (status \= ANY (ARRAY\['started'::text, 'in\_progress'::text, 'completed'::text, 'abandoned'::text\])),

  duration\_seconds integer,

  completion\_percentage integer CHECK (completion\_percentage \>= 0 AND completion\_percentage \<= 100),

  mindblock\_ids ARRAY,

  was\_helpful boolean,

  rating integer CHECK (rating \>= 1 AND rating \<= 5),

  notes text,

  started\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT engagements\_pkey PRIMARY KEY (id),

  CONSTRAINT engagements\_content\_id\_fkey FOREIGN KEY (content\_id) REFERENCES public.content\_registry(id),

  CONSTRAINT engagements\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.escalation\_queue (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  scope\_type text NOT NULL CHECK (scope\_type \= ANY (ARRAY\['schema'::text, 'family'::text, 'mindblock'::text\])),

  scope\_id text NOT NULL,

  reason text NOT NULL CHECK (reason \= ANY (ARRAY\['no\_receipts'::text, 'no\_checks'::text, 'no\_state\_change'::text\])),

  occurrences integer NOT NULL CHECK (occurrences \>= 1),

  first\_seen\_at timestamp with time zone NOT NULL,

  last\_seen\_at timestamp with time zone NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  processed\_at timestamp with time zone,

  CONSTRAINT escalation\_queue\_pkey PRIMARY KEY (id),

  CONSTRAINT escalation\_queue\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.event\_spine (

  id bigint NOT NULL DEFAULT nextval('event\_spine\_id\_seq'::regclass),

  occurred\_at timestamp with time zone NOT NULL DEFAULT now(),

  organization\_id uuid,

  actor text,

  event\_type USER-DEFINED NOT NULL CHECK (event\_type::text \= ANY (ARRAY\['exposure'::text, 'opened'::text, 'clicked'::text, 'started'::text, 'completed'::text, 'error'::text\])),

  content\_ref uuid,

  delivery\_id uuid,

  decision\_trace\_id uuid,

  experiment\_id uuid,

  variant\_id text,

  request\_ctx jsonb,

  state\_snapshot jsonb,

  event\_payload jsonb,

  rail USER-DEFINED,

  individual\_id uuid NOT NULL,

  source\_table text,

  source\_pk text,

  event\_name text,

  severity text,

  CONSTRAINT event\_spine\_pkey PRIMARY KEY (id),

  CONSTRAINT event\_spine\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT event\_spine\_delivery\_id\_fkey FOREIGN KEY (delivery\_id) REFERENCES public.delivery\_registry(id),

  CONSTRAINT event\_spine\_decision\_trace\_id\_fkey FOREIGN KEY (decision\_trace\_id) REFERENCES public.decision\_traces(id),

  CONSTRAINT event\_spine\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.events (

  id bigint NOT NULL DEFAULT nextval('events\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  kind text NOT NULL,

  data jsonb,

  ts timestamp with time zone DEFAULT now(),

  individual\_id uuid,

  CONSTRAINT events\_pkey PRIMARY KEY (id),

  CONSTRAINT events\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.evidence\_appraisals (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  evidence\_key text NOT NULL,

  level\_of\_evidence text,

  risk\_of\_bias numeric CHECK (risk\_of\_bias IS NULL OR risk\_of\_bias \>= 0::numeric AND risk\_of\_bias \<= 1::numeric),

  replicability numeric CHECK (replicability IS NULL OR replicability \>= 0::numeric AND replicability \<= 1::numeric),

  effect\_size\_hint text,

  confidence numeric CHECK (confidence IS NULL OR confidence \>= 0::numeric AND confidence \<= 1::numeric),

  appraiser\_id uuid,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  individual\_id uuid,

  CONSTRAINT evidence\_appraisals\_pkey PRIMARY KEY (id),

  CONSTRAINT evidence\_appraisals\_evidence\_key\_fkey FOREIGN KEY (evidence\_key) REFERENCES public.evidence\_registry(key),

  CONSTRAINT evidence\_appraisals\_appraiser\_id\_fkey FOREIGN KEY (appraiser\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.evidence\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  organization\_id uuid,

  occurred\_at timestamp with time zone NOT NULL DEFAULT now(),

  source text NOT NULL CHECK (source \= ANY (ARRAY\['feed\_exposure'::text, 'feed\_injection'::text, 'navicue\_response'::text, 'practice\_log'::text, 'manual'::text, 'system'::text\])),

  content\_ref uuid,

  event\_type text NOT NULL,

  event\_data jsonb NOT NULL DEFAULT '{}'::jsonb,

  score double precision,

  tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  individual\_id uuid,

  CONSTRAINT evidence\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT evidence\_events\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id)

);

CREATE TABLE public.evidence\_registry (

  key text NOT NULL,

  kind USER-DEFINED NOT NULL,

  title text NOT NULL,

  year integer,

  doi text,

  url text,

  notes\_md text,

  source\_id bigint,

  leader\_id text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT evidence\_registry\_pkey PRIMARY KEY (key),

  CONSTRAINT evidence\_registry\_source\_id\_fkey FOREIGN KEY (source\_id) REFERENCES public.sources(id),

  CONSTRAINT evidence\_registry\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id)

);

CREATE TABLE public.evt\_context\_detection (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  detected\_at timestamp with time zone NOT NULL,

  context\_key text NOT NULL,

  confidence numeric NOT NULL DEFAULT 0.5,

  source text NOT NULL,

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT evt\_context\_detection\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.evt\_decision (

  decision\_id uuid NOT NULL,

  user\_id uuid NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  mode text NOT NULL DEFAULT 'standard'::text,

  decision\_json jsonb NOT NULL CHECK (decision\_json ? 'decision\_id'::text AND decision\_json ? 'user\_id'::text AND decision\_json ? 'created\_at'::text AND decision\_json ? 'selection'::text AND decision\_json ? 'why\_now'::text AND decision\_json ? 'policies'::text),

  why\_now jsonb NOT NULL DEFAULT '{}'::jsonb,

  policies jsonb NOT NULL DEFAULT '{}'::jsonb,

  selected jsonb,

  audit jsonb NOT NULL DEFAULT '{}'::jsonb,

  selection\_type text,

  selection\_id text,

  CONSTRAINT evt\_decision\_pkey PRIMARY KEY (decision\_id)

);

CREATE TABLE public.evt\_delivery (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  delivered\_at timestamp with time zone NOT NULL,

  content\_id text,

  delivery\_type text NOT NULL,

  decision\_id uuid,

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  mode USER-DEFINED,

  delivery USER-DEFINED,

  selection\_type text,

  selection\_id text,

  CONSTRAINT evt\_delivery\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.evt\_map\_action (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  occurred\_at timestamp with time zone NOT NULL,

  map\_stage text NOT NULL CHECK (map\_stage \= ANY (ARRAY\['moment'::text, 'appraisal'::text, 'proof'::text\])),

  payload jsonb NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT evt\_map\_action\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.evt\_outcome (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  occurred\_at timestamp with time zone NOT NULL,

  outcome\_type text NOT NULL,

  outcome jsonb NOT NULL,

  related\_delivery\_id uuid,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT evt\_outcome\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.evt\_signal (

  id bigint NOT NULL DEFAULT nextval('evt\_signal\_id\_seq'::regclass),

  user\_id uuid,

  type USER-DEFINED NOT NULL,

  source text,

  context jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT evt\_signal\_pkey PRIMARY KEY (id),

  CONSTRAINT evt\_signal\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES auth.users(id)

);

CREATE TABLE public.evt\_user\_signal (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  occurred\_at timestamp with time zone NOT NULL,

  source text NOT NULL,

  signal\_type text NOT NULL,

  signal jsonb NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT evt\_user\_signal\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.experiment\_assignments (

  experiment\_id uuid NOT NULL,

  individual\_id uuid NOT NULL,

  variant\_id uuid NOT NULL,

  assigned\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT experiment\_assignments\_pkey PRIMARY KEY (experiment\_id, individual\_id),

  CONSTRAINT experiment\_assignments\_experiment\_id\_fkey FOREIGN KEY (experiment\_id) REFERENCES public.experiments(id),

  CONSTRAINT experiment\_assignments\_variant\_id\_fkey FOREIGN KEY (variant\_id) REFERENCES public.experiment\_variants(id)

);

CREATE TABLE public.experiment\_variants (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  experiment\_id uuid NOT NULL,

  key text NOT NULL,

  name text NOT NULL,

  weight integer NOT NULL CHECK (weight \>= 0),

  CONSTRAINT experiment\_variants\_pkey PRIMARY KEY (id),

  CONSTRAINT experiment\_variants\_experiment\_id\_fkey FOREIGN KEY (experiment\_id) REFERENCES public.experiments(id)

);

CREATE TABLE public.experiments (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  experiment\_key text NOT NULL UNIQUE,

  name text NOT NULL,

  description text,

  starts\_at timestamp with time zone NOT NULL,

  ends\_at timestamp with time zone,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  organization\_id uuid,

  CONSTRAINT experiments\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.family\_check\_defaults (

  family\_id uuid NOT NULL,

  check\_type\_keys ARRAY NOT NULL DEFAULT '{}'::text\[\],

  CONSTRAINT family\_check\_defaults\_pkey PRIMARY KEY (family\_id),

  CONSTRAINT family\_check\_defaults\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id)

);

CREATE TABLE public.family\_claims (

  family\_id uuid NOT NULL,

  claim\_id uuid NOT NULL,

  role text DEFAULT 'rationale'::text CHECK (role \= ANY (ARRAY\['rationale'::text, 'mechanism'::text, 'measurement'::text, 'contraindication'::text, 'example'::text\])),

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 2::numeric),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT family\_claims\_pkey PRIMARY KEY (family\_id, claim\_id),

  CONSTRAINT family\_claims\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT family\_claims\_claim\_id\_fkey FOREIGN KEY (claim\_id) REFERENCES public.claims(id)

);

CREATE TABLE public.family\_interventions (

  family\_id uuid NOT NULL,

  intervention\_type text NOT NULL CHECK (intervention\_type \= ANY (ARRAY\['navicue\_type'::text, 'practice'::text, 'block'::text, 'sequence'::text, 'prompt'::text\])),

  intervention\_id text NOT NULL,

  strength numeric DEFAULT 1.0 CHECK (strength \>= 0::numeric AND strength \<= 2::numeric),

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT family\_interventions\_pkey PRIMARY KEY (family\_id, intervention\_type, intervention\_id),

  CONSTRAINT family\_interventions\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id)

);

CREATE TABLE public.family\_lenses (

  family\_id uuid NOT NULL,

  lens\_id text NOT NULL,

  is\_primary boolean DEFAULT false,

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 2::numeric),

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT family\_lenses\_pkey PRIMARY KEY (family\_id, lens\_id),

  CONSTRAINT family\_lenses\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT family\_lenses\_lens\_id\_fkey FOREIGN KEY (lens\_id) REFERENCES public.lens\_catalog(id)

);

CREATE TABLE public.family\_receipt\_defaults (

  family\_id uuid NOT NULL,

  receipt\_type\_keys ARRAY NOT NULL DEFAULT '{}'::text\[\],

  CONSTRAINT family\_receipt\_defaults\_pkey PRIMARY KEY (family\_id),

  CONSTRAINT family\_receipt\_defaults\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id)

);

CREATE TABLE public.family\_schemas (

  family\_id uuid NOT NULL,

  schema\_id text NOT NULL,

  is\_primary boolean DEFAULT false,

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 2::numeric),

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT family\_schemas\_pkey PRIMARY KEY (family\_id, schema\_id),

  CONSTRAINT family\_schemas\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT family\_schemas\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.feed\_cooldowns (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  target\_type text NOT NULL CHECK (target\_type \= ANY (ARRAY\['navicue'::text, 'sequence'::text, 'block'::text, 'article'::text, 'practice'::text\])),

  target\_id text NOT NULL,

  cooldown\_until timestamp with time zone NOT NULL,

  reason text,

  created\_at timestamp with time zone DEFAULT now(),

  individual\_id uuid,

  CONSTRAINT feed\_cooldowns\_pkey PRIMARY KEY (id),

  CONSTRAINT feed\_cooldowns\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.feed\_exposures (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  item\_kind text NOT NULL CHECK (item\_kind \= ANY (ARRAY\['micro'::text, 'episode'::text\])),

  content\_type text NOT NULL CHECK (content\_type \= ANY (ARRAY\['navicue'::text, 'block'::text, 'sequence'::text, 'article'::text, 'practice'::text\])),

  content\_id text NOT NULL,

  reason text,

  arousal\_fit text,

  surfaced\_at timestamp with time zone NOT NULL,

  completed\_at timestamp with time zone,

  skipped boolean,

  helpful boolean,

  rating integer,

  dwell\_seconds integer,

  created\_at timestamp with time zone DEFAULT now(),

  content\_ref uuid NOT NULL,

  queue\_id uuid,

  decision\_id uuid,

  experiment\_key text,

  experiment\_id uuid,

  variant\_key text,

  variant\_id uuid,

  individual\_id uuid NOT NULL,

  CONSTRAINT feed\_exposures\_pkey PRIMARY KEY (id),

  CONSTRAINT feed\_exposures\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT feed\_exposures\_queue\_fk FOREIGN KEY (queue\_id) REFERENCES public.user\_feed\_queue\_v2(id),

  CONSTRAINT feed\_exposures\_decision\_fk FOREIGN KEY (decision\_id) REFERENCES public.bandit\_decisions(id),

  CONSTRAINT feed\_exposures\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.feed\_injections (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  item\_kind text NOT NULL CHECK (item\_kind \= ANY (ARRAY\['micro'::text, 'episode'::text\])),

  reason text,

  content\_type text NOT NULL CHECK (content\_type \= ANY (ARRAY\['navicue'::text, 'block'::text, 'sequence'::text, 'article'::text, 'practice'::text\])),

  content\_id text NOT NULL,

  scheduled\_for timestamp with time zone NOT NULL,

  expires\_at timestamp with time zone,

  consumed\_at timestamp with time zone,

  dedupe\_key text UNIQUE,

  created\_at timestamp with time zone DEFAULT now(),

  content\_ref uuid NOT NULL,

  individual\_id uuid,

  CONSTRAINT feed\_injections\_pkey PRIMARY KEY (id),

  CONSTRAINT feed\_injections\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id),

  CONSTRAINT feed\_injections\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id)

);

CREATE TABLE public.feed\_rationale\_violations (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  queue\_id uuid,

  individual\_id uuid,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  payload jsonb,

  CONSTRAINT feed\_rationale\_violations\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.framework\_blueprint (

  id text NOT NULL DEFAULT 'v1'::text,

  summary\_md text,

  architecture\_md text,

  safety\_principles\_md text,

  taxonomy jsonb,

  version text DEFAULT '1.0.0'::text,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT framework\_blueprint\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.funnel\_steps (

  key text NOT NULL,

  step\_no integer NOT NULL,

  verb text NOT NULL,

  CONSTRAINT funnel\_steps\_pkey PRIMARY KEY (key, step\_no)

);

CREATE TABLE public.generation\_job\_failures (

  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,

  job\_id uuid NOT NULL,

  failed\_at timestamp with time zone NOT NULL DEFAULT now(),

  error text,

  CONSTRAINT generation\_job\_failures\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.generation\_jobs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  seed\_id uuid NOT NULL,

  status text NOT NULL CHECK (status \= ANY (ARRAY\['queued'::text, 'running'::text, 'succeeded'::text, 'failed'::text\])),

  requested\_count integer NOT NULL DEFAULT 1 CHECK (requested\_count \> 0),

  error text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  attempts integer NOT NULL DEFAULT 0,

  dead\_lettered boolean NOT NULL DEFAULT false,

  CONSTRAINT generation\_jobs\_pkey PRIMARY KEY (id),

  CONSTRAINT generation\_jobs\_seed\_id\_fkey FOREIGN KEY (seed\_id) REFERENCES public.content\_seeds(id)

);

CREATE TABLE public.guidance\_modes (

  mode\_key text NOT NULL,

  label text NOT NULL,

  definition\_md text,

  never\_do\_md text,

  safe\_state\_bands ARRAY NOT NULL DEFAULT '{}'::text\[\],

  default\_move\_keys ARRAY NOT NULL DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT guidance\_modes\_pkey PRIMARY KEY (mode\_key)

);

CREATE TABLE public.guru\_dossiers (

  guru\_id bigint NOT NULL,

  worldview\_md text,

  signature\_moves jsonb DEFAULT '\[\]'::jsonb,

  probing\_styles jsonb DEFAULT '\[\]'::jsonb,

  language\_geometry jsonb DEFAULT '{}'::jsonb,

  do\_not jsonb DEFAULT '\[\]'::jsonb,

  notes\_md text,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT guru\_dossiers\_pkey PRIMARY KEY (guru\_id),

  CONSTRAINT guru\_dossiers\_guru\_id\_fkey FOREIGN KEY (guru\_id) REFERENCES public.gurus(id)

);

CREATE TABLE public.gurus (

  id bigint NOT NULL DEFAULT nextval('gurus\_id\_seq'::regclass),

  name text NOT NULL,

  archetype text,

  notes text,

  CONSTRAINT gurus\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.hot\_context\_scores\_v24 (

  individual\_id uuid NOT NULL,

  context\_key text NOT NULL,

  score numeric NOT NULL DEFAULT 0 CHECK (score \>= 0::numeric AND score \<= 1::numeric),

  confidence numeric NOT NULL DEFAULT 0.2 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  drivers jsonb DEFAULT '{}'::jsonb,

  last\_triggered\_at timestamp with time zone,

  last\_trained\_at timestamp with time zone,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT hot\_context\_scores\_v24\_pkey PRIMARY KEY (individual\_id, context\_key),

  CONSTRAINT hot\_context\_scores\_v24\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.idempotency\_keys (

  key text NOT NULL,

  endpoint text NOT NULL,

  user\_id uuid NOT NULL,

  request\_hash text NOT NULL,

  response\_json jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT idempotency\_keys\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.identity\_lines (

  id bigint NOT NULL DEFAULT nextval('identity\_lines\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  line\_text text NOT NULL,

  week\_start date NOT NULL DEFAULT (date\_trunc('week'::text, now()))::date,

  adopted boolean DEFAULT true,

  reuse\_count integer DEFAULT 0,

  active boolean DEFAULT true,

  created\_at timestamp with time zone DEFAULT now(),

  individual\_id uuid,

  CONSTRAINT identity\_lines\_pkey PRIMARY KEY (id),

  CONSTRAINT identity\_lines\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.in\_app\_notifications (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  outbox\_id uuid UNIQUE,

  individual\_id uuid NOT NULL,

  category text NOT NULL DEFAULT 'system'::text,

  priority text NOT NULL DEFAULT 'normal'::text CHECK (priority \= ANY (ARRAY\['low'::text, 'normal'::text, 'high'::text, 'urgent'::text\])),

  title text,

  body text NOT NULL,

  deep\_link text,

  is\_read boolean DEFAULT false,

  read\_at timestamp with time zone,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT in\_app\_notifications\_pkey PRIMARY KEY (id),

  CONSTRAINT in\_app\_notifications\_outbox\_id\_fkey FOREIGN KEY (outbox\_id) REFERENCES public.notifications\_outbox(id),

  CONSTRAINT in\_app\_notifications\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.insight\_blocks (

  insight\_id text NOT NULL,

  block\_id text NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT insight\_blocks\_pkey PRIMARY KEY (insight\_id, block\_id),

  CONSTRAINT insight\_blocks\_insight\_id\_fkey FOREIGN KEY (insight\_id) REFERENCES public.navicues(id),

  CONSTRAINT insight\_blocks\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id)

);

CREATE TABLE public.insight\_sections (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  insight\_id bigint NOT NULL,

  section\_no integer NOT NULL,

  heading text,

  body\_md text,

  CONSTRAINT insight\_sections\_pkey PRIMARY KEY (id),

  CONSTRAINT insight\_sections\_insight\_id\_fkey FOREIGN KEY (insight\_id) REFERENCES public.insights(id)

);

CREATE TABLE public.insight\_steps (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  insight\_id bigint NOT NULL,

  step\_no integer NOT NULL,

  prompt\_md text,

  practice jsonb,

  quiz jsonb,

  measure\_key text,

  CONSTRAINT insight\_steps\_pkey PRIMARY KEY (id),

  CONSTRAINT insight\_steps\_insight\_id\_fkey FOREIGN KEY (insight\_id) REFERENCES public.insights(id)

);

CREATE TABLE public.insights (

  id bigint NOT NULL DEFAULT nextval('insights\_id\_seq'::regclass),

  slug text UNIQUE,

  title text NOT NULL,

  summary\_md text,

  body\_md text,

  level USER-DEFINED DEFAULT 'patient'::content\_level,

  status USER-DEFINED NOT NULL DEFAULT 'draft'::content\_status,

  est\_read\_min integer,

  pillar\_id text,

  concept\_id text,

  theme\_id text,

  tags ARRAY DEFAULT '{}'::text\[\],

  hero\_media\_id bigint,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  sections jsonb,

  CONSTRAINT insights\_pkey PRIMARY KEY (id),

  CONSTRAINT insights\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT insights\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT insights\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id),

  CONSTRAINT insights\_hero\_media\_id\_fkey FOREIGN KEY (hero\_media\_id) REFERENCES public.media\_assets(id)

);

CREATE TABLE public.internal\_model\_patterns (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  pattern\_name text NOT NULL,

  description\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT internal\_model\_patterns\_pkey PRIMARY KEY (id),

  CONSTRAINT internal\_model\_patterns\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.intervention\_injections (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  intervention\_type text NOT NULL CHECK (intervention\_type \= ANY (ARRAY\['block'::text, 'insight'::text, 'practice'::text, 'video'::text, 'navicue'::text, 'journey\_step'::text\])),

  intervention\_id uuid NOT NULL,

  injected\_asset\_type text NOT NULL CHECK (injected\_asset\_type \= ANY (ARRAY\['soundbite'::text, 'practice'::text, 'prompt'::text, 'video'::text\])),

  injected\_asset\_id uuid NOT NULL,

  placement text NOT NULL CHECK (placement \= ANY (ARRAY\['pre'::text, 'mid'::text, 'post'::text\])),

  start\_ms integer,

  end\_ms integer,

  required boolean DEFAULT false,

  routing\_rules jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT intervention\_injections\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.job\_processor\_runs (

  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,

  started\_at timestamp with time zone NOT NULL DEFAULT now(),

  finished\_at timestamp with time zone,

  processed integer NOT NULL DEFAULT 0,

  ok integer NOT NULL DEFAULT 0,

  fail integer NOT NULL DEFAULT 0,

  error text,

  details jsonb,

  CONSTRAINT job\_processor\_runs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.job\_run\_log (

  id bigint NOT NULL DEFAULT nextval('job\_run\_log\_id\_seq'::regclass),

  job\_name text NOT NULL,

  started\_at timestamp with time zone NOT NULL DEFAULT now(),

  finished\_at timestamp with time zone,

  status text NOT NULL CHECK (status \= ANY (ARRAY\['started'::text, 'succeeded'::text, 'failed'::text\])),

  details jsonb,

  CONSTRAINT job\_run\_log\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.journey\_audio\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  journey\_instance\_id uuid NOT NULL,

  scene\_number integer NOT NULL CHECK (scene\_number \>= 1 AND scene\_number \<= 50),

  scene\_key text,

  event\_type USER-DEFINED NOT NULL,

  position\_ms integer CHECK (position\_ms IS NULL OR position\_ms \>= 0),

  duration\_ms integer CHECK (duration\_ms IS NULL OR duration\_ms \>= 0),

  playback\_rate numeric,

  muted boolean,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT journey\_audio\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_audio\_events\_journey\_instance\_id\_fkey FOREIGN KEY (journey\_instance\_id) REFERENCES public.journey\_instances(id)

);

CREATE TABLE public.journey\_instance\_scenes (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  journey\_instance\_id uuid NOT NULL,

  scene\_number integer NOT NULL CHECK (scene\_number \>= 1 AND scene\_number \<= 50),

  status USER-DEFINED NOT NULL DEFAULT 'locked'::journey\_instance\_scene\_status,

  opened\_at timestamp with time zone,

  completed\_at timestamp with time zone,

  time\_spent\_ms integer CHECK (time\_spent\_ms IS NULL OR time\_spent\_ms \>= 0),

  completed\_without\_audio boolean NOT NULL DEFAULT false,

  completion\_mode USER-DEFINED,

  client\_version text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT journey\_instance\_scenes\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_instance\_scenes\_journey\_instance\_id\_fkey FOREIGN KEY (journey\_instance\_id) REFERENCES public.journey\_instances(id)

);

CREATE TABLE public.journey\_instances (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  template\_id text NOT NULL,

  status USER-DEFINED NOT NULL DEFAULT 'active'::journey\_instance\_status,

  current\_scene\_number integer NOT NULL DEFAULT 1 CHECK (current\_scene\_number \>= 1 AND current\_scene\_number \<= 50),

  started\_at timestamp with time zone NOT NULL DEFAULT now(),

  completed\_at timestamp with time zone,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  cadence\_mode USER-DEFINED NOT NULL DEFAULT 'daily'::journey\_cadence\_mode,

  seed\_window\_hours smallint NOT NULL DEFAULT 24 CHECK (seed\_window\_hours \>= 1 AND seed\_window\_hours \<= 168),

  min\_scene\_gap\_hours smallint NOT NULL DEFAULT 6 CHECK (min\_scene\_gap\_hours \>= 0 AND min\_scene\_gap\_hours \<= 168),

  next\_scene\_available\_at timestamp with time zone,

  paused\_reason\_code text,

  source text NOT NULL DEFAULT 'onboarding'::text CHECK (source \= ANY (ARRAY\['onboarding'::text, 'luma'::text, 'clinician'::text, 'user\_choice'::text\])),

  organization\_id uuid,

  individual\_id uuid,

  CONSTRAINT journey\_instances\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_instances\_template\_id\_fkey FOREIGN KEY (template\_id) REFERENCES public.journey\_template(id),

  CONSTRAINT journey\_instances\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT journey\_instances\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.journey\_real\_world\_triggers (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  journey\_instance\_id uuid NOT NULL,

  scene\_number integer NOT NULL CHECK (scene\_number \>= 1 AND scene\_number \<= 50),

  trigger\_kind USER-DEFINED NOT NULL,

  trigger\_payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  mindblock\_challenged ARRAY DEFAULT '{}'::text\[\],

  transfer\_success boolean,

  CONSTRAINT journey\_real\_world\_triggers\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_real\_world\_triggers\_journey\_instance\_id\_fkey FOREIGN KEY (journey\_instance\_id) REFERENCES public.journey\_instances(id)

);

CREATE TABLE public.journey\_resistance\_checks (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  journey\_instance\_id uuid NOT NULL,

  scene\_number integer NOT NULL CHECK (scene\_number \>= 1 AND scene\_number \<= 50),

  value\_num smallint NOT NULL CHECK (value\_num \>= 0 AND value\_num \<= 100),

  hesitation\_ms integer CHECK (hesitation\_ms IS NULL OR hesitation\_ms \>= 0),

  notes text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  mindblock\_inferred ARRAY DEFAULT '{}'::text\[\],

  resistance\_kind text,

  CONSTRAINT journey\_resistance\_checks\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_resistance\_checks\_journey\_instance\_id\_fkey FOREIGN KEY (journey\_instance\_id) REFERENCES public.journey\_instances(id)

);

CREATE TABLE public.journey\_runs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  template\_id text NOT NULL,

  user\_id uuid,

  status text NOT NULL DEFAULT 'pending'::text CHECK (status \= ANY (ARRAY\['pending'::text, 'running'::text, 'paused'::text, 'completed'::text, 'failed'::text, 'canceled'::text\])),

  started\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT journey\_runs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.journey\_scene\_captures (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  journey\_instance\_id uuid NOT NULL,

  scene\_number integer NOT NULL CHECK (scene\_number \>= 1 AND scene\_number \<= 50),

  capture\_kind USER-DEFINED NOT NULL DEFAULT 'none'::journey\_capture\_kind,

  capture\_text text,

  capture\_storage\_path text,

  arousal\_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,

  tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  luma\_extracted jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  mindblock\_self\_report ARRAY DEFAULT '{}'::text\[\],

  mindblock\_inferred ARRAY DEFAULT '{}'::text\[\],

  mindblock\_confidence jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT journey\_scene\_captures\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_scene\_captures\_journey\_instance\_id\_fkey FOREIGN KEY (journey\_instance\_id) REFERENCES public.journey\_instances(id)

);

CREATE TABLE public.journey\_scene\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  journey\_instance\_id uuid NOT NULL,

  scene\_number integer NOT NULL CHECK (scene\_number \>= 1 AND scene\_number \<= 50),

  event\_type USER-DEFINED NOT NULL,

  event\_payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  client\_ts timestamp with time zone,

  client\_session\_id text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT journey\_scene\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_scene\_events\_journey\_instance\_id\_fkey FOREIGN KEY (journey\_instance\_id) REFERENCES public.journey\_instances(id)

);

CREATE TABLE public.journey\_scene\_targets (

  template\_id text NOT NULL,

  scene\_number integer NOT NULL CHECK (scene\_number \>= 1 AND scene\_number \<= 50),

  scope\_type text NOT NULL CHECK (scope\_type \= ANY (ARRAY\['schema'::text, 'family'::text, 'mindblock'::text, 'pillar'::text, 'concept'::text, 'theme'::text\])),

  schema\_id text NOT NULL,

  family\_id uuid NOT NULL,

  mindblock\_id uuid NOT NULL,

  pillar\_id text NOT NULL,

  concept\_id text NOT NULL,

  theme\_id text NOT NULL,

  weight numeric,

  is\_primary boolean DEFAULT false,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT journey\_scene\_targets\_pkey PRIMARY KEY (template\_id, scene\_number, scope\_type, schema\_id, family\_id, mindblock\_id, pillar\_id, concept\_id, theme\_id),

  CONSTRAINT journey\_scene\_targets\_template\_id\_fkey FOREIGN KEY (template\_id) REFERENCES public.journey\_template(id)

);

CREATE TABLE public.journey\_target\_diagnostics (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  template\_id text NOT NULL,

  scene\_number integer NOT NULL,

  source text NOT NULL,

  raw\_value text NOT NULL,

  reason text NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT journey\_target\_diagnostics\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.journey\_template (

  id text NOT NULL,

  slug text,

  title text,

  pillar\_id text,

  pillar\_name text,

  sprint\_number bigint,

  duration\_days bigint,

  description text,

  primary\_mantra text,

  has\_audio boolean,

  audio\_voice\_id text,

  status text CHECK (status \= ANY (ARRAY\['draft'::text, 'review'::text, 'active'::text, 'archived'::text\])),

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  mindblock\_targets ARRAY DEFAULT '{}'::text\[\],

  schema\_targets ARRAY DEFAULT '{}'::text\[\],

  contraindicated\_mindblocks ARRAY DEFAULT '{}'::text\[\],

  mindblock\_intent text,

  CONSTRAINT journey\_template\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_template\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id)

);

CREATE TABLE public.journey\_template\_scenes (

  template\_id text NOT NULL,

  scene\_number bigint NOT NULL,

  scene\_key text,

  phase text,

  scene\_type text CHECK (scene\_type \= ANY (ARRAY\['intro\_teaching'::text, 'experience\_teaching'::text, 'experience\_cue'::text, 'experience\_reflection'::text, 'bridge'::text, 'recognize\_teaching'::text, 'recognize\_cue'::text, 'recognize\_reflection'::text, 'align\_teaching'::text, 'align\_cue'::text, 'align\_reflection'::text, 'integration'::text\])),

  headline text,

  narration\_text text,

  prompt text,

  input\_type text CHECK (input\_type \= ANY (ARRAY\['none'::text, 'text'::text, 'voice'::text, 'slider'::text, 'binary'::text, 'tap'::text\])),

  has\_audio boolean NOT NULL DEFAULT false,

  audio\_track\_type text CHECK (audio\_track\_type \= ANY (ARRAY\['ember'::text, 'flame'::text, 'spark'::text, 'none'::text\])),

  audio\_object\_path text,

  requires\_real\_world\_trigger boolean NOT NULL DEFAULT false,

  requires\_resistance\_check boolean NOT NULL DEFAULT false,

  response\_contract\_json jsonb CHECK (response\_contract\_json IS NULL OR jsonb\_typeof(response\_contract\_json) \= 'object'::text),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  era\_phase text CHECK (era\_phase \= ANY (ARRAY\['context'::text, 'experience'::text, 'recognize'::text, 'align'::text, 'reflection'::text\])),

  mindblock\_targets ARRAY DEFAULT '{}'::text\[\],

  mindblock\_prompt\_style text,

  mindblock\_probe text,

  mindblock\_resolution\_move text,

  move\_key text,

  stage\_key text,

  state\_band text,

  guidance\_mode\_key text,

  receipt\_type\_keys ARRAY DEFAULT '{}'::text\[\],

  real\_life\_check\_keys ARRAY DEFAULT '{}'::text\[\],

  CONSTRAINT journey\_template\_scenes\_pkey PRIMARY KEY (id),

  CONSTRAINT journey\_template\_scenes\_template\_id\_fkey FOREIGN KEY (template\_id) REFERENCES public.journey\_template(id),

  CONSTRAINT journey\_template\_scenes\_guidance\_mode\_key\_fkey FOREIGN KEY (guidance\_mode\_key) REFERENCES public.guidance\_modes(mode\_key)

);

CREATE TABLE public.jw\_media (

  media\_id text NOT NULL,

  title text,

  description text,

  tags\_text text,

  tags ARRAY,

  status text,

  duration double precision,

  imported\_at timestamp with time zone DEFAULT now(),

  language text,

  transcript text,

  summary text,

  search\_tsv tsvector,

  promo boolean NOT NULL DEFAULT false,

  content\_type text NOT NULL DEFAULT 'full'::text CHECK (content\_type \= ANY (ARRAY\['full'::text, 'clip'::text, 'promo'::text\])),

  CONSTRAINT jw\_media\_pkey PRIMARY KEY (media\_id)

);

CREATE TABLE public.kbe\_transitions (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  scope\_type text NOT NULL CHECK (scope\_type \= ANY (ARRAY\['schema'::text, 'family'::text, 'mindblock'::text, 'ladder'::text, 'rung'::text\])),

  scope\_key text NOT NULL,

  from\_stage text,

  to\_stage text NOT NULL CHECK (to\_stage \= ANY (ARRAY\['knowing'::text, 'believing'::text, 'embodying'::text\])),

  triggered\_by\_event jsonb DEFAULT '{}'::jsonb,

  triggered\_at timestamp with time zone NOT NULL DEFAULT now(),

  trace\_id uuid,

  CONSTRAINT kbe\_transitions\_pkey PRIMARY KEY (id),

  CONSTRAINT kbe\_transitions\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.kernel\_dead\_letters (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  job\_id uuid,

  error text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT kernel\_dead\_letters\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.kernel\_decision\_log (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  bandit\_decision\_id uuid,

  individual\_id uuid NOT NULL,

  policy\_id text,

  policy\_version text,

  decision\_source text NOT NULL CHECK (decision\_source \= ANY (ARRAY\['policy\_ai'::text, 'clinician\_plan'::text, 'user\_pull'::text, 'safety\_override'::text, 'protocol\_rail'::text\])),

  bucket text CHECK (bucket \= ANY (ARRAY\['DOWN\_SHIFT'::text, 'TRANSFER'::text, 'GROWTH'::text, 'SUPPORT'::text\])),

  intent text,

  chosen\_type text NOT NULL CHECK (chosen\_type \= ANY (ARRAY\['navicue'::text, 'block'::text, 'sequence'::text, 'practice'::text, 'checkin'::text, 'journey\_scene'::text, 'social\_move'::text\])),

  chosen\_id text NOT NULL,

  context jsonb NOT NULL DEFAULT '{}'::jsonb,

  rationale jsonb NOT NULL DEFAULT '{}'::jsonb,

  expected\_effect jsonb DEFAULT '{}'::jsonb,

  measurement\_contract jsonb DEFAULT '{}'::jsonb,

  deployment\_refs jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT kernel\_decision\_log\_pkey PRIMARY KEY (id),

  CONSTRAINT kernel\_decision\_log\_bandit\_decision\_id\_fkey FOREIGN KEY (bandit\_decision\_id) REFERENCES public.bandit\_decisions(id),

  CONSTRAINT kernel\_decision\_log\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.kernel\_jobs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  topic text NOT NULL,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  status text NOT NULL DEFAULT 'queued'::text,

  run\_at timestamp with time zone DEFAULT now(),

  attempts integer NOT NULL DEFAULT 0,

  last\_error text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT kernel\_jobs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.kv\_store\_3040d0df (

  key text NOT NULL,

  value jsonb NOT NULL,

  CONSTRAINT kv\_store\_3040d0df\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.kv\_store\_49b28b8a (

  key text NOT NULL,

  value jsonb NOT NULL,

  CONSTRAINT kv\_store\_49b28b8a\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.ladder\_rungs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  ladder\_id uuid NOT NULL,

  rung\_no integer NOT NULL CHECK (rung\_no \>= 1),

  label text NOT NULL,

  criteria\_md text,

  CONSTRAINT ladder\_rungs\_pkey PRIMARY KEY (id),

  CONSTRAINT ladder\_rungs\_ladder\_id\_fkey FOREIGN KEY (ladder\_id) REFERENCES public.belief\_ladders(id)

);

CREATE TABLE public.leader\_lenses (

  leader\_id text NOT NULL,

  lens\_id text NOT NULL,

  weight numeric DEFAULT 1,

  notes\_md text,

  CONSTRAINT leader\_lenses\_pkey PRIMARY KEY (leader\_id, lens\_id),

  CONSTRAINT leader\_lenses\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id),

  CONSTRAINT leader\_lenses\_lens\_id\_fkey FOREIGN KEY (lens\_id) REFERENCES public.lens\_catalog(id)

);

CREATE TABLE public.leader\_quotes (

  id bigint NOT NULL DEFAULT nextval('leader\_quotes\_id\_seq'::regclass),

  leader\_id text NOT NULL,

  quote\_md text NOT NULL,

  source\_id bigint,

  context\_tags ARRAY DEFAULT '{}'::text\[\],

  CONSTRAINT leader\_quotes\_pkey PRIMARY KEY (id),

  CONSTRAINT leader\_quotes\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id),

  CONSTRAINT leader\_quotes\_source\_id\_fkey FOREIGN KEY (source\_id) REFERENCES public.sources(id)

);

CREATE TABLE public.leader\_sources (

  id bigint NOT NULL DEFAULT nextval('leader\_sources\_id\_seq'::regclass),

  leader\_id text,

  title text NOT NULL,

  year integer,

  doi text,

  url text,

  source\_id bigint,

  notes\_md text,

  doi\_norm text DEFAULT COALESCE(doi, ''::text),

  url\_norm text DEFAULT COALESCE(url, ''::text),

  title\_norm text DEFAULT COALESCE(title, ''::text),

  CONSTRAINT leader\_sources\_pkey PRIMARY KEY (id),

  CONSTRAINT leader\_sources\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id),

  CONSTRAINT leader\_sources\_source\_id\_fkey FOREIGN KEY (source\_id) REFERENCES public.sources(id)

);

CREATE TABLE public.lens\_catalog (

  id text NOT NULL,

  name text NOT NULL,

  description\_md text,

  constructs jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT lens\_catalog\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.lens\_leaders (

  lens\_id text NOT NULL,

  leader\_id text NOT NULL,

  angle text,

  weight numeric DEFAULT 1,

  notes\_md text,

  CONSTRAINT lens\_leaders\_pkey PRIMARY KEY (lens\_id, leader\_id),

  CONSTRAINT lens\_leaders\_lens\_id\_fkey FOREIGN KEY (lens\_id) REFERENCES public.lens\_catalog(id),

  CONSTRAINT lens\_leaders\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id)

);

CREATE TABLE public.lens\_mindblocks (

  lens\_id text NOT NULL,

  mindblock\_id uuid NOT NULL,

  weight numeric DEFAULT 1.0,

  notes\_md text,

  CONSTRAINT lens\_mindblocks\_pkey PRIMARY KEY (lens\_id, mindblock\_id),

  CONSTRAINT lens\_mindblocks\_lens\_id\_fkey FOREIGN KEY (lens\_id) REFERENCES public.lens\_catalog(id),

  CONSTRAINT lens\_mindblocks\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.lesson\_progress (

  user\_id uuid NOT NULL,

  lesson\_id bigint NOT NULL,

  step\_no integer NOT NULL,

  done\_at timestamp with time zone DEFAULT now(),

  individual\_id uuid,

  CONSTRAINT lesson\_progress\_pkey PRIMARY KEY (user\_id, lesson\_id, step\_no),

  CONSTRAINT lesson\_progress\_lesson\_id\_fkey FOREIGN KEY (lesson\_id) REFERENCES public.micro\_lessons(id),

  CONSTRAINT lesson\_progress\_individual\_fk FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.luma\_conversations (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  title text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT luma\_conversations\_pkey PRIMARY KEY (id),

  CONSTRAINT luma\_conversations\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT luma\_conversations\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.luma\_messages (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  conversation\_id uuid NOT NULL,

  sender text NOT NULL CHECK (sender \= ANY (ARRAY\['user'::text, 'luma'::text, 'clinician'::text\])),

  content text,

  metadata jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT luma\_messages\_pkey PRIMARY KEY (id),

  CONSTRAINT luma\_messages\_conversation\_id\_fkey FOREIGN KEY (conversation\_id) REFERENCES public.luma\_conversations(id)

);

CREATE TABLE public.marker\_observations (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  block\_id text,

  observed\_at timestamp with time zone DEFAULT now(),

  source text NOT NULL DEFAULT 'navicue\_response'::text,

  deployment\_kind text,

  deployment\_id text,

  markers jsonb NOT NULL DEFAULT '{}'::jsonb,

  meta jsonb DEFAULT '{}'::jsonb,

  individual\_id uuid,

  CONSTRAINT marker\_observations\_pkey PRIMARY KEY (id),

  CONSTRAINT marker\_observations\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id),

  CONSTRAINT marker\_observations\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id)

);

CREATE TABLE public.media (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  provider text NOT NULL,

  provider\_id text NOT NULL,

  title text,

  description text,

  duration integer,

  tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  classification text,

  raw jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at\_provider timestamp with time zone,

  updated\_at\_provider timestamp with time zone,

  inserted\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT media\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.media\_assets (

  id bigint NOT NULL DEFAULT nextval('media\_assets\_id\_seq'::regclass),

  kind USER-DEFINED NOT NULL,

  storage\_path text NOT NULL,

  alt text,

  duration\_sec integer,

  meta jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT media\_assets\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.media\_enrich\_runs (

  id bigint NOT NULL DEFAULT nextval('media\_enrich\_runs\_id\_seq'::regclass),

  started\_at timestamp with time zone NOT NULL DEFAULT now(),

  finished\_at timestamp with time zone,

  status text NOT NULL DEFAULT 'queued'::text CHECK (status \= ANY (ARRAY\['queued'::text, 'running'::text, 'succeeded'::text, 'failed'::text\])),

  bucket text NOT NULL,

  prefix text,

  total\_files integer,

  processed\_files integer DEFAULT 0,

  succeeded integer DEFAULT 0,

  failed integer DEFAULT 0,

  error text,

  CONSTRAINT media\_enrich\_runs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.media\_jobs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  job\_type text NOT NULL CHECK (job\_type \= ANY (ARRAY\['transcribe'::text, 'summarize'::text, 'tag'::text, 'fetch\_metadata'::text, 'ingest'::text, 'other'::text, 'classify'::text\])),

  jw\_media\_id text,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  status text NOT NULL DEFAULT 'queued'::text CHECK (status \= ANY (ARRAY\['queued'::text, 'claimed'::text, 'done'::text, 'error'::text\])),

  attempts integer NOT NULL DEFAULT 0 CHECK (attempts \>= 0),

  last\_error text,

  result jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT media\_jobs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.messages (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  room\_id uuid NOT NULL,

  user\_id uuid NOT NULL,

  content text NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  individual\_id uuid,

  CONSTRAINT messages\_pkey PRIMARY KEY (id),

  CONSTRAINT messages\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.metric\_config (

  key text NOT NULL,

  value\_num numeric,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT metric\_config\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.metric\_definitions (

  metric\_key text NOT NULL,

  name text NOT NULL,

  description\_md text,

  version integer NOT NULL DEFAULT 1,

  formula jsonb NOT NULL DEFAULT '{}'::jsonb,

  depends\_on\_signals ARRAY NOT NULL DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT metric\_definitions\_pkey PRIMARY KEY (metric\_key)

);

CREATE TABLE public.micro\_lessons (

  id bigint NOT NULL DEFAULT nextval('micro\_lessons\_id\_seq'::regclass),

  slug text UNIQUE,

  title text NOT NULL,

  overview\_md text,

  level USER-DEFINED DEFAULT 'patient'::content\_level,

  status USER-DEFINED NOT NULL DEFAULT 'draft'::content\_status,

  pillar\_id text,

  concept\_id text,

  theme\_id text,

  block\_id text,

  tags ARRAY DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  status\_text text,

  CONSTRAINT micro\_lessons\_pkey PRIMARY KEY (id),

  CONSTRAINT micro\_lessons\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT micro\_lessons\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT micro\_lessons\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id),

  CONSTRAINT micro\_lessons\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id)

);

CREATE TABLE public.micro\_proofs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  mindblock\_id uuid,

  kind text NOT NULL,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT micro\_proofs\_pkey PRIMARY KEY (id),

  CONSTRAINT micro\_proofs\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT micro\_proofs\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT micro\_proofs\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.micro\_steps (

  id bigint NOT NULL DEFAULT nextval('micro\_steps\_id\_seq'::regclass),

  lesson\_id bigint NOT NULL,

  step\_no integer NOT NULL,

  prompt\_md text NOT NULL,

  practice jsonb DEFAULT '{}'::jsonb,

  quiz jsonb,

  measure\_key text,

  CONSTRAINT micro\_steps\_pkey PRIMARY KEY (id),

  CONSTRAINT micro\_steps\_lesson\_id\_fkey FOREIGN KEY (lesson\_id) REFERENCES public.micro\_lessons(id)

);

CREATE TABLE public.mind\_steps (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  pillar\_id text NOT NULL,

  title text NOT NULL,

  status text NOT NULL DEFAULT 'draft'::text,

  sort\_index integer NOT NULL DEFAULT 0,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT mind\_steps\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.mind\_steps\_insights (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  mind\_step\_id uuid NOT NULL,

  title text NOT NULL,

  block\_name text,

  block\_status text,

  estimated\_minutes integer,

  why\_it\_matters text,

  mechanism\_md text,

  key\_takeaway text,

  application\_instruction text,

  application\_example text,

  application\_outcome text,

  checkpoints jsonb NOT NULL DEFAULT '\[\]'::jsonb,

  practice\_connection jsonb NOT NULL DEFAULT '{}'::jsonb,

  related\_content jsonb NOT NULL DEFAULT '\[\]'::jsonb,

  status text NOT NULL DEFAULT 'draft'::text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  external\_id text UNIQUE,

  sort\_index integer,

  CONSTRAINT mind\_steps\_insights\_pkey PRIMARY KEY (id),

  CONSTRAINT mind\_steps\_insights\_mind\_step\_id\_fkey FOREIGN KEY (mind\_step\_id) REFERENCES public.mind\_steps(id)

);

CREATE TABLE public.mindblock\_claims (

  mindblock\_id uuid NOT NULL,

  claim\_id uuid NOT NULL,

  role text DEFAULT 'rationale'::text CHECK (role \= ANY (ARRAY\['rationale'::text, 'mechanism'::text, 'measurement'::text, 'contraindication'::text, 'example'::text\])),

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 2::numeric),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT mindblock\_claims\_pkey PRIMARY KEY (mindblock\_id, claim\_id),

  CONSTRAINT mindblock\_claims\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT mindblock\_claims\_claim\_id\_fkey FOREIGN KEY (claim\_id) REFERENCES public.claims(id)

);

CREATE TABLE public.mindblock\_dedupe\_queue (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  candidate\_a uuid NOT NULL,

  candidate\_b uuid NOT NULL,

  match\_type text NOT NULL CHECK (match\_type \= ANY (ARRAY\['name'::text, 'limiting\_belief'::text, 'new\_truth'::text, 'mixed'::text, 'manual'::text\])),

  similarity numeric NOT NULL CHECK (similarity \>= 0::numeric AND similarity \<= 1::numeric),

  status text NOT NULL DEFAULT 'open'::text CHECK (status \= ANY (ARRAY\['open'::text, 'reviewing'::text, 'resolved'::text, 'dismissed'::text\])),

  resolution text CHECK (resolution \= ANY (ARRAY\['merge'::text, 'keep\_distinct'::text, 'related'::text, 'redirect'::text, 'dismiss'::text\])),

  canonical\_id uuid,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  resolved\_at timestamp with time zone,

  candidate\_lo uuid DEFAULT LEAST(candidate\_a, candidate\_b),

  candidate\_hi uuid DEFAULT GREATEST(candidate\_a, candidate\_b),

  CONSTRAINT mindblock\_dedupe\_queue\_pkey PRIMARY KEY (id),

  CONSTRAINT mindblock\_dedupe\_queue\_candidate\_a\_fkey FOREIGN KEY (candidate\_a) REFERENCES public.mindblocks(id),

  CONSTRAINT mindblock\_dedupe\_queue\_candidate\_b\_fkey FOREIGN KEY (candidate\_b) REFERENCES public.mindblocks(id),

  CONSTRAINT mindblock\_dedupe\_queue\_canonical\_id\_fkey FOREIGN KEY (canonical\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.mindblock\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  source\_kind text NOT NULL CHECK (source\_kind \= ANY (ARRAY\['journey'::text, 'navicue'::text, 'toolkit'::text, 'talk'::text, 'voice'::text, 'state'::text\])),

  source\_ref uuid,

  content\_ref uuid,

  journey\_instance\_id uuid,

  journey\_template\_id text,

  scene\_key text,

  mindblock\_key text NOT NULL,

  signal\_type text NOT NULL CHECK (signal\_type \= ANY (ARRAY\['activation'::text, 'resistance'::text, 'avoidance'::text, 'release'::text, 'reframe'::text, 'alignment\_choice'::text, 'transfer'::text, 'connection'::text, 'shame\_threat'::text\])),

  signal\_strength numeric NOT NULL DEFAULT 0.5 CHECK (signal\_strength \>= 0::numeric AND signal\_strength \<= 1::numeric),

  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT mindblock\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT mindblock\_events\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id),

  CONSTRAINT mindblock\_events\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT mindblock\_events\_journey\_instance\_id\_fkey FOREIGN KEY (journey\_instance\_id) REFERENCES public.journey\_instances(id),

  CONSTRAINT mindblock\_events\_journey\_template\_id\_fkey FOREIGN KEY (journey\_template\_id) REFERENCES public.journey\_template(id)

);

CREATE TABLE public.mindblock\_evidence\_links (

  mindblock\_id uuid NOT NULL,

  evidence\_key text NOT NULL,

  relation text NOT NULL,

  weight numeric DEFAULT 1.0,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT mindblock\_evidence\_links\_pkey PRIMARY KEY (mindblock\_id, evidence\_key, relation),

  CONSTRAINT mindblock\_evidence\_links\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT mindblock\_evidence\_links\_evidence\_key\_fkey FOREIGN KEY (evidence\_key) REFERENCES public.evidence\_registry(key)

);

CREATE TABLE public.mindblock\_families (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  code text UNIQUE,

  name text NOT NULL,

  description\_md text,

  pillar\_id text,

  concept\_id text,

  theme\_id text,

  mechanism text,

  clinical\_rationale text,

  limiting\_pattern text,

  new\_truth\_pattern text,

  tags ARRAY DEFAULT '{}'::text\[\],

  is\_active boolean DEFAULT true,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  evidence\_status text DEFAULT 'draft'::text CHECK (evidence\_status \= ANY (ARRAY\['draft'::text, 'evidence\_pending'::text, 'reviewed'::text, 'published'::text, 'contested'::text\])),

  evidence\_score numeric,

  last\_reviewed\_at timestamp with time zone,

  slug text UNIQUE,

  schema\_id text,

  typical\_policies ARRAY DEFAULT '{}'::text\[\],

  probe\_hints jsonb DEFAULT '{}'::jsonb,

  coping\_direction text CHECK (coping\_direction IS NULL OR (coping\_direction \= ANY (ARRAY\['surrender'::text, 'avoidance'::text, 'overcompensation'::text, 'safety\_behaviours'::text, 'relief\_shortcuts'::text\]))),

  short\_term\_payoff text,

  long\_term\_cost text,

  default\_move\_keys ARRAY DEFAULT '{}'::text\[\],

  default\_receipt\_types ARRAY DEFAULT '{}'::text\[\],

  default\_real\_life\_checks ARRAY DEFAULT '{}'::text\[\],

  CONSTRAINT mindblock\_families\_pkey PRIMARY KEY (id),

  CONSTRAINT mindblock\_families\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT mindblock\_families\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT mindblock\_families\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id)

);

CREATE TABLE public.mindblock\_family\_members (

  family\_id uuid NOT NULL,

  mindblock\_id uuid NOT NULL,

  role text DEFAULT 'core'::text CHECK (role \= ANY (ARRAY\['core'::text, 'variant'::text, 'probe'::text, 'red\_flag'::text, 'contra'::text, 'edge'::text\])),

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 2::numeric),

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT mindblock\_family\_members\_pkey PRIMARY KEY (family\_id, mindblock\_id),

  CONSTRAINT mindblock\_family\_members\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT mindblock\_family\_members\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.mindblock\_family\_membership (

  family\_id uuid NOT NULL,

  mindblock\_id uuid NOT NULL,

  role text DEFAULT 'core'::text CHECK (role \= ANY (ARRAY\['core'::text, 'variant'::text, 'probe'::text, 'intervention'::text, 'contra'::text\])),

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 2::numeric),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT mindblock\_family\_membership\_pkey PRIMARY KEY (family\_id, mindblock\_id),

  CONSTRAINT mindblock\_family\_membership\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT mindblock\_family\_membership\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.mindblock\_leaders (

  mindblock\_id uuid NOT NULL,

  leader\_id text NOT NULL,

  angle text,

  weight numeric DEFAULT 1.0,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT mindblock\_leaders\_pkey PRIMARY KEY (mindblock\_id, leader\_id),

  CONSTRAINT mindblock\_leaders\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT mindblock\_leaders\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id)

);

CREATE TABLE public.mindblock\_lenses (

  mindblock\_id uuid NOT NULL,

  lens\_id text NOT NULL,

  weight numeric NOT NULL DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 5::numeric),

  notes\_md text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT mindblock\_lenses\_pkey PRIMARY KEY (mindblock\_id, lens\_id),

  CONSTRAINT mindblock\_lenses\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT mindblock\_lenses\_lens\_id\_fkey FOREIGN KEY (lens\_id) REFERENCES public.lens\_catalog(id)

);

CREATE TABLE public.mindblock\_redirects (

  from\_id uuid NOT NULL,

  to\_id uuid NOT NULL,

  reason text DEFAULT 'dedupe'::text,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT mindblock\_redirects\_pkey PRIMARY KEY (from\_id),

  CONSTRAINT mindblock\_redirects\_from\_id\_fkey FOREIGN KEY (from\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT mindblock\_redirects\_to\_id\_fkey FOREIGN KEY (to\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.mindblock\_schemas (

  mindblock\_id uuid NOT NULL,

  schema\_id text NOT NULL,

  weight numeric NOT NULL DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 5::numeric),

  is\_primary boolean NOT NULL DEFAULT false,

  notes\_md text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT mindblock\_schemas\_pkey PRIMARY KEY (mindblock\_id, schema\_id),

  CONSTRAINT mindblock\_schemas\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT mindblock\_schemas\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.mindblocks (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  code text UNIQUE,

  name text NOT NULL,

  description\_md text,

  pillar\_id text,

  theme\_id text,

  tags ARRAY DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  limiting\_belief text,

  new\_truth text,

  clinical\_rationale text,

  mechanism text,

  sort\_order integer,

  concept\_id text,

  evidence\_status text DEFAULT 'draft'::text CHECK (evidence\_status \= ANY (ARRAY\['draft'::text, 'evidence\_pending'::text, 'reviewed'::text, 'published'::text, 'contested'::text\])),

  evidence\_score numeric,

  last\_reviewed\_at timestamp with time zone,

  variant\_key text,

  variant\_meta jsonb DEFAULT '{}'::jsonb,

  dedupe\_fingerprint text DEFAULT regexp\_replace(lower(btrim(((((COALESCE(name, ''::text) || ' '::text) || COALESCE(limiting\_belief, ''::text)) || ' '::text) || COALESCE(new\_truth, ''::text)))), '\\s+'::text, ' '::text, 'g'::text),

  CONSTRAINT mindblocks\_pkey PRIMARY KEY (id),

  CONSTRAINT mindblocks\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id)

);

CREATE TABLE public.momentum (

  user\_id uuid NOT NULL,

  week\_start date NOT NULL,

  summary jsonb,

  CONSTRAINT momentum\_pkey PRIMARY KEY (user\_id, week\_start),

  CONSTRAINT momentum\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.moods (

  slug text NOT NULL,

  name text NOT NULL,

  CONSTRAINT moods\_pkey PRIMARY KEY (slug)

);

CREATE TABLE public.mv\_refresh\_logs (

  id bigint NOT NULL DEFAULT nextval('mv\_refresh\_logs\_id\_seq'::regclass),

  started\_at timestamp with time zone NOT NULL DEFAULT now(),

  finished\_at timestamp with time zone,

  success boolean,

  error\_text text,

  duration\_ms integer CHECK (duration\_ms IS NULL OR duration\_ms \>= 0),

  triggered\_by text DEFAULT 'cron'::text,

  CONSTRAINT mv\_refresh\_logs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.navicue\_content\_registry (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  library\_id text NOT NULL,

  variant\_id uuid,

  content\_type text NOT NULL,

  name text NOT NULL,

  body jsonb NOT NULL DEFAULT '{}'::jsonb,

  checksum text,

  variant\_id\_coalesced uuid DEFAULT COALESCE(variant\_id, '00000000-0000-0000-0000-000000000000'::uuid),

  CONSTRAINT navicue\_content\_registry\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_content\_registry\_library\_id\_fkey FOREIGN KEY (library\_id) REFERENCES public.navicue\_library(id),

  CONSTRAINT navicue\_content\_registry\_variant\_id\_fkey FOREIGN KEY (variant\_id) REFERENCES public.navicue\_variants(id)

);

CREATE TABLE public.navicue\_deployments (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  navicue\_id text NOT NULL,

  deployed\_at timestamp with time zone DEFAULT now(),

  response\_data jsonb,

  response\_time\_seconds integer,

  skipped boolean DEFAULT false,

  context jsonb,

  voice\_id text,

  rationale jsonb DEFAULT '{}'::jsonb CHECK (rationale IS NULL OR jsonb\_typeof(rationale) \= 'object'::text),

  content\_ref uuid,

  experiment\_key text,

  experiment\_id uuid,

  variant\_key text,

  variant\_id uuid,

  decision\_source USER-DEFINED DEFAULT 'policy\_ai'::decision\_source\_enum,

  individual\_id uuid,

  CONSTRAINT navicue\_deployments\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_deployments\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicue\_library(id),

  CONSTRAINT navicue\_deployments\_voice\_fk FOREIGN KEY (voice\_id) REFERENCES public.voice\_archetypes(id),

  CONSTRAINT navicue\_deployments\_navicue\_library\_fk FOREIGN KEY (navicue\_id) REFERENCES public.navicue\_library(id),

  CONSTRAINT navicue\_deployments\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.navicue\_deployments\_v2 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  navicue\_id uuid NOT NULL,

  delivered\_at timestamp with time zone NOT NULL DEFAULT now(),

  delivery\_id uuid,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT navicue\_deployments\_v2\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_deployments\_v2\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues\_v2(id)

);

CREATE TABLE public.navicue\_form\_catalog (

  form\_slug text NOT NULL,

  label text NOT NULL,

  defaults jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (defaults ? 'component\_type'::text AND ((defaults \-\>\> 'component\_type'::text)::component\_type) IS NOT NULL),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT navicue\_form\_catalog\_pkey PRIMARY KEY (form\_slug)

);

CREATE TABLE public.navicue\_library (

  id text NOT NULL,

  type\_id text NOT NULL,

  pillar\_id text,

  theme\_id text,

  text\_line text NOT NULL,

  audio\_url text,

  video\_url text,

  response\_type text NOT NULL CHECK (response\_type \= ANY (ARRAY\['tap'::text, 'binary'::text, 'slider'::text, 'one\_word'::text, 'breath'::text, 'hold'::text, 'none'::text\])),

  response\_options jsonb,

  personalization jsonb,

  min\_day\_in\_journey integer,

  max\_day\_in\_journey integer,

  requires\_mindblock\_state jsonb,

  is\_curveball boolean DEFAULT false,

  tags ARRAY,

  status text DEFAULT 'active'::text,

  kbe\_target text CHECK (kbe\_target \= ANY (ARRAY\['knowing'::text, 'believing'::text, 'embodying'::text\])),

  created\_at timestamp with time zone DEFAULT now(),

  navicue\_pk text,

  heat\_level text DEFAULT 'medium'::text CHECK (heat\_level \= ANY (ARRAY\['low'::text, 'medium'::text, 'high'::text\])),

  primary\_schema\_id uuid,

  updated\_at timestamp with time zone,

  CONSTRAINT navicue\_library\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_library\_type\_id\_fkey FOREIGN KEY (type\_id) REFERENCES public.navicue\_types(id),

  CONSTRAINT navicue\_library\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT navicue\_library\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id),

  CONSTRAINT navicue\_library\_navicue\_pk\_fkey FOREIGN KEY (navicue\_pk) REFERENCES public.navicues(id)

);

CREATE TABLE public.navicue\_library\_staging (

  id text,

  type\_id text,

  pillar\_id text,

  theme\_id text,

  text\_line text,

  audio\_url text,

  video\_url text,

  response\_type text,

  response\_options jsonb,

  personalization jsonb,

  min\_day\_in\_journey integer,

  max\_day\_in\_journey integer,

  requires\_mindblock\_state jsonb,

  is\_curveball boolean,

  tags ARRAY,

  status text,

  kbe\_target text

);

CREATE TABLE public.navicue\_mindblocks (

  navicue\_id text NOT NULL,

  mindblock\_id uuid NOT NULL,

  relevance\_strength numeric,

  CONSTRAINT navicue\_mindblocks\_pkey PRIMARY KEY (navicue\_id, mindblock\_id),

  CONSTRAINT navicue\_mindblocks\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues(id),

  CONSTRAINT navicue\_mindblocks\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.navicue\_prompts (

  navicue\_id text NOT NULL,

  prompt\_id text NOT NULL,

  relation text DEFAULT 'delivers'::text,

  CONSTRAINT navicue\_prompts\_pkey PRIMARY KEY (navicue\_id, prompt\_id),

  CONSTRAINT navicue\_prompts\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues(id),

  CONSTRAINT navicue\_prompts\_prompt\_id\_fkey FOREIGN KEY (prompt\_id) REFERENCES public.prompt\_templates(id)

);

CREATE TABLE public.navicue\_responses (

  id bigint NOT NULL DEFAULT nextval('navicue\_responses\_id\_seq'::regclass),

  navicue\_id text NOT NULL,

  theme\_id text,

  pillar\_id text,

  captured\_at timestamp with time zone DEFAULT now(),

  capture\_type text NOT NULL CHECK (capture\_type \= ANY (ARRAY\['tap'::text, 'one\_word'::text, 'slider'::text, 'voice10'::text, 'none'::text\])),

  hesitation\_ms integer,

  response\_text text,

  response\_choice text,

  response\_slider numeric,

  valence\_smallint smallint,

  context text,

  kbe\_target USER-DEFINED,

  meta jsonb DEFAULT '{}'::jsonb,

  deployment\_id uuid,

  navicue\_library\_id text,

  exposure\_id uuid,

  queue\_id uuid,

  voice\_id text,

  individual\_id uuid NOT NULL,

  CONSTRAINT navicue\_responses\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_responses\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues(id),

  CONSTRAINT navicue\_responses\_queue\_fk FOREIGN KEY (queue\_id) REFERENCES public.user\_feed\_queue\_v2(id),

  CONSTRAINT navicue\_responses\_voice\_fk FOREIGN KEY (voice\_id) REFERENCES public.voice\_archetypes(id),

  CONSTRAINT navicue\_responses\_deployment\_fk FOREIGN KEY (deployment\_id) REFERENCES public.navicue\_deployments(id),

  CONSTRAINT navicue\_responses\_library\_fk FOREIGN KEY (navicue\_library\_id) REFERENCES public.navicue\_library(id),

  CONSTRAINT navicue\_responses\_exposure\_fk FOREIGN KEY (exposure\_id) REFERENCES public.feed\_exposures(id),

  CONSTRAINT navicue\_responses\_individual\_fk FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.navicue\_responses\_v2 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  deployment\_id uuid,

  navicue\_id uuid NOT NULL,

  response\_type USER-DEFINED NOT NULL,

  response jsonb NOT NULL,

  latency\_ms integer,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT navicue\_responses\_v2\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_responses\_v2\_deployment\_id\_fkey FOREIGN KEY (deployment\_id) REFERENCES public.navicue\_deployments\_v2(id),

  CONSTRAINT navicue\_responses\_v2\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues\_v2(id)

);

CREATE TABLE public.navicue\_route\_events (

  id bigint NOT NULL DEFAULT nextval('navicue\_route\_events\_id\_seq'::regclass),

  event\_type text NOT NULL CHECK (event\_type \= ANY (ARRAY\['route'::text, 'complete'::text\])),

  schema\_id text,

  navicue\_id text,

  status\_code integer NOT NULL,

  detail text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT navicue\_route\_events\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.navicue\_router (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  canonical\_navicue\_id text NOT NULL,

  variant\_key text,

  match\_expr jsonb NOT NULL DEFAULT '{}'::jsonb,

  active boolean NOT NULL DEFAULT true,

  CONSTRAINT navicue\_router\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.navicue\_schema\_capacity (

  schema\_id text NOT NULL,

  max\_concurrent integer,

  current\_load integer DEFAULT 0,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT navicue\_schema\_capacity\_pkey PRIMARY KEY (schema\_id)

);

CREATE TABLE public.navicue\_schema\_cooldowns (

  schema\_id text NOT NULL,

  cooldown\_ms integer,

  last\_used\_at timestamp with time zone,

  CONSTRAINT navicue\_schema\_cooldowns\_pkey PRIMARY KEY (schema\_id)

);

CREATE TABLE public.navicue\_schema\_map (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  navicue\_id text NOT NULL,

  schema\_id text NOT NULL,

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 5::numeric),

  rule\_source text DEFAULT 'manual'::text,

  notes text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT navicue\_schema\_map\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.navicue\_schemas (

  navicue\_id text NOT NULL,

  schema\_id text NOT NULL,

  weight numeric DEFAULT 1.0,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT navicue\_schemas\_pkey PRIMARY KEY (navicue\_id, schema\_id),

  CONSTRAINT navicue\_schemas\_navicue\_fk FOREIGN KEY (navicue\_id) REFERENCES public.navicues(id),

  CONSTRAINT navicue\_schemas\_schema\_fk FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.navicue\_steps\_v2 (

  navicue\_id uuid NOT NULL,

  step\_index integer NOT NULL CHECK (step\_index \>= 1 AND step\_index \<= 20),

  component\_type USER-DEFINED NOT NULL,

  response\_type USER-DEFINED NOT NULL,

  config jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT navicue\_steps\_v2\_pkey PRIMARY KEY (navicue\_id, step\_index),

  CONSTRAINT navicue\_steps\_v2\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues\_v2(id)

);

CREATE TABLE public.navicue\_targets\_v2 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  navicue\_id uuid NOT NULL,

  scope\_type USER-DEFINED NOT NULL,

  schema\_id text,

  family\_id uuid,

  mindblock\_id uuid,

  pillar\_id text,

  concept\_id text,

  theme\_id text,

  weight numeric,

  is\_primary boolean NOT NULL DEFAULT false,

  brain\_coordinate jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT navicue\_targets\_v2\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_targets\_v2\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues\_v2(id),

  CONSTRAINT navicue\_targets\_v2\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT navicue\_targets\_v2\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT navicue\_targets\_v2\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT navicue\_targets\_v2\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT navicue\_targets\_v2\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT navicue\_targets\_v2\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id)

);

CREATE TABLE public.navicue\_types (

  id text NOT NULL,

  family text NOT NULL,

  category text NOT NULL,

  purpose text NOT NULL,

  kbe\_layer text NOT NULL CHECK (kbe\_layer \= ANY (ARRAY\['knowing'::text, 'believing'::text, 'embodying'::text\])),

  deployment\_logic jsonb DEFAULT '{}'::jsonb,

  example\_text text,

  tags ARRAY,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT navicue\_types\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.navicue\_variants (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  library\_id text NOT NULL,

  key text NOT NULL,

  config jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT navicue\_variants\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_variants\_library\_id\_fkey FOREIGN KEY (library\_id) REFERENCES public.navicue\_library(id)

);

CREATE TABLE public.navicue\_variants\_v2 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  navicue\_id uuid NOT NULL,

  lens USER-DEFINED NOT NULL DEFAULT 'therapist'::council\_lens,

  language text NOT NULL DEFAULT 'en'::text,

  copy jsonb NOT NULL DEFAULT '{}'::jsonb,

  is\_default boolean NOT NULL DEFAULT false,

  version integer NOT NULL DEFAULT 1,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT navicue\_variants\_v2\_pkey PRIMARY KEY (id),

  CONSTRAINT navicue\_variants\_v2\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues\_v2(id)

);

CREATE TABLE public.navicue\_voices (

  navicue\_id text NOT NULL,

  voice\_id text NOT NULL,

  weight numeric DEFAULT 1,

  CONSTRAINT navicue\_voices\_pkey PRIMARY KEY (navicue\_id, voice\_id),

  CONSTRAINT navicue\_voices\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues(id),

  CONSTRAINT navicue\_voices\_voice\_id\_fkey FOREIGN KEY (voice\_id) REFERENCES public.voice\_archetypes(id)

);

CREATE TABLE public.navicues (

  id text NOT NULL,

  name text NOT NULL,

  hits ARRAY DEFAULT '{}'::text\[\],

  tags ARRAY DEFAULT '{}'::text\[\],

  payload jsonb NOT NULL,

  duration\_sec integer,

  state\_fit jsonb,

  safety\_flags ARRAY DEFAULT '{}'::text\[\],

  title text NOT NULL DEFAULT 'Untitled'::text,

  status USER-DEFINED DEFAULT 'draft'::navi\_status,

  intent ARRAY DEFAULT '{}'::text\[\],

  pillar\_links ARRAY DEFAULT '{}'::text\[\],

  modality ARRAY DEFAULT '{text}'::text\[\],

  type USER-DEFINED NOT NULL DEFAULT 'mirror'::navicue\_type,

  kbe\_target USER-DEFINED NOT NULL DEFAULT 'knowing'::kbe\_layer,

  curveball boolean DEFAULT false,

  context\_tags ARRAY DEFAULT '{}'::text\[\],

  measure\_hooks jsonb DEFAULT '{}'::jsonb,

  response\_contract jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  family text,

  family\_name text,

  type\_name text,

  practice\_liquidity\_score numeric,

  mechanism text,

  expected\_effect text,

  contraindications text,

  display\_format jsonb,

  audio\_url text,

  video\_url text,

  is\_active boolean DEFAULT true,

  modality\_simple text,

  neuro\_tags jsonb DEFAULT '{}'::jsonb,

  schema\_targets ARRAY DEFAULT '{}'::text\[\],

  CONSTRAINT navicues\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.navicues-export-2026-01-06.csv (

  id text,

  name text,

  text\_line text,

  pillar\_id text,

  schema text,

  family text,

  kbe\_layer text,

  response\_type text,

  modality text,

  heat\_level text,

  council\_lens text,

  tags text,

  batch bigint,

  status text,

  created\_at timestamp with time zone

);

CREATE TABLE public.navicues\_v2 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  code text UNIQUE,

  status text NOT NULL DEFAULT 'active'::text,

  kbe\_layer USER-DEFINED,

  tier USER-DEFINED,

  family text,

  primary\_schema\_id text,

  component\_type USER-DEFINED NOT NULL,

  default\_response\_type USER-DEFINED NOT NULL,

  intent text,

  safety\_notes text,

  config jsonb NOT NULL DEFAULT '{}'::jsonb,

  analytics\_config jsonb NOT NULL DEFAULT '{}'::jsonb,

  tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  move\_key text,

  stage\_key text,

  state\_band text,

  guidance\_mode\_key text,

  receipt\_type\_keys ARRAY DEFAULT '{}'::text\[\],

  real\_life\_check\_keys ARRAY DEFAULT '{}'::text\[\],

  CONSTRAINT navicues\_v2\_pkey PRIMARY KEY (id),

  CONSTRAINT navicues\_v2\_primary\_schema\_id\_fkey FOREIGN KEY (primary\_schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT navicues\_v2\_guidance\_mode\_key\_fkey FOREIGN KEY (guidance\_mode\_key) REFERENCES public.guidance\_modes(mode\_key)

);

CREATE TABLE public.node\_content\_refs (

  node\_id uuid NOT NULL,

  content\_ref uuid NOT NULL,

  relation USER-DEFINED NOT NULL DEFAULT 'related\_to'::graph\_edge\_kind,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT node\_content\_refs\_pkey PRIMARY KEY (node\_id, content\_ref, relation),

  CONSTRAINT node\_content\_refs\_node\_fk FOREIGN KEY (node\_id) REFERENCES public.world\_nodes(id),

  CONSTRAINT node\_content\_refs\_content\_fk FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id)

);

CREATE TABLE public.notification\_cadence\_allowed\_channels (

  category text NOT NULL,

  channel USER-DEFINED NOT NULL,

  CONSTRAINT notification\_cadence\_allowed\_channels\_pkey PRIMARY KEY (category, channel),

  CONSTRAINT notification\_cadence\_allowed\_channels\_category\_fkey FOREIGN KEY (category) REFERENCES public.notification\_category(key)

);

CREATE TABLE public.notification\_cadence\_rules (

  category text NOT NULL,

  priority\_default USER-DEFINED NOT NULL DEFAULT 'normal'::notification\_priority,

  cooldown\_minutes integer NOT NULL DEFAULT 120 CHECK (cooldown\_minutes \>= 0 AND cooldown\_minutes \<= 10080),

  max\_per\_day\_override integer CHECK (max\_per\_day\_override IS NULL OR max\_per\_day\_override \>= 0 AND max\_per\_day\_override \<= 1000),

  quiet\_hours\_policy text NOT NULL DEFAULT 'respect'::text CHECK (quiet\_hours\_policy \= ANY (ARRAY\['respect'::text, 'override\_urgent\_only'::text, 'ignore'::text\])),

  requires\_consent boolean NOT NULL DEFAULT true,

  delivery\_window\_start\_local time with time zone,

  delivery\_window\_end\_local time with time zone,

  CONSTRAINT notification\_cadence\_rules\_pkey PRIMARY KEY (category),

  CONSTRAINT notification\_cadence\_rules\_category\_fkey FOREIGN KEY (category) REFERENCES public.notification\_category(key)

);

CREATE TABLE public.notification\_category (

  key text NOT NULL,

  label text NOT NULL,

  description text,

  CONSTRAINT notification\_category\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.notification\_consent (

  individual\_id uuid NOT NULL,

  category text NOT NULL,

  channel USER-DEFINED NOT NULL,

  enabled boolean NOT NULL DEFAULT false,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT notification\_consent\_pkey PRIMARY KEY (individual\_id, category, channel),

  CONSTRAINT notification\_consent\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT notification\_consent\_category\_fkey FOREIGN KEY (category) REFERENCES public.notification\_category(key)

);

CREATE TABLE public.notification\_deliveries (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  outbox\_id uuid NOT NULL,

  provider text NOT NULL DEFAULT 'internal'::text,

  provider\_message\_id text,

  attempt\_no integer NOT NULL DEFAULT 1 CHECK (attempt\_no \>= 1 AND attempt\_no \<= 10),

  status USER-DEFINED NOT NULL DEFAULT 'pending'::delivery\_status\_enum,

  requested\_at timestamp with time zone DEFAULT now(),

  sent\_at timestamp with time zone,

  delivered\_at timestamp with time zone,

  opened\_at timestamp with time zone,

  clicked\_at timestamp with time zone,

  error\_code text,

  error\_message text,

  meta jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT notification\_deliveries\_pkey PRIMARY KEY (id),

  CONSTRAINT notification\_deliveries\_outbox\_id\_fkey FOREIGN KEY (outbox\_id) REFERENCES public.notifications\_outbox(id)

);

CREATE TABLE public.notification\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  occurred\_at timestamp with time zone NOT NULL DEFAULT now(),

  source text NOT NULL CHECK (source \= ANY (ARRAY\['cue\_drop'::text, 'receipt\_due'::text, 'real\_life\_check\_due'::text, 'resistance\_flag'::text, 'escalation'::text, 'system'::text, 'manual'::text\])),

  source\_ref jsonb NOT NULL DEFAULT '{}'::jsonb,

  individual\_id uuid,

  category USER-DEFINED,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT notification\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT notification\_events\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.notification\_preferences (

  individual\_id uuid NOT NULL,

  org\_id uuid NOT NULL,

  quiet\_hours\_enabled boolean NOT NULL DEFAULT false,

  quiet\_hours\_start\_local time with time zone,

  quiet\_hours\_end\_local time with time zone,

  timezone text NOT NULL DEFAULT 'UTC'::text,

  digest\_mode text NOT NULL DEFAULT 'off'::text CHECK (digest\_mode \= ANY (ARRAY\['off'::text, 'daily'::text, 'weekly'::text\])),

  max\_per\_day integer NOT NULL DEFAULT 6 CHECK (max\_per\_day \>= 0 AND max\_per\_day \<= 1000),

  max\_per\_hour integer NOT NULL DEFAULT 2 CHECK (max\_per\_hour \>= 0 AND max\_per\_hour \<= 1000),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT notification\_preferences\_pkey PRIMARY KEY (individual\_id, org\_id),

  CONSTRAINT notification\_preferences\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT notification\_preferences\_org\_id\_fkey FOREIGN KEY (org\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.notification\_provider\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  provider text NOT NULL,

  provider\_message\_id text,

  event\_type text NOT NULL,

  occurred\_at timestamp with time zone DEFAULT now(),

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT notification\_provider\_events\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.notification\_receipts (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  notification\_id uuid NOT NULL,

  provider text,

  provider\_message\_id text,

  delivered\_at timestamp with time zone,

  meta jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT notification\_receipts\_pkey PRIMARY KEY (id),

  CONSTRAINT notification\_receipts\_notification\_fk FOREIGN KEY (notification\_id) REFERENCES public.notifications(id)

);

CREATE TABLE public.notification\_templates (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  template\_key text NOT NULL UNIQUE,

  category USER-DEFINED,

  channel USER-DEFINED NOT NULL DEFAULT 'in\_app'::comm\_channel\_enum,

  title\_template text,

  body\_template text NOT NULL,

  deep\_link\_template text,

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  version integer NOT NULL DEFAULT 1,

  is\_active boolean NOT NULL DEFAULT true,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  category\_key text,

  CONSTRAINT notification\_templates\_pkey PRIMARY KEY (id),

  CONSTRAINT notification\_templates\_category\_key\_fkey FOREIGN KEY (category\_key) REFERENCES public.notification\_category(key)

);

CREATE TABLE public.notifications (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  channel USER-DEFINED NOT NULL DEFAULT 'in\_app'::comm\_channel\_enum,

  template\_key text,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  status USER-DEFINED NOT NULL DEFAULT 'queued'::comm\_status\_enum,

  error text,

  scheduled\_for timestamp with time zone,

  sent\_at timestamp with time zone,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  individual\_id uuid,

  attempts integer NOT NULL DEFAULT 0,

  next\_attempt\_at timestamp with time zone,

  CONSTRAINT notifications\_pkey PRIMARY KEY (id),

  CONSTRAINT notifications\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.notifications\_outbox (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  audience text NOT NULL DEFAULT 'user'::text CHECK (audience \= ANY (ARRAY\['user'::text, 'clinician'::text, 'organization'::text, 'support'::text, 'system'::text\])),

  recipient\_profile\_id uuid,

  organization\_id uuid,

  professional\_id uuid,

  channel USER-DEFINED NOT NULL,

  category text NOT NULL DEFAULT 'system'::text,

  priority text NOT NULL DEFAULT 'normal'::text CHECK (priority \= ANY (ARRAY\['low'::text, 'normal'::text, 'high'::text, 'urgent'::text\])),

  template\_id text,

  rendered\_title text,

  rendered\_body text NOT NULL,

  deep\_link text,

  trigger\_source text NOT NULL DEFAULT 'system'::text CHECK (trigger\_source \= ANY (ARRAY\['risk\_window'::text, 'safety\_decision'::text, 'incident'::text, 'social\_action'::text, 'deployment'::text, 'manual'::text, 'system'::text\])),

  trigger\_ref jsonb DEFAULT '{}'::jsonb,

  rationale jsonb DEFAULT '{}'::jsonb,

  status USER-DEFINED NOT NULL DEFAULT 'queued'::comm\_status\_enum,

  send\_after timestamp with time zone DEFAULT now(),

  expires\_at timestamp with time zone,

  suppress\_reason text,

  purpose text DEFAULT 'personalization'::text CHECK (purpose \= ANY (ARRAY\['care'::text, 'personalization'::text, 'safety'::text, 'research'::text, 'billing'::text, 'support'::text\])),

  data\_tier text DEFAULT 'tier1'::text CHECK (data\_tier \= ANY (ARRAY\['tier0'::text, 'tier1'::text, 'tier2'::text, 'tier3'::text, 'tier4'::text\])),

  meta jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  dedupe\_key text,

  fingerprint text,

  CONSTRAINT notifications\_outbox\_pkey PRIMARY KEY (id),

  CONSTRAINT notifications\_outbox\_professional\_id\_fkey FOREIGN KEY (professional\_id) REFERENCES public.profiles(id),

  CONSTRAINT notifications\_outbox\_recipient\_profile\_id\_fkey FOREIGN KEY (recipient\_profile\_id) REFERENCES public.profiles(id),

  CONSTRAINT notifications\_outbox\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.org\_members (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  organization\_id uuid NOT NULL,

  user\_id uuid NOT NULL,

  role text NOT NULL CHECK (role \= ANY (ARRAY\['owner'::text, 'admin'::text, 'staff'::text, 'member'::text\])),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT org\_members\_pkey PRIMARY KEY (id),

  CONSTRAINT org\_members\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT org\_members\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.organization\_admins (

  organization\_id uuid NOT NULL,

  user\_id uuid NOT NULL,

  role text NOT NULL CHECK (role \= ANY (ARRAY\['owner'::text, 'admin'::text, 'editor'::text\])),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT organization\_admins\_pkey PRIMARY KEY (organization\_id, user\_id),

  CONSTRAINT organization\_admins\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT organization\_admins\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.organization\_members (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  organization\_id uuid NOT NULL,

  profile\_id uuid NOT NULL,

  member\_roles ARRAY NOT NULL DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT organization\_members\_pkey PRIMARY KEY (id),

  CONSTRAINT organization\_members\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT organization\_members\_profile\_id\_fkey FOREIGN KEY (profile\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.organization\_tags (

  organization\_id uuid NOT NULL,

  tag\_id uuid NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT organization\_tags\_pkey PRIMARY KEY (organization\_id, tag\_id),

  CONSTRAINT organization\_tags\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT organization\_tags\_tag\_id\_fkey FOREIGN KEY (tag\_id) REFERENCES public.tags(id)

);

CREATE TABLE public.organizations (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  name text NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  organization\_type text DEFAULT 'platform'::text,

  CONSTRAINT organizations\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.people (

  id text NOT NULL,

  display\_name text NOT NULL,

  kind ARRAY NOT NULL DEFAULT '{}'::text\[\],

  tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  search\_tsv tsvector,

  CONSTRAINT people\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.people\_aliases (

  person\_id text NOT NULL,

  alias text NOT NULL,

  CONSTRAINT people\_aliases\_pkey PRIMARY KEY (person\_id, alias),

  CONSTRAINT people\_aliases\_person\_id\_fkey FOREIGN KEY (person\_id) REFERENCES public.people(id)

);

CREATE TABLE public.people\_audit (

  audit\_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,

  person\_id text NOT NULL,

  action text NOT NULL CHECK (action \= ANY (ARRAY\['insert'::text, 'update'::text, 'alias\_add'::text, 'alias\_remove'::text\])),

  details jsonb NOT NULL,

  actor uuid,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT people\_audit\_pkey PRIMARY KEY (audit\_id)

);

CREATE TABLE public.people\_source\_map (

  person\_id text NOT NULL,

  source\_type text NOT NULL CHECK (source\_type \= ANY (ARRAY\['guru'::text, 'thought\_leader'::text\])),

  source\_id text NOT NULL,

  CONSTRAINT people\_source\_map\_pkey PRIMARY KEY (source\_type, source\_id),

  CONSTRAINT people\_source\_map\_person\_id\_fkey FOREIGN KEY (person\_id) REFERENCES public.people(id)

);

CREATE TABLE public.pillar\_concepts (

  pillar\_id text NOT NULL,

  concept\_id text NOT NULL,

  CONSTRAINT pillar\_concepts\_pkey PRIMARY KEY (pillar\_id, concept\_id),

  CONSTRAINT pillar\_concepts\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT pillar\_concepts\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id)

);

CREATE TABLE public.pillar\_leaders (

  pillar\_id text NOT NULL,

  leader\_id text NOT NULL,

  role text DEFAULT 'influencer'::text,

  stance text DEFAULT 'supportive'::text,

  notes\_md text,

  CONSTRAINT pillar\_leaders\_pkey PRIMARY KEY (pillar\_id, leader\_id),

  CONSTRAINT pillar\_leaders\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT pillar\_leaders\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id)

);

CREATE TABLE public.pillar\_practices (

  id text NOT NULL,

  pillar\_id text NOT NULL,

  name text NOT NULL,

  summary\_md text,

  steps\_md text,

  contraindications ARRAY DEFAULT '{}'::text\[\],

  fits\_state ARRAY DEFAULT '{}'::text\[\],

  level text DEFAULT 'patient'::text,

  status text DEFAULT 'pilot'::text,

  CONSTRAINT pillar\_practices\_pkey PRIMARY KEY (id),

  CONSTRAINT pillar\_practices\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id)

);

CREATE TABLE public.pillar\_reference (

  pillar\_id text NOT NULL,

  summary\_md text,

  mechanisms jsonb DEFAULT '\[\]'::jsonb,

  red\_flags jsonb DEFAULT '\[\]'::jsonb,

  clinical\_guidance\_md text,

  practice\_index jsonb DEFAULT '{}'::jsonb,

  citations jsonb DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone DEFAULT now(),

  narratives\_md text,

  core\_measures jsonb,

  reading\_list jsonb,

  faq jsonb,

  design\_notes\_md text,

  CONSTRAINT pillar\_reference\_pkey PRIMARY KEY (pillar\_id),

  CONSTRAINT pillar\_reference\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id)

);

CREATE TABLE public.pillar\_themes (

  pillar\_id text NOT NULL,

  theme\_id text NOT NULL,

  CONSTRAINT pillar\_themes\_pkey PRIMARY KEY (pillar\_id, theme\_id),

  CONSTRAINT pillar\_themes\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT pillar\_themes\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id)

);

CREATE TABLE public.pillars (

  id text NOT NULL,

  name text NOT NULL,

  description text,

  created\_at timestamp with time zone DEFAULT now(),

  tagline text,

  clinical\_aim text,

  color\_primary text,

  color\_secondary text,

  icon\_name text,

  sort\_order integer,

  short\_code text,

  slug text,

  CONSTRAINT pillars\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.playlist\_items (

  playlist\_id uuid NOT NULL,

  video\_id uuid NOT NULL,

  position integer NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT playlist\_items\_pkey PRIMARY KEY (playlist\_id, video\_id),

  CONSTRAINT playlist\_items\_playlist\_id\_fkey FOREIGN KEY (playlist\_id) REFERENCES public.playlists(id),

  CONSTRAINT playlist\_items\_video\_id\_fkey FOREIGN KEY (video\_id) REFERENCES public.videos(id)

);

CREATE TABLE public.playlists (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  source\_provider text NOT NULL DEFAULT 'jw'::text,

  jw\_playlist\_id text UNIQUE,

  title text,

  description text,

  tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  status text NOT NULL DEFAULT 'active'::text CHECK (status \= ANY (ARRAY\['active'::text, 'hidden'::text, 'archived'::text\])),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT playlists\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.policy\_approvals (

  policy\_id text NOT NULL,

  version text NOT NULL,

  approver\_id uuid NOT NULL,

  approver\_role text,

  verdict text NOT NULL CHECK (verdict \= ANY (ARRAY\['approve'::text, 'reject'::text\])),

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT policy\_approvals\_pkey PRIMARY KEY (policy\_id, version, approver\_id),

  CONSTRAINT policy\_approvals\_approver\_id\_fkey FOREIGN KEY (approver\_id) REFERENCES public.profiles(id),

  CONSTRAINT policy\_approvals\_policy\_id\_version\_fkey FOREIGN KEY (policy\_id) REFERENCES public.policy\_versions(policy\_id),

  CONSTRAINT policy\_approvals\_policy\_id\_version\_fkey FOREIGN KEY (policy\_id) REFERENCES public.policy\_versions(version),

  CONSTRAINT policy\_approvals\_policy\_id\_version\_fkey FOREIGN KEY (version) REFERENCES public.policy\_versions(policy\_id),

  CONSTRAINT policy\_approvals\_policy\_id\_version\_fkey FOREIGN KEY (version) REFERENCES public.policy\_versions(version)

);

CREATE TABLE public.policy\_deployments (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  policy\_id text NOT NULL,

  version text NOT NULL,

  scope text NOT NULL CHECK (scope \= ANY (ARRAY\['global'::text, 'organization'::text, 'cohort'::text, 'individual'::text\])),

  scope\_id text,

  starts\_at timestamp with time zone DEFAULT now(),

  ends\_at timestamp with time zone,

  is\_active boolean DEFAULT true,

  created\_by uuid,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT policy\_deployments\_pkey PRIMARY KEY (id),

  CONSTRAINT policy\_deployments\_created\_by\_fkey FOREIGN KEY (created\_by) REFERENCES public.profiles(id),

  CONSTRAINT policy\_deployments\_policy\_id\_version\_fkey FOREIGN KEY (policy\_id) REFERENCES public.policy\_versions(policy\_id),

  CONSTRAINT policy\_deployments\_policy\_id\_version\_fkey FOREIGN KEY (policy\_id) REFERENCES public.policy\_versions(version),

  CONSTRAINT policy\_deployments\_policy\_id\_version\_fkey FOREIGN KEY (version) REFERENCES public.policy\_versions(policy\_id),

  CONSTRAINT policy\_deployments\_policy\_id\_version\_fkey FOREIGN KEY (version) REFERENCES public.policy\_versions(version)

);

CREATE TABLE public.policy\_evaluations (

  id bigint NOT NULL DEFAULT nextval('policy\_evaluations\_id\_seq'::regclass),

  decision\_trace\_id uuid NOT NULL,

  policy\_id uuid NOT NULL,

  evaluated\_at timestamp with time zone DEFAULT now(),

  outcome text NOT NULL CHECK (outcome \= ANY (ARRAY\['allow'::text, 'allow\_with\_modification'::text, 'hold'::text, 'block\_and\_route'::text, 'require\_support'::text\])),

  rationale jsonb,

  CONSTRAINT policy\_evaluations\_pkey PRIMARY KEY (id),

  CONSTRAINT policy\_evaluations\_decision\_trace\_id\_fkey FOREIGN KEY (decision\_trace\_id) REFERENCES public.decision\_traces(id),

  CONSTRAINT policy\_evaluations\_policy\_id\_fkey FOREIGN KEY (policy\_id) REFERENCES public.safety\_policies(id)

);

CREATE TABLE public.policy\_registry (

  id text NOT NULL,

  name text NOT NULL,

  status text NOT NULL DEFAULT 'active'::text CHECK (status \= ANY (ARRAY\['active'::text, 'paused'::text, 'retired'::text\])),

  ruleset jsonb NOT NULL DEFAULT '{}'::jsonb,

  bandit\_config jsonb NOT NULL DEFAULT '{}'::jsonb,

  reward\_contract jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT policy\_registry\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.policy\_runs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  decision\_id uuid,

  policy\_id text NOT NULL,

  status USER-DEFINED NOT NULL,

  reason text,

  details jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT policy\_runs\_pkey PRIMARY KEY (id),

  CONSTRAINT policy\_runs\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.policy\_versions (

  policy\_id text NOT NULL,

  version text NOT NULL,

  status text NOT NULL DEFAULT 'draft'::text CHECK (status \= ANY (ARRAY\['draft'::text, 'review'::text, 'approved'::text, 'active'::text, 'retired'::text\])),

  ruleset jsonb NOT NULL,

  bandit\_config jsonb NOT NULL,

  reward\_contract jsonb NOT NULL,

  change\_summary text,

  created\_by uuid,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT policy\_versions\_pkey PRIMARY KEY (policy\_id, version),

  CONSTRAINT policy\_versions\_policy\_id\_fkey FOREIGN KEY (policy\_id) REFERENCES public.policy\_registry(id),

  CONSTRAINT policy\_versions\_created\_by\_fkey FOREIGN KEY (created\_by) REFERENCES public.profiles(id)

);

CREATE TABLE public.practice\_blocks (

  practice\_id text NOT NULL,

  block\_id text NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT practice\_blocks\_pkey PRIMARY KEY (practice\_id, block\_id),

  CONSTRAINT practice\_blocks\_practice\_id\_fkey FOREIGN KEY (practice\_id) REFERENCES public.pillar\_practices(id),

  CONSTRAINT practice\_blocks\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id)

);

CREATE TABLE public.practice\_logs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  practice\_id text NOT NULL,

  started\_at timestamp with time zone NOT NULL DEFAULT now(),

  completed\_at timestamp with time zone,

  status text NOT NULL DEFAULT 'started'::text CHECK (status \= ANY (ARRAY\['started'::text, 'completed'::text, 'skipped'::text, 'abandoned'::text\])),

  pre\_state\_checkin\_ts timestamp with time zone,

  post\_state\_checkin\_ts timestamp with time zone,

  duration\_seconds integer DEFAULT 

CASE

    WHEN (completed\_at IS NULL) THEN NULL::integer

    ELSE GREATEST(0, (EXTRACT(epoch FROM (completed\_at \- started\_at)))::integer)

END,

  context\_tags ARRAY DEFAULT '{}'::text\[\],

  notes\_md text,

  helpful boolean,

  rating integer CHECK (rating \>= 1 AND rating \<= 5),

  meta jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  individual\_id uuid NOT NULL,

  CONSTRAINT practice\_logs\_pkey PRIMARY KEY (id),

  CONSTRAINT practice\_logs\_practice\_id\_fkey FOREIGN KEY (practice\_id) REFERENCES public.pillar\_practices(id),

  CONSTRAINT practice\_logs\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.practice\_mindblocks (

  practice\_id text NOT NULL,

  mindblock\_id uuid NOT NULL,

  relevance\_strength numeric,

  CONSTRAINT practice\_mindblocks\_pkey PRIMARY KEY (practice\_id, mindblock\_id),

  CONSTRAINT practice\_mindblocks\_practice\_id\_fkey FOREIGN KEY (practice\_id) REFERENCES public.pillar\_practices(id),

  CONSTRAINT practice\_mindblocks\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.practices (

  id text NOT NULL,

  name text NOT NULL,

  subtitle text,

  description text,

  pillar\_id text,

  pillar\_name text,

  concept\_name text,

  theme\_name text,

  duration\_minutes integer,

  difficulty text,

  image text,

  purpose text,

  steps jsonb,

  the\_science text,

  when\_to\_use ARRAY,

  related\_content jsonb,

  blocks ARRAY,

  keywords jsonb,

  status text DEFAULT 'review'::text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT practices\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.prediction\_errors (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  captured\_at timestamp with time zone NOT NULL DEFAULT now(),

  context\_tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  hot\_context text,

  arousal\_state jsonb NOT NULL DEFAULT '{}'::jsonb,

  prediction\_text text NOT NULL,

  outcome\_text text NOT NULL,

  surprise\_rating integer CHECK (surprise\_rating \>= 0 AND surprise\_rating \<= 10),

  meaning\_update\_text text,

  linked\_schema\_id text,

  linked\_mindblock\_id uuid,

  proof\_kind text CHECK (proof\_kind \= ANY (ARRAY\['micro\_proof'::text, 'receipt'::text, 'transfer\_test'::text, 'other'::text\])),

  proof\_id text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT prediction\_errors\_pkey PRIMARY KEY (id),

  CONSTRAINT prediction\_errors\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT prediction\_errors\_linked\_schema\_id\_fkey FOREIGN KEY (linked\_schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT prediction\_errors\_linked\_mindblock\_id\_fkey FOREIGN KEY (linked\_mindblock\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT prediction\_errors\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.primitive\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  primitive\_key text NOT NULL,

  occurred\_at timestamp with time zone NOT NULL DEFAULT now(),

  source\_kind text NOT NULL CHECK (source\_kind \= ANY (ARRAY\['journey'::text, 'navicue'::text, 'toolkit'::text, 'talk'::text, 'voice'::text, 'state'::text, 'feed'::text, 'practice'::text\])),

  source\_ref text,

  content\_ref uuid,

  decision\_trace\_id uuid,

  event\_spine\_id bigint,

  state\_snapshot jsonb DEFAULT '{}'::jsonb,

  outcome\_ref jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT primitive\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT primitive\_events\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id),

  CONSTRAINT primitive\_events\_primitive\_key\_fkey FOREIGN KEY (primitive\_key) REFERENCES public.primitives\_catalog(primitive\_key),

  CONSTRAINT primitive\_events\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT primitive\_events\_decision\_trace\_id\_fkey FOREIGN KEY (decision\_trace\_id) REFERENCES public.decision\_traces(id),

  CONSTRAINT primitive\_events\_event\_spine\_id\_fkey FOREIGN KEY (event\_spine\_id) REFERENCES public.event\_spine(id)

);

CREATE TABLE public.primitives\_catalog (

  primitive\_key text NOT NULL,

  name text NOT NULL,

  description\_md text,

  contraindications\_md text,

  required\_inputs jsonb NOT NULL DEFAULT '{}'::jsonb,

  expected\_outputs jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  safe\_states ARRAY DEFAULT '{}'::text\[\],

  typical\_receipts ARRAY DEFAULT '{}'::text\[\],

  typical\_checks ARRAY DEFAULT '{}'::text\[\],

  CONSTRAINT primitives\_catalog\_pkey PRIMARY KEY (primitive\_key)

);

CREATE TABLE public.professional\_admins (

  professional\_id uuid NOT NULL,

  user\_id uuid NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT professional\_admins\_pkey PRIMARY KEY (professional\_id, user\_id),

  CONSTRAINT professional\_admins\_professional\_id\_fkey FOREIGN KEY (professional\_id) REFERENCES public.profiles(id),

  CONSTRAINT professional\_admins\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.professional\_soundbites (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  professional\_id uuid NOT NULL,

  individual\_id uuid,

  organization\_id uuid,

  mode USER-DEFINED NOT NULL DEFAULT 'voice'::diary\_mode,

  transcript text,

  media\_url text,

  duration\_seconds integer,

  ai\_summary jsonb NOT NULL DEFAULT '{}'::jsonb,

  captured\_at timestamp with time zone NOT NULL DEFAULT now(),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  privacy\_level USER-DEFINED NOT NULL DEFAULT 'clinical\_visible'::privacy\_level\_enum,

  intent USER-DEFINED,

  context\_tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  CONSTRAINT professional\_soundbites\_pkey PRIMARY KEY (id),

  CONSTRAINT professional\_soundbites\_professional\_id\_fkey FOREIGN KEY (professional\_id) REFERENCES public.profiles(id),

  CONSTRAINT professional\_soundbites\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT professional\_soundbites\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.profile\_roles (

  profile\_id uuid NOT NULL,

  roles ARRAY NOT NULL DEFAULT '{}'::text\[\],

  CONSTRAINT profile\_roles\_pkey PRIMARY KEY (profile\_id),

  CONSTRAINT profile\_roles\_profile\_id\_fkey FOREIGN KEY (profile\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.profile\_tags (

  profile\_id uuid NOT NULL,

  tag\_id uuid NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT profile\_tags\_pkey PRIMARY KEY (profile\_id, tag\_id),

  CONSTRAINT profile\_tags\_profile\_id\_fkey FOREIGN KEY (profile\_id) REFERENCES public.profiles(id),

  CONSTRAINT profile\_tags\_tag\_id\_fkey FOREIGN KEY (tag\_id) REFERENCES public.tags(id)

);

CREATE TABLE public.profiles (

  id uuid NOT NULL,

  role USER-DEFINED NOT NULL DEFAULT 'patient'::user\_role,

  created\_at timestamp with time zone DEFAULT now(),

  professional\_type text,

  license\_number text,

  specializations ARRAY,

  years\_experience integer CHECK (years\_experience IS NULL OR years\_experience \>= 0 AND years\_experience \<= 80),

  accepts\_new\_clients boolean,

  organization\_id uuid,

  full\_name text,

  email text,

  phone text,

  avatar\_url text,

  CONSTRAINT profiles\_pkey PRIMARY KEY (id),

  CONSTRAINT profiles\_id\_fkey FOREIGN KEY (id) REFERENCES auth.users(id),

  CONSTRAINT profiles\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.prompt\_templates (

  id text NOT NULL,

  form USER-DEFINED NOT NULL,

  stance USER-DEFINED NOT NULL DEFAULT 'inquiry'::epistemic\_stance,

  title text NOT NULL,

  template\_md text NOT NULL,

  cognitive\_load integer DEFAULT 1 CHECK (cognitive\_load \>= 0 AND cognitive\_load \<= 5),

  arousal\_fit text DEFAULT 'green'::text CHECK (arousal\_fit \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text, 'downshift\_first'::text\])),

  time\_horizon text DEFAULT 'immediate'::text CHECK (time\_horizon \= ANY (ARRAY\['immediate'::text, 'session'::text, 'same\_day'::text, 'multi\_day'::text, 'weeks'::text\])),

  tags jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT prompt\_templates\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.prompt\_voice\_fit (

  prompt\_id text NOT NULL,

  voice\_id text NOT NULL,

  weight numeric DEFAULT 1,

  notes\_md text,

  CONSTRAINT prompt\_voice\_fit\_pkey PRIMARY KEY (prompt\_id, voice\_id),

  CONSTRAINT prompt\_voice\_fit\_prompt\_id\_fkey FOREIGN KEY (prompt\_id) REFERENCES public.prompt\_templates(id),

  CONSTRAINT prompt\_voice\_fit\_voice\_id\_fkey FOREIGN KEY (voice\_id) REFERENCES public.voice\_archetypes(id)

);

CREATE TABLE public.proof\_artifacts (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  subject\_type text NOT NULL,

  subject\_id uuid NOT NULL,

  artifact\_type text NOT NULL,

  uri text,

  content jsonb,

  chain\_id uuid,

  created\_by uuid,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT proof\_artifacts\_pkey PRIMARY KEY (id),

  CONSTRAINT fk\_proof\_artifacts\_chain FOREIGN KEY (chain\_id) REFERENCES public.proof\_chains(id),

  CONSTRAINT proof\_artifacts\_created\_by\_fkey FOREIGN KEY (created\_by) REFERENCES auth.users(id)

);

CREATE TABLE public.proof\_artifacts\_v26 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  artifact\_type text NOT NULL CHECK (artifact\_type \= ANY (ARRAY\['receipt'::text, 'practice'::text, 'transfer\_test'::text, 'prediction\_error'::text, 'micro\_proof'::text, 'followup'::text, 'state\_shift'::text, 'witness\_confirm'::text, 'context\_transfer'::text, 'rescue'::text, 'adverse'::text\])),

  source\_table text NOT NULL,

  source\_id text NOT NULL,

  context\_key text,

  schema\_id text,

  mindblock\_id uuid,

  family\_id uuid,

  mechanism\_key text,

  kbe\_target text CHECK (kbe\_target \= ANY (ARRAY\['knowing'::text, 'believing'::text, 'embodying'::text\])),

  quality numeric DEFAULT 0.6 CHECK (quality \>= 0::numeric AND quality \<= 1::numeric),

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 5::numeric),

  confidence numeric DEFAULT 0.7 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  related\_decision\_id uuid,

  related\_routing\_id uuid,

  decision\_trace\_id uuid,

  content\_ref uuid,

  CONSTRAINT proof\_artifacts\_v26\_pkey PRIMARY KEY (id),

  CONSTRAINT proof\_artifacts\_v26\_decision\_trace\_id\_fkey FOREIGN KEY (decision\_trace\_id) REFERENCES public.decision\_traces(id),

  CONSTRAINT proof\_artifacts\_v26\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.proof\_chain\_links\_v26 (

  chain\_id uuid NOT NULL,

  proof\_artifact\_id uuid NOT NULL,

  step\_key text NOT NULL CHECK (step\_key \= ANY (ARRAY\['claim'::text, 'prediction'::text, 'rite'::text, 'outcome'::text, 'meaning\_update'::text, 'witness'::text, 'transfer'::text, 'durability'::text\])),

  step\_no smallint NOT NULL CHECK (step\_no \>= 1 AND step\_no \<= 50),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT proof\_chain\_links\_v26\_pkey PRIMARY KEY (chain\_id, proof\_artifact\_id),

  CONSTRAINT proof\_chain\_links\_v26\_chain\_id\_fkey FOREIGN KEY (chain\_id) REFERENCES public.proof\_chains\_v26(id),

  CONSTRAINT proof\_chain\_links\_v26\_proof\_artifact\_id\_fkey FOREIGN KEY (proof\_artifact\_id) REFERENCES public.proof\_artifacts\_v26(id)

);

CREATE TABLE public.proof\_chains (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  root\_artifact\_id uuid,

  status text NOT NULL DEFAULT 'open'::text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT proof\_chains\_pkey PRIMARY KEY (id),

  CONSTRAINT fk\_root\_artifact FOREIGN KEY (root\_artifact\_id) REFERENCES public.proof\_artifacts(id)

);

CREATE TABLE public.proof\_chains\_v26 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  title text,

  schema\_id text,

  mindblock\_id uuid,

  family\_id uuid,

  context\_key text,

  started\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  status text DEFAULT 'active'::text CHECK (status \= ANY (ARRAY\['active'::text, 'completed'::text, 'abandoned'::text\])),

  meta jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT proof\_chains\_v26\_pkey PRIMARY KEY (id),

  CONSTRAINT proof\_chains\_v26\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.proof\_scores (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  artifact\_id uuid NOT NULL,

  metric text NOT NULL,

  value numeric NOT NULL,

  details jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT proof\_scores\_pkey PRIMARY KEY (id),

  CONSTRAINT proof\_scores\_artifact\_id\_fkey FOREIGN KEY (artifact\_id) REFERENCES public.proof\_artifacts(id)

);

CREATE TABLE public.proof\_scores\_by\_scope\_v26 (

  individual\_id uuid NOT NULL,

  computed\_at timestamp with time zone NOT NULL DEFAULT now(),

  window\_days integer NOT NULL DEFAULT 14 CHECK (window\_days \= ANY (ARRAY\[7, 14, 30, 90\])),

  scope\_type text NOT NULL CHECK (scope\_type \= ANY (ARRAY\['global'::text, 'schema'::text, 'mindblock'::text, 'family'::text, 'context'::text, 'protocol'::text, 'journey'::text\])),

  scope\_id text NOT NULL,

  proof numeric NOT NULL CHECK (proof \>= 0::numeric AND proof \<= 1::numeric),

  receipt numeric NOT NULL CHECK (receipt \>= 0::numeric AND receipt \<= 1::numeric),

  transfer numeric NOT NULL CHECK (transfer \>= 0::numeric AND transfer \<= 1::numeric),

  stability numeric NOT NULL CHECK (stability \>= 0::numeric AND stability \<= 1::numeric),

  confidence numeric NOT NULL DEFAULT 0.2 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  drivers jsonb DEFAULT '{}'::jsonb,

  evidence jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT proof\_scores\_by\_scope\_v26\_pkey PRIMARY KEY (individual\_id, computed\_at, window\_days, scope\_type, scope\_id),

  CONSTRAINT proof\_scores\_by\_scope\_v26\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.proof\_scores\_v26 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  computed\_at timestamp with time zone NOT NULL DEFAULT now(),

  window\_days integer NOT NULL DEFAULT 14 CHECK (window\_days \= ANY (ARRAY\[7, 14, 30, 90\])),

  overall numeric NOT NULL CHECK (overall \>= 0::numeric AND overall \<= 1::numeric),

  receipt\_score numeric NOT NULL CHECK (receipt\_score \>= 0::numeric AND receipt\_score \<= 1::numeric),

  transfer\_score numeric NOT NULL CHECK (transfer\_score \>= 0::numeric AND transfer\_score \<= 1::numeric),

  stability\_score numeric NOT NULL CHECK (stability\_score \>= 0::numeric AND stability\_score \<= 1::numeric),

  confidence numeric NOT NULL DEFAULT 0.2 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  drivers jsonb DEFAULT '{}'::jsonb,

  cautions jsonb DEFAULT '{}'::jsonb,

  evidence jsonb DEFAULT '{}'::jsonb,

  inputs\_hash text,

  CONSTRAINT proof\_scores\_v26\_pkey PRIMARY KEY (id),

  CONSTRAINT proof\_scores\_v26\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.proofs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  content\_ref uuid,

  source USER-DEFINED NOT NULL DEFAULT 'system'::proof\_source\_enum,

  kind USER-DEFINED NOT NULL DEFAULT 'other'::proof\_kind\_enum,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  score double precision,

  tags ARRAY DEFAULT '{}'::text\[\],

  occurred\_at timestamp with time zone DEFAULT now(),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT proofs\_pkey PRIMARY KEY (id),

  CONSTRAINT proofs\_profile\_fk FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT proofs\_org\_fk FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT proofs\_content\_fk FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id)

);

CREATE TABLE public.queue\_maintenance\_runs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  started\_at timestamp with time zone DEFAULT now(),

  finished\_at timestamp with time zone,

  processed integer DEFAULT 0,

  requeued integer DEFAULT 0,

  expired integer DEFAULT 0,

  error text,

  CONSTRAINT queue\_maintenance\_runs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.queue\_members (

  user\_id uuid NOT NULL,

  queue\_id uuid NOT NULL,

  inserted\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT queue\_members\_pkey PRIMARY KEY (user\_id, queue\_id)

);

CREATE TABLE public.ranker\_weights (

  key text NOT NULL,

  value numeric NOT NULL,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT ranker\_weights\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.real\_life\_check\_types (

  key text NOT NULL,

  label text NOT NULL,

  description\_md text,

  CONSTRAINT real\_life\_check\_types\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.receipt\_types (

  key text NOT NULL,

  label text NOT NULL,

  description\_md text,

  CONSTRAINT receipt\_types\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.receipts (

  id bigint NOT NULL DEFAULT nextval('receipts\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  block\_id text,

  type text CHECK (type \= ANY (ARRAY\['text'::text, 'voice'::text, 'photo'::text, 'video'::text\])),

  url text,

  text\_content text,

  ts timestamp with time zone DEFAULT now(),

  deployment\_id uuid,

  exposure\_id uuid,

  queue\_id uuid,

  deployment\_kind text,

  captured\_at timestamp with time zone NOT NULL DEFAULT now(),

  privacy\_level USER-DEFINED NOT NULL DEFAULT 'private'::privacy\_level\_enum,

  intent USER-DEFINED,

  capture\_quality USER-DEFINED DEFAULT 'clean'::capture\_quality\_enum,

  context\_tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  hot\_context text,

  energy smallint CHECK (energy \>= 0 AND energy \<= 10),

  clarity smallint CHECK (clarity \>= 0 AND clarity \<= 10),

  connection smallint CHECK (connection \>= 0 AND connection \<= 10),

  individual\_id uuid,

  CONSTRAINT receipts\_pkey PRIMARY KEY (id),

  CONSTRAINT receipts\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id),

  CONSTRAINT receipts\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.reg\_tile\_params (

  tile\_key text NOT NULL,

  param\_key text NOT NULL,

  param\_type text NOT NULL,

  required boolean NOT NULL DEFAULT false,

  default\_value jsonb,

  CONSTRAINT reg\_tile\_params\_pkey PRIMARY KEY (tile\_key, param\_key),

  CONSTRAINT reg\_tile\_params\_tile\_key\_fkey FOREIGN KEY (tile\_key) REFERENCES public.reg\_tiles(tile\_key)

);

CREATE TABLE public.reg\_tiles (

  tile\_key text NOT NULL,

  room text NOT NULL CHECK (room \= ANY (ARRAY\['STATE'::text, 'CONTEXT'::text, 'MAP'::text, 'DELIVERY'::text, 'SAFETY'::text\])),

  title text NOT NULL,

  description\_md text,

  primary\_view text NOT NULL,

  default\_range\_days integer NOT NULL DEFAULT 30,

  refresh\_mode text NOT NULL DEFAULT 'realtime'::text CHECK (refresh\_mode \= ANY (ARRAY\['realtime'::text, 'hourly'::text, 'daily'::text\])),

  pillar\_scoped boolean NOT NULL DEFAULT false,

  enabled boolean NOT NULL DEFAULT true,

  order\_index integer NOT NULL DEFAULT 0,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT reg\_tiles\_pkey PRIMARY KEY (tile\_key)

);

CREATE TABLE public.relationship\_types (

  type text NOT NULL,

  description text,

  CONSTRAINT relationship\_types\_pkey PRIMARY KEY (type)

);

CREATE TABLE public.relationships (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  source\_type text NOT NULL,

  source\_id text NOT NULL,

  target\_type text NOT NULL,

  target\_id text NOT NULL,

  relation\_type text NOT NULL,

  metadata jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT relationships\_pkey PRIMARY KEY (id),

  CONSTRAINT relationships\_relation\_type\_fk FOREIGN KEY (relation\_type) REFERENCES public.relationship\_types(type)

);

CREATE TABLE public.rescue\_events (

  id bigint NOT NULL DEFAULT nextval('rescue\_events\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  kind USER-DEFINED NOT NULL,

  triggered\_by USER-DEFINED NOT NULL DEFAULT 'user'::rescue\_trigger,

  context text,

  resolved boolean DEFAULT false,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  block\_id text,

  content\_kind text DEFAULT 'block'::text,

  content\_id text,

  individual\_id uuid,

  CONSTRAINT rescue\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT rescue\_events\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.rescue\_routes (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  organization\_id uuid,

  route\_key text NOT NULL,

  delivery\_key text NOT NULL,

  variant\_key text,

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  is\_active boolean NOT NULL DEFAULT true,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT rescue\_routes\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.retention\_jobs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  job\_type text NOT NULL CHECK (job\_type \= ANY (ARRAY\['ttl\_purge'::text, 'user\_delete'::text, 'org\_offboard'::text\])),

  individual\_id uuid,

  scope jsonb DEFAULT '{}'::jsonb,

  status text NOT NULL DEFAULT 'queued'::text CHECK (status \= ANY (ARRAY\['queued'::text, 'running'::text, 'complete'::text, 'failed'::text\])),

  started\_at timestamp with time zone,

  finished\_at timestamp with time zone,

  error text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT retention\_jobs\_pkey PRIMARY KEY (id),

  CONSTRAINT retention\_jobs\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.reward\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  decision\_id uuid,

  user\_id uuid NOT NULL,

  occurred\_at timestamp with time zone DEFAULT now(),

  reward\_key text NOT NULL,

  reward\_value numeric NOT NULL,

  evidence jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT reward\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT reward\_events\_decision\_id\_fkey FOREIGN KEY (decision\_id) REFERENCES public.bandit\_decisions(id),

  CONSTRAINT reward\_events\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.risk\_windows\_v24 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  window\_start timestamp with time zone NOT NULL,

  window\_end timestamp with time zone NOT NULL,

  risk\_score numeric NOT NULL CHECK (risk\_score \>= 0::numeric AND risk\_score \<= 1::numeric),

  arousal\_fit text CHECK (arousal\_fit \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text, 'downshift\_first'::text\])),

  top\_contexts ARRAY DEFAULT '{}'::text\[\],

  likely\_mindblocks ARRAY DEFAULT '{}'::uuid\[\],

  likely\_schema\_ids ARRAY DEFAULT '{}'::text\[\],

  rationale jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT risk\_windows\_v24\_pkey PRIMARY KEY (id),

  CONSTRAINT risk\_windows\_v24\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.rite\_definitions (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  key text NOT NULL,

  version integer NOT NULL DEFAULT 1,

  name text NOT NULL,

  description text,

  schema jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT rite\_definitions\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.rite\_followups (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  run\_id uuid,

  followup text NOT NULL CHECK (followup \= ANY (ARRAY\['h6'::text, 'h24'::text, 'd7'::text\])),

  scheduled\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT rite\_followups\_pkey PRIMARY KEY (id),

  CONSTRAINT rite\_followups\_run\_id\_fkey FOREIGN KEY (run\_id) REFERENCES public.rite\_runs(id)

);

CREATE TABLE public.rite\_outcomes (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  run\_id uuid,

  outcome\_type text NOT NULL CHECK (outcome\_type \= ANY (ARRAY\['pass'::text, 'partial'::text, 'fail'::text, 'unknown'::text\])),

  friction integer CHECK (friction IS NULL OR friction \>= 0 AND friction \<= 10),

  notes\_md text,

  evidence jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT rite\_outcomes\_pkey PRIMARY KEY (id),

  CONSTRAINT rite\_outcomes\_run\_id\_fkey FOREIGN KEY (run\_id) REFERENCES public.rite\_runs(id)

);

CREATE TABLE public.rite\_receipts (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  run\_id uuid NOT NULL,

  step\_key text,

  receipt\_kind text NOT NULL CHECK (receipt\_kind \= ANY (ARRAY\['text'::text, 'voice'::text, 'photo'::text, 'video'::text, 'checkin'::text, 'other'::text\])),

  url text,

  text\_content text,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  captured\_at timestamp with time zone DEFAULT now(),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT rite\_receipts\_pkey PRIMARY KEY (id),

  CONSTRAINT rite\_receipts\_run\_id\_fkey FOREIGN KEY (run\_id) REFERENCES public.rite\_runs(id)

);

CREATE TABLE public.rite\_runs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  rite\_id uuid,

  individual\_id uuid,

  organization\_id uuid,

  status text NOT NULL DEFAULT 'started'::text CHECK (status \= ANY (ARRAY\['started'::text, 'completed'::text, 'skipped'::text, 'abandoned'::text\])),

  started\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  context jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT rite\_runs\_pkey PRIMARY KEY (id),

  CONSTRAINT rite\_runs\_rite\_id\_fkey FOREIGN KEY (rite\_id) REFERENCES public.rites(id),

  CONSTRAINT rite\_runs\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT rite\_runs\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.rite\_steps (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  rite\_id uuid NOT NULL,

  step\_key text NOT NULL,

  step\_order integer NOT NULL,

  input jsonb,

  output jsonb,

  status text NOT NULL DEFAULT 'pending'::text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT rite\_steps\_pkey PRIMARY KEY (id),

  CONSTRAINT rite\_steps\_rite\_id\_fkey FOREIGN KEY (rite\_id) REFERENCES public.rites(id)

);

CREATE TABLE public.rites (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  rite\_key text NOT NULL,

  rite\_version integer NOT NULL DEFAULT 1,

  context jsonb,

  status text NOT NULL DEFAULT 'pending'::text,

  started\_by uuid,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT rites\_pkey PRIMARY KEY (id),

  CONSTRAINT rites\_started\_by\_fkey FOREIGN KEY (started\_by) REFERENCES auth.users(id),

  CONSTRAINT fk\_rites\_def FOREIGN KEY (rite\_key) REFERENCES public.rite\_definitions(key),

  CONSTRAINT fk\_rites\_def FOREIGN KEY (rite\_key) REFERENCES public.rite\_definitions(version),

  CONSTRAINT fk\_rites\_def FOREIGN KEY (rite\_version) REFERENCES public.rite\_definitions(key),

  CONSTRAINT fk\_rites\_def FOREIGN KEY (rite\_version) REFERENCES public.rite\_definitions(version)

);

CREATE TABLE public.room\_members (

  room\_id uuid NOT NULL,

  user\_id uuid NOT NULL,

  role text DEFAULT 'member'::text CHECK (role \= ANY (ARRAY\['owner'::text, 'admin'::text, 'member'::text\])),

  created\_at timestamp with time zone DEFAULT now(),

  individual\_id uuid,

  CONSTRAINT room\_members\_pkey PRIMARY KEY (room\_id, user\_id),

  CONSTRAINT room\_members\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.rung\_navicues (

  ladder\_id uuid NOT NULL,

  rung\_id uuid NOT NULL,

  navicue\_id text NOT NULL,

  role text DEFAULT 'probe'::text,

  CONSTRAINT rung\_navicues\_pkey PRIMARY KEY (ladder\_id, rung\_id, navicue\_id),

  CONSTRAINT rung\_navicues\_ladder\_id\_fkey FOREIGN KEY (ladder\_id) REFERENCES public.belief\_ladders(id),

  CONSTRAINT rung\_navicues\_rung\_id\_fkey FOREIGN KEY (rung\_id) REFERENCES public.ladder\_rungs(id),

  CONSTRAINT rung\_navicues\_navicue\_id\_fkey FOREIGN KEY (navicue\_id) REFERENCES public.navicues(id)

);

CREATE TABLE public.safety\_decisions (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  content\_ref uuid,

  decision text NOT NULL CHECK (decision \= ANY (ARRAY\['allow'::text, 'deny'::text, 'modify'::text\])),

  rules\_fired jsonb NOT NULL DEFAULT '\[\]'::jsonb,

  inputs\_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  policy\_evaluation\_id bigint,

  CONSTRAINT safety\_decisions\_pkey PRIMARY KEY (id),

  CONSTRAINT safety\_decisions\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT safety\_decisions\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT safety\_decisions\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id),

  CONSTRAINT safety\_decisions\_policy\_eval\_fk FOREIGN KEY (policy\_evaluation\_id) REFERENCES public.policy\_evaluations(id)

);

CREATE TABLE public.safety\_policies (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  name text NOT NULL,

  version text NOT NULL,

  description text,

  rules jsonb NOT NULL,

  is\_active boolean DEFAULT true,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT safety\_policies\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.safety\_policy\_registry (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  key text NOT NULL UNIQUE,

  description text NOT NULL,

  applies\_to ARRAY NOT NULL DEFAULT '{}'::text\[\],

  rule jsonb NOT NULL,

  severity text NOT NULL CHECK (severity \= ANY (ARRAY\['info'::text, 'warn'::text, 'deny'::text\])),

  is\_active boolean DEFAULT true,

  updated\_at timestamp with time zone DEFAULT now(),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT safety\_policy\_registry\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.scene\_contract\_rebuild\_audit (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  template\_id text,

  started\_at timestamp with time zone DEFAULT now(),

  finished\_at timestamp with time zone,

  status text,

  details jsonb DEFAULT '{}'::jsonb,

  CONSTRAINT scene\_contract\_rebuild\_audit\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.scene\_contracts (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  template\_id text NOT NULL,

  scene\_number integer NOT NULL CHECK (scene\_number \>= 1 AND scene\_number \<= 50),

  expects\_receipt boolean NOT NULL DEFAULT false,

  receipt\_type\_keys ARRAY NOT NULL DEFAULT '{}'::text\[\],

  expects\_checks boolean NOT NULL DEFAULT false,

  check\_type\_keys ARRAY NOT NULL DEFAULT '{}'::text\[\],

  response\_contract jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT scene\_contracts\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.scene\_run\_checks (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  scene\_run\_id uuid NOT NULL,

  check\_type text NOT NULL CHECK (check\_type \= ANY (ARRAY\['constraint'::text, 'policy'::text, 'score'::text, 'guardrail'::text\])),

  check\_name text NOT NULL,

  status text NOT NULL CHECK (status \= ANY (ARRAY\['pass'::text, 'fail'::text, 'warn'::text, 'info'::text\])),

  details jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  real\_life\_check\_key text NOT NULL,

  schema\_id text,

  family\_id uuid,

  mindblock\_id uuid,

  CONSTRAINT scene\_run\_checks\_pkey PRIMARY KEY (id),

  CONSTRAINT scene\_run\_checks\_scene\_fk FOREIGN KEY (scene\_run\_id) REFERENCES public.scene\_runs(id),

  CONSTRAINT scene\_run\_checks\_check\_type\_fk FOREIGN KEY (real\_life\_check\_key) REFERENCES public.real\_life\_check\_types(key),

  CONSTRAINT scene\_run\_checks\_schema\_fk FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT scene\_run\_checks\_family\_fk FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT scene\_run\_checks\_mindblock\_fk FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.scene\_run\_receipts (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  scene\_run\_id uuid NOT NULL,

  kind text NOT NULL CHECK (kind \= ANY (ARRAY\['input'::text, 'output'::text, 'event'::text, 'error'::text\])),

  message text,

  data jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  receipt\_type\_key text NOT NULL,

  schema\_id text,

  family\_id uuid,

  mindblock\_id uuid,

  CONSTRAINT scene\_run\_receipts\_pkey PRIMARY KEY (id),

  CONSTRAINT scene\_run\_receipts\_scene\_fk FOREIGN KEY (scene\_run\_id) REFERENCES public.scene\_runs(id),

  CONSTRAINT scene\_run\_receipts\_receipt\_type\_fk FOREIGN KEY (receipt\_type\_key) REFERENCES public.receipt\_types(key),

  CONSTRAINT scene\_run\_receipts\_schema\_fk FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT scene\_run\_receipts\_family\_fk FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id),

  CONSTRAINT scene\_run\_receipts\_mindblock\_fk FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.scene\_runs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  journey\_run\_id uuid NOT NULL,

  template\_id text NOT NULL,

  scene\_number integer NOT NULL,

  status text NOT NULL DEFAULT 'pending'::text CHECK (status \= ANY (ARRAY\['pending'::text, 'running'::text, 'skipped'::text, 'completed'::text, 'failed'::text\])),

  started\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT scene\_runs\_pkey PRIMARY KEY (id),

  CONSTRAINT scene\_runs\_journey\_fk FOREIGN KEY (journey\_run\_id) REFERENCES public.journey\_runs(id)

);

CREATE TABLE public.schema\_aliases (

  alias\_slug text NOT NULL CHECK (alias\_slug \= lower(btrim(alias\_slug))),

  schema\_id text NOT NULL,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT schema\_aliases\_pkey PRIMARY KEY (alias\_slug),

  CONSTRAINT schema\_aliases\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.schema\_catalog (

  id text NOT NULL,

  title text NOT NULL,

  description\_md text,

  pillar\_id text,

  concept\_id text,

  tags ARRAY DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  pillar\_ids ARRAY DEFAULT '{}'::text\[\],

  typical\_policies ARRAY DEFAULT '{}'::text\[\],

  probe\_hints jsonb DEFAULT '{}'::jsonb,

  belief\_shift\_target\_md text,

  name text,

  schema\_code text,

  CONSTRAINT schema\_catalog\_pkey PRIMARY KEY (id),

  CONSTRAINT schema\_catalog\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT schema\_catalog\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id)

);

CREATE TABLE public.schema\_dossiers (

  schema\_id text NOT NULL,

  one\_liner text,

  clinical\_lineage jsonb DEFAULT '{}'::jsonb,

  neurocomputational\_md text,

  state\_constraints jsonb DEFAULT '{}'::jsonb,

  mechanism\_map jsonb DEFAULT '{}'::jsonb,

  implicit\_measurement jsonb DEFAULT '{}'::jsonb,

  contraindications jsonb DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT schema\_dossiers\_pkey PRIMARY KEY (schema\_id),

  CONSTRAINT schema\_dossiers\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.schema\_evidence\_links (

  schema\_id text NOT NULL,

  evidence\_key text NOT NULL,

  relation USER-DEFINED NOT NULL,

  weight numeric DEFAULT 1,

  notes\_md text,

  CONSTRAINT schema\_evidence\_links\_pkey PRIMARY KEY (schema\_id, evidence\_key, relation),

  CONSTRAINT schema\_evidence\_links\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT schema\_evidence\_links\_evidence\_key\_fkey FOREIGN KEY (evidence\_key) REFERENCES public.evidence\_registry(key)

);

CREATE TABLE public.schema\_families\_backup (

  schema\_id text NOT NULL,

  family\_id uuid NOT NULL,

  weight numeric DEFAULT 1.0,

  notes\_md text,

  CONSTRAINT schema\_families\_backup\_pkey PRIMARY KEY (schema\_id, family\_id),

  CONSTRAINT schema\_families\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT schema\_families\_family\_id\_fkey FOREIGN KEY (family\_id) REFERENCES public.mindblock\_families(id)

);

CREATE TABLE public.schema\_leaders (

  schema\_id text NOT NULL,

  leader\_id text NOT NULL,

  angle text,

  weight numeric DEFAULT 1,

  notes\_md text,

  CONSTRAINT schema\_leaders\_pkey PRIMARY KEY (schema\_id, leader\_id),

  CONSTRAINT schema\_leaders\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT schema\_leaders\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id)

);

CREATE TABLE public.schema\_lenses (

  schema\_id text NOT NULL,

  lens\_id text NOT NULL,

  weight numeric DEFAULT 1,

  notes\_md text,

  CONSTRAINT schema\_lenses\_pkey PRIMARY KEY (schema\_id, lens\_id),

  CONSTRAINT schema\_lenses\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT schema\_lenses\_lens\_id\_fkey FOREIGN KEY (lens\_id) REFERENCES public.lens\_catalog(id)

);

CREATE TABLE public.schema\_mindblocks (

  schema\_id text NOT NULL,

  mindblock\_id uuid NOT NULL,

  weight numeric DEFAULT 1.0,

  evidence jsonb DEFAULT '{}'::jsonb,

  notes\_md text,

  CONSTRAINT schema\_mindblocks\_pkey PRIMARY KEY (schema\_id, mindblock\_id),

  CONSTRAINT schema\_mindblocks\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT schema\_mindblocks\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.schema\_prompt\_fit (

  schema\_id text NOT NULL,

  prompt\_id text NOT NULL,

  weight numeric DEFAULT 1,

  notes\_md text,

  CONSTRAINT schema\_prompt\_fit\_pkey PRIMARY KEY (schema\_id, prompt\_id),

  CONSTRAINT schema\_prompt\_fit\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT schema\_prompt\_fit\_prompt\_id\_fkey FOREIGN KEY (prompt\_id) REFERENCES public.prompt\_templates(id)

);

CREATE TABLE public.schema\_public\_profiles (

  schema\_id text NOT NULL,

  audience text NOT NULL DEFAULT 'public'::text,

  public\_name text NOT NULL,

  public\_slug text NOT NULL,

  public\_definition text,

  one\_liner text,

  version text DEFAULT '1.0.0'::text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT schema\_public\_profiles\_pkey PRIMARY KEY (schema\_id, audience),

  CONSTRAINT schema\_public\_profiles\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.schema\_voice\_fit (

  schema\_id text NOT NULL,

  voice\_id text NOT NULL,

  weight numeric DEFAULT 1,

  best\_for text,

  CONSTRAINT schema\_voice\_fit\_pkey PRIMARY KEY (schema\_id, voice\_id),

  CONSTRAINT schema\_voice\_fit\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT schema\_voice\_fit\_voice\_id\_fkey FOREIGN KEY (voice\_id) REFERENCES public.voice\_archetypes(id)

);

CREATE TABLE public.signal\_catalog (

  signal\_key text NOT NULL,

  name text NOT NULL,

  description\_md text,

  units text,

  source\_types ARRAY NOT NULL DEFAULT '{}'::text\[\],

  expected\_range jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT signal\_catalog\_pkey PRIMARY KEY (signal\_key)

);

CREATE TABLE public.signals (

  id bigint NOT NULL DEFAULT nextval('signals\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  source text NOT NULL,

  key text NOT NULL,

  unit text,

  value\_num numeric,

  value\_text text,

  captured\_at timestamp with time zone NOT NULL DEFAULT now(),

  meta jsonb DEFAULT '{}'::jsonb,

  individual\_id uuid,

  CONSTRAINT signals\_pkey PRIMARY KEY (id),

  CONSTRAINT signals\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.sim\_run\_errors (

  id bigint NOT NULL DEFAULT nextval('sim\_run\_errors\_id\_seq'::regclass),

  run\_id uuid NOT NULL,

  profile\_id uuid,

  error\_text text NOT NULL,

  payload jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT sim\_run\_errors\_pkey PRIMARY KEY (id),

  CONSTRAINT sim\_run\_errors\_run\_id\_fkey FOREIGN KEY (run\_id) REFERENCES public.sim\_runs(id),

  CONSTRAINT sim\_run\_errors\_profile\_id\_fkey FOREIGN KEY (profile\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.sim\_runs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  run\_date date NOT NULL,

  sim\_version text NOT NULL DEFAULT 'v1'::text,

  seed bigint,

  scenario\_packs ARRAY NOT NULL DEFAULT '{}'::text\[\],

  users\_active integer NOT NULL DEFAULT 0,

  sessions\_written integer NOT NULL DEFAULT 0,

  events\_written integer NOT NULL DEFAULT 0,

  proofs\_written integer NOT NULL DEFAULT 0,

  errors\_count integer NOT NULL DEFAULT 0,

  notes text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT sim\_runs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.sim\_users (

  profile\_id uuid NOT NULL,

  archetype text NOT NULL,

  params jsonb NOT NULL DEFAULT '{}'::jsonb,

  org\_id uuid,

  pro\_id uuid,

  phase text NOT NULL DEFAULT 'onboarding'::text,

  started\_at timestamp with time zone NOT NULL DEFAULT now(),

  notes text,

  CONSTRAINT sim\_users\_pkey PRIMARY KEY (profile\_id),

  CONSTRAINT sim\_users\_org\_id\_fkey FOREIGN KEY (org\_id) REFERENCES public.organizations(id),

  CONSTRAINT sim\_users\_pro\_id\_fkey FOREIGN KEY (pro\_id) REFERENCES public.profiles(id),

  CONSTRAINT sim\_users\_profile\_id\_fkey FOREIGN KEY (profile\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.social\_actions (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  circle\_id uuid,

  action\_type text NOT NULL CHECK (action\_type \= ANY (ARRAY\['witness\_request'::text, 'witness\_confirm'::text, 'support\_request'::text, 'support\_offer'::text, 'repair\_message'::text, 'celebration'::text, 'checkin'::text, 'boundary\_update'::text\])),

  to\_profile\_id uuid,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  outbox\_id uuid,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT social\_actions\_pkey PRIMARY KEY (id),

  CONSTRAINT social\_actions\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT social\_actions\_circle\_id\_fkey FOREIGN KEY (circle\_id) REFERENCES public.circles(id),

  CONSTRAINT social\_actions\_to\_profile\_id\_fkey FOREIGN KEY (to\_profile\_id) REFERENCES public.profiles(id),

  CONSTRAINT social\_actions\_outbox\_id\_fkey FOREIGN KEY (outbox\_id) REFERENCES public.notifications(id)

);

CREATE TABLE public.social\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  actor\_id uuid,

  subject\_type text NOT NULL,

  subject\_id uuid NOT NULL,

  event\_type text NOT NULL,

  payload jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  created\_by uuid,

  CONSTRAINT social\_events\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.social\_metrics\_weekly (

  organization\_id uuid,

  cohort\_id uuid,

  individual\_id uuid NOT NULL,

  week\_start date NOT NULL,

  witness\_requests integer DEFAULT 0,

  witness\_confirms integer DEFAULT 0,

  witness\_response\_median\_minutes integer,

  support\_requests integer DEFAULT 0,

  support\_offers integer DEFAULT 0,

  repair\_messages integer DEFAULT 0,

  connection\_delta numeric,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT social\_metrics\_weekly\_pkey PRIMARY KEY (individual\_id, week\_start),

  CONSTRAINT social\_metrics\_weekly\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT social\_metrics\_weekly\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.social\_safety\_routes (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  action\_id uuid NOT NULL,

  risk\_level text NOT NULL DEFAULT 'low'::text CHECK (risk\_level \= ANY (ARRAY\['low'::text, 'medium'::text, 'high'::text, 'acute'::text\])),

  routed\_to jsonb NOT NULL DEFAULT '{}'::jsonb,

  status text NOT NULL DEFAULT 'open'::text CHECK (status \= ANY (ARRAY\['open'::text, 'acknowledged'::text, 'resolved'::text\])),

  created\_at timestamp with time zone DEFAULT now(),

  resolved\_at timestamp with time zone,

  CONSTRAINT social\_safety\_routes\_pkey PRIMARY KEY (id),

  CONSTRAINT social\_safety\_routes\_action\_id\_fkey FOREIGN KEY (action\_id) REFERENCES public.social\_actions(id)

);

CREATE TABLE public.sound\_bite\_code\_sequences (

  pillar\_id text NOT NULL,

  theme\_id text NOT NULL,

  last\_number bigint NOT NULL DEFAULT 0,

  CONSTRAINT sound\_bite\_code\_sequences\_pkey PRIMARY KEY (pillar\_id, theme\_id)

);

CREATE TABLE public.sound\_bites (

  legacy\_id bigint NOT NULL DEFAULT nextval('sound\_bites\_id\_seq'::regclass),

  code text UNIQUE CHECK (code \~ '^\[A-Z\]{2}-\[A-Z\]-\[0-9\]+$'::text),

  pillar\_id text,

  theme\_id text,

  guru\_id bigint,

  tag text,

  angle text,

  sound\_bite text NOT NULL,

  audio\_path text,

  audio\_status text CHECK (audio\_status \= ANY (ARRAY\['pending'::text, 'processing'::text, 'ready'::text, 'error'::text\])),

  audio\_error text,

  audio\_url text,

  sound\_bite\_url text,

  sound\_bite\_spark text,

  sound\_bite\_spark\_url text,

  sound\_bite\_flame text,

  sound\_bite\_flame\_url text,

  sound\_bite\_ember text,

  sound\_bite\_ember\_url text,

  id integer NOT NULL UNIQUE,

  content\_ref uuid,

  spark\_words integer DEFAULT 

CASE

    WHEN (btrim(COALESCE(sound\_bite\_spark, ''::text)) \= ''::text) THEN 0

    ELSE array\_length(regexp\_split\_to\_array(regexp\_replace(sound\_bite\_spark, '\\s+'::text, ' '::text, 'g'::text), ' '::text), 1\)

END,

  flame\_words integer DEFAULT 

CASE

    WHEN (btrim(COALESCE(sound\_bite\_flame, ''::text)) \= ''::text) THEN 0

    ELSE array\_length(regexp\_split\_to\_array(regexp\_replace(sound\_bite\_flame, '\\s+'::text, ' '::text, 'g'::text), ' '::text), 1\)

END,

  ember\_words integer DEFAULT 

CASE

    WHEN (btrim(COALESCE(sound\_bite\_ember, ''::text)) \= ''::text) THEN 0

    ELSE array\_length(regexp\_split\_to\_array(regexp\_replace(sound\_bite\_ember, '\\s+'::text, ' '::text, 'g'::text), ' '::text), 1\)

END,

  sound\_bite\_spark\_production text,

  sound\_bite\_flame\_production text,

  sound\_bite\_ember\_production text,

  spark\_words\_prod integer DEFAULT 

CASE

    WHEN (btrim(COALESCE(sound\_bite\_spark\_production, ''::text)) \= ''::text) THEN 0

    ELSE array\_length(regexp\_split\_to\_array(regexp\_replace(sound\_bite\_spark\_production, '\\s+'::text, ' '::text, 'g'::text), ' '::text), 1\)

END,

  flame\_words\_prod integer DEFAULT 

CASE

    WHEN (btrim(COALESCE(sound\_bite\_flame\_production, ''::text)) \= ''::text) THEN 0

    ELSE array\_length(regexp\_split\_to\_array(regexp\_replace(sound\_bite\_flame\_production, '\\s+'::text, ' '::text, 'g'::text), ' '::text), 1\)

END,

  ember\_words\_prod integer DEFAULT 

CASE

    WHEN (btrim(COALESCE(sound\_bite\_ember\_production, ''::text)) \= ''::text) THEN 0

    ELSE array\_length(regexp\_split\_to\_array(regexp\_replace(sound\_bite\_ember\_production, '\\s+'::text, ' '::text, 'g'::text), ' '::text), 1\)

END,

  CONSTRAINT sound\_bites\_pkey PRIMARY KEY (id),

  CONSTRAINT sound\_bites\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT sound\_bites\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id),

  CONSTRAINT sound\_bites\_guru\_id\_fkey FOREIGN KEY (guru\_id) REFERENCES public.gurus(id)

);

CREATE TABLE public.sound\_bites\_completed (

  id bigint,

  code text,

  pillar\_id text,

  theme\_id text,

  guru\_id bigint,

  tag text,

  angle text,

  sound\_bite text,

  url\_9 text

);

CREATE TABLE public.soundbite\_assets (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  code text UNIQUE,

  type text NOT NULL CHECK (type \= ANY (ARRAY\['spark'::text, 'flame'::text, 'ember'::text, 'spack'::text\])),

  canonical\_text text,

  spark\_copy text,

  flame\_copy text,

  ember\_copy text,

  tts\_text text,

  audio\_asset\_id uuid,

  duration\_ms integer,

  primary\_person\_id uuid,

  lens text,

  angle text,

  pillar\_id text,

  theme\_id text,

  primary\_schema\_ids ARRAY,

  tags ARRAY,

  state\_band\_min integer,

  state\_band\_max integer,

  contraindications ARRAY,

  intent text CHECK (intent \= ANY (ARRAY\['interrupt'::text, 'reframe'::text, 'prime'::text, 'seal'::text, 'connect'::text, 'meaning'::text\])),

  status text DEFAULT 'draft'::text CHECK (status \= ANY (ARRAY\['draft'::text, 'reviewed'::text, 'published'::text, 'archived'::text\])),

  clinical\_review\_passed boolean DEFAULT false,

  version integer DEFAULT 1,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT soundbite\_assets\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.soundbite\_mindblocks (

  soundbite\_id uuid NOT NULL,

  mindblock\_id uuid NOT NULL,

  confidence numeric,

  CONSTRAINT soundbite\_mindblocks\_pkey PRIMARY KEY (soundbite\_id, mindblock\_id),

  CONSTRAINT soundbite\_mindblocks\_soundbite\_id\_fkey FOREIGN KEY (soundbite\_id) REFERENCES public.user\_soundbites(id),

  CONSTRAINT soundbite\_mindblocks\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.soundbite\_playback\_sessions (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  soundbite\_asset\_id uuid,

  user\_soundbite\_id uuid,

  intent text,

  band text,

  why\_now jsonb,

  started\_at timestamp with time zone DEFAULT now(),

  completed\_at timestamp with time zone,

  pre\_state jsonb,

  post\_state jsonb,

  device text,

  app\_version text,

  metrics jsonb,

  CONSTRAINT soundbite\_playback\_sessions\_pkey PRIMARY KEY (id),

  CONSTRAINT soundbite\_playback\_sessions\_soundbite\_asset\_id\_fkey FOREIGN KEY (soundbite\_asset\_id) REFERENCES public.soundbite\_assets(id),

  CONSTRAINT soundbite\_playback\_sessions\_user\_soundbite\_id\_fkey FOREIGN KEY (user\_soundbite\_id) REFERENCES public.user\_soundbites(id)

);

CREATE TABLE public.soundbite\_track\_moods (

  track\_id text NOT NULL,

  mood\_slug text NOT NULL,

  weight numeric NOT NULL DEFAULT 1,

  CONSTRAINT soundbite\_track\_moods\_pkey PRIMARY KEY (track\_id, mood\_slug),

  CONSTRAINT soundbite\_track\_moods\_track\_id\_fkey FOREIGN KEY (track\_id) REFERENCES public.soundbite\_tracks(track\_id),

  CONSTRAINT soundbite\_track\_moods\_mood\_slug\_fkey FOREIGN KEY (mood\_slug) REFERENCES public.moods(slug)

);

CREATE TABLE public.soundbite\_tracks (

  track\_id text NOT NULL,

  sound\_bite\_id integer NOT NULL,

  type USER-DEFINED NOT NULL,

  code text NOT NULL,

  pillar\_id text NOT NULL,

  theme\_id text NOT NULL,

  tag text,

  angle text,

  title text,

  tts\_text text,

  audio\_path text NOT NULL,

  audio\_status text CHECK (audio\_status \= ANY (ARRAY\['queued'::text, 'ok'::text, 'error'::text\])),

  audio\_error text,

  audio\_duration\_ms integer,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT soundbite\_tracks\_pkey PRIMARY KEY (track\_id),

  CONSTRAINT soundbite\_tracks\_sound\_bite\_id\_fkey FOREIGN KEY (sound\_bite\_id) REFERENCES public.sound\_bites(id)

);

CREATE TABLE public.source\_authors (

  source\_id bigint NOT NULL,

  author\_id bigint NOT NULL,

  author\_order integer NOT NULL,

  CONSTRAINT source\_authors\_pkey PRIMARY KEY (source\_id, author\_id),

  CONSTRAINT source\_authors\_source\_id\_fkey FOREIGN KEY (source\_id) REFERENCES public.sources(id),

  CONSTRAINT source\_authors\_author\_id\_fkey FOREIGN KEY (author\_id) REFERENCES public.authors(id)

);

CREATE TABLE public.sources (

  id bigint NOT NULL DEFAULT nextval('sources\_id\_seq'::regclass),

  type USER-DEFINED NOT NULL,

  title text NOT NULL,

  year integer,

  journal text,

  publisher text,

  doi text,

  url text,

  abstract\_md text,

  level\_of\_evidence text,

  tags ARRAY DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT sources\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.spark\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  journey\_instance\_id uuid,

  journey\_template\_id text,

  pillar\_id text,

  theme\_id text,

  schema\_id text,

  family\_id uuid,

  captured\_at timestamp with time zone NOT NULL DEFAULT now(),

  source text NOT NULL CHECK (source \= ANY (ARRAY\['journey\_scene'::text, 'voice\_note'::text, 'journal'::text, 'navicue\_response'::text\])),

  payload\_ref\_type text CHECK (payload\_ref\_type \= ANY (ARRAY\['soundbite'::text, 'story\_map'::text, 'receipt'::text, 'text'::text\])),

  payload\_ref\_id text,

  spark\_strength numeric CHECK (spark\_strength \>= 0::numeric AND spark\_strength \<= 1::numeric),

  tags ARRAY,

  era\_phase text,

  evidence\_weight numeric CHECK (evidence\_weight IS NULL OR evidence\_weight \>= 0::numeric AND evidence\_weight \<= 1::numeric),

  CONSTRAINT spark\_events\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.state\_band\_map (

  heat text NOT NULL,

  state\_band USER-DEFINED NOT NULL,

  CONSTRAINT state\_band\_map\_pkey PRIMARY KEY (heat)

);

CREATE TABLE public.state\_band\_policies (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  band text NOT NULL CHECK (band \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text, 'shutdown'::text\])),

  allowed\_content\_kinds ARRAY NOT NULL,

  allowed\_response\_types ARRAY NOT NULL,

  allowed\_variants ARRAY,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT state\_band\_policies\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.state\_checkins (

  user\_id uuid NOT NULL,

  ts timestamp with time zone NOT NULL DEFAULT now(),

  energy integer CHECK (energy \>= 0 AND energy \<= 10),

  clarity integer CHECK (clarity \>= 0 AND clarity \<= 10),

  connection integer CHECK (connection \>= 0 AND connection \<= 10),

  notes text,

  individual\_id uuid,

  CONSTRAINT state\_checkins\_pkey PRIMARY KEY (user\_id, ts)

);

CREATE TABLE public.state\_logs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  state\_key text NOT NULL,

  state\_value jsonb NOT NULL,

  logged\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT state\_logs\_pkey PRIMARY KEY (id),

  CONSTRAINT state\_logs\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT state\_logs\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.story\_map\_entries (

  id bigint NOT NULL DEFAULT nextval('story\_map\_entries\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  mode USER-DEFINED NOT NULL DEFAULT 'text'::story\_mode,

  content\_text text,

  transcript\_text text,

  pain\_vectors jsonb DEFAULT '\[\]'::jsonb,

  protection\_bias text,

  identity\_line\_draft text,

  hot\_contexts ARRAY DEFAULT '{}'::text\[\],

  pillar\_hypotheses ARRAY DEFAULT '{}'::text\[\],

  theme\_hypotheses ARRAY DEFAULT '{}'::text\[\],

  tags ARRAY DEFAULT '{}'::text\[\],

  meta jsonb DEFAULT '{}'::jsonb CHECK (meta IS NULL OR jsonb\_typeof(meta) \= 'object'::text),

  created\_at timestamp with time zone DEFAULT now(),

  captured\_at timestamp with time zone NOT NULL DEFAULT now(),

  privacy\_level USER-DEFINED NOT NULL DEFAULT 'private'::privacy\_level\_enum,

  intent USER-DEFINED,

  capture\_quality USER-DEFINED DEFAULT 'clean'::capture\_quality\_enum,

  energy smallint CHECK (energy \>= 0 AND energy \<= 10),

  clarity smallint CHECK (clarity \>= 0 AND clarity \<= 10),

  connection smallint CHECK (connection \>= 0 AND connection \<= 10),

  individual\_id uuid,

  CONSTRAINT story\_map\_entries\_pkey PRIMARY KEY (id),

  CONSTRAINT story\_map\_entries\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.supports (

  id bigint NOT NULL DEFAULT nextval('supports\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  role text,

  contact jsonb,

  notify\_policy jsonb DEFAULT '{"quiet\_hours": \[22, 7\]}'::jsonb,

  individual\_id uuid,

  CONSTRAINT supports\_pkey PRIMARY KEY (id),

  CONSTRAINT supports\_user\_fk FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.sync\_runs (

  id bigint NOT NULL DEFAULT nextval('sync\_runs\_id\_seq'::regclass),

  started\_at timestamp with time zone NOT NULL DEFAULT now(),

  finished\_at timestamp with time zone,

  mode text,

  fetched\_count integer,

  upserted\_count integer,

  updated\_count integer,

  last\_cursor text,

  error text,

  CONSTRAINT sync\_runs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.sync\_state (

  key text NOT NULL,

  value jsonb NOT NULL DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT sync\_state\_pkey PRIMARY KEY (key)

);

CREATE TABLE public.tags (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  slug text NOT NULL UNIQUE,

  label text NOT NULL,

  category text,

  description text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT tags\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.task\_queue (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  topic text NOT NULL,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  status text NOT NULL DEFAULT 'queued'::text,

  run\_at timestamp with time zone NOT NULL DEFAULT now(),

  attempts integer NOT NULL DEFAULT 0,

  last\_error text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT task\_queue\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.task\_queue\_errors (

  id bigint NOT NULL DEFAULT nextval('task\_queue\_errors\_id\_seq'::regclass),

  task\_id uuid NOT NULL,

  error text NOT NULL,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT task\_queue\_errors\_pkey PRIMARY KEY (id),

  CONSTRAINT task\_queue\_errors\_task\_id\_fkey FOREIGN KEY (task\_id) REFERENCES public.task\_queue(id)

);

CREATE TABLE public.template\_members (

  user\_id uuid NOT NULL,

  template\_id text NOT NULL,

  CONSTRAINT template\_members\_pkey PRIMARY KEY (user\_id, template\_id)

);

CREATE TABLE public.theme\_comb\_map (

  theme\_id text NOT NULL,

  c\_flag boolean NOT NULL DEFAULT false,

  o\_flag boolean NOT NULL DEFAULT false,

  m\_flag boolean NOT NULL DEFAULT false,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT theme\_comb\_map\_pkey PRIMARY KEY (theme\_id),

  CONSTRAINT theme\_comb\_map\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id)

);

CREATE TABLE public.theme\_concepts (

  theme\_id text NOT NULL,

  concept\_id text NOT NULL,

  CONSTRAINT theme\_concepts\_pkey PRIMARY KEY (theme\_id, concept\_id),

  CONSTRAINT theme\_concepts\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.themes(id),

  CONSTRAINT theme\_concepts\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id)

);

CREATE TABLE public.themes (

  id text NOT NULL,

  concept\_id text,

  name text NOT NULL,

  contexts ARRAY DEFAULT '{}'::text\[\],

  code text,

  pillar\_id text,

  duration\_weeks integer DEFAULT 2,

  sort\_order integer,

  CONSTRAINT themes\_pkey PRIMARY KEY (id),

  CONSTRAINT themes\_concept\_id\_fkey FOREIGN KEY (concept\_id) REFERENCES public.concepts(id),

  CONSTRAINT themes\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id)

);

CREATE TABLE public.thought\_leader\_aliases (

  leader\_id text NOT NULL,

  alias text NOT NULL,

  CONSTRAINT thought\_leader\_aliases\_pkey PRIMARY KEY (leader\_id, alias),

  CONSTRAINT thought\_leader\_aliases\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id)

);

CREATE TABLE public.thought\_leader\_links (

  id bigint NOT NULL DEFAULT nextval('thought\_leader\_links\_id\_seq'::regclass),

  leader\_id text NOT NULL,

  kind text NOT NULL CHECK (kind \= ANY (ARRAY\['site'::text, 'x'::text, 'youtube'::text, 'podcast'::text, 'paper'::text, 'other'::text\])),

  url text NOT NULL,

  CONSTRAINT thought\_leader\_links\_pkey PRIMARY KEY (id),

  CONSTRAINT thought\_leader\_links\_leader\_id\_fkey FOREIGN KEY (leader\_id) REFERENCES public.thought\_leaders(id)

);

CREATE TABLE public.thought\_leaders (

  id text NOT NULL,

  display\_name text NOT NULL,

  affiliation text,

  bio\_md text,

  photo\_media\_id bigint,

  tags ARRAY DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  org text,

  website text,

  CONSTRAINT thought\_leaders\_pkey PRIMARY KEY (id),

  CONSTRAINT thought\_leaders\_photo\_media\_id\_fkey FOREIGN KEY (photo\_media\_id) REFERENCES public.media\_assets(id)

);

CREATE TABLE public.toolkit\_items (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  content\_id uuid NOT NULL,

  added\_at timestamp with time zone NOT NULL DEFAULT now(),

  pinned boolean NOT NULL DEFAULT false,

  notes text,

  CONSTRAINT toolkit\_items\_pkey PRIMARY KEY (id),

  CONSTRAINT toolkit\_items\_content\_id\_fkey FOREIGN KEY (content\_id) REFERENCES public.content\_items(id),

  CONSTRAINT toolkit\_items\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.transfer\_test\_results (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  test\_id uuid NOT NULL,

  content\_kind text NOT NULL DEFAULT 'block'::text CHECK (content\_kind \= ANY (ARRAY\['block'::text, 'sequence'::text, 'navicue'::text, 'article'::text, 'lesson'::text, 'practice'::text, 'other'::text\])),

  content\_id text,

  deployment\_kind text DEFAULT 'block\_assignment'::text,

  deployment\_id text,

  assigned\_at timestamp with time zone DEFAULT now(),

  due\_at timestamp with time zone,

  completed\_at timestamp with time zone,

  outcome USER-DEFINED NOT NULL DEFAULT 'unknown'::transfer\_outcome,

  friction integer CHECK (friction \>= 0 AND friction \<= 10),

  notes\_md text,

  evidence jsonb DEFAULT '{}'::jsonb,

  exposure\_id uuid,

  queue\_id uuid,

  individual\_id uuid NOT NULL,

  CONSTRAINT transfer\_test\_results\_pkey PRIMARY KEY (id),

  CONSTRAINT transfer\_test\_results\_test\_id\_fkey FOREIGN KEY (test\_id) REFERENCES public.transfer\_tests(id),

  CONSTRAINT transfer\_test\_results\_exposure\_fk FOREIGN KEY (exposure\_id) REFERENCES public.feed\_exposures(id),

  CONSTRAINT transfer\_test\_results\_queue\_fk FOREIGN KEY (queue\_id) REFERENCES public.user\_feed\_queue\_v2(id),

  CONSTRAINT transfer\_test\_results\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.transfer\_test\_rules (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  is\_active boolean NOT NULL DEFAULT true,

  test\_id uuid NOT NULL,

  trigger\_event text NOT NULL CHECK (trigger\_event \= ANY (ARRAY\['block\_completed'::text, 'block\_delivered'::text, 'followup\_completed'::text\])),

  block\_id text,

  theme\_id text,

  pillar\_id text,

  delay\_hours integer NOT NULL DEFAULT 24,

  window\_hours integer,

  max\_per\_user\_per\_7d integer DEFAULT 3,

  priority integer NOT NULL DEFAULT 0,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT transfer\_test\_rules\_pkey PRIMARY KEY (id),

  CONSTRAINT transfer\_test\_rules\_test\_id\_fkey FOREIGN KEY (test\_id) REFERENCES public.transfer\_tests(id)

);

CREATE TABLE public.transfer\_tests (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  key text UNIQUE,

  title text NOT NULL,

  description\_md text,

  block\_id text,

  sequence\_id text,

  schema\_id text,

  prompt\_id text,

  window\_hours integer NOT NULL DEFAULT 24 CHECK (window\_hours \>= 1 AND window\_hours \<= 720),

  success\_criteria jsonb NOT NULL DEFAULT '{}'::jsonb,

  default\_friction\_scale\_max integer DEFAULT 10 CHECK (default\_friction\_scale\_max \>= 1 AND default\_friction\_scale\_max \<= 10),

  is\_required boolean DEFAULT false,

  tags jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT transfer\_tests\_pkey PRIMARY KEY (id),

  CONSTRAINT transfer\_tests\_block\_id\_fkey FOREIGN KEY (block\_id) REFERENCES public.blocks(id),

  CONSTRAINT transfer\_tests\_sequence\_id\_fkey FOREIGN KEY (sequence\_id) REFERENCES public.cue\_sequences(id),

  CONSTRAINT transfer\_tests\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT transfer\_tests\_prompt\_id\_fkey FOREIGN KEY (prompt\_id) REFERENCES public.prompt\_templates(id)

);

CREATE TABLE public.tts\_jobs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  payload jsonb NOT NULL,

  status text NOT NULL DEFAULT 'queued'::text,

  response jsonb,

  error text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  audio\_path text,

  audio\_mime text,

  audio\_size\_bytes integer,

  audio\_duration\_seconds numeric,

  CONSTRAINT tts\_jobs\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.tts\_outputs (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  request\_id uuid NOT NULL,

  storage\_path text NOT NULL,

  mime text NOT NULL,

  size\_bytes integer,

  duration\_seconds numeric,

  provider text,

  meta jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT tts\_outputs\_pkey PRIMARY KEY (id),

  CONSTRAINT tts\_outputs\_request\_id\_fkey FOREIGN KEY (request\_id) REFERENCES public.tts\_requests(id)

);

CREATE TABLE public.tts\_requests (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  text text NOT NULL,

  voice text,

  format text NOT NULL DEFAULT 'mp3'::text CHECK (format \= ANY (ARRAY\['mp3'::text, 'wav'::text, 'ogg'::text\])),

  provider\_settings jsonb DEFAULT '{}'::jsonb,

  status text NOT NULL DEFAULT 'queued'::text CHECK (status \= ANY (ARRAY\['queued'::text, 'processing'::text, 'done'::text, 'error'::text\])),

  priority integer NOT NULL DEFAULT 0,

  error text,

  requested\_by uuid,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT tts\_requests\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.user\_arousal\_state (

  user\_id uuid NOT NULL,

  energy01 numeric CHECK (energy01 \>= 0::numeric AND energy01 \<= 1::numeric),

  clarity01 numeric CHECK (clarity01 \>= 0::numeric AND clarity01 \<= 1::numeric),

  connection01 numeric CHECK (connection01 \>= 0::numeric AND connection01 \<= 1::numeric),

  arousal\_band text CHECK (arousal\_band \= ANY (ARRAY\['downshift'::text, 'neutral'::text, 'upshift'::text\])),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT user\_arousal\_state\_pkey PRIMARY KEY (user\_id),

  CONSTRAINT user\_arousal\_state\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.user\_belief\_statements (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  statement text NOT NULL,

  valence text NOT NULL DEFAULT 'neutral'::text CHECK (valence \= ANY (ARRAY\['limiting'::text, 'new\_truth'::text, 'neutral'::text\])),

  confidence numeric CHECK (confidence IS NULL OR confidence \>= 0::numeric AND confidence \<= 1::numeric),

  emotion\_tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  context\_tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  schema\_id text,

  mindblock\_id uuid,

  source\_kind text NOT NULL CHECK (source\_kind \= ANY (ARRAY\['soundbite'::text, 'story\_map'::text, 'navicue'::text, 'clinician'::text, 'system'::text\])),

  source\_id text,

  captured\_at timestamp with time zone NOT NULL DEFAULT now(),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT user\_belief\_statements\_pkey PRIMARY KEY (id),

  CONSTRAINT user\_belief\_statements\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_belief\_statements\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT user\_belief\_statements\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id),

  CONSTRAINT user\_belief\_statements\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.user\_cadence\_settings (

  user\_id uuid NOT NULL,

  navicues\_max\_per\_day smallint NOT NULL DEFAULT 8 CHECK (navicues\_max\_per\_day \>= 0 AND navicues\_max\_per\_day \<= 50),

  navicues\_min\_gap\_minutes smallint NOT NULL DEFAULT 90 CHECK (navicues\_min\_gap\_minutes \>= 0 AND navicues\_min\_gap\_minutes \<= 1440),

  quiet\_hours\_start smallint NOT NULL DEFAULT 22 CHECK (quiet\_hours\_start \>= 0 AND quiet\_hours\_start \<= 23),

  quiet\_hours\_end smallint NOT NULL DEFAULT 7 CHECK (quiet\_hours\_end \>= 0 AND quiet\_hours\_end \<= 23),

  journey\_mode USER-DEFINED NOT NULL DEFAULT 'standard'::journey\_cadence\_mode\_enum,

  journey\_min\_scene\_gap\_hours smallint NOT NULL DEFAULT 6 CHECK (journey\_min\_scene\_gap\_hours \>= 0 AND journey\_min\_scene\_gap\_hours \<= 168),

  journey\_seed\_window\_hours smallint NOT NULL DEFAULT 24 CHECK (journey\_seed\_window\_hours \>= 1 AND journey\_seed\_window\_hours \<= 168),

  journey\_allow\_fast\_forward boolean NOT NULL DEFAULT true,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT user\_cadence\_settings\_pkey PRIMARY KEY (user\_id),

  CONSTRAINT user\_cadence\_settings\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.user\_change\_state (

  user\_id uuid NOT NULL,

  ri\_score numeric NOT NULL DEFAULT 0,

  oi\_score numeric NOT NULL DEFAULT 0,

  ri\_confidence numeric NOT NULL DEFAULT 0.2,

  oi\_confidence numeric NOT NULL DEFAULT 0.2,

  dominant\_barrier text,

  last\_spark\_at timestamp with time zone,

  last\_proof\_at timestamp with time zone,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT user\_change\_state\_pkey PRIMARY KEY (user\_id),

  CONSTRAINT user\_change\_state\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.user\_consents (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  scope text NOT NULL CHECK (scope \= ANY (ARRAY\['calendar'::text, 'location'::text, 'voice'::text, 'transcripts'::text, 'community'::text, 'research'::text, 'clinician\_sharing'::text, 'notifications'::text\])),

  purpose text NOT NULL CHECK (purpose \= ANY (ARRAY\['personalization'::text, 'orchestration'::text, 'analytics'::text, 'research'::text, 'clinical'::text\])),

  granted boolean NOT NULL,

  granted\_at timestamp with time zone DEFAULT now(),

  revoked\_at timestamp with time zone,

  metadata jsonb,

  CONSTRAINT user\_consents\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.user\_context\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  context\_slug text NOT NULL,

  event USER-DEFINED NOT NULL DEFAULT 'observed'::context\_event\_enum,

  value\_num numeric,

  notes text,

  evidence jsonb DEFAULT '{}'::jsonb,

  occurred\_at timestamp with time zone DEFAULT now(),

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT user\_context\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT user\_context\_events\_profile\_fk FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.user\_context\_mindblock\_assoc (

  individual\_id uuid NOT NULL,

  context\_slug text NOT NULL,

  mindblock\_id uuid NOT NULL,

  assoc numeric NOT NULL DEFAULT 0 CHECK (assoc \>= 0::numeric AND assoc \<= 1::numeric),

  evidence jsonb DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT user\_context\_mindblock\_assoc\_pkey PRIMARY KEY (individual\_id, context\_slug, mindblock\_id),

  CONSTRAINT user\_context\_mindblock\_assoc\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.user\_context\_state (

  individual\_id uuid NOT NULL,

  context\_slug text NOT NULL,

  weight numeric NOT NULL DEFAULT 0 CHECK (weight \>= 0::numeric AND weight \<= 1::numeric),

  confidence numeric NOT NULL DEFAULT 0.2 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  last\_seen\_at timestamp with time zone,

  evidence jsonb DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT user\_context\_state\_pkey PRIMARY KEY (individual\_id, context\_slug),

  CONSTRAINT user\_context\_state\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.user\_embeddings (

  user\_id uuid NOT NULL,

  state\_embedding USER-DEFINED,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT user\_embeddings\_pkey PRIMARY KEY (user\_id)

);

CREATE TABLE public.user\_events (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  event\_type text NOT NULL,

  content\_ref uuid,

  deployment\_id uuid,

  exposure\_id uuid,

  session\_id uuid,

  properties jsonb NOT NULL DEFAULT '{}'::jsonb,

  occurred\_at timestamp with time zone NOT NULL DEFAULT now(),

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT user\_events\_pkey PRIMARY KEY (id),

  CONSTRAINT user\_events\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_events\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT user\_events\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id)

);

CREATE TABLE public.user\_feed\_queue (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  content\_type text NOT NULL CHECK (content\_type \= ANY (ARRAY\['navicue'::text, 'block'::text, 'sequence'::text, 'article'::text, 'practice'::text, 'insight'::text, 'state\_checkin'::text, 'celebration'::text, 'reflection'::text, 'social'::text\])),

  content\_id text NOT NULL,

  position integer NOT NULL,

  reason text,

  queued\_at timestamp with time zone DEFAULT now(),

  surfaced\_at timestamp with time zone,

  completed\_at timestamp with time zone,

  skipped\_at timestamp with time zone,

  saved\_at timestamp with time zone,

  context\_tags ARRAY DEFAULT '{}'::text\[\],

  metadata jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  content\_ref uuid NOT NULL,

  item\_kind text CHECK (item\_kind \= ANY (ARRAY\['micro'::text, 'episode'::text, 'proof'::text, 'support'::text\])),

  scheduled\_for timestamp with time zone,

  expires\_at timestamp with time zone,

  priority integer DEFAULT 0,

  score numeric,

  rank\_features jsonb DEFAULT '{}'::jsonb,

  arousal\_fit text CHECK (arousal\_fit \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text, 'downshift\_first'::text\])),

  CONSTRAINT user\_feed\_queue\_pkey PRIMARY KEY (id),

  CONSTRAINT user\_feed\_queue\_patient\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_feed\_queue\_content\_ref\_fkey FOREIGN KEY (content\_ref) REFERENCES public.content\_registry(id)

);

CREATE TABLE public.user\_feed\_queue\_v2 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  item\_kind text NOT NULL CHECK (item\_kind \= ANY (ARRAY\['micro'::text, 'episode'::text, 'proof'::text, 'support'::text\])),

  content\_type text NOT NULL CHECK (content\_type \= ANY (ARRAY\['navicue'::text, 'block'::text, 'sequence'::text, 'article'::text, 'practice'::text, 'state\_checkin'::text, 'reflection'::text, 'celebration'::text, 'insight'::text\])),

  content\_id text NOT NULL,

  reason text,

  scheduled\_for timestamp with time zone,

  expires\_at timestamp with time zone,

  priority integer DEFAULT 0,

  score numeric,

  rank\_features jsonb DEFAULT '{}'::jsonb,

  arousal\_fit text CHECK (arousal\_fit \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text, 'downshift\_first'::text\])),

  queued\_at timestamp with time zone DEFAULT now(),

  surfaced\_at timestamp with time zone,

  completed\_at timestamp with time zone,

  skipped\_at timestamp with time zone,

  saved\_at timestamp with time zone,

  context\_tags ARRAY DEFAULT '{}'::text\[\],

  metadata jsonb DEFAULT '{}'::jsonb,

  content\_ref uuid,

  CONSTRAINT user\_feed\_queue\_v2\_pkey PRIMARY KEY (id),

  CONSTRAINT user\_feed\_queue\_v2\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_feed\_queue\_v2\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id),

  CONSTRAINT user\_feed\_queue\_v2\_individual\_fk FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_feed\_queue\_v2\_org\_fk FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.user\_flags (

  user\_id uuid NOT NULL,

  is\_under\_18 boolean,

  is\_vulnerable boolean,

  marketing\_opt\_out boolean,

  safety\_opt\_out boolean,

  notes text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT user\_flags\_pkey PRIMARY KEY (user\_id),

  CONSTRAINT user\_flags\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES auth.users(id)

);

CREATE TABLE public.user\_focus\_state (

  individual\_id uuid NOT NULL,

  active\_journey\_instance\_id uuid,

  pillar\_id text,

  theme\_id text,

  schema\_id text,

  family\_id uuid,

  amplitude numeric DEFAULT 0 CHECK (amplitude \>= 0::numeric AND amplitude \<= 1::numeric),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT user\_focus\_state\_pkey PRIMARY KEY (individual\_id)

);

CREATE TABLE public.user\_item\_fatigue (

  user\_id uuid NOT NULL,

  item\_type text NOT NULL,

  item\_id text NOT NULL,

  last\_seen\_at timestamp with time zone NOT NULL DEFAULT now(),

  seen\_count integer NOT NULL DEFAULT 1,

  CONSTRAINT user\_item\_fatigue\_pkey PRIMARY KEY (user\_id, item\_type, item\_id)

);

CREATE TABLE public.user\_kbe\_state (

  user\_id uuid NOT NULL,

  scope\_type text NOT NULL CHECK (scope\_type \= ANY (ARRAY\['schema'::text, 'family'::text, 'mindblock'::text, 'ladder'::text, 'rung'::text\])),

  scope\_key text NOT NULL,

  stage text NOT NULL CHECK (stage \= ANY (ARRAY\['knowing'::text, 'believing'::text, 'embodying'::text\])),

  confidence numeric NOT NULL DEFAULT 0.7 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  evidence\_count integer NOT NULL DEFAULT 0,

  last\_evidence\_at timestamp with time zone,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  trace\_id uuid,

  CONSTRAINT user\_kbe\_state\_pkey PRIMARY KEY (user\_id, scope\_type, scope\_key),

  CONSTRAINT user\_kbe\_state\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES public.profiles(id)

);

CREATE TABLE public.user\_lens\_state (

  individual\_id uuid NOT NULL,

  lens\_id text NOT NULL,

  weight numeric DEFAULT 0,

  confidence numeric DEFAULT 0.2,

  evidence jsonb DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT user\_lens\_state\_pkey PRIMARY KEY (individual\_id, lens\_id),

  CONSTRAINT user\_lens\_state\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_lens\_state\_lens\_id\_fkey FOREIGN KEY (lens\_id) REFERENCES public.lens\_catalog(id)

);

CREATE TABLE public.user\_mindblock\_status (

  individual\_id uuid NOT NULL,

  mindblock\_id uuid NOT NULL,

  organization\_id uuid,

  status text NOT NULL DEFAULT 'unknown'::text,

  confidence numeric,

  evidence jsonb DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone DEFAULT now(),

  k\_level numeric CHECK (k\_level IS NULL OR k\_level \>= 0::numeric AND k\_level \<= 1::numeric),

  b\_level numeric CHECK (b\_level IS NULL OR b\_level \>= 0::numeric AND b\_level \<= 1::numeric),

  e\_level numeric CHECK (e\_level IS NULL OR e\_level \>= 0::numeric AND e\_level \<= 1::numeric),

  progress\_pct smallint CHECK (progress\_pct IS NULL OR progress\_pct \>= 0 AND progress\_pct \<= 100),

  priority\_score numeric CHECK (priority\_score IS NULL OR priority\_score \>= 0::numeric AND priority\_score \<= 100::numeric),

  priority\_band text CHECK (priority\_band IS NULL OR (priority\_band \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text\]))),

  impact01 numeric CHECK (impact01 IS NULL OR impact01 \>= 0::numeric AND impact01 \<= 1::numeric),

  priority\_weighted numeric CHECK (priority\_weighted IS NULL OR priority\_weighted \>= 0::numeric AND priority\_weighted \<= 100::numeric),

  is\_hot boolean DEFAULT false,

  last\_signal\_at timestamp with time zone,

  context\_hotness01 numeric CHECK (context\_hotness01 IS NULL OR context\_hotness01 \>= 0::numeric AND context\_hotness01 \<= 1::numeric),

  context\_multiplier numeric CHECK (context\_multiplier IS NULL OR context\_multiplier \>= 1::numeric AND context\_multiplier \<= 1.35),

  CONSTRAINT user\_mindblock\_status\_pkey PRIMARY KEY (individual\_id, mindblock\_id),

  CONSTRAINT user\_mindblock\_status\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_mindblock\_status\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id),

  CONSTRAINT user\_mindblock\_status\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.user\_risk\_state (

  user\_id uuid NOT NULL,

  risk\_level smallint NOT NULL DEFAULT 0,

  risk\_reason text,

  last\_event\_at timestamp with time zone,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT user\_risk\_state\_pkey PRIMARY KEY (user\_id),

  CONSTRAINT user\_risk\_state\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES auth.users(id)

);

CREATE TABLE public.user\_risk\_state\_v2 (

  user\_id uuid NOT NULL,

  risk\_level USER-DEFINED NOT NULL DEFAULT 'none'::risk\_level,

  reasons ARRAY NOT NULL DEFAULT '{}'::text\[\],

  expires\_at timestamp with time zone,

  meta jsonb NOT NULL DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT user\_risk\_state\_v2\_pkey PRIMARY KEY (user\_id),

  CONSTRAINT user\_risk\_state\_v2\_user\_id\_fkey FOREIGN KEY (user\_id) REFERENCES auth.users(id)

);

CREATE TABLE public.user\_schema\_state (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  schema\_id text NOT NULL,

  belief\_level numeric,

  embodiment\_level numeric,

  confidence numeric,

  evidence jsonb DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone DEFAULT now(),

  weight numeric DEFAULT 0,

  CONSTRAINT user\_schema\_state\_pkey PRIMARY KEY (id),

  CONSTRAINT user\_schema\_state\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_schema\_state\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.user\_schema\_status (

  individual\_id uuid NOT NULL,

  schema\_id text NOT NULL,

  weight numeric DEFAULT 0.0 CHECK (weight \>= 0::numeric AND weight \<= 1::numeric),

  confidence numeric DEFAULT 0.0 CHECK (confidence \>= 0::numeric AND confidence \<= 1::numeric),

  evidence jsonb DEFAULT '{}'::jsonb,

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT user\_schema\_status\_pkey PRIMARY KEY (individual\_id, schema\_id),

  CONSTRAINT user\_schema\_status\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_schema\_status\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.schema\_catalog(id)

);

CREATE TABLE public.user\_schemas (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  title text,

  description\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT user\_schemas\_pkey PRIMARY KEY (id),

  CONSTRAINT user\_schemas\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_schemas\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.user\_soundbites (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  individual\_id uuid NOT NULL,

  organization\_id uuid,

  mode USER-DEFINED NOT NULL DEFAULT 'voice'::diary\_mode,

  transcript text,

  media\_url text,

  duration\_seconds integer,

  ai\_summary jsonb DEFAULT '{}'::jsonb,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  captured\_at timestamp with time zone NOT NULL DEFAULT now(),

  privacy\_level USER-DEFINED NOT NULL DEFAULT 'private'::privacy\_level\_enum,

  intent USER-DEFINED,

  capture\_quality USER-DEFINED DEFAULT 'clean'::capture\_quality\_enum,

  context\_tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  hot\_context text,

  energy smallint CHECK (energy \>= 0 AND energy \<= 10),

  clarity smallint CHECK (clarity \>= 0 AND clarity \<= 10),

  connection smallint CHECK (connection \>= 0 AND connection \<= 10),

  CONSTRAINT user\_soundbites\_pkey PRIMARY KEY (id),

  CONSTRAINT user\_soundbites\_individual\_id\_fkey FOREIGN KEY (individual\_id) REFERENCES public.profiles(id),

  CONSTRAINT user\_soundbites\_organization\_id\_fkey FOREIGN KEY (organization\_id) REFERENCES public.organizations(id)

);

CREATE TABLE public.user\_state\_bands (

  id bigint NOT NULL DEFAULT nextval('user\_state\_bands\_id\_seq'::regclass),

  user\_id uuid NOT NULL,

  band text NOT NULL CHECK (band \= ANY (ARRAY\['green'::text, 'amber'::text, 'red'::text, 'shutdown'::text\])),

  estimated\_at timestamp with time zone DEFAULT now(),

  estimator\_version text,

  inputs jsonb,

  CONSTRAINT user\_state\_bands\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.user\_state\_checkins (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  user\_id uuid NOT NULL,

  timestamp timestamp with time zone DEFAULT now(),

  tempo integer CHECK (tempo \>= 0 AND tempo \<= 100),

  flow integer CHECK (flow \>= 0 AND flow \<= 100),

  sync integer CHECK (sync \>= 0 AND sync \<= 100),

  composite integer DEFAULT (((tempo \+ flow) \+ sync) / 3),

  context text,

  tags ARRAY,

  location text,

  mood text,

  CONSTRAINT user\_state\_checkins\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.video\_classifications (

  media\_id text NOT NULL,

  pillar\_id text,

  theme\_id text,

  schema\_id text,

  content\_type text,

  intent text,

  state\_fit text,

  keywords ARRAY,

  suggested\_title text,

  confidence numeric,

  mapped\_at timestamp with time zone DEFAULT now(),

  mapped\_by text,

  CONSTRAINT video\_classifications\_pkey PRIMARY KEY (media\_id),

  CONSTRAINT video\_classifications\_media\_id\_fkey FOREIGN KEY (media\_id) REFERENCES public.jw\_media(media\_id),

  CONSTRAINT video\_classifications\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id),

  CONSTRAINT video\_classifications\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.video\_themes(id),

  CONSTRAINT video\_classifications\_schema\_id\_fkey FOREIGN KEY (schema\_id) REFERENCES public.video\_schemas(id)

);

CREATE TABLE public.video\_schemas (

  id text NOT NULL,

  theme\_id text,

  name text NOT NULL,

  description text,

  is\_active boolean DEFAULT true,

  CONSTRAINT video\_schemas\_pkey PRIMARY KEY (id),

  CONSTRAINT video\_schemas\_theme\_id\_fkey FOREIGN KEY (theme\_id) REFERENCES public.video\_themes(id)

);

CREATE TABLE public.video\_themes (

  id text NOT NULL,

  pillar\_id text,

  name text NOT NULL,

  description text,

  CONSTRAINT video\_themes\_pkey PRIMARY KEY (id),

  CONSTRAINT video\_themes\_pillar\_id\_fkey FOREIGN KEY (pillar\_id) REFERENCES public.pillars(id)

);

CREATE TABLE public.videos (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  source\_provider text NOT NULL DEFAULT 'jw'::text,

  jw\_media\_id text UNIQUE,

  title text,

  description text,

  tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  status text NOT NULL DEFAULT 'needs\_review'::text CHECK (status \= ANY (ARRAY\['needs\_review'::text, 'keep'::text, 'archive'::text, 'delete'::text\])),

  duration\_seconds integer,

  language text,

  auto\_summary text,

  auto\_tags ARRAY NOT NULL DEFAULT '{}'::text\[\],

  storage\_bucket text,

  storage\_path text,

  created\_at timestamp with time zone NOT NULL DEFAULT now(),

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT videos\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.videos\_enrichment (

  video\_id uuid NOT NULL,

  transcript text,

  summary text,

  phase text,

  primitive text,

  pillar text,

  mindblock text,

  mood text,

  use\_cases ARRAY,

  confidence numeric,

  rationale text,

  updated\_at timestamp with time zone NOT NULL DEFAULT now(),

  CONSTRAINT videos\_enrichment\_pkey PRIMARY KEY (video\_id),

  CONSTRAINT videos\_enrichment\_video\_id\_fkey FOREIGN KEY (video\_id) REFERENCES public.videos(id)

);

CREATE TABLE public.voice\_archetypes (

  id text NOT NULL,

  name text NOT NULL UNIQUE,

  description\_md text,

  stance\_defaults ARRAY DEFAULT '{inquiry}'::epistemic\_stance\[\],

  warmth numeric DEFAULT 0.5 CHECK (warmth \>= 0::numeric AND warmth \<= 1::numeric),

  directness numeric DEFAULT 0.5 CHECK (directness \>= 0::numeric AND directness \<= 1::numeric),

  humor numeric DEFAULT 0.2 CHECK (humor \>= 0::numeric AND humor \<= 1::numeric),

  paradox\_tolerance numeric DEFAULT 0.3 CHECK (paradox\_tolerance \>= 0::numeric AND paradox\_tolerance \<= 1::numeric),

  compassion\_heat numeric DEFAULT 0.6 CHECK (compassion\_heat \>= 0::numeric AND compassion\_heat \<= 1::numeric),

  precision numeric DEFAULT 0.5 CHECK ("precision" \>= 0::numeric AND "precision" \<= 1::numeric),

  somatic\_bias numeric DEFAULT 0.3 CHECK (somatic\_bias \>= 0::numeric AND somatic\_bias \<= 1::numeric),

  meaning\_bias numeric DEFAULT 0.4 CHECK (meaning\_bias \>= 0::numeric AND meaning\_bias \<= 1::numeric),

  challenge\_bias numeric DEFAULT 0.3 CHECK (challenge\_bias \>= 0::numeric AND challenge\_bias \<= 1::numeric),

  anti\_patterns text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT voice\_archetypes\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.voice\_inspirations (

  voice\_id text NOT NULL,

  guru\_id bigint NOT NULL,

  weight numeric DEFAULT 1,

  internal\_only boolean DEFAULT true,

  notes\_md text,

  CONSTRAINT voice\_inspirations\_pkey PRIMARY KEY (voice\_id, guru\_id),

  CONSTRAINT voice\_inspirations\_voice\_id\_fkey FOREIGN KEY (voice\_id) REFERENCES public.voice\_archetypes(id),

  CONSTRAINT voice\_inspirations\_guru\_id\_fkey FOREIGN KEY (guru\_id) REFERENCES public.gurus(id)

);

CREATE TABLE public.wellbeing\_mindblocks (

  wellbeing\_video\_id bigint NOT NULL,

  mindblock\_id uuid NOT NULL,

  relevance\_strength numeric,

  CONSTRAINT wellbeing\_mindblocks\_pkey PRIMARY KEY (wellbeing\_video\_id, mindblock\_id),

  CONSTRAINT wellbeing\_mindblocks\_mindblock\_id\_fkey FOREIGN KEY (mindblock\_id) REFERENCES public.mindblocks(id)

);

CREATE TABLE public.wellbeing\_videos (

  media\_id text,

  title text,

  description text,

  tags text,

  status text,

  duration text

);

CREATE TABLE public.witness\_requests (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  run\_id uuid,

  requester\_id uuid NOT NULL,

  witness\_id uuid NOT NULL,

  request\_type text NOT NULL DEFAULT 'notify'::text CHECK (request\_type \= ANY (ARRAY\['notify'::text, 'confirm'::text, 'support'::text\])),

  status text NOT NULL DEFAULT 'pending'::text CHECK (status \= ANY (ARRAY\['pending'::text, 'delivered'::text, 'acknowledged'::text, 'confirmed'::text, 'declined'::text, 'expired'::text\])),

  channel text NOT NULL DEFAULT 'in\_app'::text CHECK (channel \= ANY (ARRAY\['in\_app'::text, 'email'::text, 'sms'::text, 'push'::text\])),

  outbox\_id uuid,

  requested\_at timestamp with time zone DEFAULT now(),

  responded\_at timestamp with time zone,

  payload jsonb NOT NULL DEFAULT '{}'::jsonb,

  CONSTRAINT witness\_requests\_pkey PRIMARY KEY (id),

  CONSTRAINT witness\_requests\_run\_id\_fkey FOREIGN KEY (run\_id) REFERENCES public.rite\_runs(id),

  CONSTRAINT witness\_requests\_requester\_id\_fkey FOREIGN KEY (requester\_id) REFERENCES public.profiles(id),

  CONSTRAINT witness\_requests\_witness\_id\_fkey FOREIGN KEY (witness\_id) REFERENCES public.profiles(id),

  CONSTRAINT witness\_requests\_outbox\_id\_fkey FOREIGN KEY (outbox\_id) REFERENCES public.notifications(id)

);

CREATE TABLE public.world\_edges (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  src\_id uuid NOT NULL,

  dst\_id uuid NOT NULL,

  kind USER-DEFINED NOT NULL DEFAULT 'related\_to'::graph\_edge\_kind,

  strength USER-DEFINED,

  weight numeric,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT world\_edges\_pkey PRIMARY KEY (id),

  CONSTRAINT world\_edges\_src\_fk FOREIGN KEY (src\_id) REFERENCES public.world\_nodes(id),

  CONSTRAINT world\_edges\_dst\_fk FOREIGN KEY (dst\_id) REFERENCES public.world\_nodes(id)

);

CREATE TABLE public.world\_edges\_v23 (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  source\_entity\_id uuid NOT NULL,

  relation\_type text NOT NULL,

  target\_entity\_id uuid NOT NULL,

  weight numeric DEFAULT 1.0 CHECK (weight \>= 0::numeric AND weight \<= 5::numeric),

  polarity USER-DEFINED DEFAULT 'supports'::world\_edge\_polarity\_enum,

  evidence\_status USER-DEFINED DEFAULT 'draft'::world\_edge\_status\_enum,

  context\_scope ARRAY DEFAULT '{}'::text\[\],

  evidence jsonb DEFAULT '{}'::jsonb,

  notes\_md text,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT world\_edges\_v23\_pkey PRIMARY KEY (id),

  CONSTRAINT world\_edges\_v23\_source\_entity\_id\_fkey FOREIGN KEY (source\_entity\_id) REFERENCES public.world\_entities(id),

  CONSTRAINT world\_edges\_v23\_relation\_type\_fkey FOREIGN KEY (relation\_type) REFERENCES public.world\_relation\_types(type),

  CONSTRAINT world\_edges\_v23\_target\_entity\_id\_fkey FOREIGN KEY (target\_entity\_id) REFERENCES public.world\_entities(id)

);

CREATE TABLE public.world\_entities (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  entity\_type USER-DEFINED NOT NULL,

  key text NOT NULL,

  label text NOT NULL,

  description\_md text,

  aliases ARRAY DEFAULT '{}'::text\[\],

  tags ARRAY DEFAULT '{}'::text\[\],

  ref\_table text,

  ref\_id text,

  meta jsonb DEFAULT '{}'::jsonb,

  is\_active boolean DEFAULT true,

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT world\_entities\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.world\_nodes (

  id uuid NOT NULL DEFAULT gen\_random\_uuid(),

  node\_type text NOT NULL,

  node\_key text NOT NULL,

  title text,

  summary\_md text,

  tags ARRAY DEFAULT '{}'::text\[\],

  created\_at timestamp with time zone DEFAULT now(),

  updated\_at timestamp with time zone DEFAULT now(),

  CONSTRAINT world\_nodes\_pkey PRIMARY KEY (id)

);

CREATE TABLE public.world\_relation\_types (

  type text NOT NULL,

  description text,

  is\_symmetric boolean DEFAULT false,

  allowed\_sources ARRAY DEFAULT '{}'::world\_entity\_type\_enum\[\],

  allowed\_targets ARRAY DEFAULT '{}'::world\_entity\_type\_enum\[\],

  CONSTRAINT world\_relation\_types\_pkey PRIMARY KEY (type)

);

