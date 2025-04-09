const HomeFeed = () => {
    return (
        <div className="w-2/3 p-4 border-r border-gray-300">
            <input
                type="text"
                placeholder="Tìm kiếm"
                className="w-full px-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            {/* Post new */}
            <div className="mt-4">
                <div className="relative bg-gray-200 rounded-xl overflow-hidden">
                    <img
                        src="https://source.unsplash.com/800x400/?news"
                        alt="Featured"
                        className="w-full h-60 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
                        <h2 className="text-lg font-bold">From the Desk of Anthony Pompliano</h2>
                        <p className="text-sm">LIVE</p>
                    </div>
                </div>

                {/* Convert to hashtag*/}
                <div className="mt-6 space-y-4">
                    <div className="border-b pb-2">
                        <h3 className="font-bold">Disney's 'Snow White' Opens Softly Amid Mixed Reviews</h3>
                        <p className="text-sm text-gray-500">18 hours ago · Entertainment · 279K posts</p>
                    </div>
                    <div className="border-b pb-2">
                        <h3 className="font-bold">Mia Love, Historic Congresswoman, Dies at 49</h3>
                        <p className="text-sm text-gray-500">February 26 · News · 15K posts</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeFeed;