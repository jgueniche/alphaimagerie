# Runbook de bascule — alphaimagerie.fr

Procédure de mise en production du nouveau site sur `https://www.alphaimagerie.fr`,
en remplacement du site Wix actuel. Document opérationnel : à suivre pas à pas le jour J,
en cochant au fur et à mesure.

> **Préalable bloquant** : la bascule ne se déclenche que sur instruction explicite du
> client (règle §CLAUDE.md du 28/08/2026). Aucun merge vers `master` ni changement DNS
> ne doit être engagé sans cet accord, même si tous les contrôles sont verts.

---

## 1. État constaté (mesuré le 29/08/2026)

| Élément | Valeur relevée | Conséquence |
|---|---|---|
| Serveurs de noms | `ns104.ovh.net` · `dns104.ovh.net` | **La zone DNS est chez OVH** — c'est là que se fait la bascule (registrar à confirmer, q.38). |
| `alphaimagerie.fr` (A) | `185.230.63.186` (Wix), TTL **3600** | À remplacer par l'IP Vercel. |
| `www.alphaimagerie.fr` (A) | `185.230.63.186` (Wix), TTL 3600 | À remplacer par un CNAME Vercel. |
| Apex → www | `301` fait par Wix au niveau HTTP | **À reprendre côté Vercel** : c'est une redirection applicative, pas un enregistrement DNS. |
| Serveur HTTP actuel | `Pepyaka` + `x-wix-request-id` | Confirme l'hébergement Wix. |
| MX | `mx1/mx2/mx3.mail.ovh.net` | **Messagerie OVH — à ne surtout pas toucher** (`contact@alphaimagerie.fr`). |
| SPF | `v=spf1 include:mx.ovh.com ~all` | À étendre si Brevo est retenu (q.46) — voir §7. |
| DMARC | `v=DMARC1; p=none;` | Politique en observation ; à durcir plus tard, hors bascule. |
| DKIM | aucun sélecteur publié | À créer avec Brevo le cas échéant (q.46). |
| CAA | **aucun** | Bonne nouvelle : rien ne bloquera l'émission du certificat TLS par Vercel. |
| TXT | `1\|www.alphaimagerie.fr` | Jeton de vérification Wix — à supprimer **après** la bascule, pas avant. |
| Pages indexées (sitemap Wix) | 5 + l'accueil | Toutes couvertes par la table de redirections (§5). |

## 2. Aller / ne pas aller

À vérifier **avant** de toucher au DNS. Aucun point n'est facultatif.

- [ ] `docs/compliance-checklist.md` signée par le directeur de la publication.
- [ ] CI verte sur `master` : lint, `tsc`, `[[À CONFIRMER]]` strict, similarité, région UE,
      données structurées, SEO on-page, build, Playwright, Lighthouse CI.
- [ ] `node scripts/check-region.mjs https://alphaimagerie.vercel.app` → fonctions en `cdg1`.
      *Ce contrôle ne peut pas se faire sur une preview* : Vercel Authentication intercepte
      la requête à l'edge (302 vers `/sso-api`), aucune fonction n'est exécutée et aucune
      région n'est lisible. Il faut viser un déploiement public (production), ou créer un
      jeton *Protection Bypass for Automation* (Vercel → Settings → Deployment Protection)
      et le passer par `VERCEL_BYPASS`.
- [ ] Seuils §13 mesurés sur la production Vercel avec PageSpeed Insights
      (`docs/benchmark/psi_fetch.sh`, **clé API à fournir**) : mobile ≥ 95/100/100/100,
      LCP < 1,8 s, CLS < 0,05, INP < 200 ms.
- [ ] Accès **Search Console** obtenus (q.38) : sans eux, impossible de surveiller la
      bascule ni de soumettre le sitemap.
- [ ] Accès à la zone DNS OVH obtenus, et identité du titulaire du domaine confirmée.
- [ ] Abonnement Wix maintenu actif au moins **30 jours après** la bascule (retour arrière).
- [ ] Sauvegarde de la zone DNS OVH exportée et archivée (§8).

## 3. Fenêtre recommandée

