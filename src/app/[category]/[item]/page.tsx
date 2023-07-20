import { Metadata } from 'next'
import PaginationNavigator from "@/components/pagination_navigator"
import ArticleList from "@/components/article_list"

export async function generateMetadata({ params }: { params: { category: string, item: string } }): Promise<Metadata> {
    const cat = params.category
    const title = (
        cat === 'all'
            ? 'すべての記事'
            : cat === 'art'
                ? 'イラスト'
                : cat === 'tech'
                    ? '技術'
                    : ''
    ) + ' - KiLog'
    const description = 'イラストと備忘録置き場'

    return {
        title: title,
        twitter: {
            card: 'summary',
            title: title,
            description: description,
            creator: '@nola_mk2'
        },
        openGraph: {
            title: title,
            description: description,
            url: '/',
            siteName: 'KiLog',
            locale: 'ja_JP',
            type: 'website'
        }
    }
}

function Dummy({ params }: { params: { category: string, item: string } }) {
    return <ArticleList page={parseInt(params.item)} filterCategory={params.category === 'all' ? null : params.category}/>
}

export default function HomePage({ params }: { params: { category: string, item: string } }) {
    // return (<ListFrame page={parseInt(params.item)} child={<Dummy/>}/>)
    return (
        <>
            <Dummy params={params}/>
            <PaginationNavigator category={params.category} currentPage={parseInt(params.item)}/>
        </>
    )
}
