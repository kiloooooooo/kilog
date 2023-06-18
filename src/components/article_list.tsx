import { getPosts } from "@/app/lib/api"
import Image from 'next/image'

export default function ArticleList({ page, filterCategory }: { page: number, filterCategory: string | null }) {
    const posts = getPosts(page, filterCategory)
    return (
        <div className={'flex flex-col gap-8'}>
            {
                posts.map((post, idx, arr) => (
                    <div className={'h-64 rounded-2xl flex flex-col bg-blue-900'} key={idx}>
                        <Image src={post.properties.leadingImagePath} alt={'leading'} className={'w-full h-40 object-cover rounded-2xl'} width={post.properties.leadingImageWidth} height={post.properties.leadingImageHeight}/>
                        <span>{post.properties.title}</span>
                    </div>
                ))
            }
        </div>
    )
}
