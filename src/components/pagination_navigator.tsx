import Link from 'next/link'

export default function PaginationNavigator({ pages, currentPage, dense = true }: { pages: number, currentPage: number, dense?: boolean }) {
    return (
        <div className={'w-full flex flex-row justify-center pt-4 pb-4'}>
            <Link href={''}></Link>
        </div>
    )
}
