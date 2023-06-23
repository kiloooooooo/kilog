import { getLicenses } from '@/app/lib/license'

export default function AboutPage() {
    const licenses = getLicenses()

    return (
        <div className={'w-full'}>
            <h1>このサイトについて</h1>
            <h2>権利表記</h2>
            <h3>Twitter</h3>
            <span className={'break-normal body-l'}>TWITTER, TWEET, RETWEET and the Twitter Bird logo are trademarks of Twitter Inc. or its affiliates.</span>
            <h3>オープンソースソフトウェア</h3>
            <div className={'flex flex-col'}>
                {
                    licenses.map((info, idx) => (
                        <>
                            <h4 key={idx}>{ info.name }</h4>
                            <div className={'p-4 flex flex-col rounded-2xl bg-blue-100 dark:bg-gray-900'}>
                                <pre className={'w-full whitespace-pre-wrap  overflow-x-auto'}>{ info.info.licenseText }</pre>
                            </div>
                        </>
                    ))
                }
            </div>
        </div>
    )
}
