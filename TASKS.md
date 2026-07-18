# CarePath AI MVP Tasks

## Task Rules

* Complete tasks in order unless a dependency requires otherwise.
* Work on one task per issue and pull request.
* Read `DESCRIPTION.md` and `AI_RULES.md` before starting.
* Check off a task only when all acceptance criteria are complete.
* Do not add features outside the current task.

## Priority Levels

* **P0** — Required for MVP
* **P1** — Required for a strong hackathon submission
* **P2** — Optional improvement
* **P3** — Post-MVP

---

# Milestone 1: Repository and Project Foundation

## TASK-001 — Verify project foundation

**Priority:** P0

Verify that the existing CarePath AI repository is correctly configured before beginning feature implementation.

Do not recreate or reinitialize the project unless a required configuration is missing or broken.

### Required Configuration

The repository should already use:

* Next.js
* TypeScript
* App Router
* Tailwind CSS
* ESLint
* npm
* Root-level `app` directory unless the repository already uses `src/app`

### Verification Steps

* Inspect the current repository structure.
* Review `package.json`.
* Review `tsconfig.json`.
* Review the Next.js configuration.
* Review the ESLint configuration.
* Review the Tailwind and global CSS setup.
* Confirm the application uses the App Router.
* Confirm the current page renders successfully.
* Confirm the repository documentation remains intact.
* Run lint and production build validation.
* Start the development server briefly to confirm local execution.

### Acceptance Criteria

* [ ] Existing Next.js project structure is valid
* [ ] TypeScript is enabled
* [ ] TypeScript strict mode is enabled
* [ ] App Router is being used
* [ ] Tailwind CSS is configured and functioning
* [ ] ESLint is configured
* [ ] npm is the active package manager
* [ ] `npm install` succeeds
* [ ] `npm run lint` succeeds
* [ ] `npm run build` succeeds
* [ ] `npm run dev` starts successfully
* [ ] Existing project documentation is preserved
* [ ] No unnecessary project reinitialization was performed
* [ ] Any discovered configuration issues were fixed with minimal changes

### Files to Review

* `package.json`
* `package-lock.json`
* `tsconfig.json`
* `next.config.*`
* `eslint.config.*` or `.eslintrc.*`
* `postcss.config.*`
* `app/layout.tsx`
* `app/page.tsx`
* `app/globals.css`
* `.gitignore`
* `DESCRIPTION.md`
* `AI_RULES.md`
* `TASKS.md`

### Validation Commands

```bash
npm install
npm run lint
npm run build
npm run dev
```

Stop the development server after confirming that it starts successfully.

### Completion Requirements

When complete:

1. Update only the acceptance criteria that were actually verified.
2. List any files changed.
3. Report the lint result.
4. Report the production build result.
5. Report whether the development server started successfully.
6. Document any warnings or unresolved issues.
7. Prepare a concise pull-request summary.

### Suggested Branch

```text
chore/verify-project-foundation
```


## TASK-002 — Install required dependencies

**Priority:** P0

Install the initial required packages.

### Dependencies

```text
zod
lucide-react
```

### Acceptance Criteria

* [ ] `zod` is installed
* [ ] `lucide-react` is installed
* [ ] Dependencies are recorded in `package.json`
* [ ] Application still builds
* [ ] Application still passes lint

### Suggested Branch

```text
feat/core-dependencies
```

---

## TASK-003 — Add environment configuration

**Priority:** P0

Create `.env.example` and document local environment variables.

### Required Variables

```text
OLLAMA_URL=http://localhost:11434/api/chat
OLLAMA_MODEL=gemma4:12b
```

### Acceptance Criteria

* [ ] `.env.example` exists
* [ ] `.env.local` is ignored by Git
* [ ] Ollama URL is read from the environment
* [ ] Model name is read from the environment
* [ ] Sensible development defaults exist
* [ ] No secrets are committed

### Suggested Branch

```text
feat/environment-configuration
```

---

## TASK-004 — Create the initial application layout

**Priority:** P0

Create a simple page shell for CarePath AI.

