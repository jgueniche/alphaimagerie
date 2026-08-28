# Prompt de reprise — session suivante (copier-coller tel quel)

---

Tu reprends la refonte de **alphaimagerie.fr** (SELAS Alpha Imagerie, imagerie médicale à Cergy, Val-d'Oise). Le repo contient tout le contexte : lis d'abord `CLAUDE.md` (règles bloquantes + données client confirmées), puis `docs/BRIEF.md` (brief fondateur), `docs/phase-status.md` (avancement) et `docs/questions.md` (réponses client et points ouverts). Ne redemande rien qui y figure déjà.

## État au 28/08/2026 (fin de session précédente)

- **Site en production** : https://alphaimagerie.vercel.app — 33 pages statiques, Next.js 16 / TS strict / Tailwind v4, contenu MDX validé zod dans `/content`, logos vectoriels officiels intégrés, palette calée sur le logo (#232D5C / #5976B9 / action #3A55A8).
- **Git** : branche de travail `claude/alphaimagerie-refonte-k2alnc` (previews Vercel) ; **`master` = branche par défaut GitHub ET branche de production Vercel** (site public). Workflow : développer sur la branche de travail, `git merge --ff-only` vers master uniquement quand `CHECK_CONFIRMER=strict node scripts/check-confirmer.mjs` passe. Conventional Commits, jamais de `.env` commité.
- **Garde-fou** : tout fait non confirmé s'écrit `[[À CONFIRMER : …]]` (badge en preview, build de prod master bloqué). Contenu médical non relu : `{/* À VALIDER MÉDICALEMENT */}` en tête de MDX. **Zéro jeton résiduel actuellement** — n'en réintroduis que si un fait n'est pas confirmé.
- Pages existantes : accueil, /centres/cergy (+6 landings modalité×ville), /centres/goussainville (teaser fin 2027), /examens (8 piliers dont hystérosalpingographie et hub interventionnel + 4 pages filles), /equipe, /prendre-rendez-vous, /resultats, /mentions-legales, sitemap/robots, 301 Wix.
- Environnement d'exécution distant : proxy HTTPS (CA `/root/.ccr/ca-bundle.crt`), Lighthouse local impossible (interception TLS), API PageSpeed sans clé en quota — demander une clé API au client pour les mesures CWV (`docs/benchmark/psi_fetch.sh` prêt).

## Mission de cette session — finir la Phase 3, puis Phase 4

1. **Zones longue traîne** (gabarit : pilier existant resserré, 450–700 mots, FAQ 4–6 q., frontmatter `examenSchema`) : `/examens/irm/[zone]` (cérébrale, rachis-lombaire, cervicale, genou, épaule, hanche, cheville-pied, poignet-main, prostatique, pelvienne, mammaire, abdominale-hépatique), `/examens/scanner/[zone]` (thoracique, abdomino-pelvien, cérébral, sinus, rachis, **score-calcique**), `/examens/echographie/[type]` (abdominale, pelvienne, thyroïde, doppler-veineux-arteriel, mammaire, musculo-squelettique). Cibles et priorités : `docs/keyword-map.csv`.
2. **/preparer-mon-examen** : hub + fiches courtes imprimables (CSS print) par examen — checklist documents, jeûne, injection, grossesse, implants, enfants, PMR.
3. **/contact** : formulaire conforme §3.2 du brief (civilité, nom, prénom, e-mail, téléphone, site, type de demande en liste fermée, message + « N'indiquez aucune information médicale ») — Server Action + zod + honeypot + rate limiting, page merci `noindex` ; l'envoi SMTP attend les identifiants Brevo (demander au client) : d'ici là, brancher un transport factice derrière une variable d'env et le documenter.
4. **/professionnels-de-sante** (portail médecins Xplore, MS-Santé/DMP, reconstructions 3D, CPTS Axe Majeur, EndoIDF ; ligne dédiée : demander confirmation du 01 86 30 30 03), **/faq** (FAQPage globale), **/recrutement** (candidature par e-mail, JobPosting dès offres fournies).
5. **Pages légales restantes** : /politique-de-confidentialite (+ registre de traitement dans `docs/rgpd/`), /cookies, /accessibilite, /plan-du-site.
6. **Phase 4** si le temps le permet : CMP + Consent Mode v2 défaut denied + mesure exemptée (arbitrages q.44–47 de `docs/questions.md` encore ouverts — proposer tarteaucitron/Plausible/Brevo et demander un OK), dataLayer selon `docs/tracking-plan.md`, images OG via `next/og`, script de similarité de contenu en CI, tests Playwright (parcours, CTA, 301, 0 script tiers avant consentement) + Lighthouse CI. DoD : §13 de `CLAUDE.md`.

## À demander au client (une seule liste, comme d'habitude)

Identifiants SMTP Brevo (ou autre choix q.46) ; OK sur les arbitrages q.44–49 (CMP, mesure exemptée, stockage formulaire, 3CX/SDA, SMS Doctolib) ; validation des deux formulations des mentions légales (exonération TVA art. 261 CGI ; contact RGPD sans DPO) ; export des motifs Doctolib Pro + `pid` pour le sélecteur de `/prendre-rendez-vous` ; clé API PageSpeed ; photos réelles (centre + les 2 fondateurs) ; choix de la page Facebook officielle (q.52) ; villes desservies définitives (q.53) ; accès GSC/GA4/GTM/GBP le moment venu.

Travaille en autonomie, pousse régulièrement, et merge sur master quand le strict passe. Vérifie le déploiement de production après chaque merge (URL publique) et rends compte en français, de façon synthétique.
