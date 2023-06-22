import Link from 'next/link'
import { getPosts } from '@/app/lib/api'
import PostCard from '@/components/post_card'

export default function ArticleList({ page, filterCategory }: { page: number, filterCategory: string | null }) {
    const posts = getPosts(page, filterCategory)
    return (
        <div className={'flex flex-col gap-8'}>
            {
                posts.map((post, idx) => (
                    <Link href={`/article/${post.properties.dirname}`} key={idx}>
                        <PostCard postProps={post.properties}/>
                    </Link>
                ))
            }
        </div>
    )
}
