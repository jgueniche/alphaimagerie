# CLAUDE.md — Alpha Imagerie (refonte alphaimagerie.fr)

Site vitrine de la SELAS Alpha Imagerie (imagerie médicale, Cergy + Goussainville, Val-d'Oise). Brief fondateur intégral : `docs/BRIEF.md` — le lire avant toute décision de périmètre. État d'avancement des phases : `docs/phase-status.md`.

## Convention `[[À CONFIRMER]]` (bloquante)

- Aucun fait médical, tarifaire, d'équipement, d'horaire, de délai ou juridique ne doit être inventé. Tout élément non confirmé par le client s'écrit `[[À CONFIRMER : description précise]]` dans le contenu/MDX.
- En dev, les `[[À CONFIRMER]]` sont rendus visibles (badge). Le build de production DOIT échouer s'il en reste (script de vérification en CI).
- Toute page de contenu médical non relue porte `<!-- À VALIDER MÉDICALEMENT -->` en tête de fichier.
- Les questions au client sont centralisées dans `docs/questions.md` — ne jamais poser de question au fil de l'eau sans l'y consigner.

## Conformité (§3 du brief — NON NÉGOCIABLE)

1. **R.4127-19-1 CSP** : aucun témoignage/avis/note (ni widget Google/Doctolib), aucune comparaison avec d'autres centres, aucun superlatif commercial, aucune incitation à des actes. Titres uniquement reconnus par l'Ordre. Tarifs/conventionnement communicables (transparence).
2. **RGPD — aucune collecte (décision client 30/08/2026, BLOQUANTE)** : le formulaire de contact a été **supprimé**, jugé peu utile au regard du risque. Le site ne comporte **aucun champ de saisie** : ni formulaire, ni Server Action de traitement, ni transport e-mail, ni base de données. Le contact passe par le téléphone, l'adresse `contact@alphaimagerie.fr` affichée en clair, et Doctolib. **Ne jamais réintroduire de formulaire sans instruction explicite du client.** Registre et traitements résiduels : `docs/rgpd/`.
3. **HDS** : zéro donnée de santé sur le site (Vercel non HDS). Résultats = lien sortant Xplore uniquement. Jamais d'upload d'ordonnance/CV/image.
4. **Cookies CNIL** : CMP conforme ; 0 tag tiers avant consentement ; GA4/Ads en Consent Mode v2 défaut `denied` ; mesure exemptée en parallèle ; Maps embed sous consentement (fallback image statique + lien) ; polices self-host via `next/font`, zéro appel Google Fonts.
5. **Mentions légales** LCEN complètes (SELAS, capital, RCS Pontoise, SIRET, siège, directeur de publication, hébergeur, Ordre, DPO).
6. **Accessibilité** : RGAA 4.1 / WCAG 2.1 AA.
7. **Doctolib** : liens/bouton officiels seulement, pas de scraping.
8. **Google Ads santé** : pas de remarketing ni d'audiences basées sur les pages d'examens.

## Stack imposée (§4)

- Next.js 15+ App Router, TypeScript strict, RSC, SSG intégral pour le contenu ; `next/image`, `next/font` self-hosted ; zéro JS client inutile (budget < 100 kB gz/page contenu).
- Tailwind CSS v4 + shadcn/ui (composants copiés). Design system : `docs/design-system.md`.
- Contenu : MDX dans `/content`, frontmatter validé zod (ou Velite), versionné Git. Pas de CMS au lancement.
- Aucun formulaire (cf. §3.2 ci-dessus) : le site est intégralement statique, sans Server Action ni envoi d'e-mail.
- Hébergement : Vercel `cdg1`/`fra1` ; canonical `https://www.alphaimagerie.fr` ; apex → 301 www.
- SEO : `app/sitemap.ts`, `app/robots.ts`, Metadata API, JSON-LD typé `schema-dts`, 301 dans `next.config`. Conserver la meta GSC `google-site-verification=ol7ZyAQV5TShF2GzDd5J_oV7kF_Fdr_EZ1uIEna9P5Q`.
- Qualité : ESLint + Prettier + `tsc --noEmit` en pre-commit ; Playwright (+ axe-core) ; Lighthouse CI.
- Git : `main` protégé, branche par feature, Conventional Commits, jamais de `.env` commité.
- **Workflow de mise en production (règle client, 28/08/2026 — BLOQUANTE)** : `master` = production Vercel publique. **Ne JAMAIS créer de PR ni merger vers `master` sans instruction explicite du client dans la session courante** — même si `CHECK_CONFIRMER=strict` passe et que tous les tests sont verts. Développer et pousser sur la branche de travail uniquement (previews Vercel) ; le client teste sur la preview, puis donne son OK de merge. Un « merge quand le strict passe » d'une consigne antérieure ne vaut PAS autorisation.

## Rédaction (§8.3)

Vouvoiement ; ton clair, calme, précis ; grand public sans infantiliser ; phrases courtes ; jargon expliqué ; affirmations cliniques standard et prudentes (relecteurs = radiologues) ; aucune promesse de délai/tarif/équipement non confirmée ; encadré « Ce contenu est informatif et ne remplace pas l'avis de votre médecin » sur les pages examens. 1 seul H1 par page ; title ≤ 60 car. ; meta description ≤ 155 car.

## Definition of Done (§13 — bloquant avant prod)

Lighthouse mobile ≥ 95/100/100/100 ; LCP < 1,8 s, CLS < 0,05, INP < 200 ms (lab + field) ; Rich Results 0 erreur (MedicalClinic, ImagingTest, FAQPage, Physician, BreadcrumbList) ; HTML/axe-core 0 erreur bloquante ; 0 script tiers avant consentement (test Playwright) ; 0 `[[À CONFIRMER]]` en prod ; 0 duplication ; title/description/OG/canonical uniques partout ; checklist `docs/compliance-checklist.md` signée ; suite Playwright complète verte.

## Données vérifiées à réutiliser telles quelles (MàJ client 28/08/2026)

- NAP Cergy : Alpha Imagerie · 2 Mail des Cerclades, 95000 Cergy · 01 86 30 30 00 (source de vérité à maintenir : `docs/nap-master.md`).
- **Horaires centre Cergy : ouvert 7j/7, jours fériés inclus — Lun–Ven 8h–19h + nocturne le lundi 19h–22h ; week-end 8h–18h (tout confirmé 28/08). Tous les examens sont réservables en ligne sur Doctolib.** L'argument éditorial est « 7j/7, jours fériés inclus » (l'ancien « jusqu'à 22h en semaine » est abandonné). Secrétariat téléphonique : Lun–Ven 8h–18h30, Sam 8h–12h30 — distinguer les deux.
- **Plateau Cergy confirmé** : 2 IRM Philips MR5300 1,5 T · scanner Philips CT 3500 · mammographe Hologic tomosynthèse 3D avec IA intégrée · table télécommandée Stephanix D2RS · 4 échographes Canon · ostéodensitomètre.
- **Équipe affichée : les 2 fondateurs nommés (Drs Jérémy et Yoram Gueniche) + présentation collective « une douzaine de radiologues issus de centres experts (Curie, Tenon, Pitié-Salpêtrière) »** — pas de liste nominative des autres praticiens ; photos à venir (placeholders initiales).
- **Goussainville : teaser seulement** — « nouveau centre Goussainville Gare, au sein d'une maison de santé, ouverture prévue fin 2027 » ; aucune coordonnée publiée, pas de pages modalité×ville au lancement.
- **Examens confirmés (28/08)** : IRM, scanner (dont score calcique), radiographie (dont pédiatrique), mammographie, échographie + Doppler artériel/veineux, ostéodensitométrie, hystérosalpingographie, infiltrations (écho/radio/scanner-guidées), biopsie mammaire, cytoponctions (thyroïde, ganglions, glandes salivaires/parotides), ponctions-évacuations (collections/hématomes/kystes). **Délais de RDV < 48 h confirmés** — écrire « le plus souvent sous 48 h », jamais de promesse absolue. **Résultats : remis sur place (images + CR) ; radio/scanner/IRM : CR en ligne sous 12 h max (confirmé 28/08).** IRM : à partir de 15 ans ; radio/écho dès les premiers mois. Mammographie : dépistage organisé + seconde lecture (confirmé). PMR + accueil brancards : oui.
- Conventionnement : secteur 2, dépassements modérés et maîtrisés selon l'examen ; aucun dépassement C2S/AME/ALD ; tiers payant (validé client 28/08). Ordre : conseil départemental 95.
- E-mail unique : contact@alphaimagerie.fr (bannir `info@`).
- SELAS ALPHA IMAGERIE — **capital 10 000 €** (confirmé 28/08/2026), SIREN 928 012 830, RCS Pontoise, siège 2 Mail des Cerclades 95000 Cergy (DPO : q.25 en attente).
- Doctolib Cergy : https://www.doctolib.fr/centre-d-imagerie-medicale/cergy/alpha-imagerie · Portail résultats : https://imcp-dmz.xplore.fr/Xaportaildiffusionmobile
