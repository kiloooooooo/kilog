'use client'

import { useState, useEffect } from 'react'
import {PostProperties} from "@/app/lib/api"
import Image from "next/image"

export default function PostCard({ postProps }: { postProps: PostProperties }) {
    const [opacity, setOpacity] = useState(0)
    useEffect(() => {
        setOpacity(1)
    }, [])

    let slideFadeClassName = 'opacity-0 translate-y-4'
    if (opacity === 1.0) {
        slideFadeClassName = 'opacity-1 translate-y-0'
    }

    return (
        <div className={`h-64 rounded-2xl flex flex-col justify-between border border-gray-400 ${slideFadeClassName} transition-all surface-variant`}>
            <Image
                src={postProps.leadingImagePath}
                alt={'leading'}
                className={'w-full h-40 object-cover rounded-2xl surface-variant'}
                width={postProps.leadingImageWidth}
                height={postProps.leadingImageHeight}/>
            <div className={'p-4 flex flex-col'}>
                <span className={'header-xxs'}>{postProps.title}</span>
                <span className={'body-l'}>{postProps.datetime}</span>
            </div>
        </div>
    )
}
