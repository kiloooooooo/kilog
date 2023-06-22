import Link from "next/link";

export default function Navigation() {
    return (
        <div className={'flex flex-col items-start'}>
            <span className={'font-bold uppercase mb-4 on-background-text'}>KiLog</span>
            <Link href={'/'} className={'body-l hover:underline'}>ホーム</Link>
            <span className={'body-m mt-8 text-gray-400'}>カテゴリ</span>
            <Link href={'/art'} className={'body-l hover:underline'}>イラスト</Link>
            <Link href={'/tech'} className={'body-l hover:underline'}>技術</Link>
            <span className={'body-m mt-8 text-gray-400'}>その他</span>
            <Link href={'/about'} className={'body-l hover:underline'}>このページについて</Link>
        </div>
    )
}
