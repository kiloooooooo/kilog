import Link from 'next/link'
import {getPagesCount} from "@/app/lib/api";

function NavButton({ href, disabled, type }: { href: string, disabled: boolean, type: 'start' | 'prev' | 'next' | 'end' }) {
    let icon = ''
    switch (type) {
        case 'start':
            icon = 'first_page'
            break
        case 'prev':
            icon = 'navigate_before'
            break
        case 'next':
            icon = 'navigate_next'
            break
        case 'end':
            icon = 'last_page'
            break
    }
    const colorClassName =
        disabled
            ? 'surface-variant on-surface-variant-text'
            : 'primary on-primary-text'
    const elem = (
        <div className={`${colorClassName} rounded-full flex justify-center items-center`}>
            <span className={'material-symbols-outlined m-2'}>{icon}</span>
        </div>
    )

    return (
        disabled
            ? elem
            : <Link href={href}>{elem}</Link>
    )
}

export default function PaginationNavigator({ category, currentPage, dense = true }: { category: string, currentPage: number, dense?: boolean }) {
    const allPagesCount = getPagesCount(category === 'all' ? null : category)
    const prevPage = currentPage <= 1 ? null : currentPage - 1
    const nextPage = currentPage == allPagesCount ? null : currentPage + 1

    return (
        <div className={'w-full flex flex-row justify-between items-center mt-10'}>
            <NavButton href={`1`} disabled={currentPage === 1} type={'start'}/>
            <NavButton href={`${prevPage}`} disabled={prevPage == null} type={'prev'}/>
            <span>{currentPage} / {allPagesCount}</span>
            <NavButton href={`${nextPage}`} disabled={nextPage == null} type={'next'}/>
            <NavButton href={`${allPagesCount}`} disabled={currentPage === allPagesCount} type={'end'}/>
        </div>
    )
}
