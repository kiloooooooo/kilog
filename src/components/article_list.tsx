import { getPosts } from "@/app/lib/api"
import Image from 'next/image'

export default function ArticleList({ page, filterCategory }: { page: number, filterCategory: string | null }) {
    const posts = getPosts(page, filterCategory)
    return (
        <div className={'flex flex-col gap-8'}>
            {
                posts.map((post, idx, arr) => (
                    <div className={'h-64 rounded-2xl flex flex-col justify-between border border-gray-400 surface-variant'} key={idx}>
                        <Image
                            src={post.properties.leadingImagePath}
                            alt={'leading'}
                            className={'w-full h-40 object-cover rounded-2xl surface-variant'}
                            width={post.properties.leadingImageWidth}
                            height={post.properties.leadingImageHeight}/>
                        <div className={'p-4 flex flex-col'}>
                            <span className={'header-xxs'}>{post.properties.title}</span>
                            <span className={'body-l'}>{post.properties.datetime}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
