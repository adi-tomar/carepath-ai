# CarePath AI Rules for Codex and AI Coding Assistants

## 1. Purpose

This file defines the rules for any AI coding assistant working on CarePath AI.

These rules apply to:

* Codex
* Automated coding agents
* Pull-request agents
* Issue-generation agents
* Code-review agents

The project documents are the source of truth.

## 2. Required Reading Order

Before making changes, read:

1. `DESCRIPTION.md`
2. `AI_RULES.md`
3. `TASKS.md`
4. `README.md`, if it exists
5. Relevant existing source files

Do not begin implementation before understanding the selected task and its acceptance criteria.

## 3. One Task Per Change

Work on one task at a time.

Each task should normally produce:

* One GitHub issue
* One focused branch
* One implementation
* One pull request

Do not combine unrelated tasks.

Do not begin the next task until the current task is complete or explicitly blocked.

## 4. Scope Control

Only implement functionality defined in:

* `DESCRIPTION.md`
* `TASKS.md`
* The active GitHub issue

Do not add speculative features.

Do not add infrastructure for possible future requirements.

Do not add databases, authentication, cloud inference, file uploads, or integrations unless an approved task explicitly requests them.

When discovering a required dependency:

1. Document the dependency.
2. Explain why it is necessary.
3. Keep the implementation as small as possible.
4. Do not expand scope beyond what is needed.

## 5. Product Safety Boundary

CarePath AI is a care-coordination and task-planning application.

It is not a medical diagnosis, treatment, or emergency-response application.

The application and model must not:

* Diagnose a condition
* Suggest a possible diagnosis
* Recommend treatment
* Recommend stopping treatment
* Recommend medication
* Change medication instructions
* Recommend dosage
* Interpret laboratory results
* Interpret imaging results
* Determine whether emergency care is required
* State that generated content is medically correct
* State that generated content is clinician-approved
* Claim HIPAA compliance
* Claim FDA approval
* Claim medical-device certification

## 6. Allowed Product Behavior

The application may:

* Summarize supplied patient circumstances
* Extract logistical constraints
* Organize supplied instructions
* Generate non-clinical coordination tasks
* Assign task ownership
* Group tasks by timeframe
* Identify missing information
* Generate questions for the care team
* Identify coordination risks
* Update logistical priorities
* Reassign task owners
* Explain changes between plans

## 7. Do Not Invent Clinical Instructions

The model must not invent clinical care instructions.

Every task must identify its source as one of:

* `provided scenario`
* `provided care instructions`
* `coordination suggestion`

A task may use `provided care instructions` only when the instruction was supplied by the user.

A task may use `provided scenario` when it directly follows from a stated fact.

Example:

Patient scenario:

> The patient cannot drive and has a physical therapy appointment Monday.

Allowed task:

> Confirm transportation for the physical therapy appointment.

Source:

> provided scenario

A coordination suggestion may suggest contacting an appropriate person.

Allowed:

> Contact the clinic to ask whether transportation assistance is available.

Not allowed:

> Skip physical therapy until transportation becomes available.

Allowed:

> Ask the care team what to do if the dressing becomes wet.

Not allowed:

> Replace the dressing immediately.

Allowed:

> Confirm that the patient is following the written medication schedule.

Not allowed:

> Take the medication twice per day.

## 8. Required Disclaimer

The following disclaimer must be displayed whenever a generated or fallback plan is shown:

> This tool organizes supplied care information and does not provide medical advice. Contact the patient’s qualified healthcare team regarding clinical questions or concerning symptoms.

Do not:

* Remove it
* Shorten it
* Hide it in a tooltip
* Place it only in the footer
* Remove it after a plan update

## 9. Privacy Rules

Use fictional patient information only.

Do not place real patient information in:

* Source code
* Test fixtures
* Issues
* Pull requests
* Screenshots
* Demo videos
* Documentation
* Example API requests

Do not log:

* Patient scenarios
* Care instructions
* Generated plans
* Patient names
* Medical details
* Scenario changes

