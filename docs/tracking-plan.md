# Tracking plan — Phase 1 (v1, 28/08/2026)

> Architecture §11 du brief : GTM (conteneur unique) → GA4 + Google Ads, **Consent Mode v2 défaut `denied`** sur `ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage` ; mesure exemptée en parallèle (arbitrage q.45 : recommandation Plausible EU) qui ne dépend d'aucun consentement. **Aucun tag tiers avant consentement** (vérifié par test Playwright en Phase 4). Pas de remarketing, pas d'audiences fondées sur les pages d'examens (§3.8).

## 1. Événements dataLayer

| Événement | Déclencheur | Paramètres | Conversion Ads |
|---|---|---|---|
| `cta_doctolib_click` | tout lien/bouton Doctolib | `site` (cergy·goussainville), `modality` (irm·scanner·echographie·mammographie·radiographie·osteodensitometrie·interventionnel·hysterosalpingographie·null), `position` (header·hero·sticky·fiche·card·footer·prise-rdv) | **primaire** |
| `phone_click` | tout `tel:` | `site`, `position`, `line` (patients·prescripteurs) | secondaire |
| `directions_click` | deep links Google/Apple/Waze | `site`, `provider` | — |
| `portal_click` | lien portail Xplore | `audience` (patient·medecin), `position` | — |
| `site_selected` | sélecteur de site (header ou /prendre-rendez-vous) | `site` | — |
| `exam_selected` | sélecteur d'examen (/prendre-rendez-vous) | `site`, `modality`, `exam_slug`, `bookable_online` (bool) | — |

Conventions : snake_case ; valeurs slug ASCII ; jamais de donnée personnelle ni médicale dans les paramètres (le `exam_selected` reste une intention de navigation, pas une donnée de santé — pas d'audience construite dessus, §3.8).

## 2. Implémentation

- `window.dataLayer.push({event, ...params})` via un helper typé `track()` (client component minimal ; les pages restent RSC).
- GTM injecté **après consentement** uniquement (CMP → q.44, recommandation tarteaucitron) ; le stub Consent Mode v2 `default: denied` est inline (exempt, sans cookie) pour que les tags respectent l'état au premier chargement.
- Mesure exemptée (Plausible/Matomo — q.45) : script léger chargé sans consentement (conformité CNIL mesure d'audience exemptée), events custom miroirs des 3 conversions pour disposer d'une base fiable sans bannière.
- `tel:` par site ; numéros DID 3CX par campagne Ads si q.48 = oui (sinon extension d'appel Google).
- Aucun formulaire depuis le 30/08/2026 : l'événement `contact_submit` et la page de confirmation ont été retirés. Les demandes se mesurent par `phone_click` et `cta_doctolib_click`.

## 3. Comptes et propriétés (à créer/relier — accès q.38)

GTM (1 conteneur) · GA4 (1 propriété + import GSC) · Google Ads (conversion linker ; conversions = tableau ci-dessus) · Search Console (domaine + préfixe www) · Bing Webmaster · Plausible/Matomo. Naming : `AI – {plateforme}`.

## 4. Plan de recette (Phase 4)

Playwright : 0 requête tierce avant consentement (liste blanche : first-party + mesure exemptée) ; chaque événement du tableau émis avec les bons paramètres sur chaque gabarit ; Consent Mode v2 passe à `granted` après acceptation ; refus → GTM absent, mesure exemptée toujours active ; page de contact : coordonnées présentes, aucun champ de saisie.
