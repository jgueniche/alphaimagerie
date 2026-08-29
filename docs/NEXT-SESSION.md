# Prompt de reprise — session suivante (rédigé le 29/08/2026)

> Copier-coller le bloc ci-dessous comme prompt de la prochaine session.

---

Tu reprends la refonte de alphaimagerie.fr (SELAS Alpha Imagerie, imagerie médicale à Cergy,
Val-d'Oise). Le repo contient tout le contexte : lis d'abord CLAUDE.md (règles bloquantes +
données client confirmées), puis docs/BRIEF.md (brief fondateur), docs/phase-status.md
(avancement) et docs/questions.md (réponses client et points ouverts — vérifie si j'y ai
répondu à de nouvelles questions depuis, notamment q.41-42, q.44-49, q.58, q.25/27).
Ne redemande rien qui y figure déjà.

ÉTAT AU 29/08/2026 (fin de session précédente)
- Production : https://alphaimagerie.vercel.app — master = 3dd531f, 77 pages statiques,
  CI GitHub Actions vert (lint, tsc, garde-fous, build, 60 tests Playwright, LHCI).
- Phase 3 TERMINÉE : 8 piliers examens + 4 pages interventionnelles + 24 zones longue
  traîne (12 IRM, 6 scanner, 6 écho) + 6 landings modalité×ville + /preparer-mon-examen
  (hub + 11 fiches imprimables CSS print) + /contact (formulaire §3.2, transport factice
  CONTACT_TRANSPORT=log, doc : docs/formulaire-contact.md) + /professionnels-de-sante +
  /faq + /recrutement + pages légales complètes (confidentialité, cookies « zéro traceur »,
  accessibilité, plan-du-site) + docs/rgpd/registre-traitement.md.
- Socle Phase 4 livré : images OG par gabarit (route /og, next/og), dataLayer first-party
  complet selon docs/tracking-plan.md (0 tag tiers, 0 cookie — testé), script de similarité
  bloquant dans le build, suite Playwright (parcours, CTA+dataLayer, 301, 0 requête tierce,
  formulaire, axe-core), Lighthouse CI (a11y/BP/SEO 100 bloquants ; perf en warn sur runner,
  le seuil ≥95 du §13 se valide sur la prod via PSI).
- Palette corrigée AA (axe-core) : ink-400 #626F8C, accent #9D5420.

⚠ RÈGLE DE WORKFLOW BLOQUANTE (CLAUDE.md, décision client 28/08) : ne JAMAIS créer de PR
ni merger vers master sans mon instruction explicite dans la session courante, même si tout
est vert. Développe et pousse sur ta branche de travail uniquement (previews Vercel) ; je
teste sur la preview, puis je donne l'OK de merge, à chaque fois.

ENVIRONNEMENT DISTANT (pièges connus)
- npm ci nécessaire (conteneur neuf). Proxy HTTPS (CA /root/.ccr/ca-bundle.crt).
- Playwright : Chromium préinstallé /opt/pw-browsers/chromium — playwright.config.ts le
  gère déjà (executablePath hors CI). Avant de relancer la suite, tuer tout next-server
  résiduel (pkill -f next-server), sinon le port 3210 sert un vieux build.
- Lighthouse local impossible (TLS) ; PSI = clé API client (docs/benchmark/psi_fetch.sh).

MISSION — finir la Phase 4, puis Phase 5
1. Région Vercel : les fonctions (Server Action contact, route /og) tournent en iad1 (USA)
   alors que le brief impose cdg1/fra1 (§4). Forcer la région (vercel.json « regions » ou
   réglage projet — vérifier ce que le plan Hobby permet) et vérifier après déploiement.
2. Selon mes réponses dans docs/questions.md (n'implémenter QUE ce qui est validé) :
   - q.46 + clé Brevo fournie → activer l'envoi réel : CONTACT_TRANSPORT=brevo +
     BREVO_API_KEY dans Vercel (env Production), tester envoi + accusé de réception ;
     suivre docs/formulaire-contact.md (SPF/DKIM à vérifier côté client).
   - q.44/45 (CMP tarteaucitron + Plausible EU) → CMP self-host, Consent Mode v2 défaut
     denied (stub inline), GTM/GA4 chargés APRÈS consentement seulement (accès q.38
     nécessaires), mesure exemptée en parallèle. AVANT activation : mettre à jour /cookies,
     /politique-de-confidentialite et docs/rgpd/registre-traitement.md. Étendre Playwright :
     refus → 0 tiers sauf mesure exemptée ; acceptation → consent granted ; plan de recette
     de docs/tracking-plan.md §4.
   - q.41/42 → publier la ligne prescripteurs sur /professionnels-de-sante.
   - q.58, q.25, q.27 → ajuster politique de confidentialité / mentions légales si besoin.
   - q.50 (offres) → JobPosting sur /recrutement ; q.52/53 → footer/SEO local.
3. Photos réelles et export motifs Doctolib Pro (+pid) s'ils sont fournis : remplacer les
   placeholders (/equipe, centres) ; sélecteur site→examen→motif sur /prendre-rendez-vous.
4. Phase 5 : PSI avec clé API sur la prod (valider §13 : perf mobile ≥95, LCP<1,8s,
   CLS<0,05) ; Rich Results Test des 5 types JSON-LD ; docs/migration.md (runbook bascule
   www.alphaimagerie.fr : DNS, apex→301 www, HSTS, GSC, maintien Wix, surveillance 404) ;
   docs/compliance-checklist.md (§3 signable) ; README handover (ajouter une page/un
   médecin/une offre, changer les horaires, process de bascule) ; livrables §16 restants
   (docs/google-ads-plan.md, docs/gbp-playbook.md).
5. Garde-fous inchangés : [[À CONFIRMER]] pour tout fait non confirmé, contenu médical
   marqué {/* À VALIDER MÉDICALEMENT */}, aucun avis/superlatif (R.4127-19-1), zéro donnée
   de santé, Conventional Commits, jamais de .env commité.

Travaille en autonomie sur ta branche, pousse régulièrement (previews), NE MERGE PAS sans
mon OK, et rends compte en français, de façon synthétique, avec la liste unique de ce qui
m'est demandé.

À ME DEMANDER (une seule liste, si toujours manquants) : clé API Brevo + validation SPF/DKIM ;
OK q.44-49 et q.58 ; validations q.25/27 ; ligne prescripteurs q.41-42 ; export motifs
Doctolib Pro + pid ; clé API PageSpeed ; photos réelles ; page Facebook officielle (q.52) ;
villes desservies (q.53) ; accès GSC/GA4/GTM/Google Ads/GBP (q.38) ; DNS/registrar pour la
bascule du domaine.
