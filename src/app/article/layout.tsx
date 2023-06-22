import React from 'react'
import Frame, {FrameLayout} from '@/components/frame'

export default function ArticleLayout({ children }: { children: React.ReactNode}) {
    return (
        <Frame layout={FrameLayout.LEFT}>{ children }</Frame>
    )
}