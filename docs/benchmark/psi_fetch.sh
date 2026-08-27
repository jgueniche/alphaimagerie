#!/bin/bash
# Appels API PageSpeed Insights (publics, sans cle) — 1 par site, espaces de 12 s, retry unique apres 30 s si echec
# Usage : PSI_KEY=<cle-api-google> OUT=<dossier> ./psi_fetch.sh
OUT="${OUT:-./psi-results}"
mkdir -p "$OUT"
LOG="$OUT/psi.log"
: > "$LOG"

fetch_one() {
  name="$1"; target="$2"
  enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1],safe=''))" "$target")
  api="https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${enc}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices${PSI_KEY:+&key=${PSI_KEY}}"
  code=$(curl -sS -m 240 -o "$OUT/${name}.json" -w "%{http_code}" "$api" 2>>"$LOG")
  echo "$(date -u +%H:%M:%S) $name attempt1 HTTP=$code size=$(stat -c%s "$OUT/${name}.json" 2>/dev/null)" >> "$LOG"
  if [ "$code" != "200" ]; then
    sleep 30
    code=$(curl -sS -m 240 -o "$OUT/${name}.json" -w "%{http_code}" "$api" 2>>"$LOG")
    echo "$(date -u +%H:%M:%S) $name attempt2 HTTP=$code size=$(stat -c%s "$OUT/${name}.json" 2>/dev/null)" >> "$LOG"
  fi
  if [ "$code" != "200" ]; then
    echo "$(date -u +%H:%M:%S) $name FAILED (HTTP $code)" >> "$LOG"
    mv "$OUT/${name}.json" "$OUT/${name}.error.json" 2>/dev/null
  fi
}

fetch_one alphaimagerie "https://www.alphaimagerie.fr/"
sleep 13
fetch_one resonance-eragny "https://groupe-resonance-imagerie.fr/les-centres/eragny/"
sleep 13
fetch_one simago "https://www.simago.fr/"
sleep 13
fetch_one imdev "https://www.imdev.fr/"
echo "$(date -u +%H:%M:%S) DONE" >> "$LOG"