Permitted logs may include:

* Request started
* Request completed
* Request duration
* HTTP status
* Validation failure category
* Ollama connection failure
* Model-not-found failure

Do not add analytics or telemetry that captures user-entered content.

## 10. Local Model Rules

The MVP uses Ollama.

Default values:

```text
OLLAMA_URL=http://localhost:11434/api/chat
OLLAMA_MODEL=gemma4:12b
```

The application must read these values from environment variables.

Do not hard-code the model name in multiple places.

Do not add a hosted model provider unless explicitly requested.

Do not require an API key for the local MVP.

## 11. Structured Output Rules

Model output must be structured JSON.

The Ollama request should use a JSON schema in the `format` field.

The response must be validated using Zod.

Required flow:

```text
Receive model response
  ↓
Read message content
  ↓
Parse JSON
  ↓
Validate with Zod
  ↓
Return validated plan
```

Never render unvalidated model output.

If validation fails:

* Return a controlled error
* Do not return partially parsed content
* Do not silently repair unsafe content
* Allow the interface to offer clearly labeled demo fallback data

## 12. Prompt Requirements

The prompt builder must tell the model:

* It is a care-coordination assistant
* It organizes supplied information
* It must not diagnose
* It must not recommend treatment
* It must not modify medication instructions
* It must not invent clinical instructions
* It must label task sources
* It must identify missing information
* It must generate questions for the care team
* It must identify coordination risks
* It must return JSON matching the schema
* It must use the required disclaimer

Use a low temperature.

Recommended:

```text
temperature: 0.2
```

Acceptable range:

```text
0.1 to 0.4
```

Do not implement multiple agents for the MVP.

Do not expose chain-of-thought reasoning.

Do not ask the model to provide hidden reasoning.

## 13. Initial Plan Behavior

For an initial plan:

* Generate 8 to 12 concise tasks
* Group tasks into the allowed timeframes
* Avoid duplicate tasks
* Keep task descriptions short
* Provide a clear reason for priority
* Assign one owner
* Identify the task source
* Use `not started` as the default status
* Use `unchanged` or omit change emphasis for the initial plan
* Do not invent clinical actions

## 14. Updated Plan Behavior

When a scenario change is submitted, include the previous plan in the model request.

The model should:

* Preserve unrelated tasks where possible
* Update only affected tasks
* Add newly required coordination tasks
* Reassign owners when needed
* Change priorities when justified
* Identify removed tasks where applicable
* Produce a concise `planChangeSummary`
* Avoid rewriting the entire plan unnecessarily

Use `changeStatus` values:

* `unchanged`
* `updated`
* `new`
* `removed`

The application must not treat every updated-plan task as new.

## 15. Coding Standards

Use:

* TypeScript
* TypeScript strict mode
* React functional components
* Next.js App Router
* Tailwind CSS
* Zod for runtime validation
* Small focused modules
* Clear function names
* Clear component names
* Explicit return types where useful
* Accessible HTML controls

Avoid:

* `any`
* Global mutable state
* Unnecessary dependencies
* Large all-purpose components
* Duplicate types
* Duplicate schemas
* Silent error handling
* Deeply nested conditional rendering
* Premature optimization
* Broad refactoring unrelated to the current issue

## 16. File Responsibilities

### `lib/schema.ts`

Contains:

* Zod schemas
* Types inferred from Zod
* Request and response validation structures

### `lib/prompt.ts`

Contains:

* Prompt construction
* Safety instructions
* Initial-plan prompt logic
* Updated-plan prompt logic

### `lib/ollama.ts`

Contains:

* Ollama request function
* Environment configuration
* Ollama response handling
* Connection-related error mapping

### `lib/demo-data.ts`

Contains:

* Fictional initial fallback plan
* Fictional updated fallback plan
* No real patient data

### `app/api/plan/route.ts`

Contains:

* Request parsing
* Input validation
* Ollama call
* Model-output parsing
* Zod validation
* Controlled API errors

### Components

Components should focus on presentation and user interaction.