### Required Content

* Application name
* Short product description
* Main content container
* Disclaimer placeholder area

### Acceptance Criteria

* [ ] Application title is visible
* [ ] Product purpose is understandable
* [ ] Layout works on mobile
* [ ] Layout works on desktop
* [ ] No default Next.js content remains
* [ ] No medical claims are displayed

### Suggested Branch

```text
feat/application-layout
```

---

# Milestone 2: Data Model and Demo Data

## TASK-005 — Create the care-plan Zod schema

**Priority:** P0

Create `lib/schema.ts`.

### Required Structures

* Plan request schema
* Patient summary schema
* Task schema
* Care plan schema

### Required Task Fields

* `id`
* `title`
* `description`
* `timeframe`
* `priority`
* `owner`
* `source`
* `status`
* `reason`
* `changeStatus`

### Required Plan Fields

* `patientSummary`
* `tasks`
* `questionsForCareTeam`
* `missingInformation`
* `coordinationRisks`
* `planChangeSummary`
* `disclaimer`

### Acceptance Criteria

* [ ] Schemas use Zod
* [ ] TypeScript types are inferred from schemas
* [ ] Enum values match `DESCRIPTION.md`
* [ ] Initial and updated plans are supported
* [ ] Invalid task priority is rejected
* [ ] Invalid timeframe is rejected
* [ ] Invalid owner is rejected
* [ ] Required disclaimer is represented
* [ ] No duplicate response type exists

### Suggested Branch

```text
feat/care-plan-schema
```

---

## TASK-006 — Add fictional demo scenario data

**Priority:** P0

Create `lib/demo-data.ts`.

### Required Data

* Mary patient scenario
* Mary care instructions
* Caregiver-unavailable scenario change
* Initial fallback plan
* Updated fallback plan

### Acceptance Criteria

* [ ] All data is fictional
* [ ] Initial fallback plan passes the Zod schema
* [ ] Updated fallback plan passes the Zod schema
* [ ] Initial and updated plans contain meaningful differences
* [ ] No diagnosis or treatment recommendation appears
* [ ] Fallback plan contains the required disclaimer

### Suggested Branch

```text
feat/demo-data
```

---

## TASK-007 — Add constants and shared utilities

**Priority:** P1

Create shared constants for timeframe order and the required disclaimer.

### Acceptance Criteria

* [ ] Timeframe order is defined once
* [ ] Disclaimer text is defined once
* [ ] No duplicate disclaimer strings remain
* [ ] Utility for grouping tasks by timeframe exists
* [ ] Grouping utility preserves required order

### Suggested Branch

```text
feat/shared-constants
```

---

# Milestone 3: Prompt and Ollama Integration

## TASK-008 — Create the prompt builder

**Priority:** P0

Create `lib/prompt.ts`.

### Prompt Inputs

* Patient scenario
* Care instructions
* Optional scenario change
* Optional previous plan

### Prompt Requirements

The prompt must instruct the model to:

* Organize supplied information
* Avoid diagnosis
* Avoid treatment recommendations
* Avoid medication changes
* Avoid invented clinical instructions
* Label every task source
* Generate 8 to 12 concise tasks
* Use allowed enum values
* Identify missing information
* Generate questions for the care team
* Identify coordination risks
* Return structured JSON
* Include the required disclaimer

### Acceptance Criteria

* [ ] Initial-plan prompt is supported
* [ ] Updated-plan prompt is supported
* [ ] Previous plan is included only when supplied
* [ ] Scenario change is included only when supplied
* [ ] Safety rules appear in the prompt
* [ ] Output schema expectations are clear
* [ ] Prompt does not request chain-of-thought reasoning

### Suggested Branch

```text
feat/prompt-builder
```

---

## TASK-009 — Create the Ollama client

**Priority:** P0

Create `lib/ollama.ts`.

### Responsibilities

* Read environment configuration
* Send request to Ollama
* Use configured model
* Use `stream: false`
* Use structured JSON format
* Use low temperature
* Return model message content
* Map common connection errors

