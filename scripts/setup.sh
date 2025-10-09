#!/bin/bash
# Placeholder for setup script
#!/usr/bin/env bash
set -e

echo "🚀 Budget Sentinel Setup"

# --- Check required tools ---
for cmd in git curl ntfy; do
  if ! command -v $cmd &>/dev/null; then
    echo "⚠️  $cmd not found. Please install it before continuing."
  else
    echo "✅ $cmd found"
  fi
done

# --- Create local config folder ---
mkdir -p ~/.budget-sentinel
echo "📂 Created ~/.budget-sentinel for local configs"

# --- Copy Apps Script code to clipboard ---
if [ -f "src/budget-alert.gs" ]; then
  if command -v xclip &>/dev/null; then
    cat src/budget-alert.gs | xclip -selection clipboard
    echo "📋 budget-alert.gs copied to clipboard (Linux + xclip)"
  elif command -v pbcopy &>/dev/null; then
    cat src/budget-alert.gs | pbcopy
    echo "📋 budget-alert.gs copied to clipboard (macOS)"
  else
    echo "⚠️ No clipboard tool found (xclip or pbcopy). Please open src/budget-alert.gs manually."
  fi
else
  echo "❌ src/budget-alert.gs not found!"
fi

# --- Print final instructions ---
cat <<'EOF'

✅ Setup complete.

Next steps:
1. Open your Google Sheet → Extensions → Apps Script
2. Paste in the code from src/budget-alert.gs
3. Save & name the project ("Budget Sentinel")
4. Set up a trigger:
   - Function: createBudgetReminders
   - Event: Time-driven → Daily (or Hourly)
5. Subscribe to ntfy (topic = budget-sentinel):
   ntfy subscribe budget-sentinel

You’ll start getting alerts like:
🚨 Bill Due: $342 – Rent – Sep 25

EOF
