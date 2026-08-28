import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";
import { EncadreInformatif } from "@/components/encadre";
import { Faq, type FaqItem } from "@/components/faq";
import { CERGY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "Ordonnance, délais de rendez-vous, résultats, tarifs et remboursement, accès et parking : les réponses aux questions fréquentes sur Alpha Imagerie Cergy.",
  alternates: { canonical: "/faq" },
};

/** FAQ globale (§5 du brief) — un seul schema FAQPage pour toute la page. */
const QUESTIONS: FaqItem[] = [
  {
    question: "Faut-il une ordonnance pour passer un examen d'imagerie ?",
    reponse:
      "Oui. Tous nos examens — IRM, scanner, échographie, mammographie, radiographie, ostéodensitométrie, gestes interventionnels — sont réalisés sur prescription médicale. La mammographie du dépistage organisé fait exception : l'invitation du programme national tient lieu de prescription. Apportez l'ordonnance le jour du rendez-vous : elle conditionne aussi la prise en charge par l'Assurance Maladie.",
  },
  {
    question: "Quels sont les délais pour obtenir un rendez-vous ?",
    reponse:
      "Grâce au plateau technique (deux IRM notamment) et à l'ouverture 7j/7, la plupart des rendez-vous peuvent être programmés sous 48 heures. Les créneaux se réservent en ligne sur Doctolib ou par téléphone au 01 86 30 30 00.",
  },
  {
    question: "Peut-on passer un examen le week-end ou un jour férié ?",
    reponse:
      "Oui. Le centre de Cergy Préfecture est ouvert 7 jours sur 7, jours fériés inclus : en semaine de 8h à 19h (nocturne le lundi jusqu'à 22h), le week-end de 8h à 18h.",
  },
  {
    question: "Comment prendre rendez-vous en ligne ?",
    reponse:
      "Tous les examens sont réservables en ligne sur Doctolib : choisissez l'examen prescrit, votre créneau, et remplissez le questionnaire proposé. En cas de doute sur l'examen à réserver, appelez le secrétariat au 01 86 30 30 00, du lundi au vendredi de 8h à 18h30 et le samedi de 8h à 12h30.",
  },
  {
    question: "Quels documents apporter le jour de l'examen ?",
    reponse:
      "L'ordonnance, la carte Vitale, la carte de mutuelle, une pièce d'identité, vos examens antérieurs (images et comptes rendus) et la liste de vos traitements. Selon l'examen, un document supplémentaire peut être demandé (dosage de créatinine par exemple) : voyez la fiche de préparation correspondante.",
  },
  {
    question: "Quand et comment aurai-je mes résultats ?",
    reponse:
      "Vous repartez le plus souvent avec vos images et votre compte rendu. Pour la radiographie, le scanner et l'IRM, le compte rendu est disponible en ligne sous 12 heures au maximum sur notre portail patients. Votre médecin le reçoit par messagerie sécurisée de santé et via le DMP.",
  },
  {
    question: "Les examens sont-ils remboursés ? Pratiquez-vous le tiers payant ?",
    reponse:
      "Les examens prescrits sont pris en charge par l'Assurance Maladie. Nos radiologues exercent en secteur 2, avec des dépassements d'honoraires modérés et maîtrisés selon l'examen ; aucun dépassement n'est appliqué aux bénéficiaires de la C2S et de l'AME, ni aux examens réalisés dans le cadre d'une ALD. Le tiers payant est pratiqué. Le secrétariat vous renseigne avant l'examen.",
  },
  {
    question: "Où se trouve le centre et comment s'y rendre ?",
    reponse:
      "Au 2 Mail des Cerclades, à Cergy Préfecture, face au centre commercial Les 3 Fontaines : sortie directe du RER A Cergy Préfecture par l'escalator ; en voiture, A15 sortie 5 ou 9, parkings Les 3 Fontaines P1 (2 h gratuites) ou P2 (24h/24).",
  },
  {
    question: "Le centre est-il accessible aux personnes à mobilité réduite ?",
    reponse:
      "Oui. Le centre est accessible aux personnes à mobilité réduite et accueille les patients en brancard. Signalez tout besoin particulier à la prise de rendez-vous pour que l'équipe prépare votre accueil.",
  },
  {
    question: "À partir de quel âge les enfants sont-ils accueillis ?",
    reponse:
      "La radiographie et l'échographie sont réalisées dès les premiers mois de vie, avec des protocoles adaptés. L'IRM est réalisée à partir de 15 ans ; pour les enfants plus jeunes, votre médecin vous orientera vers une structure de radiologie pédiatrique.",
  },
  {
    question: "Je suis enceinte : puis-je passer un examen d'imagerie ?",
    reponse:
      "Signalez toute grossesse en cours ou possible à la prise de rendez-vous. L'échographie et l'IRM n'utilisent pas de rayons X ; pour la radiographie et le scanner, le radiologue évalue avec votre médecin si l'examen doit être réalisé, adapté ou différé.",
  },
  {
    question: "Que faire si je ne peux pas venir à mon rendez-vous ?",
    reponse:
      "Annulez ou déplacez votre rendez-vous dès que possible, en ligne depuis votre compte Doctolib ou par téléphone. Le créneau libéré profite à un autre patient — c'est aussi ce qui permet des délais courts pour tous.",
  },
  {
    question: "Proposez-vous les infiltrations et les biopsies ?",
    reponse:
      "Oui. Le centre réalise les infiltrations guidées par échographie, radiographie ou scanner, les biopsies mammaires, les cytoponctions (thyroïde, ganglions, glandes salivaires) et les ponctions-évacuations de collections, d'hématomes ou de kystes — sur prescription, avec des consignes de préparation spécifiques.",
  },
  {
    question: "Comment sont protégées mes données de santé ?",
    reponse:
      "Le site ne collecte ni n'héberge aucune donnée de santé. Vos comptes rendus et images sont diffusés par le portail sécurisé de diffusion des résultats, et transmis à votre médecin par messagerie sécurisée de santé et via le DMP, dans le respect du secret médical.",
  },
];

export default function FaqPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Questions fréquentes", href: "/faq" }]} />
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-4xl">Questions fréquentes</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-600">
          Rendez-vous, préparation, résultats, prise en charge, accès : l&rsquo;essentiel en une
          page. Les questions propres à chaque examen sont traitées sur{" "}
          <Link href="/examens" className="font-semibold text-action underline-offset-2 hover:underline">
            les pages examens
          </Link>
          .
        </p>

        <Faq items={QUESTIONS} title="Vos questions, nos réponses" />

        <p className="mt-8 max-w-prose text-sm text-ink-600">
          Vous ne trouvez pas votre réponse ? Appelez le secrétariat au {CERGY.phoneDisplay} ou
          utilisez le{" "}
          <Link href="/contact" className="font-semibold text-action underline-offset-2 hover:underline">
            formulaire de contact
          </Link>{" "}
          (sans y indiquer d&rsquo;information médicale).
        </p>

        <EncadreInformatif />
      </div>
    </>
  );
}
