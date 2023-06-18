import {getPosts, PostProperties} from "@/app/lib/api"
import PostCard from "@/components/post_card"

export default function ArticleList({ page, filterCategory }: { page: number, filterCategory: string | null }) {
    const posts = getPosts(page, filterCategory)
    return (
        <div className={'flex flex-col gap-8'}>
            {
                posts.map((post, idx, arr) => (
                    <PostCard postProps={post.properties} key={idx}/>
                ))
            }
        </div>
    )
}
