const ImageList = ({ images }: { images: string[] }) => {
    const maxVisible = 4;
    const visibleImages = images.slice(0, maxVisible);
    const extraCount = images.length - maxVisible;

    return (
        <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
            {visibleImages.length === 1 && (
                <img
                    src={images[0]}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt=""
                />
            )}

            {visibleImages.length === 2 && (
                <>
                    <img
                        src={images[0]}
                        className="absolute top-0 left-0 w-1/2 h-full object-cover"
                        alt=""
                    />
                    <img
                        src={images[1]}
                        className="absolute top-0 right-0 w-1/2 h-full object-cover"
                        alt=""
                    />
                </>
            )}

            {visibleImages.length === 3 && (
                <>
                    <img
                        src={images[0]}
                        className="absolute top-0 left-0 w-1/2 h-full object-cover"
                        alt=""
                    />
                    <img
                        src={images[1]}
                        className="absolute top-0 right-0 w-1/2 h-1/2 object-cover"
                        alt=""
                    />
                    <img
                        src={images[2]}
                        className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover"
                        alt=""
                    />
                </>
            )}

            {visibleImages.length >= 4 && (
                <>
                    <img
                        src={images[0]}
                        className="absolute top-0 left-0 w-1/2 h-full object-cover"
                        alt=""
                    />
                    <img
                        src={images[1]}
                        className="absolute top-0 right-0 w-1/2 h-1/2 object-cover"
                        alt=""
                    />
                    <img
                        src={images[2]}
                        className="absolute bottom-0 left-1/2 w-1/4 h-1/2 object-cover"
                        alt=""
                    />
                    <div className="absolute bottom-0 right-0 w-1/4 h-1/2">
                        <img
                            src={images[3]}
                            className="w-full h-full object-cover"
                            alt=""
                        />
                        {extraCount > 0 && (
                            <div className="absolute inset-0 bg-[rgba(0,0,0,.6)] bg-opacity-60 text-white text-xl font-bold flex items-center justify-center">
                                +{extraCount}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageList;
