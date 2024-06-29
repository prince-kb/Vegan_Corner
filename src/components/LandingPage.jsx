import Category from "./Category"

const LandingPage = () => {

  return (
    <div className="">
      <h2 className="text-center mt-4 font-bold text-2xl font-cav">Only Plant based Products. Real and Pure.</h2>
        <div className={`mx-auto bg-[url('https://img.freepik.com/free-vector/green-sale-banner_1017-7937.jpg')] mt-12 h-[40vh] w-[70vw] rounded-3xl flex justify-center items-end`}>
            <div className="flex">
                <div className="flex mb-6 gap-6">
                <div className="rounded-full w-[10px] h-[10px] bg-white"></div>
                <div className="rounded-full w-[10px] h-[10px] bg-white"></div>
                <div className="rounded-full w-[10px] h-[10px] bg-white"></div>
                </div>

            </div>
        </div>

        <Category type="milk"/>
        <Category type="snacks"/>


    </div>
  )

}

export default LandingPage