Mardi ou mercredi matin, **hors nocturne du lundi**, entre 9 h et 11 h : le secrétariat est
joignable (8 h–18 h 30) si un patient signale un problème, et il reste une journée pleine
pour réagir avant le week-end. Éviter le vendredi et les veilles de jours fériés — le centre
est ouvert 7 j/7 mais l'équipe technique ne l'est pas.

## 4. Déroulé

### J‑7 — préparation

1. **Ajouter les domaines dans Vercel** (projet `alphaimagerie`, onglet *Domains*) :
   `www.alphaimagerie.fr` en domaine principal, `alphaimagerie.fr` configuré en
   *Redirect to `www.alphaimagerie.fr` (308)*.
   > Vercel affiche alors les enregistrements exacts à créer. **Relever ces valeurs dans
   > l'interface plutôt que de les recopier d'ici** : l'IP de l'apex (`76.76.21.21`) est
   > stable, mais la cible CNAME est désormais attribuée par domaine
   > (`cname.vercel-dns.com`, `cname.vercel-dns-0.com`…). `vercel domains inspect
   > alphaimagerie.fr` donne la même information en ligne de commande.
2. **Abaisser le TTL** des enregistrements `A` de l'apex et de `www` de 3600 s à **300 s**
   dans la zone OVH. Ne rien changer d'autre. Ce seul geste transforme un retour arrière
   d'une heure en un retour arrière de cinq minutes.
3. Vérifier 24 h plus tard que le TTL court est bien propagé :
   `dig +noall +answer www.alphaimagerie.fr` doit afficher `300`.
4. Préparer l'export Search Console des URL indexées (Pages → *Indexées* **et**
   *Explorées, actuellement non indexées*) et compléter la table du §5 si des URL
   absentes du sitemap Wix y figurent.

### J‑1 — répétition

5. Rejouer le go/no-go du §2 dans son intégralité.
6. Contrôler que la preview Vercel de `master` sert bien le contenu attendu, en navigation
   réelle : accueil, un pilier examen, une page zone, `/contact` (envoi de test),
   `/prendre-rendez-vous`, `/mentions-legales`.
7. Vérifier que **la messagerie fonctionne** : envoyer un message à `contact@alphaimagerie.fr`
   et confirmer sa réception. C'est l'état de référence auquel comparer après la bascule.

### Jour J — bascule

> Ne changer que les enregistrements listés. **Ne toucher ni aux MX, ni au SPF, ni au
> DMARC** : la messagerie OVH est indépendante de l'hébergement du site et doit rester
> intacte pendant toute l'opération.

8. Dans la zone OVH :
   - `A` `@` → remplacer `185.230.63.186` par **`76.76.21.21`** (TTL 300) ;
   - `A` `www` → **supprimer**, et créer à la place `CNAME` `www` → *valeur affichée par
     Vercel* (TTL 300).
9. Attendre la propagation (2 à 10 min avec un TTL à 300 s), puis exécuter les contrôles
   du §6. **Ne pas passer à l'étape suivante tant qu'ils ne sont pas tous verts.**
10. Dans Vercel, vérifier que le certificat TLS a bien été émis pour les deux noms
    (badge *Valid Configuration*). En cas d'échec, voir §9.
11. Search Console : soumettre `https://www.alphaimagerie.fr/sitemap.xml` et demander
    l'indexation de l'accueil et des 5 anciennes URL redirigées.
12. Mettre à jour les liens sortants qui pointent encore vers l'ancien site : fiche Google
    Business Profile, fiche Doctolib, Instagram, LinkedIn, Facebook (page officielle à
    trancher — q.52), signatures d'e-mail du secrétariat.

### J+1 → J+30 — surveillance

13. **J+1** : Search Console → *Couverture* et *Expérience sur la page* ; vérifier qu'aucune
    erreur 404 ni boucle de redirection n'apparaît. Repasser le §6.
14. **J+2** : passer les 5 gabarits au test Rich Results (liste dans `docs/rich-results.md`).
15. **J+7** : remonter le TTL de 300 s à 3600 s. Supprimer le TXT de vérification Wix
    (`1|www.alphaimagerie.fr`). Relever les Core Web Vitals **terrain** dans Search Console.