### Acceptance Criteria

* [ ] Ollama URL comes from environment configuration
* [ ] Model name comes from environment configuration
* [ ] Request uses `stream: false`
* [ ] Request uses a JSON schema in `format`
* [ ] Temperature is between 0.1 and 0.4
* [ ] Timeout is implemented
* [ ] Patient content is not logged
* [ ] Connection errors are converted into controlled errors
* [ ] Model-not-found errors are distinguishable where possible

### Suggested Branch

```text
feat/ollama-client
```

---

## TASK-010 — Implement the plan API endpoint

**Priority:** P0

Create:

```text
app/api/plan/route.ts
```

### Request Fields

* `patientScenario`
* `careInstructions`
* `scenarioChange`
* `previousPlan`

### Acceptance Criteria

* [ ] Request body is validated
* [ ] Empty patient scenario is rejected
* [ ] Prompt builder is used
* [ ] Ollama client is used
* [ ] Model content is parsed as JSON
* [ ] Parsed content is validated with Zod
* [ ] Only validated output is returned
* [ ] Invalid JSON returns a controlled error
* [ ] Invalid schema returns a controlled error
* [ ] Stack traces are not exposed
* [ ] Patient content is not logged

### Suggested Branch

```text
feat/plan-api
```

---

## TASK-011 — Add Ollama health endpoint

**Priority:** P1

Create:

```text
app/api/health/route.ts
```

### Response Example

```json
{
  "ollamaAvailable": true,
  "modelConfigured": true,
  "model": "gemma4:12b"
}
```

### Acceptance Criteria

* [ ] Endpoint does not send patient data
* [ ] Ollama availability is checked
* [ ] Configured model is identified
* [ ] Response is simple and safe
* [ ] Endpoint handles Ollama being unavailable
* [ ] No stack traces are exposed

### Suggested Branch

```text
feat/ollama-health
```

---

# Milestone 4: Initial Plan Interface

## TASK-012 — Build the scenario input form

**Priority:** P0

Create `components/ScenarioForm.tsx`.

### Required Inputs

* Patient scenario
* Clinician-provided care instructions

### Required Behavior

* Demo data prefilled
* Patient scenario required
* Generate button
* Loading state
* Error state

### Acceptance Criteria

* [ ] Both text areas have visible labels
* [ ] Demo scenario is prefilled
* [ ] Demo care instructions are prefilled
* [ ] Generate button is disabled when patient scenario is empty
* [ ] Generate button is disabled during submission
* [ ] Form is keyboard accessible
* [ ] Form sends data to `/api/plan`
* [ ] Errors are displayed clearly

### Suggested Branch

```text
feat/scenario-form
```

---

## TASK-013 — Build the patient summary

**Priority:** P0

Create `components/PatientSummary.tsx`.

### Required Fields

* Situation
* Living situation
* Mobility
* Transportation
* Support available
* Constraints

### Acceptance Criteria

* [ ] All summary fields render
* [ ] Empty values display as “Not provided”
* [ ] Empty arrays render safely
* [ ] Layout is readable on mobile
* [ ] Layout is readable on desktop
* [ ] No diagnosis heading is used

### Suggested Branch

```text
feat/patient-summary
```

---

## TASK-014 — Build the task card

**Priority:** P0

Create `components/TaskCard.tsx`.

### Required Display

* Task title
* Description
* Priority
* Owner
* Source
* Status
* Reason
* Change status when applicable

### Acceptance Criteria

* [ ] Priority includes visible text
* [ ] Owner is visible
* [ ] Source is visible
* [ ] Status is visible
* [ ] Reason is readable
* [ ] Change status is not represented by color alone
* [ ] Component handles long text
* [ ] Component works on mobile

### Suggested Branch

```text
feat/task-card
```

---

## TASK-015 — Build the task timeline

**Priority:** P0

Create `components/TaskTimeline.tsx`.

### Required Timeframe Order

1. Today
2. Within 48 hours
3. This week
4. Upcoming

### Acceptance Criteria

