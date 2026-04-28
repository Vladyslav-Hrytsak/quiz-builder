import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    title?: string;
}

export default function Layout({ children, title = 'Quiz Builder' }: Props) {
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                <nav className="border-b border-white/10 backdrop-blur-sm bg-white/5">
                    <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link href="/quizzes" className="text-white font-bold text-xl tracking-tight">
                            ✦ Quiz Builder
                        </Link>
                        <Link
                            href="/create"
                            className="bg-purple-500 hover:bg-purple-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25"
                        >
                            + New Quiz
                        </Link>
                    </div>
                </nav>
                <main className="max-w-4xl mx-auto px-6 py-10">{children}</main>
            </div>
        </>
    );
}