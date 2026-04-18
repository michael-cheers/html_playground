import { useState, useEffect, useCallback, useMemo } from 'react';

const IDEAS_MD = `## Intake & Boss Interface

intake | PM-agent that reads boss's Slack messages and drafts feature specs before the boss clarifies
intake | Auto-ask boss clarifying questions via Slack DM when a feature request is ambiguous
intake | Voice memo transcription → feature draft
intake | Weekly digest to boss of features shipped, in flight, blocked
intake | Let boss approve features by thumbs-up on Slack messages
intake | Detect duplicate feature requests against the existing 853 and flag before adding
intake | Auto-categorize features on submission via classifier
intake | Auto-assign priority based on keywords (outage, broken, revenue → high)
intake | Reject feature requests that are actually bug reports and route to bug tracker
intake | Merge related feature requests that describe the same underlying need
intake | Pull feature requests from Intercom tickets automatically
intake | Pull feature requests from GitHub issues automatically
intake | Pull feature requests from customer emails automatically
intake | Let users submit feature requests via a public portal with upvoting
intake | Weekly "what did the boss ask for that didn't get filed" audit
intake | Detect when a Slack conversation implies a feature request and ask to file it
intake | Feature request template with required fields (user, problem, acceptance)
intake | Auto-link feature requests to the customer(s) who asked for them
intake | Track which customers' requests actually get shipped (customer responsiveness metric)
intake | Record why a feature was rejected so similar ones can be auto-rejected

## Planning & Spec

planning | Spec agent drafts acceptance criteria from the one-line feature description
planning | Auto-generate test cases from acceptance criteria before coding starts
planning | Require every feature to name the user flow it affects before coding
planning | Link features to the code paths they'll touch (predict from description)
planning | Estimate effort before picking up, alert when estimate exceeds threshold
planning | Break features >N hours into subfeatures automatically
planning | Draft API contracts before implementation for any backend-touching feature
planning | Draft DB schema changes before implementation and flag to human if migration needed
planning | Generate a rollback plan as part of the spec
planning | Identify features that are actually refactors disguised as features
planning | Auto-create Figma mockups from text description for UI features
planning | Spec agent checks codebase for related existing features before speccing
planning | Flag features that conflict with features already in flight
planning | Flag features that would duplicate existing functionality
planning | Predict which files will be touched and reserve them to prevent parallel conflicts
planning | Generate user-facing documentation as part of the spec, not after
planning | Generate release notes as part of the spec
planning | Run spec through "is this actually valuable" filter — require user/revenue justification
planning | Require explicit out-of-scope list on every spec
planning | Detect features that require third-party API changes and flag early

## Coding

coding | Always run type checker before declaring done
coding | Always run linter and auto-fix before declaring done
coding | Always run the affected tests before declaring done, not just the new ones
coding | Coding agent reads the git log of touched files before editing
coding | Coding agent reads recent PRs touching the same files before editing
coding | Enforce file-size limits to prevent 2000-line god files
coding | Enforce function-size limits
coding | Coding agent writes commit message as part of the task, not after
coding | Small-change agent separate from large-change agent, routed by LOC estimate
coding | Refactor agent that only does refactors, never mixes with features
coding | Dependency-update agent that handles package bumps separately
coding | Require conventional commits format
coding | Prevent coding agent from touching lockfiles unless explicitly asked
coding | Prevent coding agent from touching CI configs unless explicitly asked
coding | Prevent coding agent from touching env files
coding | Prevent coding agent from committing secrets
coding | Coding agent runs git diff on itself before committing and reviews
coding | Coding agent writes a short "what I changed and why" comment per commit
coding | Reject commits that touch unrelated files to the stated feature
coding | Reject commits that delete tests
coding | Reject commits that add .skip or .only to tests
coding | Reject commits that disable lint rules inline
coding | Cap total lines changed per PR; split if over
coding | Coding agent checks if a similar function already exists before writing a new one
coding | Shared-utilities agent that extracts duplicated code across files
coding | Dead code detection agent
coding | Unused-import detection agent
coding | Import-order enforcement
coding | Coding agent writes migrations alongside schema changes, never separately
coding | Migration-reversibility check — every migration must have a down
coding | Coding agent runs migrations locally before committing
coding | Coding agent never hardcodes URLs, ports, or credentials
coding | Coding agent always uses environment variables via a central config module
coding | Coding agent reads CLAUDE.md at session start and acknowledges key rules
coding | CLAUDE.md has a test suite (fixtures that check agent follows the rules)
coding | Per-directory CLAUDE.md files for area-specific rules
coding | Coding agent uses a scratchpad file for debugging notes, cleaned up before commit
coding | Pair-coding mode: two agents, one writes, one reviews each change
coding | Red-team agent that tries to break every PR before merge
coding | Performance-impact agent that benchmarks hot paths
coding | Bundle-size-impact agent for frontend changes
coding | Accessibility agent that runs axe on UI changes
coding | i18n agent that flags hardcoded user-facing strings
coding | Mobile-responsiveness agent for UI changes
coding | Dark-mode check agent for UI changes
coding | Browser-compat check for frontend changes
coding | Security agent that runs SAST on every PR
coding | License-compatibility check on new dependencies
coding | Dependency-size impact on new dependencies
coding | Require justification for any new dependency
coding | Prefer standard library over dependencies when possible — agent checks
coding | Detect when coding agent reinvents a well-known library and suggest the library
coding | Detect when coding agent uses a library wrong and suggest idiomatic usage

## Review

review | Auto-approve PRs with only test additions
review | Auto-approve PRs with only comment/doc changes
review | Auto-approve PRs with only formatting changes
review | Auto-approve PRs under N lines
review | Require human review for PRs touching auth, payments, migrations
review | Require human review for PRs touching files on a protected list
review | Review agent explains the diff in plain English at the top of the PR
review | Review agent flags risks in the diff before human sees
review | Review agent suggests additional test cases for edge cases it spots
review | Review agent checks diff against the spec and flags scope creep
review | Review agent checks diff against CLAUDE.md rules and flags violations
review | Two-review rule: if two independent review agents both approve, auto-merge
review | Review agent checks for reused utilities vs. duplicating logic
review | Review agent checks error handling paths
review | Review agent specifically checks for N+1 queries
review | Review agent specifically checks for missing null/undefined guards
review | Review agent checks for race conditions in async code
review | Review agent checks for proper transaction boundaries
review | Review agent checks for proper logging on new error paths
review | Review agent checks that new endpoints have auth checks
review | Review agent checks that new endpoints have rate limits
review | Review agent checks that new endpoints have input validation
review | Review agent maintains a list of "things Adam always catches" and checks for them
review | Human reviewer flags reason for rejection; log trains the review agent
review | Compare AI reviewer verdict to human verdict when human later touches; log divergence
review | Review agent auto-requests changes for common mistakes instead of flagging to human
review | Random 5% sample of auto-approved PRs routed to human for audit
review | Daily digest of auto-approved PRs with one-line summaries

## Testing

testing | Persist all integration tests in a versioned location
testing | Standalone-then-promote workflow for tests
testing | Tag tests by feature ID so they can be traced back
testing | Tag tests by blast radius for selective runs
testing | Fast smoke test suite that runs on every PR
testing | Full suite that runs nightly
testing | Flaky test detection — track pass rate per test over time
testing | Auto-quarantine flaky tests after N failures with N-1 retries
testing | Alert when flaky test quarantine grows past a threshold
testing | Require test with every bug fix (regression test)
testing | Link regression tests to the bug they cover
testing | Mutation testing to find untested code paths
testing | Coverage threshold enforcement per file, not project-wide
testing | Coverage diff on PR — fail if coverage decreases on changed files
testing | Visual regression testing for UI changes
testing | Snapshot testing for component output
testing | Contract tests between services
testing | Load testing agent that runs once a week on staging
testing | Chaos agent that occasionally kills services on staging
testing | Database migration test: run up then down then up, verify idempotent
testing | Seed data fixture that's shared across tests
testing | Test data factory for each entity type
testing | Parallel test execution with isolated databases
testing | Test environment cleanup between runs
testing | Browser test matrix for critical flows
testing | Mobile test matrix for critical flows
testing | Accessibility tests in CI
testing | Security tests (SQL injection, XSS probes) on every endpoint
testing | Rate limit tests on every endpoint
testing | Auth tests on every endpoint
testing | Error path tests, not just happy path
testing | Test the test — agents that generate adversarial inputs
testing | Property-based tests for business logic
testing | Fuzz testing on APIs
testing | Replay production traffic against staging for regression detection
testing | Record-and-replay testing for complex user flows
testing | Test tagging by persona (admin, user, guest)
testing | Test tagging by business unit (billing, jobs, customers)
testing | Monitor test runtime and alert on regressions
testing | Split slow tests into their own suite
testing | Kill tests that haven't caught a bug in a year
testing | Kill tests whose only assertion is that the code runs without throwing

## Deploy & Staging

deploy | Feature flags on every new feature by default
deploy | Auto-revert if error rate spikes after deploy
deploy | Canary deploy to one server before full rollout
deploy | Blue-green deploys
deploy | Staging deploy on every PR merge
deploy | Prod deploy requires human click
deploy | Deploy window restrictions (no Friday deploys)
deploy | Deploy log with who/what/when, searchable
deploy | Tag each deploy with the feature IDs it includes
deploy | Rollback tested as part of deploy pipeline
deploy | Database migration runs separately from code deploy
deploy | Config changes deployed separately from code
deploy | Secret rotation as part of deploy
deploy | Pre-deploy health check
deploy | Post-deploy health check with auto-rollback
deploy | Staging mirrors prod data (anonymized)
deploy | Staging password-handler override
deploy | Staging behind VPN or IP allowlist
deploy | Staging cost cap to prevent runaway agents
deploy | Separate staging env per major feature in flight
deploy | Ephemeral preview envs per PR
deploy | Auto-teardown of preview envs after merge
deploy | CDN cache invalidation on deploy
deploy | Client version check to force refresh on breaking changes
deploy | Schema version check between client and server
deploy | Graceful degradation if backend is behind frontend
deploy | Zero-downtime deploys for API
deploy | Kill switch per feature, accessible without deploy

## Monitoring & Ops

monitoring | Cost dashboard per agent, per day
monitoring | Cost dashboard per feature shipped
monitoring | Token usage dashboard
monitoring | Canary regression tests (fixed inputs, diff outputs)
monitoring | Error rate per endpoint
monitoring | Latency per endpoint
monitoring | Queue depth for each pipeline stage
monitoring | Time-in-stage for each feature (detect stuck items)
monitoring | Auto-alert on items stuck in one stage > threshold
monitoring | Daily heartbeat: count of items moved per stage yesterday
monitoring | Weekly review of items blocked or unclear
monitoring | Log retention policy (keep diagnostic data long enough to debug)
monitoring | Structured logging for agent actions
monitoring | Trace every agent action back to the feature it was working on
monitoring | Session replay for agent sessions
monitoring | Dashboard of "things that changed" on the codebase yesterday
monitoring | Uptime monitoring for staging
monitoring | Uptime monitoring for prod
monitoring | Synthetic user flows run every N minutes
monitoring | Alert on new error types (things not seen before)
monitoring | Group errors by root cause, not by stack trace
monitoring | Log PII scrubbing
monitoring | Cost anomaly detection
monitoring | Agent-action anomaly detection (e.g., agent deleted 1000 files)
monitoring | Rate limit agents' file write operations
monitoring | Rate limit agents' DB write operations

## Process & Meta

process | Retrospective after every feature: what went well, what didn't
process | Track time from feature request to ship
process | Track time from feature request to first user feedback
process | Track user feedback per feature (did they use it, complain, praise)
process | Abandon-feature process when scope explodes
process | Kill-feature process for features that shipped and nobody uses
process | Regular codebase health check (tech debt inventory)
process | Quarterly gate audit — which human gates still add value
process | Agent performance review — which agents have low success rates
process | Promote good agent configs to "blessed" status
process | Deprecate agent configs that produce failures
process | A/B test agent configs against each other on real work
process | Meta-agent that improves agent configs based on outcomes
process | Shared vocabulary doc so agents and humans use same terms
process | Onboarding doc for new agents (CLAUDE.md but structured)
process | Offboarding doc for features that get killed (what was learned)
process | Customer advisory board for feature prioritization
process | Feature postmortems when things go wrong in prod
process | Blameless culture doc for agents and humans alike
process | Regular "what is the swarm bad at" review
process | Regular "what are humans bad at" review
process | Documented kill criteria for the swarm itself (when to turn it off)

## Classifier & Auto-Approval Rules

classifier | Keyword rule: contains "auth" → human
classifier | Keyword rule: contains "payment" / "billing" / "invoice amount" → human
classifier | Keyword rule: contains "migration" → human
classifier | Keyword rule: contains "delete" / "drop" → human
classifier | Keyword rule: contains "email" (sending) → human
classifier | Keyword rule: contains "sms" (sending) → human
classifier | Path rule: touches /auth → human
classifier | Path rule: touches /billing → human
classifier | Path rule: touches /migrations → human
classifier | Path rule: modifies existing public API → human
classifier | Path rule: modifies env loader → human
classifier | Path rule: modifies password handler → human
classifier | Path rule: modifies permission service → human
classifier | Path rule: changes third-party webhook handlers → human
classifier | Size rule: touches > N files → human
classifier | Size rule: > N lines changed → human
classifier | Confidence rule: planning agent self-rates < threshold → human
classifier | Priority rule: super_critical → human
classifier | Category rule: Security → human
classifier | Customer rule: affects enterprise customer X → human
classifier | Novelty rule: first time touching this module → human
classifier | Regression rule: this file has had > N rollbacks → human
classifier | Time rule: after-hours or weekend deploys → human
classifier | Dependency rule: adds new package → human
classifier | Dependency rule: bumps major version → human
classifier | Default: everything else auto-approves after N hours idle

## Tooling

tooling | Extend internal dashboard with per-agent stats
tooling | CLI for triaging queues from terminal
tooling | Mobile view of the features dashboard for approving from phone
tooling | Apple Watch complication for queue depth
tooling | Push notifications when something needs human attention
tooling | Slack bot interface to the swarm
tooling | Email digest interface
tooling | Voice interface for reviewing features while walking
tooling | Keyboard shortcuts for bulk triage
tooling | Sort queue by "likely to need human" first
tooling | Group queue items by similar (batch similar decisions)
tooling | Side-by-side diff viewer for before/after
tooling | One-click "approve and add similar to auto-approve rule"
tooling | One-click "reject and add similar to always-human rule"
tooling | Undo on approvals (N-minute window)
tooling | Scheduled approval (approve but don't ship until tomorrow)
tooling | Delegation: "anyone on the team can approve this" for low-risk items
tooling | Pair approval required for high-risk items
tooling | Annotation on features (notes to self or swarm)
tooling | Search across all feature history
tooling | Export feature data to CSV/JSON
tooling | Import feature requests from CSV
tooling | API for the swarm pipeline (so other tools can hook in)
tooling | Webhooks on stage transitions
tooling | Public changelog auto-generated from shipped features

## Data & Memory

memory | Agent memory: things I've been told not to do, per repo
memory | Agent memory: patterns in this codebase
memory | Agent memory: previous conversations about this feature
memory | Shared memory across agents for a single feature
memory | Project-level memory for long-lived conventions
memory | Personal memory for the boss's preferences
memory | Customer memory for customer-specific quirks
memory | Decision log — record why a choice was made so future agents know
memory | ADRs (architecture decision records) maintained by agents
memory | Glossary of domain terms
memory | Map of service ownership (which agent owns what)
memory | Memory compaction — summarize old memories to prevent bloat
memory | Memory retrieval via embedding search
memory | Memory retrieval via explicit tagging
memory | Forget-this-decision mechanism when it's superseded
memory | Conflict detection when memories contradict each other

## Weird / Speculative / Bad

weird | Let features compete: two agents implement, one wins based on metric
weird | Agent plays devil's advocate on every PR
weird | Chaos-monkey agent that introduces random bugs, measures detection rate
weird | Fake bug reports injected to test the swarm's debugging
weird | Agents vote on which features to prioritize
weird | Agents bid compute for features they want to work on
weird | Prediction market for "will this feature ship this week"
weird | Agent generates TikTok explaining each shipped feature
weird | Agent writes haiku for each PR description
weird | Agent translates all comments to pirate speak
weird | Agent writes commit messages in verse
weird | Agent names test users after historical figures
weird | Agent maintains a ship-count leaderboard across itself
weird | Agents write performance reviews of each other
weird | Agent blogs daily about its work, publicly
weird | Agent writes fanfic about the codebase
weird | Every feature must be described in fewer than 10 words or rejected
weird | Every feature must be demoed in a 30-second video
weird | Every feature must have a memorable name
weird | Color-code features by agent personality type
weird | Agent predicts which features will be reversed within 6 months
weird | Agent writes eulogies for deleted code
weird | Simulate users and have them complain about the app
weird | Agent runs the app as a user every day and reports issues
weird | Dogfood agent that uses every feature at least once
weird | Agent gives itself a name and signs its work
weird | Multiple agent personas (conservative, aggressive) for different tasks
weird | Adversarial pair: builder vs. breaker
weird | Agent writes the boss's Slack messages for them
weird | Agent predicts what the boss will ask for next week
weird | Automatically generate a roadmap from the feature list
weird | Agent maintains a burn-down chart
weird | Agent pretends to be on vacation to test the vacation-test
weird | Weekly "agent standup" summary posted to Slack
weird | Agent tweets about shipped features
weird | Public agent blog with honest retrospectives
weird | Agent maintains a list of "things the boss always changes"
weird | Preemptively apply those changes
weird | Agent estimates boss's mood from message tone
weird | Agent holds features if boss's mood is bad
weird | Sentiment analysis on customer tickets → feature priority bump
weird | Agent drafts apologies for when things break
weird | Agent drafts celebration messages for wins
weird | Agent reads competitor release notes and flags feature gaps
weird | Agent reads HN and flags relevant discussion
weird | Agent attends meetings via transcript and extracts action items

## Security

security | No agent has prod DB access, ever
security | No agent has cloud admin keys
security | Agents use short-lived tokens, rotated daily
security | Agent actions logged to an append-only log
security | Cryptographic signatures on agent-generated commits
security | Human-in-the-loop for any cryptographic key generation
security | Agents can't disable other security controls
security | Principle of least privilege per agent role
security | Separate agents for read vs. write operations
security | Agents behind a rate limiter on destructive operations
security | Honeypot files that alert if an agent reads them
security | Honeypot credentials that alert if used
security | Network egress restrictions for agents
security | File system sandbox for code-running agents
security | Container isolation between agents
security | Secret scanning on all agent output
security | PII detection on all agent output
security | Agent actions audited by a separate compliance agent
security | Incident response playbook for rogue agents
security | Kill switch that works even if agents are compromised
security | Out-of-band alerts for security events
security | Two-agent rule for high-privilege operations
security | Time-delay on high-privilege operations (reviewable before execution)
security | Separate signing key per agent role
security | Agent identity verification on every action
security | Tamper-evident logs
security | Regular pen testing of agent infrastructure
security | Assume agents will be compromised — defense in depth
security | Data classification and handling per class
security | Agents can't modify their own prompts
security | Agents can't modify their own logs
security | Agents can't modify their own permissions

## Documentation

docs | Auto-generate API docs from code
docs | Auto-generate changelog from commits
docs | Auto-update README when structure changes
docs | Auto-update CLAUDE.md when conventions change
docs | Maintain a "what's deprecated" list
docs | Maintain a "how to X in this codebase" doc
docs | Auto-generate architecture diagrams from code
docs | Auto-generate data flow diagrams from code
docs | Video walkthrough of each feature for support
docs | User-facing help docs generated from feature specs
docs | Runbook per critical service
docs | Incident playbooks per error class
docs | Onboarding doc for humans joining the team
docs | Onboarding doc for new agent configs
docs | Glossary of customer types and their needs
docs | Glossary of internal concepts
docs | Map of integrations with external services
docs | Inventory of cron jobs and scheduled tasks
docs | Inventory of feature flags currently active
docs | Inventory of experiments currently running

## Team & Collaboration

team | Shared queue that anyone can pull from
team | Assignment rules (auth stuff to Alice, UI to Bob)
team | Peer review rotation
team | Pair programming sessions (human + human + agents)
team | Knowledge transfer sessions recorded
team | Bus-factor audit per component
team | Documentation ownership per component
team | On-call rotation even for small teams
team | After-hours agent behavior different from business hours
team | Handoff notes when humans switch contexts

## Customer Experience

customer | Tell customers which of their requests are in flight
customer | Tell customers which features shipped this week
customer | Measure NPS per customer
customer | Track feature adoption per customer
customer | Alert when a high-value customer hasn't logged in
customer | Alert when a high-value customer hits repeated errors
customer | Personalized onboarding per customer type
customer | Feature usage heatmap per customer
customer | Predict churn from usage patterns
customer | Predict expansion from usage patterns

## Business Metrics

metrics | Revenue impact per feature shipped (track for 90 days)
metrics | Support ticket count per feature shipped
metrics | Bug count per feature shipped
metrics | Rollback count per feature shipped
metrics | Time-to-ship trending
metrics | Queue depth trending
metrics | Cost per feature shipped
metrics | Features shipped per dollar of API spend
metrics | Human hours per feature (minimize toward zero)
metrics | Bus factor per code area

## Swarm Self-Improvement

selfimp | Weekly review of agent failures, update prompts
selfimp | A/B test new prompts against current on sample of real work
selfimp | Rollback prompt changes that cause regressions
selfimp | Version-control all agent configs
selfimp | Tag agent versions with their success rate
selfimp | Promote agents from "beta" to "production" based on metrics
selfimp | Retire agents that underperform
selfimp | Agent competitions: two configs race on same task
selfimp | Human curation of successful agent runs as few-shots
selfimp | Human curation of failed agent runs as anti-examples
selfimp | Automated curation of same
selfimp | Distillation: summarize good runs into prompt improvements
selfimp | Anti-reward-hacking reviews
selfimp | Goodharting checks on any metric the swarm optimizes

## Risk Management

risk | Feature shipping freeze before holidays
risk | Feature shipping freeze during incidents
risk | Risk score per feature, reviewed before ship
risk | Separate tracks for high/low-risk features
risk | Post-ship monitoring intensity scales with risk score
risk | Insurance for high-risk changes
risk | Blast radius declared per feature, not per file
risk | "What could go wrong" section required on every spec
risk | Pre-mortem on high-risk features

## Scale & Performance

perf | Agent orchestration scales horizontally
perf | Queue-based agent dispatch
perf | Priority queue for urgent work
perf | Backpressure when queue exceeds human review capacity
perf | Caching of agent outputs for similar inputs
perf | Deduplication of concurrent similar requests
perf | Load balancing across Claude Max subs
perf | Failover between Claude plans
perf | Caching of repo state to avoid re-reading
perf | Caching of test results for unchanged files

## Integration with Existing Tools

integration | GitHub/GitLab integration for PR automation
integration | Slack integration for notifications
integration | Jira/Linear integration for ticket sync
integration | Figma integration for design specs
integration | Stripe integration for billing-related features
integration | Sentry integration for error triage
integration | Datadog integration for performance monitoring
integration | Segment integration for analytics
integration | Zendesk integration for support tickets
integration | Intercom integration for customer messages

## Things That Sound Good But Probably Aren't

bad-maybe | Build a custom LLM fine-tuned on your codebase
bad-maybe | Switch away from Claude to compare models (disruption cost high)
bad-maybe | Build your own agent framework (you're not in the agent business)
bad-maybe | Give agents autonomous git push to main
bad-maybe | Give agents autonomous deploy to prod
bad-maybe | Give agents autonomous customer communication
bad-maybe | Remove all human gates (overcorrection)
bad-maybe | Add human gates everywhere (also overcorrection)
bad-maybe | Rewrite codebase in a different language because agents are better at it
bad-maybe | Mandatory test coverage of 100%
bad-maybe | Block all dependencies and write everything from scratch
bad-maybe | Require agents to write formal proofs of correctness
bad-maybe | Build a full RL training pipeline for agent improvement
bad-maybe | Implement agent-to-agent voting for all decisions
bad-maybe | Agent democracy (too slow)
bad-maybe | One mega-agent that does everything (loses parallelism benefit)
bad-maybe | Switch to a competitor's agent framework every quarter
bad-maybe | Open-source the agent configs (invites adversarial study)
bad-maybe | Make the swarm entirely self-modifying (alignment nightmare)
bad-maybe | Let the swarm set its own priorities (Goodhart guaranteed)

## Instrumentation of the Human

human | Track your own approve/reject patterns to infer the rules
human | Track how long you spend per approval (identify low-value ones)
human | Track which approvals you regret later
human | Track which rejections you reverse later
human | Track your mood/energy against decision quality
human | Calibration exercises — rate confidence, check accuracy
human | Decision journal per significant choice
human | Review decisions weekly for bias patterns
human | Identify decisions that could be made by rule instead of judgment
human | Identify decisions you're consistently bad at and delegate

## Out-of-Scope But Interesting

oos | Hire a second human to share the bottleneck
oos | Sell the swarm tooling as a product
oos | Open-source the non-proprietary parts
oos | Write a blog post about the vacation test framing
oos | Conference talk about what you've learned
oos | Training materials for others adopting agent swarms
oos | Consultancy on agent swarm setup for similar-size companies
oos | Research paper on pipeline bottlenecks in agent swarms
oos | Podcast about running a real business on agents
oos | Book about it in 3 years when there's enough material

## Swarm Hygiene

hygiene | Garbage collect old branches
hygiene | Garbage collect stale PRs
hygiene | Archive closed features after N months
hygiene | Prune feature list of duplicates quarterly
hygiene | Prune categories and labels quarterly
hygiene | Archive old agent logs to cheap storage
hygiene | Delete test data regularly
hygiene | Vacuum the database
hygiene | Dependency updates on schedule
hygiene | Security patches on priority schedule
hygiene | Rotate secrets on schedule
hygiene | Review IAM permissions quarterly
hygiene | Audit who has access to what quarterly
hygiene | Clean up unused feature flags
hygiene | Clean up unused env vars
hygiene | Clean up unused database columns
hygiene | Clean up unused API endpoints
hygiene | Clean up unused code paths
hygiene | Clean up unused assets
hygiene | Archive completed experiments
`;

