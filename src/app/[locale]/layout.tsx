import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // <-- แก้ path ให้ถอยกลับไป 1 ชั้น เพราะไฟล์นี้ย้ายเข้ามาลึกขึ้น
import Navbar from "@/components/layout/Navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Khunnapat | Full-Stack Developer",
  description: "Portfolio of Khunnapat Thubphung",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // รองรับ Asynchronous params ตามมาตรฐาน Next.js ล่าสุด
}>) {
  // ดึงค่า locale จาก URL
  const { locale } = await params;

  // ป้องกันการเข้าถึงภาษาที่เราไม่ได้รองรับ (เช่น /fr จะโดนเด้งไปหน้า 404)
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // ดึงข้อมูลคำแปลจาก request.ts ที่เราตั้งไว้
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.className} bg-white text-neutral-900 antialiased`}>
        {/* ครอบ Provider เพื่อให้ Client Components อย่าง Navbar ดึงคำแปลไปใช้ได้ */}
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex min-h-screen flex-col items-center pt-16">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}