import Footer from "./organism/Footer";
import Navbar from "./molecules/navbar";
import Head from "next/head";
import { useGlobalConfig } from "@/hooks/sanity/use-global-config";
import { useRouter } from "next/router";
interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { globalConfig, loading } = useGlobalConfig();
    const router = useRouter();

    if (loading) {
        return null;
    }

    const footerConfig = globalConfig?.footer || {};
    const navbarConfig = globalConfig?.navbar || null;
    const isStudioPage = router.pathname.startsWith("/studio");


    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph for Social Media (Facebook, LinkedIn, Discord, etc.) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Revamp Marketing - Transform Your Business with Data-Driven Growth" />
                <meta property="og:description" content="Revamp Marketing helps businesses scale with expert SEO, high-converting web design, and strategic social media marketing. Maximize your online presence and drive measurable results." />
                <meta property="og:url" content="https://www.revampmarketing.net" />
                <meta property="og:image" content="/logo-small.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter Card (for Twitter/X previews) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Revamp Marketing - Transform Your Business with Data-Driven Growth" />
                <meta name="twitter:description" content="Revamp Marketing helps businesses scale with expert SEO, high-converting web design, and strategic social media marketing. Maximize your online presence and drive measurable results." />
                <meta name="twitter:image" content="/logo-small.png" />
                <meta name="twitter:url" content="https://www.revampmarketing.net" />

                {/* Force Browsers to Use PNG Favicon */}
                <link rel="icon" type="image/png" href="/logo-small.png" sizes="512x512" />
                <link rel="apple-touch-icon" href="/logo-small.png" />

                {/* Theme Color */}
                <meta name="theme-color" content="#ffffff" />
                <style>{`html { scroll-behavior: smooth; }`}</style>
            </Head>

            {/* Navbar only renders when loading is false */}
            {navbarConfig && !isStudioPage && <Navbar config={navbarConfig} />}

            <main className="min-h-screen">{children}</main>

            {/* Footer */}
            {footerConfig && !isStudioPage && <Footer footer={footerConfig} />}
        </>
    );
};

export default Layout;
