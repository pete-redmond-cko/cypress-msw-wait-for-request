import { useEffect, useState } from "react";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const PostsContainer = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            try {
                const response = await fetch("posts");
                const data = await response.json();
                setPosts(data.posts);
                setLoading(false);
            } catch {
                setError(true);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <p>Loading</p>;
    }

    if (error) {
        return <p>Something went wrong</p>;
    }

    if (posts) {
        return (
            <>
                {posts.map((post) => {
                    return <p key={post.id}>{post.title}</p>;
                })}
            </>
        );
    }

    return <p>Something went wrong</p>;
};
