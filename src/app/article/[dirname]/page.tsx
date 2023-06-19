import { marked } from 'marked'
import { getPost } from '@/app/lib/api'
import { NotFound } from '@/components/not_found'

export default function Article({ params }: { params: { dirname: string } }) {
    const post = getPost(params.dirname)
    if (post == null) {
        return (<NotFound/>)
    }

    // return (<span className={'header-l'}>{ post.properties.title }</span>)
    const contentHtml = marked(post.markdown)
    return (
        // <div className={'flex flex-col pl-4 pr-4 pt-8 pb-8 rounded-2xl surface-variant on-surface-variant-text'}>
        <div className={'flex flex-col'}>
            {/*<div className={'flex flex-col p-4 rounded-2xl surface-variant on-surface-variant-text'}>*/}
                <span className={'body-l'}>{ post.properties.datetime }</span>
                <span className={'body-l'}>{ post.properties.title }</span>
                <span className={'body-l'}>{ post.properties.category }</span>
                <span className={'body-l'}>{ post.properties.tags }</span>
            {/*</div>*/}
            <div dangerouslySetInnerHTML={{ __html: contentHtml }}/>
        </div>
    )
}
