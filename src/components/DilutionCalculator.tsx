
import { useEffect, useState } from "react";
import { useForm } from "../customHooks/useForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'



interface FormData {

  measureName: string;
  concentrationPatron: number;
  finalConcentration: number;
  finalVolume: number;
  patronVolume?: number;
  isFavorite?: boolean;

}

interface FormDataWithId extends FormData {
  id?: number;

}

const DissolutionCalculator = () => {

  const { form, handleChange, setField } = useForm<FormData>({
    measureName: 'Muestra ',
    concentrationPatron: 0,
    finalConcentration: 0,
    finalVolume: 1,

  });

  const { measureName, concentrationPatron, finalConcentration, finalVolume, patronVolume } = form;

  const [latestCalc, setLatestCalc] = useState<FormData>()
  const [history, setHistory] = useState<FormDataWithId[]>(() => JSON.parse(localStorage.getItem('calculationHistory') || "[]"));
  const [favorites, setFavorites] = useState<FormDataWithId[]>(() => JSON.parse(localStorage.getItem('favoriteCalc') || "[]"))
  const [showFavorites, setShowFavorites] = useState<boolean>(false)

  const itemToShow = showFavorites ? favorites : history;

  // Funcion para el manejo del calculo de dilucion en el formulario
  const handleCalc = (e: React.FormEvent) => {

    e.preventDefault()

    if (concentrationPatron > finalConcentration) {

      const calculatedVolumen = finalVolume * finalConcentration / concentrationPatron;

      const lastCalculationRes = {
        ...form,
        patronVolume: parseFloat(calculatedVolumen.toFixed(2)),
        id: crypto.randomUUID(),
        isFavorite: false
      };

      setField("patronVolume", lastCalculationRes.patronVolume);

      setLatestCalc(lastCalculationRes);


    } else {
      alert('No se puede diluir desde una concentración de patrón menor')
      setField("patronVolume", 0)
    }

  };

  const saveHistory = (data: FormDataWithId) => {


    setHistory((prev) => {
      const newHistory = [...prev, data];
      localStorage.setItem('calculationHistory', JSON.stringify(newHistory));
      return newHistory;

    })
  }

  useEffect(() => {
    if (latestCalc && latestCalc != undefined) {
      saveHistory(latestCalc)
    }
  }, [latestCalc]);

  const addFavorites = (data: FormDataWithId) => {
    console.log(data.id)

    setHistory(prev => {
      const updateHistory = prev.map(item =>
        item.id === data.id ? { ...item, isFavorite: !item.isFavorite } : item
      )
      localStorage.setItem('calculationHistory', JSON.stringify(updateHistory));
      return updateHistory;

    })

    setFavorites(prev => {
      const exists = prev.some(item => item.id === data.id);
      let newFavorites = [];
      if (!exists) {
        newFavorites = [...prev, { ...data, isFavorite: true }]
      } else {
        newFavorites = prev.filter(item => item.id !== data.id);
      }

      localStorage.setItem('favoriteCalc', JSON.stringify(newFavorites));
      return newFavorites;

    })
  };

  // useEffect(() => {
  //   const itemToShow = showFavorites? favorites: history;
  //   console.log('favorite showed', showFavorites, itemToShow)

  // }, [showFavorites])

  const deleteHistoryElement = (element: FormDataWithId) => {
    // Aquí se encuentra la lógica para eliminar un elemento del historial
    console.log("Eliminar elemento del historial", element.id);

    const updateHistory = history.filter(i => i.id !== element.id);
    setHistory(updateHistory);
    localStorage.setItem('calculationHistory', JSON.stringify(updateHistory));
    const updateFavorites = updateHistory.filter(i => i.isFavorite === true);
    setFavorites(updateFavorites)
    localStorage.setItem('favoriteCalc', JSON.stringify(updateFavorites))
  }

  console.log(itemToShow)


  return (
    <div>
    <div className="  flex items-center justify-center flex-col min-h-screen ">
        
      <form autoComplete="off" className="flex flex-col w-full min-w-min  max-w-sm p-6 rounded-2xl g-6 bg-gray-300">

        <div className="text-3xl">
          Calculadora de diluciones
        </div><br />

        <div className="mb-2">
          <label className="formLabel">Nombre muestra</label><br />
          <div className="inline-flex gap-6">
            <div className="mb-6 inline-flex border rounded-sm bg-white p-2 " >
              <input type="text"
                name="measureName"
                className="form-control"
                value={measureName}
                onChange={handleChange}
              />
            </div>
            <div>

            </div>
          </div>
        </div>

        <div className="mb-3">
          <label>Concentración patrón</label><br />
          <div className="inline-flex gap-6">
            <div className="mb-6  gap-6 border rounded-sm bg-white p-2  ">
              <input type="number"
                min={"0"}
                maxLength={3}
                name="concentrationPatron"
                value={concentrationPatron}
                onChange={handleChange}
              />

            </div>
            <div>
              Mol
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label>Concentración deseada</label><br />
          <div className="inline-flex gap-6">
            <div className="mb-6 inline-flex gap-6 border bg-white p-2 rounded-sm">
              <input type="number"
                min={"0"}
                name="finalConcentration"
                value={finalConcentration}
                onChange={handleChange}
              />

            </div>
            <div>
              Mol
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Volumen final deseada</label><br />
          <div className="inline-flex gap-6">
            <div className="mb-6 inline-flex gap-6 border bg-white p-2  rounded-sm">
              <input type="number"
                name="finalVolume"
                value={finalVolume}
                onChange={handleChange}
              />
            </div>
            <div>
              mL
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Volumen inicial patron</label><br />
          <div className="inline-flex gap-6">
            <div className="mb-6 inline-flex gap-6 border bg-white p-2 rounded-sm ">
              <input type="number"
                name="patronVolume"
                value={patronVolume ?? ""}
                disabled
              />

            </div>
            <div>
              mL
            </div>
          </div>
        </div>
        <button id="ContentrationButton"
          onClick={handleCalc}
          type="submit"
        >Calcular</button>

      </form>

    </div>

      <div className="  gap-2 flex items-center justify-center flex-col">
        <h2>Caculation History</h2>
        <label className="inline-flex items-center cursor-pointer bg-gray-300">
          <span className="select-none text-sm font-medium text-heading">Historial</span>
          <input type="checkbox" value="" className="sr-only peer" checked={showFavorites} onChange={(e) => setShowFavorites(e.target.checked)}></input>
          <div className="relative mx-3 w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
          <span className="select-none text-sm font-medium text-heading">Favoritos</span>
        </label>
        <div className=" flex flex-col items-center justify-center min-h-screen bg-gray-300 p-4 rounded-2xl">
          {
            itemToShow.map((history, index) => (
              <div key={index} className="border-2 gap-6 inline-flex flex-col p-6 m-4 rounded-2xl">

                {history.measureName}:<br />
                Concentración inicial del patrón: {history.concentrationPatron} Mol<br />
                Concentración deseada: {history.finalConcentration} Mol<br />
                Volumen final de la dilución: {history.finalVolume} mL<br />
                Volumen requerido del patrón: {history.patronVolume} mL<br />
                <div className="space-x-4 flex justify-evenly">
                  <button id="favorite"
                    onClick={() => addFavorites(history)}
                  >{history.isFavorite ? <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} /> : <FontAwesomeIcon icon={faStar} />}</button>

                  <button id="deleteH"
                    onClick={() => deleteHistoryElement(history)}
                  ><FontAwesomeIcon icon={faTrash} /></button>
                </div>
              </div>
            ))
          }
        </div>
      </div>

   </div> 
  )
}

export default DissolutionCalculator