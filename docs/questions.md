# Questions client — liste unique (Phase 0)

> Une seule passe, comme convenu (§14 du brief). Répondez directement sous chaque question (fichier versionné) ou dans un document unique. Les valeurs précédées de **« Trouvé : »** proviennent de sources publiques datées du 27/08/2026 (site actuel, INSEE/RNE, BODACC, Doctolib, LinkedIn, annuaires) : elles ne seront utilisées qu'après votre confirmation — corrigez ce qui est faux ou périmé. Rien ne part en production avec un `[[À CONFIRMER]]` résiduel.
>
> Les blocs P0 conditionnent la Phase 1 (conception). P1 est nécessaire avant la Phase 3 (contenu) / Phase 4 (analytics). P2 peut suivre.
>
> **✅ Lot 4 intégré (28/08 soir) — plus aucun `[[À CONFIRMER]]` dans le site** : résultats remis sur place (CR en ligne sous 12 h max pour radio/scanner/IRM) ; nocturne **le lundi** ; scanner **Philips** CT 3500 ; mammographie : **dépistage organisé + seconde lecture** (q.16 ✓) ; PMR + **accueil brancards** ✓ (q.35/56) ; IRM **à partir de 15 ans**, radio/écho dès les premiers mois ; dépassements **modérés et maîtrisés**, aucun dépassement **C2S/AME/ALD** (q.40 ✓) ; Ordre : **conseil départemental 95** (q.26 ✓ — RPPS non nécessaires aux mentions légales, utiles plus tard pour les fiches Physician). Page `/equipe` créée (2 fondateurs nommés + douzaine de radiologues issus de centres experts).
> **⚠ Deux formulations à valider par le directeur de la publication** : q.27 → les mentions légales indiquent désormais « Activité de soins exonérée de TVA (art. 261, 4, 1° CGI) » au lieu d'un n° de TVA (corrigez-moi si la SELAS est identifiée à la TVA) ; q.25 → en l'absence de DPO désigné, elles renvoient vers contact@alphaimagerie.fr pour les questions données personnelles (une désignation formelle reste possible plus tard).
>
> **✅ Lot 1 de réponses intégré le 28/08/2026** (Goussainville teaser, équipe = 2 associés, plateau Cergy, horaires, bloc validations). Restent ouvertes, par priorité : capital social (q.23 — voir note LCEN), liste des examens/motifs en ligne (q.18–19), DPO + RPPS officiels (q.25–26), délais (q.21), et les blocs P1/P2.

---

## P0.1 — Goussainville (site 2)

> **✅ Répondu (28/08/2026)** : **nouveau centre « Goussainville Gare », au sein d'une maison de santé — ouverture prévue fin 2027**, à teaser sur le site (formulation souple type « ouverture prévue fin 2027 »). Conséquences : page `/centres/goussainville` en teaser (sans NAP ni horaires), pas de pages modalité×ville Goussainville au lancement, pas de fiche Doctolib/GBP à ce stade. Les questions 3–9 restent à traiter **avant l'ouverture** (non bloquantes pour le lancement).