16. **J+30** : contrôler que les 5 anciennes URL sont sorties de l'index au profit des
    nouvelles, puis résilier l'abonnement Wix — **après** avoir récupéré les éventuels
    assets (photos, logo) encore stockés côté Wix (q.36/37).

## 5. Table de redirections 301

Implémentée dans `next.config.ts` et couverte par `tests/e2e/redirections.spec.ts`.
Elle couvre l'intégralité du sitemap Wix relevé le 29/08/2026.

| Ancienne URL | Cible | Testée |
|---|---|:--:|
| `/centre-imagerie-medicale-val-d-oise` | `/centres/cergy` | ✔ |
| `/examens-imagerie-medicale-val-d-oise` | `/examens` | ✔ |
| `/radiologues-experts-val-d-oise` | `/equipe` | ✔ |
| `/rdv-centre-de-radiologie-val-d-oise` | `/prendre-rendez-vous` | ✔ |
| `/mentions-légales` et `/mentions-l%C3%A9gales` | `/mentions-legales` | ✔ |
| `alphaimagerie.fr/*` (apex) | `www.alphaimagerie.fr/*` | via Vercel |

> **À compléter dès réception de l'export Search Console** (q.38) : toute URL indexée
> absente de ce tableau doit y être ajoutée avant la bascule, sinon elle renverra un 404.
> Le paramètre Wix `?lightbox=` était bloqué par le `robots.txt` actuel : aucune URL de ce
> type n'est indexée, rien à rediriger de ce côté.

## 6. Contrôles post-bascule

À exécuter dans cet ordre. Chaque commande doit produire le résultat attendu.

```bash
# 1. Le domaine pointe bien vers Vercel (et plus vers l'IP Wix 185.230.63.186)
dig +short alphaimagerie.fr A          # attendu : 76.76.21.21
dig +short www.alphaimagerie.fr        # attendu : une cible cname.vercel-dns…

# 2. L'apex redirige en 301/308 vers www, et www répond en 200
curl -sI https://alphaimagerie.fr/     | head -1   # attendu : 301 ou 308
curl -sI https://alphaimagerie.fr/     | grep -i ^location   # attendu : https://www.alphaimagerie.fr/
curl -sI https://www.alphaimagerie.fr/ | head -1   # attendu : 200

# 3. Le site servi est bien le nouveau (et non Wix)
curl -sI https://www.alphaimagerie.fr/ | grep -i ^server     # attendu : Vercel (et non Pepyaka)

# 4. Les 5 redirections Wix répondent en 301 vers la bonne cible
for u in /centre-imagerie-medicale-val-d-oise /examens-imagerie-medicale-val-d-oise \
         /radiologues-experts-val-d-oise /rdv-centre-de-radiologie-val-d-oise \
         /mentions-l%C3%A9gales; do
  printf '%-45s %s\n' "$u" "$(curl -sI "https://www.alphaimagerie.fr$u" | grep -i ^location)"
done

# 5. Les fonctions s'exécutent en UE (§4 du brief)
node scripts/check-region.mjs https://www.alphaimagerie.fr

# 6. robots.txt et sitemap servis depuis le nouveau domaine
curl -s https://www.alphaimagerie.fr/robots.txt
curl -s https://www.alphaimagerie.fr/sitemap.xml | grep -c '<loc>'   # attendu : 70

# 7. La balise de vérification Search Console est toujours là
curl -s https://www.alphaimagerie.fr/ | grep google-site-verification

# 8. La messagerie n'a pas bougé
dig +short alphaimagerie.fr MX         # attendu : mx1/mx2/mx3.mail.ovh.net, inchangés
```

Puis, manuellement :

- [ ] Envoyer un message via `/contact` et vérifier sa réception sur `contact@alphaimagerie.fr`.
- [ ] Cliquer les CTA Doctolib et « Appeler » depuis un mobile réel.
- [ ] Vérifier le portail résultats Xplore (lien sortant, aucune donnée de santé sur le site).
- [ ] Envoyer un e-mail **vers** `contact@alphaimagerie.fr` depuis une adresse externe.

