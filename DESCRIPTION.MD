# CarePath AI

## 1. Project Overview

CarePath AI is a patient care-coordination and task-planning application.

It converts a patient scenario and clinician-provided care instructions into a clear, prioritized task plan. It also updates the plan when the patient’s circumstances change.

The MVP uses Gemma through Ollama for local model inference.

The application is designed for patients, caregivers, and care coordinators who need help organizing complex care instructions into an actionable timeline.

## 2. Problem

Patients often leave a hospital, clinic, or procedure with multiple instructions, such as:

* Pick up prescribed medications
* Follow an existing medication schedule
* Attend follow-up appointments
* Arrange transportation
* Attend physical therapy
* Use medical equipment
* Complete monitoring tasks
* Coordinate caregiver support
* Contact the care team with questions

These instructions may be spread across discharge documents, verbal instructions, appointment notes, and caregiver conversations.

The situation may also change after discharge.

Examples:

* The caregiver becomes unavailable
* Transportation is canceled
* An appointment is delayed
* A therapy session is missed
* The patient is now living alone
* Equipment has not arrived
* A prescription has not been picked up

CarePath AI organizes the supplied information into a practical plan and adapts the plan when logistical circumstances change.

## 3. Product Goal

The MVP should demonstrate one clear capability:

> Turn a patient scenario and supplied care instructions into an organized care-coordination plan, then update that plan when the patient’s circumstances change.

The most important demonstration is the adaptive update.

The user should be able to:

1. Enter a patient scenario.
2. Enter clinician-provided care instructions.
3. Generate a care task plan.
4. Review tasks by timing, priority, and owner.
5. Enter a change in circumstances.
6. Generate an updated plan.
7. See which tasks, priorities, or owners changed.

## 4. Product Positioning

CarePath AI is a care-coordination and task-planning assistant.

It is not:

* A diagnostic tool
* A symptom checker
* A clinical decision-support system
* A treatment recommendation system
* A medication recommendation system
* An emergency triage system
* A replacement for a physician, nurse, pharmacist, or other qualified healthcare professional
* A certified medical device

The application must not:

* Diagnose a medical condition
* Suggest a possible diagnosis
* Recommend a treatment
* Recommend stopping or starting treatment
* Change medication instructions
* Recommend medication dosages
* Interpret medical test results
* Determine whether emergency care is required
* Claim that generated content is clinician-approved
* Claim HIPAA compliance
* Claim FDA approval

## 5. Allowed Model Behavior

The model may:

* Summarize supplied patient circumstances
* Extract logistical constraints
* Organize supplied care instructions
* Create non-clinical coordination tasks
* Group tasks by timeframe
* Assign tasks to a patient, caregiver, clinic, or care coordinator
* Identify missing information
* Generate questions for the care team
* Identify risks that coordination tasks may be missed
* Update task priorities when circumstances change
* Reassign task ownership when circumstances change
* Explain how the updated plan differs from the previous plan

The model must distinguish between:

* Information supplied in the patient scenario
* Information supplied in care instructions
* General coordination suggestions

## 6. Primary User

For the MVP, the primary user is a caregiver or care coordinator entering information for a fictional patient.

The interface may also be understandable to a patient, but the application should not assume the user has clinical training.

## 7. Primary MVP Workflow

### Step 1: Enter Patient Scenario

The user enters a fictional patient situation.

Example:

Mary is 74 and was discharged after total knee replacement. She lives alone. Her daughter can help for two days. Mary cannot drive. Physical therapy begins Monday, and her surgeon follow-up is in two weeks. She uses a walker and has six prescribed medications.

### Step 2: Enter Care Instructions

The user enters clinician-provided instructions.

Example:

* Follow the medication schedule provided at discharge.
* Use the walker as instructed.
* Attend physical therapy beginning Monday.
* Attend the surgeon follow-up appointment in two weeks.
* Keep the surgical dressing clean and dry according to the discharge instructions.

### Step 3: Generate Care Plan

The user clicks:

> Generate Care Plan

The application sends the supplied information to the local Gemma model through Ollama.

### Step 4: Review Plan

The application displays:

