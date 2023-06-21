import { PostProperties } from '@/app/lib/api'
import Link from "next/link";

export default function ArticleProps({ postProps }: { postProps: PostProperties }) {
    const categoryHref =
        postProps.category === 'art'
            ? '/art'
            : postProps.category === 'tech'
                ? '/tech'
                : '/all'
    const categoryName =
        postProps.category === 'art'
            ? 'イラスト'
            : postProps.category === 'tech'
                ? '技術'
                : 'その他'

    return (
        // <div className={'flex flex-col items-center'}>
        <div className={'flex flex-col'}>
            {/*<h1 className={'text-align-last-center'}>{ postProps.title }</h1>*/}
            <h1>{ postProps.title }</h1>
            <div className={'flex flex-row gap-4'}>
                <span className={'body-l'}>カテゴリ:</span>
                <Link href={categoryHref}><span className={'text-blue-500 underline'}>{ categoryName }</span></Link>
            </div>
            {/*<div className={'flex flex-row gap-4 justify-center mt-4'}>*/}
            <div className={'flex flex-row gap-4 mt-4'}>
                {
                    postProps.tags.map((tag, idx) => (
                        <span className={'pl-2 pr-2 pt-1 pb-1 rounded-full surface-variant'} key={idx}>{ tag }</span>
                    ))
                }
            </div>
        </div>
    )
}
