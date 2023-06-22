import PaginationNavigator from "@/components/pagination_navigator";
import ArticleList from "@/components/article_list";

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
