# Schriften herunterladen (DSGVO – kein Google CDN)

Die CSS ist bereits fertig verdrahtet. Nur die woff2-Dateien fehlen noch.

## Option A — Manuell (schnellste Methode)

Gehe auf https://gwfh.mranftl.com/fonts (google-webfonts-helper):

1. **Unbounded** → Latin → Bold (700) → woff2 herunterladen
   → Speichern als: `assets/fonts/Unbounded/Unbounded-Bold.woff2`

2. **Inter** → Latin → Regular (400), Medium (500), SemiBold (600) → woff2
   → Speichern als:
   - `assets/fonts/Inter/Inter-Regular.woff2`
   - `assets/fonts/Inter/Inter-Medium.woff2`
   - `assets/fonts/Inter/Inter-SemiBold.woff2`

3. **Archivo** → Latin → Bold (700) → woff2
   → Speichern als: `assets/fonts/Archivo/Archivo-Bold.woff2`

## Option B — npm (Fontsource)

```bash
npm install @fontsource/unbounded @fontsource/inter @fontsource/archivo
```

Dann die woff2-Dateien aus `node_modules/@fontsource/*/files/` in die
jeweiligen `assets/fonts/`-Ordner kopieren und die Dateinamen in
`css/fonts.css` anpassen.

## Überprüfung

Nach dem Download alle fünf Dateien im Browser öffnen und auf korrekte
Darstellung prüfen. Konsole sollte keine 404-Fehler für Schriften zeigen.
