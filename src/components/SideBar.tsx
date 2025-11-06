
export const SideBar = () => {
  return (
    <nav className="bg-gray-800">

      <aside id="left-navBar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 ">
        {/* <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
         <li></li>
         </ul>
         </div> */}

        <div className="text-4xl ">
        </div><br />
        <div>
          Calculadora de diluciones
        </div><br />
        <div>
          Calculadora de disoluciones
        </div><br />
        <div>
          Calculadora de calibraciones con gases patrón
        </div><br />
      </aside>
    </nav>
  )
}
