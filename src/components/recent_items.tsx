import Link from "next/link";

export default function RecentItems() {
    return (
        <div className={'flex flex-col items-start'}>
            <span className={'font-bold uppercase mb-4 on-background-text'}>直近の更新</span>
            <Link href={'/'} className={'body-l underline'}>ほげ</Link>
            <Link href={'/'} className={'body-l underline'}>ほげ</Link>
            <Link href={'/'} className={'body-l underline'}>ほげ</Link>
            <Link href={'/'} className={'body-l underline'}>ほげ</Link>
            <Link href={'/'} className={'body-l underline'}>ほげ</Link>
        </div>
    )
}