#!/bin/bash

set -e
# First, attempt to compile everything
echo "::group::Compilation"
if ! (cd contracts && scarb build); then
    echo "::error::Compilation failed"
    exit 1
fi
echo "::endgroup::"

tests_output=$(cd contracts && scarb run test || true)

# Get summary information
echo "::group::Summary"

tests_passed=$(echo "$tests_output" | awk '/Tests:/ {print $2}')
tests_failed=$(echo "$tests_output" | awk '/Tests:/ {print $4}')
skipped_count=$(echo "$tests_output" | awk '/Tests:/ {print $6}')
ignored_count=$(echo "$tests_output" | awk '/Tests:/ {print $6}')
filtered_out_count=$(echo "$tests_output" | awk '/Tests:/ {print $6}')

echo "Tests passed: $tests_passed"
echo "Tests failed: $tests_failed"
echo "Skipped: $skipped_count"
echo "Ignored: $ignored_count"
echo "Filtered out: $filtered_out_count"
echo "::endgroup::"

# Check for failed tests

if [ "$tests_failed" -gt 0 ]; then
    failed_tests=$(echo "$tests_output" | awk '/Failures:/{flag=1;next}/^\s*$/{flag=0}flag')
    echo "::error::Tests failed:"
    echo "$failed_tests"
    exit 1
fi