* [ ] Tasks are grouped by timeframe
* [ ] Timeframe order is stable
* [ ] Empty timeframe groups may be hidden
* [ ] Task cards are used
* [ ] Mobile layout works
* [ ] Desktop layout works

### Suggested Branch

```text
feat/task-timeline
```

---

## TASK-016 — Build support-information sections

**Priority:** P1

Create `components/SupportSections.tsx`.

### Required Sections

* Questions for the care team
* Missing information
* Coordination risks

### Acceptance Criteria

* [ ] Each section renders independently
* [ ] Empty sections show an appropriate empty state
* [ ] Coordination risks are not presented as diagnoses
* [ ] Questions are clearly directed to the care team
* [ ] Layout remains readable on mobile

### Suggested Branch

```text
feat/support-sections
```

---

## TASK-017 — Add permanent disclaimer component

**Priority:** P0

Create `components/Disclaimer.tsx`.

### Required Text

> This tool organizes supplied care information and does not provide medical advice. Contact the patient’s qualified healthcare team regarding clinical questions or concerning symptoms.

### Acceptance Criteria

* [ ] Disclaimer uses the shared constant
* [ ] Disclaimer appears with every plan
* [ ] Disclaimer remains visible after updates
* [ ] Disclaimer is not hidden
* [ ] Disclaimer is readable on mobile

### Suggested Branch

```text
feat/safety-disclaimer
```

---

## TASK-018 — Assemble the initial care-plan view

**Priority:** P0

Create `components/CarePlanView.tsx`.

### Required Content

* Patient summary
* Task timeline
* Support sections
* Disclaimer

### Acceptance Criteria

* [ ] Initial plan renders from validated data
* [ ] Empty arrays are handled
* [ ] Layout is responsive
* [ ] Plan view does not contain form logic
* [ ] Disclaimer is always included

### Suggested Branch

```text
feat/care-plan-view
```

---

# Milestone 5: Adaptive Plan Updating

## TASK-019 — Build the change panel

**Priority:** P0

Create `components/ChangePanel.tsx`.

### Required Presets

* Caregiver unavailable
* Transportation unavailable
* Physical therapy appointment missed
* Follow-up appointment delayed
* Patient now lives alone

### Required Controls

* Preset selector
* Custom text input
* Update Plan button

### Acceptance Criteria

* [ ] User can select a preset
* [ ] User can enter a custom change
* [ ] Update button is disabled without a change
* [ ] Controls have visible labels
* [ ] Controls are keyboard accessible
* [ ] Current plan remains visible while updating

### Suggested Branch

```text
feat/change-panel
```

---

## TASK-020 — Implement adaptive plan updating

**Priority:** P0

Connect the change panel to `/api/plan`.

### Update Request Must Include

* Patient scenario
* Care instructions
* Scenario change
* Previous plan

### Acceptance Criteria

* [ ] Previous plan is included
* [ ] Scenario change is included
* [ ] Updated plan replaces the previous active plan after success
* [ ] Existing plan remains visible during loading
* [ ] Errors do not delete the existing plan
* [ ] Unrelated tasks remain stable where possible
* [ ] Updated plan passes validation
* [ ] Disclaimer remains visible

### Suggested Branch

```text
feat/adaptive-plan-update
```

---

## TASK-021 — Display plan change summary

**Priority:** P0

Create `components/PlanChangeSummary.tsx`.

### Acceptance Criteria

* [ ] Summary appears only after a plan update
* [ ] Material changes are displayed
* [ ] Empty summary is handled
* [ ] Summary does not include medical conclusions
* [ ] Summary is visually distinct from tasks

### Suggested Branch

```text
feat/plan-change-summary
```

---

## TASK-022 — Highlight changed tasks

**Priority:** P1

Show task change status.

### Required Statuses

* New
* Updated
* Unchanged
* Removed

### Acceptance Criteria

* [ ] New tasks have a text label
* [ ] Updated tasks have a text label
* [ ] Removed tasks are shown separately or clearly summarized
* [ ] Unchanged tasks are not overemphasized
* [ ] Color is not the only indicator
* [ ] Initial plans do not show every task as changed

