# Case Study - Clinic Booking System: Overview

## TL;DR

- A real-world-sized project: online appointment booking for a three-location physiotherapy clinic group.
- Two developers, ~4 months, deliberately small infrastructure budget.
- This section documents what we built, **why** each decision was made, what got rejected, and what went wrong.
- Read it as the applied counterpart to the methodology chapters: this is where TDD, ADRs, and a pragmatic test pyramid meet messy requirements.

> Details are anonymized (clinic name, volumes slightly rounded). The decisions,
> mistakes, and trade-offs are real.

## Context

A three-location physiotherapy clinic group was drowning in phone bookings.
Reception spent most of the day on scheduling calls, no-shows were high (no
reminders), and patients kept asking for an online option. We were two
developers with day jobs; this was a fixed-scope side contract with a hard
deadline (they wanted it live before the new year rush).

| Constraint        | Value                                                                  |
| ----------------- | ---------------------------------------------------------------------- |
| Team              | 2 developers, part-time availability                                   |
| Timeline          | ~4 months to launch                                                    |
| Budget            | Small - no dedicated DevOps, no Kubernetes, managed services preferred |
| Expected load     | ~40 appointments/day across 3 locations, peak booking 7-9 PM           |
| Compliance basics | Patient name + phone stored; minimal data, EU-based hosting required   |

## Requirements as heard

Raw stakeholder input is never a clean spec. Ours wasn't either:

> "Patients should book like they book a hotel - pick a therapist, pick a time,
> done." (owner)

> "Also can it do insurance billing? And maybe sell gift cards?" (owner, same
> meeting)

> "If two people grab the same slot at the same second, that must be impossible.
> It happened twice last month and reception had to call back apologizing."
> (reception lead)

> "Reminders by WhatsApp would be perfect. Or SMS. Or email. Whatever is
> cheapest." (owner)

We wrote these down verbatim in the kickoff notes - and then negotiated them
into something buildable.

## Consolidated scope

| ID   | Requirement                                                                                    |
| ---- | ---------------------------------------------------------------------------------------------- |
| FR-1 | Patients browse therapists by location and service type                                        |
| FR-2 | Patients book an available slot; double-booking must be impossible under concurrency           |
| FR-3 | Reception can manage therapist schedules (working hours, time off) via an admin UI             |
| FR-4 | Email reminder sent 24h before each appointment                                                |
| FR-5 | Patients can cancel or reschedule online until X hours before start (configurable per service) |
| FR-6 | No-shows recorded by reception, feeding a simple stats view                                    |

Non-functional: p95 booking flow under ~1.5s, available during business hours +
evening peak, backups daily, nothing exotic to operate for a two-person team.

## Explicitly out of scope (and why)

| Cut                        | Reason given at the time                                                                                             |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Insurance billing          | Different regulatory world entirely; clinic kept using existing tools. Saying no here saved the project.             |
| WhatsApp/SMS reminders     | API costs + template approval overhead; email covered 80% of the need. Revisit later.                                |
| Multi-tenant SaaS version  | Tempting "sell it to other clinics" idea; YAGNI. Single tenant, boring deployment.                                   |
| Online payments / deposits | Payment provider onboarding alone would eat a month; no-show deposit was replaced by a stricter cancellation policy. |

The last one was contested - see [Retrospective](03-retrospective.md): deposits
would have solved the no-show problem better than policy tweaks.

## Stack summary

Chosen early, kept all the way through:

- **Backend:** TypeScript, Fastify, PostgreSQL (managed)
- **Frontend:** server-rendered pages + a sprinkle of Alpine.js for the booking widget
- **Hosting:** single containerized app on a small managed host; Postgres as a managed service
- **Why so boring:** with two part-time developers, every moving part is a pager
  waiting to go off. The architecture decisions page shows the alternatives we
  rejected.

## Where to go next

- [Architecture Decisions](01-decisions.md) - five ADRs, including two we'd argue differently today
- [Testing Strategy](02-testing-strategy.md) - what got test-driven, what honestly didn't
- [Retrospective](03-retrospective.md) - the timezone near-miss, the silent worker death, and other fun
- [Interview Talking Points](04-talking-points.md) - how to present this project when it matters