They should not directly call Ollama.

They should not duplicate business logic from `lib`.

## 17. Error Handling Rules

The application should distinguish between:

* Missing patient scenario
* Ollama unavailable
* Configured model unavailable
* Invalid model JSON
* Model response failed schema validation
* Request timeout
* General server failure

User-facing errors must be understandable.

Example:

> The local Gemma model could not be reached. Confirm that Ollama is running.

Example:

> The configured model was not found. Install or select the model configured in `OLLAMA_MODEL`.

Do not expose:

* Stack traces
* Internal filesystem paths
* Full model responses
* Patient content
* Environment details

## 18. Loading-State Rules

The interface must:

* Show loading feedback immediately
* Disable repeated submissions
* Preserve the current plan during an update
* Distinguish initial generation from plan updating

Suggested loading messages:

* Reviewing supplied information
* Identifying coordination needs
* Organizing tasks by timeframe
* Assigning task ownership
* Updating the care plan

Do not simulate fake completion percentages.

## 19. Accessibility Rules

Every form control must have:

* A visible label
* Keyboard accessibility
* Focus styling
* Disabled-state styling
* Error association where applicable

Do not use color alone to communicate:

* Priority
* Status
* Change status
* Error state

Use text labels such as:

* High priority
* New
* Updated
* Removed

## 20. Visual Design Rules

The application should appear:

* Calm
* Trustworthy
* Clear
* Easy to scan
* Non-alarmist

Prefer:

* Neutral colors
* Strong text contrast
* Clear section headings
* Simple badges
* White space
* Task cards
* Timeline grouping

Avoid:

* Flashing animations
* Red-heavy medical alerts
* Decorative charts
* Dense dashboards
* Excessive gradients
* Overly playful graphics

## 21. Testing Rules

Use fictional data only.

At minimum, test:

* Valid schema parsing
* Invalid schema rejection
* Empty patient scenario rejection
* Invalid Ollama response handling
* Valid API response handling
* Stable timeframe order
* Disclaimer rendering
* Previous plan included in update request
* Change status rendering
* Fallback label visibility

Do not mock clinical recommendations.

Tests should focus on data structure, safety boundaries, and workflow reliability.

## 22. Git Workflow

For each task:

1. Create or identify the GitHub issue.
2. Create a focused branch.
3. Implement only the selected task.
4. Run validation.
5. Update the checkbox in `TASKS.md`.
6. Prepare a pull request.
7. Reference the issue.
8. Include screenshots for UI work.
9. Complete the safety checklist.

Branch naming:

```text
feat/<short-description>
fix/<short-description>
docs/<short-description>
test/<short-description>
```

Commit messages should be concise.

Examples:

```text
feat: add care plan schema
feat: implement Ollama plan endpoint
fix: handle invalid model responses
docs: add local setup instructions
```

## 23. Validation Before Pull Request

Run:

```bash
npm run lint
npm run build
```

If tests exist:

```bash
npm test
```

Manually verify:

1. Initial plan generation works.
2. The plan displays tasks by timeframe.
3. The caregiver-unavailable scenario can be submitted.
4. The updated plan changes ownership or priority.
5. The disclaimer remains visible.
6. No diagnosis or treatment recommendation appears.
7. Fallback mode is clearly labeled.

## 24. Pull Request Requirements

Every pull request must include:

* Summary
* Related issue
* Files changed
* Acceptance criteria completed
* Validation performed
* Screenshots for UI changes
* Known limitations
* Safety review

Safety checklist:

* No diagnosis logic added
* No treatment recommendation added
* No medication instruction invented
* No real patient data added
* Disclaimer remains visible
* Model output remains schema validated

## 25. Stop Conditions

Do not proceed without a new approved task when implementation would require:

* Authentication
* Database storage
* File uploads
* PDF processing
* EHR integration
* Calendar integration
* Messaging integration
* Hosted model inference
* Symptom analysis
* Medication logic
* Emergency recommendations
* Storage of patient data
* Compliance claims

Document the need rather than implementing it.
