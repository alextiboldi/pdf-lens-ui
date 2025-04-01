import Link from "next/link";
import { ArrowRight, Database, FileText, Tag, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PDF Lens</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-background py-20">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Enhance your PDFs with{" "}
            <span className="text-primary">AI-powered</span> metadata
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            PDF Lens helps you easily attach, manage, and leverage metadata for
            your PDF documents using artificial intelligence and intuitive
            tagging tools.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="bg-muted py-20" id="features">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful PDF Metadata Management
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Discover how PDF Lens transforms your documents with intelligent
            metadata tagging capabilities.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-medium">AI-Powered Tagging</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Our AI automatically suggests relevant tags based on document
                content.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-medium">Custom Metadata</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Create custom metadata fields to organize documents your way.
              </p>
            </div>

            <div className="flex flex-col items-center rounded-lg bg-background p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-medium">
                Multiple Data Sources
              </h3>
              <p className="mt-2 text-center text-muted-foreground">
                Connect directly to Google Drive, Google Cloud Storage, AWS S3,
                and more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-background py-20">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>

          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 text-xl font-medium">Connect</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Connect to your data sources like Google Drive, Google Cloud
                Storage, or AWS S3.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 text-xl font-medium">Tag</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Attach metadata manually or let our AI suggest tags for your
                PDFs.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 text-xl font-medium">Leverage</h3>
              <p className="mt-2 text-center text-muted-foreground">
                Search, filter, and utilize your enhanced documents with rich
                metadata.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transform your documents with powerful metadata?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl">
            Join thousands of professionals who use PDF Lens to organize their
            documents.
          </p>
          <Link href="/dashboard" className="mt-8 inline-block">
            <Button size="lg" variant="secondary" className="gap-2">
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">PDF Lens</span>
            </div>
            <div className="flex gap-8">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PDF Lens. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
