'use client';

import "./globals.css";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter'
import {createTheme, ThemeProvider} from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'light',
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <body>
          {children}
        </body>
      </ThemeProvider>

    </AppRouterCacheProvider>
    </html>
  );
}
