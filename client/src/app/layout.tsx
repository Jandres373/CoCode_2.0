import type { Metadata } from 'next'
import { REGULAR } from '@/styles/fonts'
import '@/styles/globals.css'
import { ThemeProvider } from '@/providers/theme.provider'
import UserSession from '@/providers/session.provider'
import { getServerSession } from 'next-auth'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'CoCode 2.0',
  description: 'Colaborate and make real your ideas with CoCode.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  //constants

  //jsx
  return (
    <html lang="en">
      <body className={REGULAR.className}>
        <UserSession session={session}>
          <ThemeProvider
            themes={['pink', 'red', 'blue', 'light', 'dark']}
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="w-[99svw] h-[99svh]">
              <section className="">{children}</section>
              <Toaster />
            </main>
          </ThemeProvider>
        </UserSession>
      </body>
    </html>
  )
}
