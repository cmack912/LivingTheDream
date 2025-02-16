import { useEffect, useState } from "react";

export const useGlobalConfig = () => {
    const [globalConfig, setGlobalConfig] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGlobalConfig = async () => {
            try {
                const response = await fetch("/api/sanity/global-config");
                if (!response.ok) throw new Error("Failed to fetch global config");

                const result = await response.json();
                setGlobalConfig(result);
            } catch (err) {
                console.error("Error loading global configuration:", err);
                setError("Failed to load configuration.");
            } finally {
                setLoading(false);
            }
        };

        fetchGlobalConfig();
    }, []);

    return { globalConfig, loading, error };
};
