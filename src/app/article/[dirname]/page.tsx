import { marked } from 'marked'
import { getPost } from '@/app/lib/api'
import { NotFound } from '@/components/not_found'
import BreadCrumb from '@/components/breadcrumb'
import customMiddleware from '@/app/lib/marked_custom_middleware'

export default function Article({ params }: { params: { dirname: string } }) {
    const post = getPost(params.dirname)
    if (post == null) {
        return (<NotFound/>)
    }

    // marked-base-urlは完全なURLしか受け付けんっぽい
    // relativeなので自前で
    marked.use(customMiddleware(params.dirname))
    const contentHtml = marked.parse(post.markdown)
    return (
        // <div className={'flex flex-col pl-4 pr-4 pt-8 pb-8 rounded-2xl surface-variant on-surface-variant-text'}>
        <div className={'flex flex-col'}>
            <div className={'w-full'}>
                <BreadCrumb hierarchy={[
                    {
                        title: 'ホーム',
                        href: '/'
                    },
                    {
                        title: `${post.properties.datetime} の記事`,
                        href: null
                    },
                ]}/>
            </div>
            {/*<div className={'flex flex-col'}>*/}
            {/*    <span className={'body-l'}>{ post.properties.datetime }</span>*/}
            {/*    <h1 className={'header-l'}>{ post.properties.title }</h1>*/}
            {/*    <span className={'body-l'}>{ post.properties.category }</span>*/}
            {/*    <span className={'body-l'}>{ post.properties.tags }</span>*/}
            {/*</div>*/}
            <div className={'article-markdown-zone'} dangerouslySetInnerHTML={{ __html: contentHtml }}/>
        </div>
    )
}
