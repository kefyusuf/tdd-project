# Case Study - Interview Notes

Rough prep notes for talking about the booking project in interviews.
Deliberately informal, this is my cheat sheet, not documentation.

## The pitch (30 seconds, said out loud once, it sticks)

"I built an online booking system for a small chain of physiotherapy clinics
with one other dev. TypeScript, Postgres, nothing fancy on purpose. The fun
parts: we made double booking literally impossible with a database exclusion
constraint instead of reaching for Redis locks, recurring slots had to survive
DST changes, and we did it test-first where it counted. Wrote up the decisions
afterwards as ADRs, including the stuff that went wrong."

Then stop talking. Let them pick the thread.

## Questions I expect, and the short answers

**How do you stop two people booking the same slot?**
Postgres exclusion constraint on a tstzrange. The app pre-checks for a nice
error message but the DB is the bouncer. We tested it by firing 12 parallel
bookings at one slot, exactly one wins. Considered Redis locks, rejected them:
extra infra with worse failure modes for our size.

**Why not microservices?**
Two part-time devs. Every service is a deploy pipeline and a pager. We did a
modular monolith with lint rules enforcing module boundaries. Boring and fast.

**A bug that stuck with you?**
The reminder worker died silently about three weeks in and nothing told us.
Reception found out because patients complained. The fix was two hours
(heartbeat + alert). The mistake was deprioritizing monitoring to hit the
deadline. I'd put it in the definition of done on day one now.

**Did you really TDD everything?**
No, and I'd argue that's the point. Domain logic (booking rules, cancellation
policies, timezone math) was strict red-green-refactor. Admin CRUD screens were
not, the risk there lives in the queries and those got integration tests.
Testing form wiring is ritual, not safety.

**Timezones?**
Store UTC, convert at the edges, IANA tz per location. The trap was recurring
slots: "Monday 09:00" is a different UTC instant after DST, so we expand
recurring slots into concrete ones nightly. Found a DST bug in testing because
we wrote the failing test first after a near-miss. Never reached patients.

**What would you change?**
Monitoring from day one. Push harder for deposits instead of only tweaking the
cancellation policy (money talks louder than policy). Test the slot expansion
on day one, not after the scare. Skip the flexible template abstraction I
wasted ~4 days on.

## If they ask about scale

Don't inflate. ~40 appointments a day, three locations, ~180 unit tests. Small
system, but the concurrency problem is the same one a hospital chain has. If
pushed past what I tested: "that's beyond where I have evidence, next step
would be load testing the evening peak." Knowing where your evidence ends is
part of the answer.

## Whiteboard from memory

booking flow: pick slot -> insert with exclusion constraint -> ok means outbox
row in same tx -> worker sends reminder 24h before -> idempotency key dedupes.
conflict maps to "slot just taken" message.

## Before any interview

Re-read the ADRs once. Say the pitch out loud twice. Own the monitoring story
in first person, it's the best thing in here.