function parseIdeas(md) {
  const lines = md.split('\n');
  const ideas = [];
  let idx = 0;
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const pipeIdx = line.indexOf(' | ');
    if (pipeIdx === -1) continue;
    const category = line.slice(0, pipeIdx).trim();
    const text = line.slice(pipeIdx + 3).trim();
    if (text) {
      ideas.push({ category, text, id: idx++ });
    }
  }
  return ideas;
}

function ratingColor(r) {
  if (!r) return 'bg-neutral-700';
  if (r <= 2) return 'bg-red-800';
  if (r <= 4) return 'bg-orange-700';
  if (r <= 6) return 'bg-amber-600';
  if (r <= 8) return 'bg-lime-600';
  return 'bg-emerald-600';
}

function ratingColorHover(r) {
  if (r <= 2) return 'bg-red-800 hover:bg-red-700';
  if (r <= 4) return 'bg-orange-700 hover:bg-orange-600';
  if (r <= 6) return 'bg-amber-600 hover:bg-amber-500';
  if (r <= 8) return 'bg-lime-600 hover:bg-lime-500';
  return 'bg-emerald-600 hover:bg-emerald-500';
}

export default function App() {
  const ideas = useMemo(() => parseIdeas(IDEAS_MD), []);
  const [ratings, setRatings] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [view, setView] = useState('rating');
  const [loaded, setLoaded] = useState(false);
  const [flashRating, setFlashRating] = useState(null);

  // Load saved state
  useEffect(() => {
    async function load() {
      try {
        const r = await window.storage.get('ratings');
        if (r?.value) setRatings(JSON.parse(r.value));
      } catch (e) { /* no saved ratings */ }
      try {
        const i = await window.storage.get('currentIdx');
        if (i?.value) setCurrentIdx(Math.min(parseInt(i.value) || 0, ideas.length - 1));
      } catch (e) { /* no saved index */ }
      setLoaded(true);
    }
    load();
  }, [ideas.length]);

  // Persist ratings
  useEffect(() => {
    if (!loaded) return;
    window.storage.set('ratings', JSON.stringify(ratings)).catch(() => {});
  }, [ratings, loaded]);

  useEffect(() => {
    if (!loaded) return;
    window.storage.set('currentIdx', String(currentIdx)).catch(() => {});
  }, [currentIdx, loaded]);

  const rate = useCallback((r) => {
    const idea = ideas[currentIdx];
    if (!idea) return;
    setRatings(prev => ({ ...prev, [idea.id]: r }));
    setFlashRating(r);
    setTimeout(() => setFlashRating(null), 150);
    if (currentIdx < ideas.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  }, [currentIdx, ideas]);

  const skip = useCallback(() => {
    if (currentIdx < ideas.length - 1) setCurrentIdx(currentIdx + 1);
  }, [currentIdx, ideas.length]);

  const back = useCallback(() => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  }, [currentIdx]);

  const jumpToNextUnrated = useCallback(() => {
    for (let i = currentIdx + 1; i < ideas.length; i++) {
      if (!ratings[ideas[i].id]) {
        setCurrentIdx(i);
        return;
      }
    }
    for (let i = 0; i < currentIdx; i++) {
      if (!ratings[ideas[i].id]) {
        setCurrentIdx(i);
        return;
      }
    }
  }, [currentIdx, ideas, ratings]);

  // Keyboard
  useEffect(() => {
    if (view !== 'rating') return;
    function handler(e) {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        rate(parseInt(e.key));
      } else if (e.key === '0') {
        e.preventDefault();
        rate(10);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skip();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        back();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        skip();
      } else if (e.key === 'u' || e.key === 'U') {
        e.preventDefault();
        jumpToNextUnrated();
      }
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [view, rate, skip, back, jumpToNextUnrated]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center">
        <div className="text-neutral-500">Loading...</div>
      </div>
    );
  }

  const rated = Object.keys(ratings).length;
  const total = ideas.length;
  const current = ideas[currentIdx];
  const pct = total ? (rated / total) * 100 : 0;

  // Stats view
  if (view === 'stats') {
    const rankedIdeas = ideas
      .filter(i => ratings[i.id])
      .sort((a, b) => ratings[b.id] - ratings[a.id] || a.category.localeCompare(b.category));

    const histogram = Array.from({ length: 10 }, (_, i) => ({
      rating: i + 1,
      count: Object.values(ratings).filter(r => r === i + 1).length,
    }));
    const maxCount = Math.max(...histogram.map(h => h.count), 1);

    const exportCsv = () => {
      const escape = (s) => `"${String(s).replace(/"/g, '""')}"`;
      const csv = 'rating,category,idea\n' + rankedIdeas
        .map(i => `${ratings[i.id]},${escape(i.category)},${escape(i.text)}`)
        .join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'swarm_ratings.csv';
      a.click();
      URL.revokeObjectURL(url);
    };

    const exportMd = () => {
      let md = '# Rated Swarm Ideas\n\n';
      for (let r = 10; r >= 1; r--) {
        const group = rankedIdeas.filter(i => ratings[i.id] === r);
        if (group.length === 0) continue;
        md += `## Rating: ${r} (${group.length})\n\n`;
        for (const i of group) {
          md += `- [${i.category}] ${i.text}\n`;
        }
        md += '\n';
      }
      const blob = new Blob([md], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'swarm_ratings.md';
      a.click();
      URL.revokeObjectURL(url);
    };

    const reset = async () => {
      if (!confirm('Clear all ratings and start over?')) return;
      setRatings({});
      setCurrentIdx(0);
      try {
        await window.storage.delete('ratings');
        await window.storage.delete('currentIdx');
      } catch (e) {}
      setView('rating');
    };

    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <h1 className="text-2xl font-semibold">Stats</h1>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setView('rating')} className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm">← Rating</button>
              <button onClick={exportMd} className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-sm">Export MD</button>
              <button onClick={exportCsv} className="px-3 py-2 bg-blue-700 hover:bg-blue-600 rounded text-sm">Export CSV</button>
              <button onClick={reset} className="px-3 py-2 bg-red-900 hover:bg-red-800 rounded text-sm">Reset</button>
            </div>
          </div>
          <div className="mb-8 text-neutral-400 text-sm">{rated} of {total} rated ({((rated/total)*100).toFixed(0)}%)</div>

          <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">Distribution</h2>
          <div className="mb-10 space-y-1.5">
            {histogram.map(h => (
              <div key={h.rating} className="flex items-center gap-3">
                <div className="w-6 text-right font-mono text-sm text-neutral-400">{h.rating}</div>
                <div className="flex-1 bg-neutral-900 rounded h-6 overflow-hidden">
                  <div className={`h-full ${ratingColor(h.rating)} transition-all`} style={{ width: `${(h.count / maxCount) * 100}%` }}/>
                </div>
                <div className="w-10 text-right font-mono text-sm text-neutral-500">{h.count}</div>
              </div>
            ))}
          </div>

          <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-3">All rated, best first</h2>
          <div className="space-y-0.5">
            {rankedIdeas.map(i => (
              <div key={i.id} className="flex items-start gap-3 py-2 border-b border-neutral-900 text-sm">
                <div className={`w-7 text-center font-mono rounded ${ratingColor(ratings[i.id])} text-white py-0.5 shrink-0`}>{ratings[i.id]}</div>
                <div className="text-neutral-500 w-20 shrink-0">{i.category}</div>
                <div className="flex-1 text-neutral-200">{i.text}</div>
              </div>
            ))}
            {rankedIdeas.length === 0 && <div className="text-neutral-600 text-sm">No ratings yet.</div>}
          </div>
        </div>
      </div>
    );
  }

  // Rating view
  const existingRating = current ? ratings[current.id] : null;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="text-neutral-400 font-mono">
            {currentIdx + 1} / {total}
            <span className="ml-3 text-neutral-600">·</span>
            <span className="ml-3">{rated} rated</span>
            <span className="ml-3 text-neutral-600">·</span>
            <span className="ml-3">{total - rated} left</span>
          </div>
          <div className="flex gap-2">
            <button onClick={jumpToNextUnrated} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-xs">Next unrated</button>
            <button onClick={() => setView('stats')} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded text-xs">Stats & export</button>
          </div>
        </div>

        <div className="w-full bg-neutral-900 rounded-full h-1 mb-10 overflow-hidden">
          <div className="bg-emerald-600 h-1 rounded-full transition-all duration-300" style={{ width: `${pct}%` }}/>
        </div>

        {current && (
          <div className={`bg-neutral-900 rounded-lg p-8 mb-8 transition-all ${flashRating ? 'scale-[0.99]' : ''}`}>
            <div className="text-xs uppercase tracking-wider text-neutral-500 mb-4 font-mono">{current.category}</div>
            <div className="text-xl leading-relaxed text-neutral-100">{current.text}</div>
            {existingRating !== undefined && existingRating !== null && (
              <div className="mt-6 text-sm text-neutral-500">
                Already rated <span className={`inline-block px-2 py-0.5 rounded font-mono text-white ${ratingColor(existingRating)}`}>{existingRating}</span> — rating again replaces it.
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-10 gap-1.5 mb-6">
          {[1,2,3,4,5,6,7,8,9,10].map(r => (
            <button
              key={r}
              onClick={() => rate(r)}
              className={`py-4 rounded font-mono text-lg text-white transition-all ${ratingColorHover(r)} ${flashRating === r ? 'ring-2 ring-white scale-95' : ''} ${existingRating === r ? 'ring-2 ring-neutral-400' : ''}`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center text-xs">
          <button onClick={back} disabled={currentIdx === 0} className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 rounded">← Back</button>
          <div className="text-neutral-600 font-mono">
            <span className="text-neutral-500">1-9 0</span> rate · <span className="text-neutral-500">←</span> back · <span className="text-neutral-500">→ / s</span> skip · <span className="text-neutral-500">u</span> unrated
          </div>
          <button onClick={skip} disabled={currentIdx === total - 1} className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 rounded">Skip →</button>
        </div>
      </div>
    </div>
  );
}
