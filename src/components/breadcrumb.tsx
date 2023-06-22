import Link from 'next/link'

export default function BreadCrumb({ hierarchy }: { hierarchy: { title: string, href: string | null }[] }) {
    return (
        <div className={'flex flex-row flex-wrap items-center'}>
            {
                hierarchy.map((item, idx) => (
                    <>
                        {
                            idx === 0
                                ? <></>
                                : <span className={'material-symbols-outlined ml-2 mr-2'}>navigate_next</span>
                        }
                        {
                            item.href == null
                                ? <span className={'body-l'} key={idx}>{item.title}</span>
                                : <Link className={'body-l hover:underline text-blue-500'} href={item.href} key={idx}>{item.title}</Link>
                        }
                    </>
                ))
            }
        </div>
    )
}
