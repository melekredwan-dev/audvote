import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl">audvote</h1>
      <p className="mt-4 text-lg text-gray-600">A music review and rating platform</p>
      <Button className="mt-4 cursor-pointer">Get Started</Button>
    </main>
  );
}
