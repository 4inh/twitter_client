import { useCallback, useContext, useEffect, useRef, useState } from "react";
import AddPostForm from "./forms/AddPostForm";

import PostItem from "./post/PostItem";
import { useNavigate } from "react-router";
import { PostContext } from "@/context/post/PostContext";
import { AuthContext } from "@/context/auth/AuthContext";
import { getPosts } from "@/api/post";
import { PaginatedResponse } from "@/types/post";

const MainContent = () => {
    const { posts, setPosts } = useContext(PostContext);
    const { currentUser } = useContext(AuthContext);
    const navigation = useNavigate();

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Function to load more posts
    const loadMorePosts = useCallback(async () => {
        // Double-check that we should load more posts
        if (loading || !hasMore) {
            console.log(
                `Prevented loading more posts: loading=${loading}, hasMore=${hasMore}`
            );
            return;
        }

        try {
            setLoading(true);
            console.log(`Loading more posts for page ${page + 1}`);

            const nextPage = page + 1;
            const response = await getPosts(nextPage);

            if (
                response.data &&
                response.data.posts &&
                response.data.posts.length > 0
            ) {
                setPosts((prevPosts) => [
                    ...prevPosts,
                    ...(response.data as PaginatedResponse).posts,
                ]);
                setPage(nextPage);

                const nextHasMore = response.data.pagination.hasNextPage;
                console.log(
                    `Setting hasMore=${nextHasMore} from pagination data`
                );
                setHasMore(nextHasMore);

                // If no more pages, disconnect the observer
                if (!nextHasMore && observerRef.current && loadingRef.current) {
                    console.log("No more pages, disconnecting observer");
                    observerRef.current.unobserve(loadingRef.current);
                    observerRef.current = null;
                }
            } else {
                console.log("No posts returned, setting hasMore=false");
                setHasMore(false);

                // Disconnect observer when there are no more posts
                if (observerRef.current && loadingRef.current) {
                    observerRef.current.unobserve(loadingRef.current);
                    observerRef.current = null;
                }
            }
        } catch (error) {
            console.error("Error loading more posts:", error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore, setPosts]);

    // Setup Intersection Observer for infinite scrolling
    useEffect(() => {
        // If we already know there are no more posts, don't create an observer
        if (!hasMore) {
            console.log("Skipping observer creation since hasMore=false");
            return;
        }

        // Clean up any existing observer
        if (observerRef.current && loadingRef.current) {
            observerRef.current.unobserve(loadingRef.current);
            observerRef.current = null;
            console.log("Cleaned up existing observer");
        }

        const options = {
            root: null,
            rootMargin: "100px",
            threshold: 0.1,
        };

        // Create new observer
        observerRef.current = new IntersectionObserver((entries) => {
            const [entry] = entries;
            console.log(
                `Element intersecting=${entry.isIntersecting}, hasMore=${hasMore}, loading=${loading}`
            );

            if (entry.isIntersecting && hasMore && !loading) {
                console.log("All conditions met, triggering loadMorePosts");
                loadMorePosts();
            }
        }, options);

        // Start observing
        if (loadingRef.current) {
            observerRef.current.observe(loadingRef.current);
            console.log("Started observing loading element");
        }

        return () => {
            if (observerRef.current && loadingRef.current) {
                observerRef.current.unobserve(loadingRef.current);
                console.log("Cleaned up observer on unmount");
            }
        };
    }, [hasMore, loading, loadMorePosts]);
    return (
        <div className="flex-1 bg-white pb-20">
            {/* Form đăng bài */}
            <div className="">
                {currentUser && <AddPostForm currentUser={currentUser} />}
            </div>

            {/* Bài đăng */}
            {posts.map((post, index) => (
                <div
                    key={`${post._id}-${index}`}
                    className={`relative w-full block border-y p-5 hover:bg-gray-100 hover:cursor-pointer
                        ${index === 0 ? "border-t" : "border-t-0"}`}
                    onClick={(e) => {
                        if (
                            (e.target as HTMLElement).closest('[role="button"]')
                        ) {
                            e.preventDefault();
                            return;
                        }
                        navigation(`/posts/${post._id}`);
                    }}
                >
                    <PostItem post={post} user={currentUser} />
                </div>
            ))}
            <div
                ref={loadingRef}
                className="p-4 text-center"
                style={{ visibility: hasMore ? "visible" : "hidden" }}
            >
                {loading ? (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                ) : (
                    <div className="h-10 opacity-0">Loading trigger</div>
                )}
            </div>
            {/* Loading indicator that also serves as intersection trigger */}
            {!hasMore && posts.length > 0 && (
                <div className="text-gray-500 p-4 text-center">
                    No more posts to load
                </div>
            )}
        </div>
    );
};

export default MainContent;
// const MainContent = () => {
//     const { posts } = useContext(PostContext);
//     const { currentUser } = useContext(AuthContext);
//     const navigation = useNavigate();

//     return (
//         <div className="flex-1 bg-white pb-20">
//             {/* <h2 className="text-xl font-bold mb-4 px-5">Dành cho bạn</h2> */}

//             {/* Form đăng bài */}
//             <div className="">
//                 {currentUser && <AddPostForm currentUser={currentUser} />}
//             </div>

//             {/* Bài đăng */}
//             {posts.map((post, index) => (
//                 <div
//                     key={`${post._id} ${index}`}
//                     className={`relative w-full block border-y p-5 hover:bg-gray-100 hover:cursor-pointer
//                         ${index === 0 ? "border-t" : "border-t-0"}`}
//                     onClick={(e) => {
//                         if (
//                             (e.target as HTMLElement).closest('[role="button"]')
//                         ) {
//                             e.preventDefault();
//                             return;
//                         }
//                         navigation(`/posts/${post._id}`);
//                     }}
//                 >
//                     <PostItem post={post} user={currentUser} />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MainContent;

// Type for user objects in the suggestion list