* Patient summary
* Today’s tasks
* Tasks within 48 hours
* Tasks for this week
* Upcoming tasks
* Priority
* Task owner
* Task source
* Questions for the care team
* Missing information
* Coordination risks
* Safety disclaimer

### Step 5: Enter a Change

The user selects or enters a change.

Example:

> Mary’s daughter is no longer available to help.

### Step 6: Update Plan

The application sends:

* Original patient scenario
* Original care instructions
* Previous plan
* Change in circumstances

The application displays an updated plan.

### Step 7: Show Changes

The updated plan should clearly show:

* New tasks
* Updated tasks
* Reassigned tasks
* Changed priorities
* Removed tasks where applicable
* Summary of material changes

## 8. Primary Demo Scenario

### Patient Scenario

Mary is 74 and was discharged after total knee replacement.

She lives alone. Her daughter can help for two days. Mary cannot drive. Physical therapy begins Monday, and her surgeon follow-up appointment is in two weeks. She uses a walker and has six prescribed medications.

### Care Instructions

* Follow the written medication schedule provided at discharge.
* Use the walker as instructed.
* Attend physical therapy beginning Monday.
* Attend the surgeon follow-up appointment in two weeks.
* Keep the surgical dressing clean and dry according to the discharge instructions.

### Scenario Change

Mary’s daughter is no longer available to help.

### Expected Initial Plan Behavior

The initial plan should identify tasks such as:

* Review supplied discharge instructions
* Confirm prescribed medications are available
* Confirm transportation for physical therapy
* Confirm transportation for the follow-up appointment
* Prepare the walker and needed equipment
* Confirm daughter’s support responsibilities
* Prepare questions for the care team
* Organize upcoming appointments

The model must not invent medical treatment instructions.

### Expected Updated Plan Behavior

After the caregiver becomes unavailable:

* Caregiver-owned tasks should be reassigned
* Transportation coordination should become a higher priority
* Support gaps should be identified
* The plan should suggest contacting the clinic or care coordinator regarding available support
* The change summary should explain what changed
* Unrelated tasks should remain stable where possible

## 9. Required MVP Features

### Inputs

* Patient scenario text area
* Care instructions text area
* Change-in-circumstances selection
* Custom change-in-circumstances text input

### Plan Generation

* Generate initial plan
* Update existing plan
* Local Ollama integration
* Gemma model configuration through environment variables
* Structured JSON response
* Zod runtime validation

### Plan Display

* Patient summary
* Task timeline
* Task priority
* Task owner
* Task source
* Task status
* Questions for care team
* Missing information
* Coordination risks
* Plan change summary
* Permanent disclaimer

### Reliability

* Loading state
* Clear error messages
* Retry capability
* Demo fallback data
* No patient content in logs

## 10. Out of Scope

Do not implement the following for the MVP:

* Authentication
* User accounts
* Patient profiles
* Database storage
* Cloud storage
* EHR integration
* Calendar integration
* SMS notifications
* Email notifications
* PDF upload
* OCR
* Medical-image analysis
* Prescription management
* Medication interaction checking
* Diagnosis
* Symptom interpretation
* Emergency triage
* Insurance workflows
* Billing
* Voice input
* Production compliance claims
* Hosted model providers
* Multi-agent architecture

## 11. Technical Stack

* Next.js
* React
* TypeScript
* Next.js App Router
* Tailwind CSS
* Zod
* Lucide React
* Ollama
* Gemma

## 12. Technical Architecture

```text
Browser
  ↓
Next.js user interface
  ↓
POST /api/plan
  ↓
Ollama local API
  ↓
Gemma model
  ↓
Structured JSON response
  ↓
Zod validation
  ↓
Care-plan interface
```

## 13. Environment Variables

Create `.env.local` from `.env.example`.

```text
OLLAMA_URL=http://localhost:11434/api/chat
OLLAMA_MODEL=gemma4:12b
```

The model name must not be hard-coded in multiple files.

## 14. Suggested Repository Structure

