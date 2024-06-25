#!/bin/bash
# Only run script for macOS (iOS builds)
if [ "$(uname)" == "Darwin" ]; then
  grep -rl "s.dependency 'React/Core'" node_modules/ | xargs sed -i '' 's=React/Core=React-Core=g'
fi
