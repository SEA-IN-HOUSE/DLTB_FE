// const defaultFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
import { Helmet } from "react-helmet";
export default function TestArea(){

    return(
       <>
          <Helmet>
        <link
            rel="stylesheet"
            href="../node_modules/bootstrap/dist/css/bootstrap.min.css"
        />
        <link
            rel ="stylesheet"
            href ="../styles/LogIn.css'"
        />
      </Helmet>
       
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                  <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-white border shadow-sm border-slate-300  text-gray-900 sm:text-sm rounded-lg 
                                    focus:outline-none
                                    focus:ring-custom-blue focus:border-custom-blue block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                  />

            <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
            </span>
            <input type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
            </label>
       </>
    )

}