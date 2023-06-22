'use client'

import React, { useState, useEffect } from 'react'

export default function FadeSlide({ children }: { children: React.ReactNode }) {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setVisible(true)
    }, [])

    let fadeSlideClassName = 'opacity-0 translate-y-4'
    if (visible) {
        fadeSlideClassName = 'opacity-1 translate-y-0'
    }

    return (
        <div className={`transition-all ${fadeSlideClassName}`}>{ children }</div>
    )
}
