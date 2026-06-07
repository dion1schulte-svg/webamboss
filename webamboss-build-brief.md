# Build-Brief — webamboss.de

**Zweck dieses Dokuments:** Vollständige Bauvorlage für die eigene Webseite von Webamboss.
Übergib dieses Dokument Claude Code als Referenz. Es enthält Struktur, fertige Texte,
Marken-Tokens, Design-Richtung sowie technische und rechtliche Anforderungen.

---

## 1. Projekt & Ziel

- **Was:** Eigene Firmen-Webseite von Webamboss (webamboss.de).
- **Geschäft:** Abo-basierte Webseiten für Handwerker und lokale Betriebe (Start im Ennepe-Ruhr-Kreis).
- **Aufgabe der Seite:** Vertrauens-Backstop und Abschluss-Helfer für die telefonische Akquise –
  *kein* SEO-Lead-Generator. Wenn ein Handwerker nach dem Anruf webamboss.de aufruft, muss die Seite
  in 10 Sekunden bestätigen: echt, professionell, lokal, fair, risikoarm.
- **Zielgruppe:** Handwerksmeister/Selbstständige, eher 50+, skeptisch gegenüber „Internet-Leuten",
  zeitarm, oft schon von Agenturen enttäuscht. Sie kaufen Vertrauen, Fairness und Klartext.

**Wichtiges Prinzip — Marke neutral, Inhalt fokussiert:**
Marke und Domain sind bewusst branchen- und ortsneutral (zukunftssicher). Die *Botschaft* ist heute
auf Handwerker + Region fokussiert, aber so gebaut, dass sie sich leicht auf andere Branchen und ganz
Deutschland erweitern lässt. Niche-Bezüge stehen in austauschbaren Bausteinen (Untertitel, Kicker,
Vertrauenszeile), nie fest in den dauerhaften Elementen.

---

## 2. Tech-Stack & Rahmen

- **Bau:** HTML/CSS (saubere, semantische Struktur), Astro-Migration später geplant — also modular bauen.
- **Hosting:** Self-hosted, Domain webamboss.de bei IONOS. Versionierung über GitHub.
- **Mobile-first**, voll responsive (Mobil → Tablet → Desktop).
- **Performance:** schnelle Ladezeit, optimierte Bilder, minimaler JS-Overhead.

---

## 3. Design-System / Marken-Tokens

### Look & Gefühl
Dunkel, editorial, selbstbewusst, mit Charakter — inspiriert von der Eleganz von „Orveka" und der
dunklen, bewegungsreichen Energie von „Ignite", aber komplett in der eigenen Marke. Große Headlines,
viel Weißraum, elektrisches Blau als sparsamer Akzent, dezente Bewegung. Geerdet durch echte
Handwerker-Fotos und Klartext, damit es edel **und** vertrauenswürdig bleibt (kein verspieltes Startup).

### Farben (dunkles Theme)
| Rolle | Hex |
|---|---|
| Seitenhintergrund | `#1E2127` |
| Sektionswechsel (alt) | `#23272E` |
| Karten / Flächen | `#262A31` |
| CTA-Band (dunkler) | `#191D26` |
| Footer | `#15171C` |
| Linien / Border | `#34383F` |
| Text hell (Headlines) | `#F4F1EA` |
| Fließtext | `#C7CACF` |
| Gedämpft | `#A9ADB4` |
| Sehr gedämpft | `#7E828A` |
| **Akzent — elektrisches Blau** | `#4F9BE0` |
| Text auf Akzent-Button | `#0E2238` |

*Offizielle Markenfarben (Logo/Print):* Anthrazit `#23272E`, Vertrauensblau `#20446E`.
Das elektrische Blau `#4F9BE0` ist die lebendige On-Dark-Variante des Vertrauensblaus.

### Typografie
- **Überschriften:** `Unbounded` (Bold/700) — **nur Überschriften**, bewusst **kurz** halten
  (Display-Schrift, bei langen Sätzen zu fett/breit).
- **Fließtext / UI / Buttons:** `Inter` (400/500/600) — ruhig, klar, gut lesbar.
- **Logo:** `Archivo` (Bold/700) — festes Markenasset, nicht ändern. Wortmarke: „Web" im Akzent,
  „amboss" in Hell.
- **WICHTIG (DSGVO):** Alle Schriften **selbst hosten** (woff2 lokal einbinden), **nicht** über das
  Google-Fonts-CDN laden. Das war in Deutschland eine Abmahnwelle und wäre für ein Geschäft, das
  DSGVO-Konformität verkauft, ein Eigentor.