1. **Nature du site** : Trouvé au registre — vous avez créé **IMAGERIE MEDICALE DE GOUSSAINVILLE GARE (IMGG)**, SIREN 991 609 215, le 16/09/2025 (société de murs/équipements, NAF 68.20B, comme IMCP pour Cergy). Par ailleurs le « Centre de radiologie de Goussainville des Drs Aidan, Bellaiche, Uzan et Sultan » (53 bd Paul Vaillant Couturier, 01 39 88 58 58, orbite GIE Gamma/Simago) existe toujours sur Doctolib. Le site Alpha Imagerie de Goussainville est-il **un nouveau centre « Goussainville Gare »** (où ?), **une reprise** de ce centre existant, ou autre ? Quelle entité d'exploitation (la SELAS Alpha Imagerie avec établissement secondaire ? une autre SELAS ?) — conditionne mentions légales, NAP, JSON-LD.
2. **Statut d'ouverture** : déjà ouvert ? date (ou fenêtre) d'ouverture prévue ? Le site doit-il annoncer une « ouverture prochaine » au lancement ?
3. **Adresse postale exacte** : `[[À COMPLÉTER]]`
4. **Téléphone** (dédié ou 01 86 30 30 00 commun ?) : `[[À COMPLÉTER]]`
5. **Horaires** du centre + du secrétariat téléphonique s'ils diffèrent ; le 7j/7 s'applique-t-il ? : `[[À COMPLÉTER]]`
6. **Accès** : gare RER D Goussainville (le nom IMGG le suggère) ? bus ? parking ? A1/D317 ? PMR ? : `[[À COMPLÉTER]]`
7. **Plateau technique** par équipement (IRM ? scanner ? mammographe — tomosynthèse ? échographes ? radio ? ostéodensitomètre ? cone beam ? panoramique dentaire ?) : `[[À COMPLÉTER]]`
8. **Examens pratiqués** et **examens réservables en ligne** ; **URL Doctolib + `pid=practice-…`** (aucune fiche Doctolib « Alpha Imagerie Goussainville » n'existe au 27/08/2026) : `[[À COMPLÉTER]]`
9. **Fiche Google Business Profile** Goussainville : à créer, ou existante à revendiquer (celle du centre historique ?) ?

## P0.2 — Équipe

> **✅ Répondu (28/08/2026)** : **pas de liste nominative — seuls les deux associés sont affichés (Dr Jérémy Gueniche, Dr Yoram Gueniche)**, avec de **nouvelles photos à faire** (les actuelles sont à remplacer). Restent ouvertes : q.12 (orthographe/format des noms), RPPS officiels à confirmer pour les mentions et le schema Physician (q.26), q.13 (effectifs MERM/secrétariat, protocole de coopération).

10. **Radiologues** — la fiche Doctolib Cergy compte **10 praticiens** rattachés ; identifiés publiquement : **Dr Jérémy Gueniche** (RPPS trouvé : 10100992451 — annuaires privés, à revérifier), **Dr Yoram Gueniche** (RPPS trouvé : 10101184074 — idem ; exerce aussi à Ormesson-sur-Marne/Charenton d'après Doctolib) et **Dr Hassen Baklouti**. Merci de fournir la **liste nominative complète à afficher** (par site), avec pour chacun : nom, titres exacts reconnus par l'Ordre, surspécialités, parcours court, RPPS, photo oui/non. Faut-il une fiche `/equipe/[dr]` pour chacun des ~10, ou seulement pour les associés + radiologues réguliers ?
11. Bios actuelles à valider : **Dr Jérémy Gueniche** — ancien interne des HUS (Strasbourg), ancien assistant spécialiste et praticien attaché de l'Institut Curie (site René-Huguenin, Saint-Cloud, 2019–2024 d'après Doctoome) ; sénologie, ostéo-articulaire, ORL. **Dr Yoram Gueniche** — ancien interne AP-HP, ancien CCA et praticien attaché de l'hôpital Tenon ; imagerie pelvienne, sénologie, thoracique, urinaire. Exact/complet ?
12. **Orthographe publique** : « Dr Jérémy Gueniche » avec accents partout (le brief écrit « Jeremy », LinkedIn « jeremy-gueniche ») ? Format des mentions (« Dr », « Docteur ») ?
13. **Équipe non médicale** : effectifs MERM et secrétariat/accueil par site ; manipulateurs échographistes en protocole de coopération (combien, quels sites) ; cadre/référent à nommer ?

## P0.3 — Plateau technique et examens (Cergy)

> **✅ Répondu (28/08/2026)** — plateau confirmé : **2 IRM Philips MR5300 (1,5 T) · 1 scanner CT 3500 `[[À CONFIRMER : constructeur — Philips ?]]` · 1 mammographe Hologic avec tomosynthèse 3D et IA intégrée · 1 table télécommandée Stephanix D2RS · 4 échographes Canon · 1 ostéodensitomètre `[[À CONFIRMER : marque]]`**.
> **Horaires confirmés : Lun–Ven 8h–19h, + 1 nocturne par semaine 19h–22h, ouvert 7j/7 jours fériés inclus ; week-end 8h–18h (confirmé 28/08 lot 2)**. Nocturne : réponse partielle « **lundi ou jeudi** » — merci de trancher le jour (seul point restant sur les horaires). L'argument éditorial est « **7j/7, jours fériés inclus** ».
> **✅ q.19 (motifs en ligne) répondue (lot 2)** : « c'est tout » — **tous les examens sont réservables en ligne sur Doctolib** ; la liste détaillée des motifs sera reprise du back-office Doctolib Pro en Phase 3 pour le sélecteur de `/prendre-rendez-vous` (le fetch public est bloqué par l'anti-bot).
> **✅ q.18 répondue (lot 3, 28/08)** — liste des motifs donnée par le client : IRM · scanner · radiographie (dont **radio pédiatrique**) · mammographie · ostéodensitométrie · **infiltrations sous échographie, sous radiographie et sous scanner** · **biopsie mammaire** · **cytoponctions (thyroïde, ganglions, glandes salivaires/parotides)** · **ponction et évacuation de collection/hématome/kyste** · **score calcique** · **Doppler artériel et veineux** (+ échographie générale et hystérosalpingographie, confirmées précédemment). Non cités → laissés hors offre sauf contrordre : coroscanner complet, coloscanner, arthro-scanner/IRM, écho obstétricale, PRP/viscosupplémentation (pourtant dans la description Doctolib — à trancher), EOS, cone beam.
> **✅ q.21 partiellement répondue (lot 3)** : **délais de RDV < 48 h** (formulation site : « le plus souvent sous 48 h »). Reste ouvert : délai de remise des résultats (CR/images).
> Restent ouvertes : q.16 (agrément dépistage organisé/seconde lecture), délai résultats (q.21b).

