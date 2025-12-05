import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { categories, prompts } from "@/lib/prompts";
import { ArrowLeft, ArrowRight, Copy } from "lucide-react";
import { Link, useRoute } from "wouter";

export default function Category() {
  const [match, params] = useRoute("/category/:id");
  const categoryId = match ? params.id : null;
  const category = categories.find((c) => c.id === categoryId);
  const categoryPrompts = prompts.filter((p) => p.category === categoryId);

  if (!category) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Category not found</h2>
          <Link href="/">
            <Button variant="link" className="mt-4">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{category.label}</h1>
            <p className="text-muted-foreground mt-1">{category.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {categoryPrompts.map((prompt) => (
            <Link key={prompt.id} href={`/prompt/${prompt.id}`}>
              <Card className="group hover:shadow-md transition-all cursor-pointer border-transparent hover:border-primary/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {prompt.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {prompt.description}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {prompt.inputs.length} inputs
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary font-medium transition-colors">
                    View Template <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