- **Vorschlag Typo-Skala (fluid, clamp):** H1 ~28→44px, H2 ~22→34px, Fließtext 16→17px, klein 13px.

### Logo
Amboss-Silhouette (siehe Logo-Kit) + Wortmarke. Auf Dunkel: Amboss in `#F4F1EA`, „Web" im Akzentblau.
Favicon = Amboss im abgerundeten Quadrat.

### Bewegung (dezent, nicht flashy)
- Sanfte Scroll-Reveals (Fade + leichtes Hochgleiten), gestaffelt pro Sektion.
- Dezenter Einblende-Effekt im Hero.
- Optional: dezent pulsierender Akzent-Ring im Hero (Andeutung von „Licht/Energie").
- **`prefers-reduced-motion: reduce` respektieren** → Animationen aus. Ältere Geräte nicht überfordern.

### Buttons
- Primär: gefüllt Akzentblau, dunkler Text, abgerundet (Pill).
- Sekundär: dezenter Text-Link mit Unterstrich-Akzent oder Ghost-Outline.

---

## 4. Seitenstruktur

1. **Startseite** (trägt die Hauptbotschaft)
2. **Leistungen & Preise**
3. **Referenzen**
4. **FAQ**
5. **Kontakt**
- Footer durchgängig: Navigation + **Impressum** + **Datenschutz** (Pflicht).

---

## 5. Startseite — Abschnitt für Abschnitt (Texte verbindlich)

### Header (sticky)
Logo links · Navigation (Leistungen & Preise · Referenzen · FAQ · Kontakt) · Button „Anrufen".
Mobil: Logo + Menü-Icon + „Anrufen".

### 1) Hero
- Kicker: **Webseiten für Handwerker · Ennepe-Ruhr-Kreis**
- Überschrift (Kurzvariante für Unbounded): **„Kümmern Sie sich ums Geschäft – die Webseite mach ich."**
  - *Lange Originalvariante (Alternative):* „Kümmern Sie sich um Ihr Geschäft – um Ihre Webseite kümmere ich mich."
- Untertitel: „Professionelle Webseiten, komplett betreut – inklusive Hosting, Google-Eintrag und DSGVO. Aktuell besonders für Handwerker und lokale Betriebe."
- Buttons: **Unverbindliches Erstgespräch** (primär) · **Beispiele ansehen** (sekundär → Referenzen)
- Vertrauenszeile: „Fester Ansprechpartner · Feste Preise · Keine versteckten Kosten · DSGVO-konform"

### 2) Das Problem
- Überschrift: „Wer Sie online nicht findet, ruft den Nächsten an."
- Einleitung: „Ihre Kunden suchen heute zuerst im Internet – auch die, die Sie sonst per Empfehlung bekommen hätten. Ohne sichtbare, professionelle Webseite gehen genau diese Anfragen an den Mitbewerber."
- Punkte:
  - **Nicht auffindbar** — „Kein Google-Eintrag, keine Anfragen – Interessenten landen woanders."
  - **Keine Zeit für Technik** — „Webseite, Hosting, DSGVO frisst Zeit, die Sie für Ihr Geschäft brauchen."
  - **Schon mal Geld verbrannt** — „Teure Agentur oder ein Baukasten, der nie richtig fertig wurde?"

### 3) Die Lösung
- Überschrift: „Eine fertige Webseite – ohne dass Sie sich um etwas kümmern müssen."
- Einleitung: „Sie sagen mir, was Sie machen und für wen. Den Rest übernehme ich: aufbauen, online stellen, betreuen. Keine Technik, kein Aufwand, keine Überraschungen auf der Rechnung."
- Drei Säulen:
  - **Komplett für Sie gemacht** — „Sie liefern ein paar Infos, ich baue und befülle die Seite. Sie müssen nichts können."
  - **Damit Kunden Sie finden** — „Google-Eintrag und lokale Suche sind von Anfang an dabei."
  - **Fester Preis, fester Ansprechpartner** — „Klare monatliche Kosten, ein Mensch statt Hotline – keine versteckten Posten."

### 4) So einfach geht's
- Überschrift: „In drei Schritten online – ohne Aufwand für Sie."
- **01 Kurzes Gespräch** — „Wir telefonieren oder treffen uns kurz. Sie erzählen mir von Ihrem Betrieb – mehr brauche ich nicht."
- **02 Ich baue Ihre Seite** — „Sie lehnen sich zurück. Ich erstelle alles und zeige Ihnen einen fertigen Entwurf zur Freigabe."
- **03 Sie sind online** — „Ihre Seite geht live, wird bei Google gefunden – und ich kümmere mich weiter um alles."

### 5) Was drin ist (Leistungs-Teaser)
- Überschrift: „Alles inklusive – ohne Kleingedrucktes."
- Einleitung: „Jede Seite kommt komplett. Sie zahlen einen festen Monatspreis – mehr nicht."
- Checkliste:
  - Professionelle Webseite (3–5 Seiten), passend zu Ihrem Betrieb
  - Hosting, Domain & SSL – die Technik übernehme ich komplett
  - Google-Eintrag & lokale Suche, damit Kunden Sie finden
  - DSGVO-konform: Impressum, Datenschutz, sicheres Kontaktformular
  - Regelmäßige Backups & laufende Betreuung
  - Änderungen inklusive: zwei Anpassungen pro Monat
- Link: „→ Alle Leistungen im Detail ansehen" (→ Leistungen & Preise)

### 6) Preise (Teaser)
- Überschrift: „Klare Preise. Keine Überraschungen."
- Einleitung: „Sie sehen sofort, was es kostet – ohne Angebot anzufordern, ohne Haken."
- **49 €/Monat** — Gründerpreis für die ersten 10 Kunden, dauerhaft Ihr Preis
- Regulär 79 €/Monat · Einmalige Einrichtung 199 €
- Mindestlaufzeit 6 Monate, danach monatlich kündbar
- „Lieber im Voraus zahlen oder die Seite ganz kaufen? Auf Anfrage möglich."
- Link: „→ Alle Preise & Konditionen ansehen" · Kontakt-Zeile: „Fragen zu den Konditionen? Rufen Sie an oder schreiben Sie mir."

### 7) Beweis (Referenz-Teaser)
- Überschrift: „So könnte Ihre Webseite aussehen."
- Einleitung: „Beispiele aus verschiedenen Gewerken – Musterseiten, die zeigen, wie Ihre Seite aufgebaut, gestaltet und bei Google auffindbar wäre."
- 2–3 **anklickbare** Vorschau-Kacheln (z. B. Dachdecker, Maler, Elektriker), jeweils sichtbar als **„Beispiel"** gekennzeichnet → öffnen die live laufende Musterseite.
- Button: „→ Alle Beispiele ansehen" (→ Referenzen)

### 8) Kurze FAQ
- Überschrift: „Die häufigsten Fragen – kurz beantwortet."
  - „Was kostet mich das – kommen versteckte Kosten dazu?" → „Ein fester Monatspreis, sonst nichts. Einmalige Einrichtung 199 €, alles Weitere ist inklusive."
  - „Wie lange binde ich mich?" → „6 Monate Mindestlaufzeit, danach monatlich kündbar. Kein Knebelvertrag."
  - „Ich habe keine Zeit – was muss ich tun?" → „Nur ein kurzes Gespräch. Den Rest übernehme ich komplett."
  - „Brauche ich technisches Wissen?" → „Nein. Sie liefern ein paar Infos, ich kümmere mich um die ganze Technik."
- Link: „→ Alle Fragen beantwortet" (→ FAQ)

### 9) Abschluss-CTA
- Überschrift: „Lassen Sie uns kurz sprechen – unverbindlich."
- Einleitung: „Ein kurzes Gespräch genügt, um zu sehen, ob es passt. Kein Verkaufsdruck, keine Verpflichtung."
- Buttons: **Jetzt anrufen: [TELEFONNUMMER]** · **Rückruf anfordern** (Formular)
- Vertrauenszeile: „Antwort innerhalb von 24 Stunden · Kein Verkaufsdruck"
- Schluss-Anreiz: „Sichern Sie sich einen der zehn Gründerplätze zu 49 €/Monat."

### Footer
Logo · Navigation · **Impressum** · **Datenschutz** · „© 2026 Webamboss · Ennepe-Ruhr-Kreis"

---

## 6. Unterseiten — Inhalte

### Leistungen & Preise
- Einstieg: „Alles, was Ihre Webseite braucht – in einem festen Paket."
- **Leistungen im Detail** (fünf Blöcke):
  - *Die Webseite selbst:* professionelles, mobiloptimiertes Design, 3–5 Seiten, auf den Betrieb zugeschnitten; Texte werden erstellt.
  - *Gefunden werden:* Google-Eintrag, lokale Suche, technische SEO-Grundlagen.
  - *Technik & Sicherheit:* Hosting, Domain, SSL, regelmäßige Backups, Updates.
  - *Rechtssicherheit:* DSGVO-konform mit Impressum, Datenschutz, sicherem Kontaktformular.
  - *Laufende Betreuung:* fester Ansprechpartner, zwei Änderungen/Monat, Support.
- **Optionale Zusatzleistungen:** „individuell auf Anfrage" (z. B. Fotos, Logo, Zusatzseiten, Express, erweiterte SEO).
- **Preise & Konditionen:**
  - 49 €/Monat Gründerpreis (erste 10, dauerhaft) · regulär 79 €/Monat · 199 € Einrichtung
  - Drei Zahlwege: monatlich · im Voraus · Komplettkauf (auf Anfrage)
  - Mindestlaufzeit 6 Monate, danach monatlich kündbar
  - Hinweis: „Keine versteckten Kosten."
- Abschluss-CTA: Erstgespräch.

### Referenzen
- Einstieg: „So sehen Webamboss-Seiten aus." (ehrlich als Beispiele, keine Kundenliste)
- **Hinweis (sichtbar):** „Alle gezeigten Seiten sind Beispiele. Sie zeigen, wie Ihre Seite aussehen könnte – Inhalte, Bilder und Design werden für Ihren Betrieb individuell angepasst."
- **Beispiel-Galerie:** 2–3 **anklickbare** Musterseiten je Gewerk → öffnen live laufende Demo
  (z. B. unter `webamboss.de/beispiele/dachdecker`). Jede als „Beispiel/Musterseite" gekennzeichnet.
- **Auf jeder Musterseite** dezentes Banner: „Beispielseite von Webamboss · Inhalte und Gestaltung frei anpassbar · zu webamboss.de" (Link zurück zur Hauptseite).
- **Werden-Sie-Referenz-Block:** „Werden Sie eines meiner ersten Referenzprojekte und sichern Sie sich den Gründerpreis."
- **Platz für echte Referenzen (später):** vorbereiteter, anfangs ausgeblendeter Bereich; bei echten Kunden mit Erlaubnis Zitat + Name + Gewerk, Link auf deren Live-Seite.
- Abschluss-CTA: Erstgespräch.

### FAQ (volle Liste)
**Kosten & Bindung**
- „Was kostet mich das im Monat – gibt es versteckte Kosten?" → „49 €/Monat als Gründerpreis für die ersten 10 Kunden, dauerhaft Ihr Preis – danach regulär 79 €/Monat. Dazu eine einmalige Einrichtung von 199 €. Hosting, Domain, Betreuung und DSGVO sind inklusive. Keine versteckten Kosten."
- „Wie lange binde ich mich, und was passiert danach?" → „Die Mindestlaufzeit beträgt 6 Monate. Danach läuft es monatlich weiter und ist jederzeit zum Monatsende kündbar – kein automatischer Jahresvertrag."
- „Was passiert mit meiner Seite und Domain, wenn ich kündige?" → „Ihre Domain gehört immer Ihnen – die übertrage ich Ihnen kostenlos. Die Webseite ist Teil des Pakets, das ich für Sie hoste und pflege; mit der Kündigung endet dieser Service. Möchten Sie die Seite behalten und selbst weiterbetreiben, ist das jederzeit gegen eine einmalige Ablöse möglich." *(Modell: Miete mit fairer Ablöse.)*

**Aufwand & Ablauf**
- „Ich habe keine Zeit – was brauchen Sie von mir?" → „Sehr wenig: ein kurzes Gespräch und ein paar Eckdaten zu Ihrem Betrieb. Die Texte schreibe ich für Sie, Sie geben sie nur frei."
- „Wie lange dauert es, bis meine Seite online ist?" → „In der Regel ein bis zwei Wochen nach unserem Gespräch – je nachdem, wie schnell Sie mir Ihre Infos geben." *(Zeitrahmen an echte Bauzeit anpassen.)*
- „Kann ich später Texte und Bilder ändern lassen?" → „Ja. Zwei Anpassungen pro Monat sind inklusive – melden Sie sich einfach, ich erledige das."

**Technik & Sichtbarkeit**
- „Brauche ich technisches Wissen?" → „Nein. Sie müssen nichts installieren und nichts pflegen – die gesamte Technik übernehme ich."
- „Wer kümmert sich um Hosting, Updates und Sicherheit?" → „Das übernehme komplett ich: Hosting, SSL, Updates und regelmäßige Backups laufen im Hintergrund."
- „Werde ich bei Google in meiner Region gefunden?" → „Ihre Seite wird von Anfang an für die lokale Suche optimiert und mit einem Google-Eintrag verknüpft. Ehrlich gesagt: Gute Sichtbarkeit ist kein Schalter, sondern baut sich über einige Wochen auf."

**Rechtliches**
- „Ist meine Seite DSGVO-konform?" → „Ja. Impressum, Datenschutzerklärung, ein sicheres Kontaktformular und SSL gehören zum Standard – Sie sind rechtlich auf der sicheren Seite."

Abschluss: „Ihre Frage ist nicht dabei? Rufen Sie an oder schreiben Sie mir."
*FAQ-Schema (Schema.org/FAQPage) einbauen → Rich Snippets bei Google.*

### Kontakt
- Überschrift: „Lassen Sie uns sprechen – unverbindlich."
- Einleitung: „Ein kurzer Anruf oder eine Nachricht genügt. Kein Verkaufsdruck, Antwort innerhalb von 24 Stunden."
- Direkt: Telefon **[TELEFONNUMMER]** · E-Mail **info@webamboss.de**
- **Rückruf-Formular** (wenig Felder): Name · Telefonnummer · E-Mail (optional) · Nachricht (optional) · **Datenschutz-Checkbox (Pflicht)** · Button „Rückruf anfordern".
- Einzugsgebiet: „Vor Ort in der Region rund um den Ennepe-Ruhr-Kreis – und deutschlandweit per Telefon und Video."
- Vertrauenszeile: „Fester Ansprechpartner · Kein Verkaufsdruck · Antwort in 24 Stunden".

---

## 7. Recht & DSGVO (Pflicht)

- **Impressum** (gewerblich): voller Name, ladungsfähige Anschrift (i. d. R. echte Adresse, kein Postfach),
  Telefon, E-Mail, ggf. USt-IdNr.
- **Datenschutzerklärung:** muss tatsächliche Verarbeitung abbilden (Hosting IONOS, Kontaktformular,
  ggf. Maps/Analytics). Texte über seriösen Generator (z. B. eRecht24, IT-Recht Kanzlei) oder Anwalt — **kein** selbstgeschriebener Boilerplate.
- **Schriften selbst hosten** (kein Google-Fonts-CDN).
- **SSL** verpflichtend. Kontaktformular DSGVO-konform (nur nötige Daten, Consent-Häkchen).
- Falls Analytics/Maps: Consent-/Cookie-Banner.

---

## 8. Technische Anforderungen (Checkliste)

- [ ] Mobile-first, voll responsive
- [ ] Semantisches HTML, sauberes Heading-Gerüst
- [ ] Schnelle Ladezeit, optimierte/komprimierte Bilder (WebP), lazy-loading
- [ ] Barrierearm (Kontraste, Fokuszustände, Alt-Texte, `prefers-reduced-motion`)
- [ ] SEO-Grundlagen: Title/Meta pro Seite, Open Graph, sauberes URL-Schema
- [ ] Schema.org: `LocalBusiness` (Startseite/Kontakt) + `FAQPage` (FAQ)
- [ ] Favicon (Amboss)
- [ ] Selbst gehostete Schriften (woff2)
- [ ] Modular gebaut (Astro-Migration im Blick)

---

## 9. Offene Platzhalter (vor/bei Bau ausfüllen)

- `[TELEFONNUMMER]`
- Echte Handwerker-/Region-Fotos (Hero, Sektionen) — ersetzen Platzhalter
- 2–3 live gehostete Musterseiten + deren URLs (`/beispiele/...`)
- Genauer Zeitrahmen „Seite online" (FAQ)
- Impressum-Daten (Name, Anschrift, ggf. USt-IdNr.)
- Optional: Gründerplatz-Zähler („noch X von 10 frei"), Jahres-Vorauszahlungs-Rabatt

---

## 10. Bau-Auftrag für Claude Code

> Baue auf Basis dieses Briefs die Startseite und die vier Unterseiten von webamboss.de als
> responsives, modulares HTML/CSS-Projekt. Halte dich exakt an Texte, Struktur, Farben, Schriften
> und das Bewegungs-/Design-Konzept oben. Beginne mit dem globalen Design-System (Tokens, Typo,
> Buttons, Header/Footer), dann die Startseite Abschnitt für Abschnitt, danach die Unterseiten.
> Schriften selbst hosten. Platzhalter klar markieren.
