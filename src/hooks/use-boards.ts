import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

export type Board = {
    name: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    id: number;
};

const useBoards = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const token = await getToken();
                const response = await fetch('http://127.0.0.1:8080/saved-folder', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch boards');
                }
                const data = await response.json();
                setBoards(data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchBoards();
    }, [getToken]);

    return { boards, loading, error };
};

export default useBoards;
