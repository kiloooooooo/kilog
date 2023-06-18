import Image from 'next/image'
import Navigation from "@/components/navigation";
import AppBar from "@/components/appbar";
import About from "@/components/about";
import RecentItems from "@/components/recent_items";

function Dummy() {
    return (
        <div className={'flex flex-col gap-8'}>
            <div className={'bg-blue-300 h-64 rounded-2xl'}></div>
            <div className={'bg-blue-300 h-64 rounded-2xl'}></div>
            <div className={'bg-blue-300 h-64 rounded-2xl'}></div>
            <div className={'bg-blue-300 h-64 rounded-2xl'}></div>
            <div className={'bg-blue-300 h-64 rounded-2xl'}></div>
            <div className={'bg-blue-300 h-64 rounded-2xl'}></div>
            <div className={'bg-blue-300 h-64 rounded-2xl'}></div>
        </div>
    )
}

export default function Home() {
    return (
      <div>
          <div className={'tablet:hidden pt-16'}>
              <AppBar type={'mobile'}/>
              <div className={'m-4 flex flex-col'}>
                  <Dummy/>
                  <div className={'mb-16'}/>
                  <Navigation/>
                  <div className={'mb-16'}/>
                  <About/>
                  <div className={'mb-16'}/>
                  <RecentItems/>
              </div>
          </div>
          <div className={'desktop:hidden max-tablet:hidden pt-16'}>
              <AppBar type={'tablet'}/>
              <div className={'grid grid-cols-12 gap-8 p-10'}>
                  <div className={'col-span-4'}>
                      <Navigation/>
                      <div className={'mb-16'}/>
                      <About/>
                      <div className={'mb-16'}/>
                      <RecentItems/>
                  </div>
                  <div className={'col-span-8'}>
                      <Dummy/>
                  </div>
              </div>
          </div>
          <div className={'max-desktop:hidden pt-16 grid grid-cols-1 place-items-center pl-10 pr-10'}>
              <AppBar type={'desktop'}/>
              <div className={'grid grid-cols-12 gap-8 w-full max-w-256 pt-10 pb-10'}>
                  <div className={'col-span-3 static'}>
                      <Navigation/>
                      {/*<div className={'mb-16'}/>*/}
                      {/*<About/>*/}
                  </div>
                  <div className={'col-span-6'}>
                      <Dummy/>
                  </div>
                  <div className={'col-span-3'}>
                      <About/>
                      <div className={'mb-16'}/>
                      <RecentItems/>
                  </div>
              </div>
          </div>
      </div>
    )
}
