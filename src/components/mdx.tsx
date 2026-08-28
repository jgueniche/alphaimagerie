import { MDXRemote } from "next-mdx-remote/rsc";
import { Confirmer, withConfirmerTags } from "@/components/confirmer";
import { Encart } from "@/components/encadre";

const components = { Confirmer, Encart };

/** Rendu RSC du corps MDX (source /content), avec badges « À CONFIRMER » visibles. */
export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose prose-slate mt-8 prose-headings:font-display prose-headings:text-brand-900 prose-a:text-action prose-strong:text-ink prose-li:marker:text-action">
      <MDXRemote source={withConfirmerTags(source)} components={components} />
    </div>
  );
}
