export default function UserProfile({params}:any) {
    return (
      <div className="flex flex-col items-center justify-center text-white  bg-black min-h-screen py-2">
        <h1
          className="border rounded-full shadow-2xl  shadow-white
               hover:shadow-lg hover:transition delay-100 duration-500   hover:shadow-orange-500 hover:translate-x-2
               hover:translate-y-2
                 p-5"
        >
          prfile page
        </h1>
        <hr />
        <hr />
        <hr />
        <div className="text-4xl r">Prodile page
            <br />
            <h1 className="mt-5 p-5 border bg-orange-600 rounded-xl hover:bg-orange-700"> user id: {params.id}</h1>
           
        </div>
        
      </div>
    )
  }
  