## 7. Enregistrements DNS à ajouter *hors bascule*

À traiter séparément, **jamais le même jour** que le changement d'hébergement — pour que
le moindre incident de messagerie soit imputable à une seule cause.

- **Brevo (q.46, si validé)** : ajouter l'inclusion Brevo au SPF existant sans le
  dupliquer — un domaine ne doit publier **qu'un seul** enregistrement SPF :
  `v=spf1 include:mx.ovh.com include:spf.brevo.com ~all`, puis publier le sélecteur DKIM
  fourni par Brevo et valider le domaine dans son interface. Les valeurs exactes sont
  données par Brevo à l'ajout du domaine expéditeur.
- **DMARC** : une fois SPF et DKIM alignés et observés pendant quelques semaines, passer
  `p=none` à `p=quarantine`. Hors périmètre du lancement.

## 8. Sauvegarde de la zone

Avant toute modification, exporter la zone OVH (interface OVH → *Zone DNS* → *Exporter*)
et archiver le fichier avec la date. En l'absence d'export, conserver au minimum ce
relevé du 29/08/2026, qui suffit à reconstruire la configuration antérieure :

```dns
alphaimagerie.fr.        3600  IN  A     185.230.63.186
www.alphaimagerie.fr.    3600  IN  A     185.230.63.186
alphaimagerie.fr.        3600  IN  MX    1   mx1.mail.ovh.net.
alphaimagerie.fr.        3600  IN  MX    5   mx2.mail.ovh.net.
alphaimagerie.fr.        3600  IN  MX    100 mx3.mail.ovh.net.
alphaimagerie.fr.        3600  IN  TXT   "v=spf1 include:mx.ovh.com ~all"
alphaimagerie.fr.        3600  IN  TXT   "1|www.alphaimagerie.fr"
_dmarc.alphaimagerie.fr. 3600  IN  TXT   "v=DMARC1; p=none;"
```

## 9. Retour arrière

**Critère de déclenchement** : le site ne répond pas, sert un contenu erroné, ou le
certificat TLS n'est pas émis dans les 30 minutes. Un doute sur les performances ou le
référencement n'est **pas** un motif de retour arrière — c'est un motif de correction.

**Procédure** (≈ 5 min de propagation avec le TTL à 300 s) :

1. Dans la zone OVH, rétablir `A @ → 185.230.63.186` et `A www → 185.230.63.186`,
   supprimer le CNAME `www`.
2. Vérifier : `curl -sI https://www.alphaimagerie.fr/ | grep -i ^server` doit
   afficher `Pepyaka` à nouveau.
3. Ne pas retirer les domaines du projet Vercel : les laisser en place permet de reprendre
   la bascule sans refaire l'étape 1 du J‑7.
4. Consigner la cause dans `docs/phase-status.md` avant toute nouvelle tentative.

**Incidents fréquents et leur traitement**

| Symptôme | Cause probable | Traitement |
|---|---|---|
| Certificat TLS non émis | Enregistrement CNAME/A incorrect, ou propagation en cours | Vérifier la valeur exacte affichée par Vercel, attendre 15 min, puis *Refresh* dans l'onglet Domains |
| `ERR_TOO_MANY_REDIRECTS` | Apex configuré en redirection **et** en A record vers Vercel avec une règle concurrente | Ne garder que la redirection apex → www côté Vercel |
| Le site Wix s'affiche encore | Cache DNS local | `dig` depuis un autre réseau ; ne pas se fier au navigateur seul |
| E-mails qui ne partent plus | Un MX ou le SPF a été modifié | Restaurer les valeurs du §8 immédiatement |
| 404 sur une ancienne URL | URL indexée absente de la table §5 | Ajouter la redirection dans `next.config.ts`, redéployer |

## 10. Après la bascule

- Mettre à jour `docs/phase-status.md` (date de bascule, incidents éventuels).
- Renseigner la date et le résultat des contrôles dans `docs/compliance-checklist.md`.
- Programmer un point à J+30 : positions, Core Web Vitals terrain, volume d'appels et de
  prises de rendez-vous Doctolib (`docs/tracking-plan.md`).
