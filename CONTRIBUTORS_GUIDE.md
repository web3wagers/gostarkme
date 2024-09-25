# Contributor Guidelines

🎉 Thank you for being interested in contributing to the Gostarkme project! 🎉

Feel welcome and read the following sections in order to know how to ask questions and how to work on something.

Please make sure you are welcoming and friendly in all of our spaces.

We're really glad you're reading this, because we need volunteer developers to help this project come to fruition. 👏

## Issues

The best way to contribute to our projects is by opening a new issue <a href="https://github.com/web3wagers/gostarkme/issues/new" target="_blank">Here</a> or tackling one of the issues <a href="https://github.com/web3wagers/gostarkme/issues" target="_blank">listed here</a> .

# Pull Requests

When assigned, please fork the repo and create a new branch to develop your issue. Once finished, open a PR and it will be reviewed by a mantainer ASAP.

1. When picking up an issue give a brief presentation about yourself.

```
Template:
Hi, I'm [Your Name] and I'll be working on issue #[Issue Number].

I estimate this will take [Time Estimate] to complete.

This is how I would tackle this issue:
[Steps to solve issue]

```

2. **Estimated Time to Completion**: Approximate number of hours or days required to complete the task.

3. **Approach and Methodology**: Briefly outline your strategy for tackling the issue, including any relevant tools, technologies, or resources you plan to utilize

4. Fork the repo and create a new branch for your issue in the forked repo learn more about how to fork a repository<a href="https://github.com/web3wagers/gostarkme/issues" target="_blank"> here</a>

5. When modifying contracts kindly make sure the formatting is correct and all tests pass successfully.

6. Commit your changes.

7. Push to your fork and submit a pull request on our `dev` branch. Please provide us with some explanation of why you made the changes you made. For new features make sure to explain a standard use case to us.

## CI (GitHub Actions)

We use GitHub Actions to verify if the code of your PR passes all our checks.

When you submit your PR (or later change that code), a CI build will automatically be kicked off. A note will be added to the PR, and will indicate the current status of the build.

## Commits

You can do a regular commit by following the next:

``` [type] significant message ```

### Type

The type must be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature (improvements of the code structure)
- perf: A code change that improves the performance
- test: Adding missing or correcting existing tests
- build: Changes that affect the build system or external dependencies (example scopes: gulp, npm)
- ci: Changes to CI configuration files and scripts (example scopes: travis, circle)
- chore: Other changes that don't modify src or test files
- revert: Reverts a previous commit

## Branches

1. There must be a `main` branch, used only for the releases.
2. There must be a `dev` branch, used to merge all the branches under it.
3. Avoid long descriptive names for long-lived branches.
4. Use kebab-case (no CamelCase).
5. Use grouping tokens (words) at the beginning of your branch names (in a similar way to the `type` of commit).
6. Define and use short lead tokens to differentiate branches in a way that is meaningful to your workflow.
7. Use slashes to separate parts of your branch names.
8. Remove your branch after merging it if it is not important.

Examples:

```
git branch -b docs/readme
git branch -b test/a-feature
git branch -b feat/sidebar
git branch -b fix/b-feature
```
