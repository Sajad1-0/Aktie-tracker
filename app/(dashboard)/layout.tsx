import Navbar from '@/components/Navbar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-dvh grid-cols-1 bg-background md:grid-cols-[15rem_1fr]">
      <Navbar />
      <main className="flex min-w-0 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-5 pb-8">{children}</div>
      </main>
    </div>
  );
}