14. **IRM** : le site actuel dit « IRM Philips 1,5 T » ; un post LinkedIn (fin 2025) montre la **livraison de deux IRM par hélicoptère**, et l'article CPTS de mai 2024 annonçait « un scanner et une deuxième IRM ». Combien d'IRM à Cergy aujourd'hui, marques/modèles exacts (Philips… ?), tunnel 70 cm ? `[[À COMPLÉTER]]`
15. **Scanner** : « Scanner en 2025 » sur le site actuel, présent dans la description Doctolib → en service depuis quand ? Marque, modèle, nombre de coupes, injecteur, dispositifs dose : `[[À COMPLÉTER]]`
16. **Mammographe** : marque/modèle, **tomosynthèse oui/non**, agrément dépistage organisé (CRCDC-IDF) / seconde lecture : `[[À COMPLÉTER]]`
17. **Échographes** (nombre, modèles si à afficher), salle radio capteur plan, ostéodensitomètre (marque) — vos posts LinkedIn citent Canon Medical, Philips, T2, EDL, Stephanix sans attribution : ventilation par appareil ? `[[À COMPLÉTER]]`
18. **Liste exhaustive des examens** pour figer le sitemap — cochez ce qui est réellement pratiqué à Cergy (et Goussainville) :
    - coroscanner / score calcique ? coloscanner ? arthro-scanner ? angioscanner ? uroscanner ?
    - arthro-IRM ? IRM prostatique (PI-RADS) ? IRM cardiaque ? IRM/écho/radio **pédiatriques** (âge minimum ?) ?
    - échographie obstétricale (trimestres ?) ; écho de datation ; monitorage d'ovulation (listé sur Doctolib de Dr Y. Gueniche) ?
    - **hystérosalpingographie** (site actuel + Doctolib : oui) — page dédiée `/examens/hysterosalpingographie` proposée, OK ?
    - **PRP et viscosupplémentation** (description Doctolib : oui) — à ajouter au sitemap (interventionnel), OK ?
    - élastographie/Fibroscan (tag Doctolib) ? EOS (tag Doctolib « examen radiographique EOS » — réel ou tag générique ?) ? cone beam / panoramique dentaire ? TOGD ?
19. **Examens ouverts à la prise de RDV en ligne** vs téléphone uniquement (export des motifs depuis Doctolib Pro, par site) — nécessaire pour `/prendre-rendez-vous` : `[[À COMPLÉTER]]`
20. **Horaires réels à afficher** : le site actuel dit **Lun–Ven 8h–22h, Sam 8h–18h30, Dim 8h30–18h30** ; votre fiche Doctolib dit **Lun–Ven 8h–19h, Sam–Dim 8h–18h**. Laquelle est vraie (par modalité si besoin : l'IRM tourne-t-elle jusqu'à 22h ? quelles modalités le dimanche ?) ? La réponse sera propagée partout (site, JSON-LD, GBP, Doctolib). `[[À COMPLÉTER]]`
21. **Délais moyens de RDV** communicables par modalité/site (« souvent sous X jours ») et **délais de résultats** (CR remis sur place ? en ligne sous X h ? images sous X h ?) : `[[À COMPLÉTER]]`

## P0.4 — Juridique / mentions légales

