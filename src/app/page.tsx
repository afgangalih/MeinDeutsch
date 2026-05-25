import { ArrowRight, BookOpen, Headphones, Mic, PencilLine } from "lucide-react";

import { BrandLogo } from "@/components/shared/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skills = [
  {
    title: "Hören",
    description: "Practice listening with simple German audio.",
    icon: Headphones,
    progress: 40,
  },
  {
    title: "Lesen",
    description: "Read short texts based on your level.",
    icon: BookOpen,
    progress: 55,
  },
  {
    title: "Schreiben",
    description: "Write simple sentences and short messages.",
    icon: PencilLine,
    progress: 25,
  },
  {
    title: "Sprechen",
    description: "Practice speaking with guided prompts.",
    icon: Mic,
    progress: 20,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-6 text-foreground">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border bg-card px-5 py-4">
        <BrandLogo />
        <Button variant="outline">Preview UI</Button>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-120px)] max-w-6xl items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Badge className="mb-5 bg-secondary text-secondary-foreground hover:bg-secondary">
            CEFR-based German learning
          </Badge>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
            Learn German step by step with{" "}
            <span className="text-primary">MeinDeutsch</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            A clean and modern learning platform for practicing Hören, Lesen,
            Schreiben, and Sprechen through structured levels.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="gap-2">
              Start Learning
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline">Explore Levels</Button>
          </div>
        </div>

        <Card className="rounded-3xl border bg-card shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <CardTitle className="mt-1 text-2xl">A1 Beginner</CardTitle>
              </div>
              <Badge variant="outline">Active</Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium">Overall Progress</span>
                <span className="text-muted-foreground">35%</span>
              </div>
              <Progress value={35} />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {skills.map((skill) => {
                const Icon = skill.icon;

                return (
                  <div
                    key={skill.title}
                    className="rounded-2xl border bg-background p-4"
                  >
                    <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-secondary/30 text-foreground">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold">{skill.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {skill.description}
                    </p>
                    <div className="mt-3">
                      <Progress value={skill.progress} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
