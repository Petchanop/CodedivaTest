import type { Metadata } from "next";
import { NextUIProvider } from '@nextui-org/react'
import SwensenNavbar from "@/components/navbar/navbar";
import { NextIntlClientProvider } from 'next-intl';
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props,
): Promise<Metadata> {
  const locale = (await params).locale
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }
  const messages = await getMessages({ locale: locale });
  return (
    <>
      <html lang={locale}>
        <body>
          <NextUIProvider>
            <NextIntlClientProvider messages={messages}>
              <SwensenNavbar lang={locale}>
                <main className="light text-foreground bg-background">
                  {children}
                </main>
              </SwensenNavbar>
            </NextIntlClientProvider>
          </NextUIProvider>
        </body>
      </html>
    </>
  );
}
