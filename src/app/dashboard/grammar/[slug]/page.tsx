import { GrammarViewer } from "@/components/dashboard/grammar/grammar-viewer";

type GrammarDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function GrammarDetailPage({ params }: GrammarDetailPageProps) {
  const { slug } = await params;
  return <GrammarViewer slug={slug} />;
}

