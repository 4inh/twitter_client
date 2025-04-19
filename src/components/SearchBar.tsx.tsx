import { useState, useEffect } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { debounce } from "lodash";
import apiClient from "@/api/apiClient";
import { IUser } from "@/types/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { useNavigate } from "react-router";

type Suggestion = {
    users: IUser[];
    tags: string[];
};

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion>({
        tags: [],
        users: [],
    });
    const navigate = useNavigate();
    const hasSuggestions =
        suggestions.users.length > 0 || suggestions.tags.length > 0;

    const fetchSuggestions = debounce(async (search: string) => {
        if (!search) {
            setSuggestions({ tags: [], users: [] });
            return;
        }

        try {
            const res = await apiClient.get(
                `/explore/autocomplete?query=${search}`
            );

            if (res.data?.data) {
                setSuggestions(res.data.data);
            } else {
                setSuggestions({ tags: [], users: [] });
            }
        } catch (err) {
            console.error("Autocomplete error:", err);
            setSuggestions({ tags: [], users: [] });
        }
    }, 300);
    const handleSelection = (value: string) => {
        navigate(`/explore?query=${value}`);
        setQuery("");
        setSuggestions({
            tags: [],
            users: [],
        });
    };
    useEffect(() => {
        fetchSuggestions(query);
    }, [query]);

    return (
        <div className="p-5">
            <Popover open={hasSuggestions}>
                <PopoverTrigger asChild>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </PopoverTrigger>

                {hasSuggestions && (
                    <PopoverContent
                        className="w-full"
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        style={{ width: "var(--radix-popover-trigger-width)" }}
                    >
                        {suggestions.users.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-1">Users</h3>
                                <div className="space-y-1">
                                    {suggestions.users.map((user) => (
                                        <div
                                            key={user._id}
                                            onClick={() => {
                                                handleSelection(user.username);
                                            }}
                                            className="cursor-pointer px-2 py-1 hover:bg-muted rounded-md flex justify-start items-center gap-2"
                                        >
                                            <Avatar className="size-10">
                                                <AvatarImage
                                                    src={user.profilePicture}
                                                />
                                                <AvatarFallback>
                                                    {user.username.at(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <p>
                                                    {user.displayName ??
                                                        user.username}
                                                </p>
                                                <p className="text-gray-500">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {suggestions.tags.length > 0 && (
                            <div className="mt-2">
                                <h3 className="font-semibold mb-1">Tags</h3>
                                <div className="space-y-1">
                                    {suggestions.tags.map((tag) => (
                                        <div
                                            key={tag}
                                            onClick={() => {
                                                handleSelection(
                                                    tag.replace(/^#/, "")
                                                );
                                            }}
                                            className="cursor-pointer px-2 py-1 hover:bg-muted rounded-md text-sm"
                                        >
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
}
