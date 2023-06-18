import Link from "next/link";

export default function Navigation() {
    return (
        <div className={'flex flex-col items-start'}>
            <span className={'font-bold uppercase mb-4 on-background-text'}>KiLog</span>
            <Link href={'/'} className={'body-l underline'}>ホーム</Link>
            <Link href={'/art'} className={'body-l underline'}>イラスト</Link>
            <Link href={'/tech'} className={'body-l underline'}>技術</Link>
        </div>
    )
}
