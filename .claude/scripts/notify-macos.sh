#!/bin/sh
# Claude Code → macOS notification helper
# Usage: notify-macos.sh <title> <fallback-message> [sound]
# stdin: hook event JSON (optional).
#   - .message present (Notification event): used directly
#   - .transcript_path present (Stop event): extracts last assistant text,
#     strips markdown, picks first 2-3 sentences
#   - otherwise: fallback

TITLE="${1:-Claude Code}"
FALLBACK="${2:-Claude Code 알림}"
SOUND="${3:-Glass}"

INPUT=""
if [ ! -t 0 ]; then
  INPUT=$(cat)
fi

MSG=""

if [ -n "$INPUT" ]; then
  MSG=$(printf '%s' "$INPUT" | jq -r '.message // empty' 2>/dev/null)
fi

if [ -z "$MSG" ] && [ -n "$INPUT" ]; then
  TRANSCRIPT=$(printf '%s' "$INPUT" | jq -r '.transcript_path // empty' 2>/dev/null)
  if [ -n "$TRANSCRIPT" ] && [ -f "$TRANSCRIPT" ]; then
    MSG=$(jq -rs '
      def strip_md:
          gsub("(?s)```[^`]*```"; " ")
        | gsub("`(?<c>[^`]+)`"; "\(.c)")
        | gsub("\\*\\*(?<c>[^*]+)\\*\\*"; "\(.c)")
        | gsub("\\*(?<c>[^*]+)\\*"; "\(.c)")
        | gsub("(?m)^#+\\s*"; "")
        | gsub("(?m)^\\s*[-*+]\\s+"; "")
        | gsub("(?m)^\\s*\\d+\\.\\s+"; "")
        | gsub("\\[(?<t>[^\\]]+)\\]\\([^)]*\\)"; "\(.t)")
        | gsub("[\\r\\n]+"; " ")
        | gsub("\\s+"; " ")
        | ltrimstr(" ") | rtrimstr(" ");

      [.[] | select(.type == "assistant") | .message.content[]? | select(.type == "text") | .text]
      | last // ""
      | strip_md
      | . as $t
      | ([scan("[^!?\\n]+?[.!?](?=\\s|$)")] | map(ltrimstr(" ")) | .[0:3] | join(" ")) as $s
      | if $s == "" then ($t | .[0:150]) else $s end
    ' "$TRANSCRIPT" 2>/dev/null)
  fi
fi

MSG="${MSG:-$FALLBACK}"

MSG=$(printf '%s' "$MSG" | tr '"' "'")

osascript -e "display notification \"$MSG\" with title \"$TITLE\" sound name \"$SOUND\""
