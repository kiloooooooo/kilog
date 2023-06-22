import {PostProperties} from '@/app/lib/api'
import Image from 'next/image'
import SlideFade from '@/components/slide_fade'

export default function PostCard({ postProps }: { postProps: PostProperties }) {
    return (
        <SlideFade>
            <div className={`h-64 rounded-2xl flex flex-col justify-between transition-all surface-variant hover:drop-shadow-lg`}>
                <Image
                    src={postProps.leadingImagePath}
                    alt={'leading'}
                    className={'w-full h-40 object-cover rounded-2xl surface-variant'}
                    width={postProps.leadingImageWidth}
                    height={postProps.leadingImageHeight}/>
                <div className={'p-4 flex flex-col'}>
                    <span className={'header-xxs'}>{postProps.title}</span>
                    <span className={'body-l'}>{postProps.datetime}</span>
                </div>
            </div>
        </SlideFade>
    )
}
