import Header from "@/components/Header"
import { Outlet } from "react-router-dom"


const AppLayout = () => {
  return (
    <>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header/>
        <Outlet/>
      </main>
      <footer className="p-10 text-center mt-10 bg-gray-800">
        Made with care by Helal
      </footer>
    </>
  )
}

export default AppLayout