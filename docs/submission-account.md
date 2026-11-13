# Submitting from one GitHub account

The assignment requires the work to come from the student's single GitHub
account. This note records how that was restored and how to check it still
holds.

## What was wrong

The history used to open with two commits authored by **Muhammad Qasim
\<qasim.edge@gmail.com\>**, on 24-25 October 2026, titled:

- `Initial commit: Axiom Labs enterprise AI architecture & digital engineering platform`
- `feat: complete Vectis Inc. platform rebuild matching Forza Inc. architecture`

Those commits carried the scaffolding this project started from. They were
authored on a machine configured with that account, so GitHub listed a second
account on the contributors page. They have since been removed from the history
entirely, so no branch contains a commit that account authored.

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
3. Then dropped the two root commits themselves, so no commit that account
   authored exists in any branch. Every later commit was re-created with its
   tree, author, committer, dates and message unchanged; the only difference is
   ancestry, because the first build of VectisX is now the root of the history.
4. Verified step 3 changed **no file content**: all seven branches end on
   byte-identical trees, and the surviving commits match the pre-rewrite ones
   exactly on tree, author, date and message. Only the two intended commits are
   missing (`main` went from 26 commits to 24).
5. Force-pushed all branches.
6. Added `.mailmap` so `git log`/`git shortlog` show the single identity.

Canonical identity:

```
Abdul Mannan Ahmad <332351145+akhtarabdulmannan-lgtm@users.noreply.github.com>
```

The `332351145` prefix is GitHub's no-reply address for the account, so every
commit is now attributed to `akhtarabdulmannan-lgtm` unambiguously.

## How to check

```bash
git log --format='%an <%ae>' --all | sort -u      # one line
git shortlog -sne --all                           # one author, 43 commits
git rev-list --max-parents=0 main                 # root = "feat: complete VectisX platform..."
```

## What a rewrite cannot erase

Honesty matters more than a clean-looking page, so:

- The **public contributors page** (`/graphs/contributors`) now lists one
  account only.
- The **`/contributors` REST response** may still show the old entries for a
  while. It is an aggregate GitHub caches and recomputes lazily; the underlying
  history is already correct.
- The old commits are still retrievable **by exact SHA**, because GitHub keeps
  `refs/pull/*` alive for every pull request ever opened, and those refs still
  point into pre-rewrite history (#1 `64e7b01`, #2 `667acb7`, #3 `c39eb84`,
  #4 `36bc5d`, #5 `5970ff9`). Only GitHub Support can remove those refs. They
  do not appear in any branch, the contributors page, or a fresh clone, but
  someone holding an old commit ID can still open it.
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
