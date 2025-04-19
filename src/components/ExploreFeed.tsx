import { useEffect, useState } from "react";
import ExploreResults from "./ExploreResults";
import SearchBar from "./SearchBar.tsx";
import { useSearchParams } from "react-router";

const ExploreFeed = () => {
    const [searchParams] = useSearchParams();

    const query = searchParams.get("query") ?? "";
    const [selectedQuery, setSelectedQuery] = useState<string>(query);

    useEffect(() => {
        if (!query) return;

        console.log({ query });
        setSelectedQuery(query);
    }, [query]);
    return (
        <div className="w-2/3  bg-white">
            <div className="max-w-2xl mx-auto">
                <SearchBar />
                {selectedQuery && <ExploreResults query={selectedQuery} />}
            </div>
        </div>
    );
};

export default ExploreFeed;
