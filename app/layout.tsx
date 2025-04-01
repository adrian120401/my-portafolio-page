import '../global.css';
import { Inter } from '@next/font/google';
import LocalFont from '@next/font/local';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
    title: {
        default: 'Adrián de los Reyes | Software Developer',
        template: '%s | Adrián de los Reyes',
    },
    description:
        'Full Stack Developer from Uruguay specializing in backend development. Experienced in React, Node.js, and enterprise solutions. View my portfolio of real-world projects and technical expertise.',
    keywords: [
        'Software Developer',
        'Full Stack Developer',
        'Backend Developer',
        'Uruguay Developer',
        'React Developer',
        'Node.js Developer',
        'Trinidad Developer',
        'Flores Uruguay',
    ],
    authors: [{ name: 'Adrián de los Reyes' }],
    creator: 'Adrián de los Reyes',
    openGraph: {
        title: 'Adrián de los Reyes | Software Developer',
        description:
            'Full Stack Developer from Uruguay specializing in backend development. View my portfolio and projects.',
        url: 'https://adriandelosreyes.vercel.app/',
        siteName: 'Adrián de los Reyes Portfolio',
        images: [
            {
                url: '/og-me.jpg',
                width: 1200,
                height: 630,
                alt: 'Adrián de los Reyes - Software Developer',
            },
        ],
        locale: 'en-US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Adrián de los Reyes | Software Developer',
        description: 'Full Stack Developer from Uruguay specializing in backend development',
        images: ['/og-me.jpg'],
    },
    alternates: {
        canonical: 'https://adriandelosreyes.vercel.app',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const calSans = LocalFont({
    src: '../public/fonts/CalSans-SemiBold.ttf',
    variable: '--font-calsans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={[inter.variable, calSans.variable].join(' ')}>
            <head>
                <meta
                    name="google-site-verification"
                    content="QQfzSez_Ke5ABriqhqd-LrL2b_8liIiAJS9TU2GCqNc"
                />
                <Analytics />
            </head>
            <body
                className={`bg-black ${
                    process.env.NODE_ENV === 'development' ? 'debug-screens' : undefined
                }`}
            >
                {children}
            </body>
        </html>
    );
}
