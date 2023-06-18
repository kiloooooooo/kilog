import Image from 'next/image'
import  { useParams } from 'next/navigation'
import ListFrame from "@/components/list_frame"
import PaginationNavigator from "@/components/pagination_navigator";
import ArticleList from "@/components/article_list";

function Dummy({ params }: { params: { category: string, item: string } }) {
    // let bgColorClass;
    // switch (params.category) {
    //     case 'all':
    //         bgColorClass = 'bg-blue-300'
    //         break
    //     case 'art':
    //         bgColorClass = 'bg-pink-300'
    //         break
    //     case 'tech':
    //         bgColorClass = 'bg-green-300'
    //         break
    //     default:
    //         bgColorClass = 'bg-yellow-300'
    // }
    // return (
    //     <div className={'flex flex-col gap-8'}>
    //         <div className={`${bgColorClass} h-64 rounded-2xl flex flex-row justify-center`}>
    //             <Image src={'/blog_posts/20230618/img/IMG_0841.PNG'} alt={'leading'} className={'w-full h-40 object-cover rounded-2xl'} width={2100} height={2100} fill={false}></Image>
    //         </div>
    //         <div className={`${bgColorClass} h-64 rounded-2xl`}></div>
    //         <div className={`${bgColorClass} h-64 rounded-2xl`}></div>
    //         <div className={`${bgColorClass} h-64 rounded-2xl`}></div>
    //         <div className={`${bgColorClass} h-64 rounded-2xl`}></div>
    //     </div>
    // )
    return <ArticleList page={1} filterCategory={null}/>
}

export default function HomePage({ params }: { params: { category: string, item: string } }) {
    // return (<ListFrame page={parseInt(params.item)} child={<Dummy/>}/>)
    return (
        <>
            <Dummy params={params}/>
            <PaginationNavigator pages={20} currentPage={parseInt(params.item)}/>
        </>
    )
}
