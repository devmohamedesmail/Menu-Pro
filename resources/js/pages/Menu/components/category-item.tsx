import React from 'react'

export default function CategoryItem({ onClick, title, image }: any) {
    return (
        <div

            className="flex-[0_0_50%] sm:flex-[0_0_33.333%] md:flex-[0_0_25%] lg:flex-[0_0_20%] xl:flex-[0_0_16.666%] p-2 "
        >
            <button
                onClick={onClick}
                className="w-full rounded-2xl bg-white border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-40 object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-center text-gray-800">
                        {title}
                    </h3>
                </div>
            </button>
        </div>
    )
}
