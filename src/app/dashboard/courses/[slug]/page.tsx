import { notFound } from "next/navigation";

import { CourseViewer } from "@/components/dashboard/courses/course-viewer";
import { courseModules, getModule } from "@/lib/learning-data";

export function generateStaticParams() {
  return courseModules.map((module) => ({ slug: module.slug }));
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = getModule(slug);

  if (!lesson) {
    notFound();
  }

  return <CourseViewer slug={slug} />;
}
