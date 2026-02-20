# Security Policy

This document describes security-related decisions and vulnerability assessments for this repository.

## Dependency Vulnerability Note – glob (client)

A Dependabot alert reports a vulnerability in the `glob` package
found in `client/package-lock.json`.

### Analysis
- The vulnerability affects the **glob CLI only** (`-c / --cmd` option).
- In this repository, `glob` is used **only as a transitive dependency** via Tailwind CSS in the `client` application.
- The glob CLI is **not used** in the `client` nor in the `api`.
- Tailwind CSS relies on the safe JavaScript API (`glob()`), which is not affected.

### Conclusion
No exploitable attack surface has been identified in this repository.
The alert is monitored and will be resolved when Tailwind CSS updates its dependency constraints.