### Suggested Branch

```text
feat/task-change-highlighting
```

---

# Milestone 6: Reliability

## TASK-023 — Add loading experience

**Priority:** P1

Create `components/LoadingState.tsx`.

### Suggested Messages

* Reviewing supplied information
* Identifying coordination needs
* Organizing tasks by timeframe
* Assigning task ownership
* Updating the care plan

### Acceptance Criteria

* [ ] Loading feedback appears immediately
* [ ] Initial generation and updating are distinguishable
* [ ] Duplicate submissions are prevented
* [ ] No fake percentage is shown
* [ ] Loading state is accessible

### Suggested Branch

```text
feat/loading-state
```

---

## TASK-024 — Add controlled error messages

**Priority:** P0

Create `components/ErrorMessage.tsx` and map API failures.

### Required Cases

* Empty patient scenario
* Ollama unavailable
* Configured model unavailable
* Invalid model JSON
* Schema validation failure
* Request timeout
* General failure

### Acceptance Criteria

* [ ] Errors are understandable
* [ ] Errors do not include stack traces
* [ ] Errors do not include patient content
* [ ] Retry is possible
* [ ] Existing plan remains visible after update failure

### Suggested Branch

```text
fix/error-handling
```

---

## TASK-025 — Add demo fallback mode

**Priority:** P0

Use fictional fallback plans from `lib/demo-data.ts`.

### Acceptance Criteria

* [ ] Fallback can be triggered when live generation fails
* [ ] Initial fallback plan is available
* [ ] Updated fallback plan is available
* [ ] Interface clearly labels demonstration data
* [ ] Fallback does not silently replace live output
* [ ] Disclaimer remains visible
* [ ] No real patient data is used

### Suggested Branch

```text
feat/demo-fallback
```

---

## TASK-026 — Add local model status display

**Priority:** P1

Use `/api/health` to show local model status.

### Example States

* Gemma ready
* Ollama unavailable
* Model unavailable
* Checking status

### Acceptance Criteria

* [ ] Status is visible
* [ ] Status does not block fallback demo mode
* [ ] Error provides a useful recovery hint
* [ ] Status check does not send patient information

### Suggested Branch

```text
feat/model-status
```

---

# Milestone 7: Testing

## TASK-027 — Add schema tests

**Priority:** P1

### Required Tests

* Valid plan passes
* Invalid priority fails
* Invalid owner fails
* Invalid timeframe fails
* Missing required fields fail
* Demo fallback plans pass

### Acceptance Criteria

* [ ] Tests use fictional data
* [ ] Tests run with the project test command
* [ ] Tests do not require Ollama

### Suggested Branch

```text
test/schema-validation
```

---

## TASK-028 — Add API route tests

**Priority:** P1

### Required Tests

* Missing patient scenario returns 400
* Valid model response returns validated plan
* Invalid JSON returns controlled error
* Invalid schema returns controlled error
* Ollama failure returns controlled error

### Acceptance Criteria

* [ ] Ollama is mocked
* [ ] No real model call is required
* [ ] Patient content is not logged
* [ ] Error response does not expose stack traces

### Suggested Branch

```text
test/plan-api
```

---

## TASK-029 — Add component and workflow tests

**Priority:** P1

### Required Tests

* Scenario form renders
* Generate button is disabled for empty scenario
* Tasks group in the correct order
* Disclaimer renders
* Change panel sends previous plan
* Updated plan displays change summary
* Fallback label renders

### Suggested Branch

```text
test/core-workflow
```

---

# Milestone 8: Documentation and Submission

## TASK-030 — Create the README

**Priority:** P0

### Required Sections

* Project overview
* Problem
* Solution
* Demo workflow
* Architecture
* Technology stack
* Why Gemma
* Ollama setup
* Local application setup
* Environment variables
* Safety limitations
* Known limitations
* Screenshots
* Demo video link
* License

### Acceptance Criteria