22. Registre (INSEE/RNE/BODACC, à confirmer) : **SELAS ALPHA IMAGERIE**, SIREN **928 012 830**, SIRET siège **928 012 830 00016**, **RCS Pontoise**, immatriculée le **24/04/2024** (INSEE : création 23/05/2024, début d'activité 19/04/2024), NAF 86.22A, siège **2 Mail des Cerclades, 95000 Cergy**, Président Jérémy Gueniche, DG Yoram Gueniche. Exact ?
23. **Capital social** : ✅ **Répondu (28/08/2026) : 10 000 €** (« SELAS Alpha Imagerie, 10 000 euros de capital social »). Intégré aux mentions légales et à `docs/nap-master.md`.
    > Note conservée pour mémoire : l'art. 6, III, 1°, c) LCEN impose la publication du capital social pour un éditeur personne morale inscrite au RCS.
24. **Directeur de la publication** : Dr Jérémy Gueniche (comme aujourd'hui) ? Contact affiché : contact@alphaimagerie.fr (l'actuel `Jgueniche@yahoo.fr` sera retiré). OK ?
25. **DPO / référent RGPD** : désigné (nom/contact) ou à désigner ? : `[[À COMPLÉTER]]`
26. **Ordre des médecins** : conseil départemental d'inscription et n° RPPS à citer pour chaque praticien mentionné : `[[À COMPLÉTER]]`
27. **TVA intracommunautaire** (calculée) : FR83 928 012 830 — exact ? Faut-il l'afficher ?
28. Mention d'un **médiateur de la consommation** et de l'**assurance RCP** (assureur, couverture géographique) : souhaité/nécessaire ? `[[À COMPLÉTER]]`

## P0.5 — Faits à valider avant réutilisation

> **✅ Validé en bloc (28/08/2026)** : secteur 2 + tiers payant, protocole de coopération écho, collaborations citables (CPTS Axe Majeur, EndoIDF, hôpital de Pontoise), MS-Santé/DMP/reconstructions 3D, repères cliniques. Compte tenu des horaires confirmés (q.20), la promesse du hero devient « **7j/7, jours fériés inclus** ». Point q.35 (accès brancards) : factuel validé — l'affichage précis sera arbitré sur maquette.

29. **Conventionnement** : la description Doctolib dit « **secteur 2**, dépassements d'honoraires possibles, **tiers payant pour tous les examens** » — exact pour tous les radiologues et les deux sites ? Formulation à reprendre sur le site ?
30. Échographies « réalisées par un radiologue **ou un manipulateur échographiste diplômé via un protocole de coopération validé par l'État** » (site actuel) : à conserver/mettre en avant ?
31. Collaborations à citer : médecins locaux, hôpital de Pontoise, maisons de santé, **CPTS Axe Majeur** (article d'annonce mai 2024), réseau **EndoIDF** (filière endométriose 78/95 Ouest — fiche existante avec ligne pro **01 86 30 30 03**) : OK pour les nommer sur `/professionnels-de-sante` ? La ligne 01 86 30 30 03 est-elle LA ligne prescripteurs à publier (ou réservée EndoIDF) ?
32. **Résultats** : CR au prescripteur par MS-Santé + interface dédiée + **DMP**, images en ligne avec reconstructions 3D côté médecins, portail patients Xplore : toujours exact (contenu de `/resultats` et `/professionnels-de-sante`) ?
33. Repères cliniques du site actuel à revalider lors de ma réécriture : IRM « 10–20 min » ; restrictions 48 h post-interventionnel ; hystérosalpingographie « J6–J12, β-HCG si doute » ; « rendez-vous obligatoire » (attribut GBP).
34. Le **7j/7 jusqu'à 22h** vaut-il pour les deux sites (formulation du hero « à Cergy et Goussainville — ouvert 7j/7, jusqu'à 22h » à ajuster selon réponses 5 et 20) ?
35. Accès Cergy : EndoIDF note « parvis piéton, impossible d'accès pour les brancards » — information à afficher (page accès / PMR) ou à omettre ?

---

## P1.1 — Accès et assets

36. **Logo vectoriel** (SVG/AI) + code hex du bleu + éventuelle charte : à fournir (aujourd'hui : PNG Wix uniquement).
37. **Photos réelles** des centres/équipe : disponibles ? séance photo possible avant la Phase 3 ? (Aucune photo stock ne sera utilisée.)
38. **Accès à partager** : Search Console, GA4/GTM/Google Ads (existent-ils déjà ?), GBP Cergy (et Goussainville), registrar/DNS d'alphaimagerie.fr (où ?), Doctolib Pro (bouton officiel + pid + export motifs), abonnement Wix (assets + maintien pendant bascule), compte Vercel cible.
39. Une **agence** (« Optimisation du site : Agence Fizzweb – Albi », mentions légales actuelles) intervient-elle encore ? (Éviter les doublons de travaux/accès.)

## P1.2 — Tarifs et prise en charge

40. Détail à publier : secteur 2 confirmé (cf. q.29) — dépassements typiques par famille d'examen ? OPTAM ? carte Vitale/AMC ? Ma recommandation : page « Tarifs et remboursement » avec base conventionnelle par examen + fourchette de dépassement + mention tiers payant. OK ? `[[À COMPLÉTER]]`

## P1.3 — Prescripteurs et urgences

41. **Ligne dédiée prescripteurs/urgences** à publier (cf. q.31 — 01 86 30 30 03 ?) + horaires + qui répond : `[[À COMPLÉTER]]`
42. Créneaux d'urgence : que peut-on annoncer (délai type pour demande urgente motivée) ? `[[À COMPLÉTER]]`
43. **Protocoles de préparation / fiches de prescription PDF** existants à reprendre, ou à créer ensemble ?

## P1.4 — Arbitrages techniques (recommandation incluse — un « OK » suffit)

44. **CMP** : recommandation **tarteaucitron.js auto-hébergé** (gratuit, CNIL, zéro dépendance tierce) ; Axeptio si préférence UX payante. Choix ?
45. **Mesure exemptée de consentement** : recommandation **Plausible EU** (SaaS ~9 €/mois, simple) ; alternative Matomo auto-hébergé (gratuit, à maintenir). Choix ?
46. **Envoi e-mail formulaire** : recommandation **Brevo** (français, SMTP UE) plutôt que Resend (US). Choix ?
47. **Stockage des soumissions** : recommandation **aucune base au lancement** (e-mail TLS seul) ; Supabase UE + purge 90 j si backoffice souhaité. Choix ?
48. **Attribution des appels Ads** : un 3CX avec SDA disponibles existe-t-il (numéros par campagne), ou extension d'appel Google au départ ?
49. **SMS de rappel Doctolib** actifs ? (réassurance à mentionner sur `/prendre-rendez-vous`).

## P2 — Divers

50. **Recrutement** : postes ouverts (radiologue associé/remplaçant, MERM, secrétaire — un post LinkedIn évoquait un recrutement de secrétaires) + contrats, pour `/recrutement` + JobPosting : `[[À COMPLÉTER]]`
51. **Actualités** de lancement (2–3 sujets : scanner en service, 2e IRM, ouverture Goussainville, dépistage organisé/Octobre Rose ?) ou lancement sans rubrique ?
52. **Réseaux** : il existe **deux pages Facebook** (« Alpha Imagerie » id 61564987941779 — celle du footer — et « Centre de radiologie Alpha Imagerie » id 61564644580474). Laquelle est officielle (fusion/suppression de l'autre ?) ; liens à afficher : Instagram https://www.instagram.com/alpha.imagerie/ · LinkedIn https://www.linkedin.com/company/alpha-imagerie/ (l'URL admin actuelle sera remplacée) · Facebook `[[À TRANCHER]]`.
53. **Villes desservies** (SEO local) à valider : Cergy, Pontoise, Osny, Vauréal, Éragny, Saint-Ouen-l'Aumône, Jouy-le-Moutier, Menucourt, Courdimanche / Goussainville, Louvres, Fosses, Roissy-en-France, Gonesse, Le Thillay, Marly-la-Ville. Ajouts/retraits ?
54. **NAP officiel** : nom public par site — recommandation : fiche GBP « Alpha Imagerie Cergy Préfecture » / « Alpha Imagerie Goussainville », marque site « Alpha Imagerie » (la fiche Doctolib affiche un nom long « Alpha Imagerie : IRM, Radiologie, … » — à harmoniser à terme). OK ?
55. **Langues parlées** à l'accueil (GBP + pages centres) : `[[À COMPLÉTER]]`
56. **PMR** : GBP Cergy indique entrée/parking/WC accessibles — précisions à afficher (ascenseur, table adaptée…) + équivalent Goussainville : `[[À COMPLÉTER]]`
57. L'Instagram se présente comme « **centre de référence imagerie de la femme** » : cette formulation relève du superlatif à éviter sur le site (R.4127-19-1). Je propose « pôle dédié à l'imagerie de la femme » — OK ?