```text
carepath-ai/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug.md
│   │   ├── documentation.md
│   │   ├── feature.md
│   │   └── safety.md
│   └── pull_request_template.md
├── app/
│   ├── api/
│   │   ├── health/
│   │   │   └── route.ts
│   │   └── plan/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CarePlanView.tsx
│   ├── ChangePanel.tsx
│   ├── Disclaimer.tsx
│   ├── ErrorMessage.tsx
│   ├── LoadingState.tsx
│   ├── PatientSummary.tsx
│   ├── PlanChangeSummary.tsx
│   ├── ScenarioForm.tsx
│   ├── SupportSections.tsx
│   ├── TaskCard.tsx
│   └── TaskTimeline.tsx
├── lib/
│   ├── constants.ts
│   ├── demo-data.ts
│   ├── ollama.ts
│   ├── prompt.ts
│   ├── schema.ts
│   └── utils.ts
├── public/
├── AI_RULES.md
├── DESCRIPTION.md
├── TASKS.md
├── README.md
├── LICENSE
├── .env.example
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 15. API Contract

### Endpoint

```text
POST /api/plan
```

### Request

```json
{
  "patientScenario": "string",
  "careInstructions": "string",
  "scenarioChange": "string",
  "previousPlan": {}
}
```

### Required Fields

* `patientScenario`

### Optional Fields

* `careInstructions`
* `scenarioChange`
* `previousPlan`

### Response

```json
{
  "patientSummary": {
    "situation": "string",
    "livingSituation": "string",
    "mobility": "string",
    "transportation": "string",
    "supportAvailable": ["string"],
    "constraints": ["string"]
  },
  "tasks": [
    {
      "id": "task-1",
      "title": "Confirm physical therapy transportation",
      "description": "Confirm how the patient will travel to the scheduled appointment.",
      "timeframe": "Within 48 hours",
      "priority": "high",
      "owner": "caregiver",
      "source": "provided scenario",
      "status": "not started",
      "reason": "The patient cannot drive.",
      "changeStatus": "unchanged"
    }
  ],
  "questionsForCareTeam": [
    "Who should be contacted if transportation cannot be arranged?"
  ],
  "missingInformation": [
    "Transportation provider has not been identified."
  ],
  "coordinationRisks": [
    "The physical therapy appointment may be missed if transportation is not confirmed."
  ],
  "planChangeSummary": [
    "Transportation coordination was changed from caregiver-owned to care-coordinator-owned."
  ],
  "disclaimer": "This tool organizes supplied care information and does not provide medical advice. Contact the patient’s qualified healthcare team regarding clinical questions or concerning symptoms."
}
```

## 16. Allowed Enum Values

### Timeframe

* `Today`
* `Within 48 hours`
* `This week`
* `Upcoming`

### Priority

* `high`
* `medium`
* `low`

### Owner

* `patient`
* `caregiver`
* `clinic`
* `care coordinator`

### Source

* `provided scenario`
* `provided care instructions`
* `coordination suggestion`

### Status

* `not started`
* `in progress`
* `completed`

### Change Status

* `unchanged`
* `updated`
* `new`
* `removed`

## 17. Required Disclaimer

Display the following text whenever a plan is shown:

> This tool organizes supplied care information and does not provide medical advice. Contact the patient’s qualified healthcare team regarding clinical questions or concerning symptoms.

The disclaimer must remain visible after plan updates.

## 18. Demo Fallback

The application should include a hard-coded fictional initial plan and updated plan.

Fallback data should be used only when:

* Ollama is unavailable
* The configured model is unavailable
* The model response cannot be parsed
* The model response fails validation

The interface must clearly label fallback output:

> Demonstration data is being displayed because the local model is unavailable.

Fallback data must not silently appear as live model output.

## 19. Definition of Done

The MVP is complete when:

* The project runs locally
* Ollama configuration is read from environment variables
* A fictional patient scenario can be submitted
* A structured care plan is generated
* The response passes Zod validation
* Tasks are grouped by timeframe
* Priority, owner, source, and status are displayed
* A scenario change can be submitted
* The previous plan is included in the update request
* The updated plan shows meaningful changes
* The safety disclaimer remains visible
* Errors are understandable
* Demo fallback works
* No real patient data is included
* `npm run lint` passes
* `npm run build` passes
* Setup instructions are documented
