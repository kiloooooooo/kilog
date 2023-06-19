'use client'

import { useEffect, useState } from 'react'

export function NotFound(props: {}) {
    const faces = [
        '(´・ω・｀)',
        '(´；ω；｀)',
        '_(┐「ε:)_',
        '(´ﾟдﾟ｀)'
    ]
    // const faceIdx = Math.floor(Math.random() * 4)
    const [faceIdx, setFaceIdx] = useState(null as number | null)
    useEffect(() => {
        setFaceIdx(Math.floor(Math.random() * 4))
    }, [])

    if (faceIdx == null) {
        return (<></>)
    }

    return (
        <div className={'h-64 flex flex-col justify-center items-center'}>
            <span className={'header-xl mb-8'}>{ faces[faceIdx] }</span>
            <span className={'body-l'}>この記事はありません</span>
        </div>
    )
}
