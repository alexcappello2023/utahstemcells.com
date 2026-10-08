# Creatività ott26 — come sono fatte

Pipeline in due parti, diversa da quella di settembre:

1. **Fotografia** generata con AI (`gpt_image_2_5`, 3:2), senza testo e con lo
   spazio negativo a sinistra riservato all'overlay. Master in `creative-src/`.
2. **Testo e logo** composti in HTML e renderizzati con Chrome headless a
   1536×1024. Il logo è `src/assets/logo.svg` del sito, quindi vettoriale e
   ufficiale: non viene ridisegnato dall'AI.

Rigenerare la creatività 1:

```
cd newsletter/ott26
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --force-device-scale-factor=1 --screenshot=creative-01.png --window-size=1536,1024 \
  --hide-scrollbars --virtual-time-budget=8000 creative-01.html
ffmpeg -y -i creative-01.png -vf scale=1200:-2 -q:v 4 01-one-blood-draw.jpg
```

Il vantaggio rispetto a settembre: tipografia nitida a qualsiasi dimensione,
colori di brand esatti, logo ufficiale, nessun refuso inventato dal modello, e
il testo si corregge modificando l'HTML invece di rigenerare tutto.
