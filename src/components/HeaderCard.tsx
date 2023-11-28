
interface IHeaderCard{
    title: string
}
export default function HeaderCard(props : IHeaderCard){

    return(
        <>
         {/* <Helmet>
        <link
          rel="stylesheet"
          href="../node_modules/bootstrap/dist/css/bootstrap.min.css"
        />
      </Helmet> */}

      
        <div className="relative block mt-10  p-12 bg-white border border-gray-200 rounded-lg shadow-lg"
        style ={{
            height: 'auto'
        }}
        >
            <h1 className="mb-2 text-5xl  font-bold tracking-tight text-indigo-900">{props.title}</h1>
        </div>

        </>
    )

}