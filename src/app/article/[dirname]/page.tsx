import { Metadata } from 'next'
import { marked } from 'marked'
import { getPost } from '@/app/lib/api'
import { NotFound } from '@/components/not_found'
import BreadCrumb from '@/components/breadcrumb'
import customMiddleware from '@/app/lib/marked_custom_middleware'
import ArticleProps from '@/components/article_props'
import FadeSlide from '@/components/slide_fade'

export async function generateMetadata({ params }: { params: { dirname: string } }): Promise<Metadata> {
    const post = getPost(params.dirname)
    const title = `${post?.properties.title} - KiLog` ?? 'KiLog'
    const description = 'イラストと備忘録置き場 KiLog の記事ページです'

    return {
        title: title,
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            creator: '@nola_mk2',
            images: post == null ? [] : [post?.properties.leadingImagePath]
        },
        openGraph: {
            title: title,
            description: description,
            url: `article/${params.dirname}`,
            siteName: 'KiLog',
            images: post == null
                ? []
                : [
                    {
                        url: post?.properties.leadingImagePath,
                        width: post?.properties.leadingImageWidth,
                        height: post?.properties.leadingImageHeight
                    }
                ],
            locale: 'ja_JP',
            type: 'website'
        }
    }
}

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
        <FadeSlide>
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
                <div className={'mb-8 rounded-2xl'}>
                    <ArticleProps postProps={post.properties} />
                </div>
                <div className={'article-markdown-zone'} dangerouslySetInnerHTML={{ __html: contentHtml }}/>
            </div>
        </FadeSlide>
    )
}
