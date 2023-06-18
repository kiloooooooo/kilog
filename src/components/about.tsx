import Link from "next/link";

export default function About() {
    return (
        <div className={'flex flex-col items-start'}>
            <span className={'font-bold uppercase mb-4 on-background-text'}>About</span>
            <div className={'mt-4 mb-8 w-full'}>
                <div className={'bg-blue-500 rounded-full w-16 h-16'}/>
            </div>
            <span className={'body-l max-w-36'}>ほげほげほげほげほげほげほげほげ</span>
        </div>
    )
}