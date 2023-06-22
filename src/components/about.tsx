import Image from 'next/image'
import Link from 'next/link'

function TwitterAccount({ name, href }: { name: string, href: string }) {
    return (
        <div className={'w-full mt-4 flex flex-row items-center'}>
                <span className={'w-9 flex items-center justify-center'}>
                    <Image className={'w-6 dark-only'} src={'/logos/twitter/white.png'} width={1034} height={851} alt={'twitter'}/>
                    <Image className={'w-6 light-only'} src={'/logos/twitter/blue.png'} width={1034} height={851} alt={'twitter'}/>
                </span>
            <Link className={'w-full truncate ml-2 body-l hover:underline'} href={href}>{ name }</Link>
        </div>
    )
}

export default function About() {
    return (
        <div className={'flex flex-col items-start'}>
            <span className={'font-bold uppercase mb-4 on-background-text'}>About</span>
            <div className={'mt-4 mb-8 w-full'}>
                {/*<div className={'bg-blue-500 rounded-full w-16 h-16'}/>*/}
                <Image src={'/icon.jpg'} alt={'icon'} width={400} height={400} className={'w-16 h-16 rounded-full'}/>
            </div>
            {/*<span className={'body-l max-w-36'}>ほげほげほげほげほげほげほげほげ</span>*/}
            <span className={'body-l max-w-36'}>
                プログラムと絵をかきます
            </span>
            <TwitterAccount name={'@nola_mk2'} href={'https://twitter.com/nola_mk2'}/>
            <TwitterAccount name={'@d38099fffa324d8'} href={'https://twitter.com/d38099fffa324d8'}/>
            <div className={'w-full mt-4 flex flex-row items-center'}>
                <span className={'w-9 flex items-center justify-center'}>
                    <Image className={'w-6'} src={'/logos/pixiv/logo_icon_r.png'} width={1000} height={1000} alt={'twitter'}/>
                </span>
                <Link className={'w-full truncate ml-2 body-l hover:underline'} href={'https://www.pixiv.net/users/93827450'}>@user_wsth2547</Link>
            </div>
        </div>
    )
}
