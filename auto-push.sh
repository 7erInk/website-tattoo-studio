#!/bin/zsh
# Dieses Skript überwacht das Projektverzeichnis und pusht alle Änderungen alle 5 Minuten automatisch auf GitHub.

while true; do
  git add .
  if ! git diff --cached --quiet; then
    git commit -m "Auto-Update $(date '+%Y-%m-%d %H:%M:%S')"
    git push
  fi
  sleep 300 # 5 Minuten warten

done
