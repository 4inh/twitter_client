// const ImageList = ({ images }: { images: string[] }) => {
//     const maxVisible = 4;
//     const visibleImages = images.slice(0, maxVisible);
//     const extraCount = images.length - maxVisible;

//     return (
//         <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
//             {visibleImages.length === 1 && (
//                 <img
//                     src={images[0]}
//                     className="absolute inset-0 w-full h-full object-cover"
//                     alt=""
//                 />
//             )}

//             {visibleImages.length === 2 && (
//                 <>
//                     <img
//                         src={images[0]}
//                         className="absolute top-0 left-0 w-1/2 h-full object-cover"
//                         alt=""
//                     />
//                     <img
//                         src={images[1]}
//                         className="absolute top-0 right-0 w-1/2 h-full object-cover"
//                         alt=""
//                     />
//                 </>
//             )}

//             {visibleImages.length === 3 && (
//                 <>
//                     <img
//                         src={images[0]}
//                         className="absolute top-0 left-0 w-1/2 h-full object-cover"
//                         alt=""
//                     />
//                     <img
//                         src={images[1]}
//                         className="absolute top-0 right-0 w-1/2 h-1/2 object-cover"
//                         alt=""
//                     />
//                     <img
//                         src={images[2]}
//                         className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover"
//                         alt=""
//                     />
//                 </>
//             )}

//             {visibleImages.length >= 4 && (
//                 <>
//                     <img
//                         src={images[0]}
//                         className="absolute top-0 left-0 w-1/2 h-full object-cover"
//                         alt=""
//                     />
//                     <img
//                         src={images[1]}
//                         className="absolute top-0 right-0 w-1/2 h-1/2 object-cover"
//                         alt=""
//                     />
//                     <img
//                         src={images[2]}
//                         className="absolute bottom-0 left-1/2 w-1/4 h-1/2 object-cover"
//                         alt=""
//                     />
//                     <div className="absolute bottom-0 right-0 w-1/4 h-1/2">
//                         <img
//                             src={images[3]}
//                             className="w-full h-full object-cover"
//                             alt=""
//                         />
//                         {extraCount > 0 && (
//                             <div className="absolute inset-0 bg-[rgba(0,0,0,.6)] bg-opacity-60 text-white text-xl font-bold flex items-center justify-center">
//                                 +{extraCount}
//                             </div>
//                         )}
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ImageList;

import { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";

const ImageList = ({ images }: { images: string[] }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
        null
    );
    const maxVisible = 4;
    const visibleImages = images.slice(0, maxVisible);
    const extraCount = images.length - maxVisible;

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeModal = () => {
        setSelectedImageIndex(null);
    };

    const navigateImage = (direction: "prev" | "next") => {
        if (selectedImageIndex === null) return;

        if (direction === "prev") {
            setSelectedImageIndex((prev) =>
                prev === 0 ? images.length - 1 : prev - 1
            );
        } else {
            setSelectedImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }
    };

    return (
        <>
            <div className="relative w-full aspect-[4/3] rounded overflow-hidden">
                {visibleImages.length === 1 && (
                    <img
                        src={images[0]}
                        className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                        alt=""
                        onClick={() => openModal(0)}
                    />
                )}

                {visibleImages.length === 2 && (
                    <>
                        <img
                            src={images[0]}
                            className="absolute top-0 left-0 w-1/2 h-full object-cover cursor-pointer"
                            alt=""
                            onClick={() => openModal(0)}
                        />
                        <img
                            src={images[1]}
                            className="absolute top-0 right-0 w-1/2 h-full object-cover cursor-pointer"
                            alt=""
                            onClick={() => openModal(1)}
                        />
                    </>
                )}

                {visibleImages.length === 3 && (
                    <>
                        <img
                            src={images[0]}
                            className="absolute top-0 left-0 w-1/2 h-full object-cover cursor-pointer"
                            alt=""
                            onClick={() => openModal(0)}
                        />
                        <img
                            src={images[1]}
                            className="absolute top-0 right-0 w-1/2 h-1/2 object-cover cursor-pointer"
                            alt=""
                            onClick={() => openModal(1)}
                        />
                        <img
                            src={images[2]}
                            className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover cursor-pointer"
                            alt=""
                            onClick={() => openModal(2)}
                        />
                    </>
                )}

                {visibleImages.length >= 4 && (
                    <>
                        <img
                            src={images[0]}
                            className="absolute top-0 left-0 w-1/2 h-full object-cover cursor-pointer"
                            alt=""
                            onClick={() => openModal(0)}
                        />
                        <img
                            src={images[1]}
                            className="absolute top-0 right-0 w-1/2 h-1/2 object-cover cursor-pointer"
                            alt=""
                            onClick={() => openModal(1)}
                        />
                        <img
                            src={images[2]}
                            className="absolute bottom-0 left-1/2 w-1/4 h-1/2 object-cover cursor-pointer"
                            alt=""
                            onClick={() => openModal(2)}
                        />
                        <div
                            className="absolute bottom-0 right-0 w-1/4 h-1/2 cursor-pointer"
                            onClick={() => openModal(3)}
                        >
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

            {/* Full Screen Modal */}
            {selectedImageIndex !== null && (
                <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,.8)] bg-opacity-90 flex items-center justify-center">
                    <div className="absolute top-4 right-4 z-50">
                        <button
                            onClick={closeModal}
                            className="text-white text-xl font-bold bg-gray-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-700 cursor-pointer"
                        >
                            <LuX className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-center justify-center w-full h-full relative">
                        <button
                            onClick={() => navigateImage("prev")}
                            className="absolute cursor-pointer left-4 text-white text-2xl bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700"
                        >
                            <LuChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="max-w-4xl max-h-full p-4">
                            <img
                                src={images[selectedImageIndex]}
                                className="max-w-full max-h-[90vh] object-contain"
                                alt=""
                            />
                            <div className="text-white text-center mt-2">
                                {selectedImageIndex + 1} / {images.length}
                            </div>
                        </div>

                        <button
                            onClick={() => navigateImage("next")}
                            className="absolute cursor-pointer right-4 text-white text-2xl bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-700"
                        >
                            <LuChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageList;
