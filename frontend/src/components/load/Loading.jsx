import React from 'react'

const Loading = () => {
    return (
        <div className="w-full animate-pulse">
            <div className="relative w-full bg-slate-200 rounded-xl overflow-hidden">
                <div className="pt-[56.25%]"></div>
            </div>

            <div className="flex gap-3 mt-3">
                <div className="h-9 w-9 bg-slate-200 rounded-full flex-shrink-0" />

                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-200 rounded w-1/2" />
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                </div>
            </div>
        </div>
    )
}

export default Loading