* [ ] Setup instructions work from a clean clone
* [ ] Ollama setup is documented
* [ ] Model configuration is documented
* [ ] No API key is required
* [ ] Safety boundary is clear
* [ ] No HIPAA claim appears
* [ ] No FDA claim appears

### Suggested Branch

```text
docs/readme
```

---

## TASK-031 — Add issue templates

**Priority:** P1

Create:

```text
.github/ISSUE_TEMPLATE/feature.md
.github/ISSUE_TEMPLATE/bug.md
.github/ISSUE_TEMPLATE/documentation.md
.github/ISSUE_TEMPLATE/safety.md
```

### Acceptance Criteria

* [ ] Templates include objective
* [ ] Templates include acceptance criteria
* [ ] Templates include validation
* [ ] Safety template asks whether model behavior changes
* [ ] Templates remind contributors not to include real patient data

### Suggested Branch

```text
docs/issue-templates
```

---

## TASK-032 — Add pull-request template

**Priority:** P1

Create:

```text
.github/pull_request_template.md
```

### Required Sections

* Summary
* Related issue
* Changes
* Validation
* Screenshots
* Known limitations
* Safety review

### Acceptance Criteria

* [ ] Safety checklist is included
* [ ] Real patient data reminder is included
* [ ] Build and lint checklist is included
* [ ] Screenshot section is included

### Suggested Branch

```text
docs/pull-request-template
```

---

## TASK-033 — Complete visual and accessibility review

**Priority:** P1

### Acceptance Criteria

* [ ] Form controls have labels
* [ ] Keyboard focus is visible
* [ ] Buttons have disabled states
* [ ] Error messages are readable
* [ ] Priority is not communicated by color alone
* [ ] Change status is not communicated by color alone
* [ ] Mobile layout works
* [ ] Desktop layout works
* [ ] Contrast is acceptable
* [ ] Loading state is understandable

### Suggested Branch

```text
fix/accessibility-responsive
```

---

## TASK-034 — Prepare final demo workflow

**Priority:** P0

### Required Demo Steps

1. Open CarePath AI.
2. Show that Gemma is running locally.
3. Review the fictional Mary scenario.
4. Generate the initial plan.
5. Show tasks, priorities, owners, and timeline.
6. Select “Caregiver unavailable.”
7. Update the plan.
8. Show reassigned and reprioritized tasks.
9. Show the change summary.
10. Show the disclaimer.
11. Briefly explain fallback mode.

### Acceptance Criteria

* [ ] Initial plan works
* [ ] Updated plan works
* [ ] Differences are meaningful
* [ ] No diagnosis appears
* [ ] No treatment recommendation appears
* [ ] Demo fallback works
* [ ] No real patient data appears

### Suggested Branch

```text
feat/demo-readiness
```

---

## TASK-035 — Final repository review

**Priority:** P0

### Acceptance Criteria

* [ ] Repository is public
* [ ] No secrets are committed
* [ ] No `.env.local` file is committed
* [ ] No real patient data exists
* [ ] `npm run lint` passes
* [ ] `npm run build` passes
* [ ] Tests pass
* [ ] README setup works
* [ ] Demo workflow works
* [ ] Fallback workflow works
* [ ] Disclaimer is visible
* [ ] License is present
* [ ] Demo video link is present

---

# Recommended MVP Implementation Order

Use this order for the fastest path to a working demo:

```text
TASK-001
TASK-002
TASK-003
TASK-004
TASK-005
TASK-006
TASK-008
TASK-009
TASK-010
TASK-012
TASK-013
TASK-014
TASK-015
TASK-017
TASK-018
TASK-019
TASK-020
TASK-021
TASK-024
TASK-025
TASK-030
TASK-034
TASK-035
```

# First Codex Prompt

```text
Read DESCRIPTION.md, AI_RULES.md, and TASKS.md.

Implement TASK-001 only.

Create a focused branch named feat/project-foundation.

Do not work on any other task.

After implementation:
1. Run npm run lint.
2. Run npm run build.
3. Update the TASK-001 checkboxes in TASKS.md.
4. Prepare a concise pull-request summary with validation results.
```
