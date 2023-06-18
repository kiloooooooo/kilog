export default function AppBar({ type }: { type: 'mobile' | 'tablet' | 'desktop' }) {
    const barBaseClassNames = 'fixed top-0 w-full h-16 flex flex-row items-center background'
    const title = (<h3>KiLog</h3>)

    switch (type) {
        case 'mobile':
            return (
                <div className={`${barBaseClassNames} pl-4 pr-4`}>
                    { title }
                </div>
            )
        case 'tablet':
            return (
                <div className={`${barBaseClassNames} pl-10 pr-10`}>
                    { title }
                </div>
            )
        case 'desktop':
            return (
                <div className={`${barBaseClassNames} pl-10 pr-10`}>
                    <div className={'w-full max-w-256 ml-auto mr-auto'}>{ title }</div>
                </div>
            )
    }
}