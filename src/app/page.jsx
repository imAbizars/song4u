import Link from "next/link"
export default function Home(){
  return(
    <section className="flex flex-col w-full px-4 justify-center items-center text-center h-screen">
      <h1 className="text-3xl font-bold">
        Create Ur Message With They Favorite Song
      </h1>
      <div className="flex flex-row justify-center gap-10 mt-20">
          <Link href="/receipt" className="bg-foreground p-5 font-bold rounded-2xl text-white hover:bg-[#343434]">
            Create Ur Message
          </Link>
          <Link href="/message" className="bg-white p-5 border border-black font-bold rounded-2xl hover:bg-[#EEEEEE]">
            Show All Message
          </Link>
      </div>
      
    </section>
  )
}