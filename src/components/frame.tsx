import * as React from 'react'
import AppBar from '@/components/appbar'
import Navigation from '@/components/navigation'
import About from '@/components/about'
// import RecentItems from "@/components/recent_items"

export enum FrameLayout {
    CENTER,
    LEFT
}

export default function Frame({ children, layout }: { children: React.ReactNode, layout: FrameLayout }) {
    return (
        <div>
            <div className={'tablet:hidden pt-16'}>
                <AppBar type={'mobile'}/>
                <div className={'m-4 flex flex-col'}>
                    { children }
                    <div className={'mb-16'}/>
                    <Navigation/>
                    <div className={'mb-16'}/>
                    <About/>
                    <div className={'mb-16'}/>
                    {/*<RecentItems/>*/}
                </div>
            </div>
            <div className={'desktop:hidden max-tablet:hidden'}>
                <AppBar type={'tablet'}/>
                <div className={'grid grid-cols-12 gap-8 p-10'}>
                    <div className={'col-span-4'}>
                        <Navigation/>
                        <div className={'mb-16'}/>
                        <About/>
                        <div className={'mb-16'}/>
                        {/*<RecentItems/>*/}
                    </div>
                    <div className={'col-span-8'}>
                        { children }
                    </div>
                </div>
            </div>
            <div className={'max-desktop:hidden grid grid-cols-1 place-items-center pl-10 pr-10'}>
                <AppBar type={'desktop'}/>
                <div className={'grid grid-cols-12 gap-8 w-full max-w-256 pt-10 pb-10'}>
                    {
                        layout === FrameLayout.CENTER
                            ? (
                                <>
                                    <div className={'col-span-3 static'}>
                                        <Navigation/>
                                        {/*<div className={'mb-16'}/>*/}
                                        {/*<About/>*/}
                                    </div>
                                    <div className={'col-span-6'}>
                                        { children }
                                    </div>
                                    <div className={'col-span-3'}>
                                        <div className={'mb-16'}>
                                            <About/>
                                        </div>
                                        {/*<RecentItems/>*/}
                                    </div>
                                </>
                            )
                            : (
                                <>
                                    <div className={'col-span-9'}>
                                        { children }
                                    </div>
                                    <div className={'col-span-3'}>
                                        <div className={'mb-16'}>
                                            <Navigation/>
                                        </div>
                                        <div className={'mb-16'}>
                                            <About/>
                                        </div>
                                        {/*<RecentItems/>*/}
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    )
}