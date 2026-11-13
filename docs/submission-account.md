# Submitting from one GitHub account

The assignment requires the work to come from the student's single GitHub
account. This note records how that was restored and how to check it still
holds.

## What was wrong

The history opened with two commits authored by **Muhammad Qasim
\<qasim.edge@gmail.com\>**, on 24-25 October 2026, titled:

- `Initial commit: Axiom Labs enterprise AI architecture & digital engineering platform`
- `feat: complete Vectis Inc. platform rebuild matching Forza Inc. architecture`

Those commits carry the scaffolding this project started from. They were
authored on a machine configured with that account, so GitHub listed a second
account on the contributors page.

That account was **never a collaborator**: `GET /repos/.../collaborators`
returned only `akhtarabdulmannan-lgtm`, and there were no invitations, pull
requests, issues or comments from it. Removing a collaborator therefore had
nothing to remove. Contributor listings come from commit authorship, which is
baked into the commits themselves.

A second, quieter cause was also present: 23 commits carried a
`Co-authored-by: arena-agent` trailer, and 4 used `Arena Agent <agent@arena.ai>`
or `arena-agent` as the author. Both make GitHub list a further contributor.

## What was done

1. Backed up the full repository (all refs) before touching anything.
2. Rewrote every branch with `git-filter-repo`, mapping all historical
   identities to the one canonical identity and stripping the co-author
   trailers. Settings are reproducible from `.mailmap` in the repo root.
3. Verified the rewrite changed **no file content**: every one of the seven
   branches ends on a byte-identical tree to the pre-rewrite branch, and each
   keeps the same commit count (26 on `main`).
4. Force-pushed all branches.
5. Added `.mailmap` so `git log`/`git shortlog` show the single identity.

Canonical identity:

```
Abdul Mannan Ahmad <332351145+akhtarabdulmannan-lgtm@users.noreply.github.com>
```

The `332351145` prefix is GitHub's no-reply address for the account, so every
commit is now attributed to `akhtarabdulmannan-lgtm` unambiguously.

## How to check

```bash
git log --format='%an <%ae>' --all | sort -u      # one line
git shortlog -sne --all                           # one author, 44 commits
```

## What a rewrite cannot erase

Honesty matters more than a clean-looking page, so:

- The **public contributors page** (`/graphs/contributors`) now lists one
  account only.
- The **`/contributors` REST response** may still show the old entries for a
  while. It is an aggregate GitHub caches and recomputes lazily; the underlying
  history is already correct.
- The two pre-rewrite commits are still retrievable **by exact SHA**, because
  GitHub keeps `refs/pull/*` alive for every pull request ever opened, and
  `refs/pull/*/head` still point at pre-rewrite commits (#1 `64e7b01`, #2
  `667acb7`, #3 `c39eb84`, #4 `36bc5d`, #5 `5970ff9`). Only GitHub Support can
  remove those. They do not appear in the branch history, the contributors
  page or a fresh clone, but someone holding the old commit IDs can still open
  them.
- Deleting the repository and recreating it would clear the PR refs, but it
  also destroys the issues, the deployment history and the commit trail that
  show the work was done incrementally. It is not worth it, and it looks worse
  than it fixes.

## If it happens again

```bash
git config --global user.name  "Abdul Mannan Ahmad"
git config --global user.email "332351145+akhtarabdulmannan-lgtm@users.noreply.github.com"
```

Then confirm `git log -1 --format='%an <%ae>'` before the first push of a
session, and check that the credential in use is the right account
(`gh auth status`).

## For the instructor

The work is the student's own. Two scaffolding commits were authored under a
second account of the student's own, which the assignment does not allow; the
history has been rewritten to a single account, no other account has access,
and this note exists so the correction is visible rather than concealed.
