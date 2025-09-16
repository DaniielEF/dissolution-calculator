
import { useEffect, useState } from "react";
import { useForm } from "../customHooks/useForm";



interface FormData {
  measureName: string;
  concentrationPatron: number;
  finalConcentration: number;
  finalVolume: number;
  patronVolume?: number;
}

const DissolutionCalculator = () => {

  const { form, handleChange, setField} = useForm<FormData>({
    measureName: 'Muestra ',
    concentrationPatron: 0,
    finalConcentration: 0,
    finalVolume: 1,
  });

  const { measureName, concentrationPatron, finalConcentration, finalVolume, patronVolume } = form;

  const [latestCalc, setLatestCalc] = useState<FormData>()

  const [history, setHistory] = useState<FormData[]>(()=>JSON.parse(localStorage.getItem('calculationHistory')||"[]"));
  const [favorites, setFavorites] = useState<FormData[]>(()=>JSON.parse(localStorage.getItem('favoriteCalc')||"[]"))

  // Funcion para el manejo del calculo de dilucion en el formulario
  const handleCalc = (e: React.FormEvent) => {

    e.preventDefault()

    if (concentrationPatron > finalConcentration) {

      const calculatedVolumen = finalVolume * finalConcentration / concentrationPatron;

      const lastCalculationRes = {
        ...form,
        patronVolume: parseFloat(calculatedVolumen.toFixed(2))
      };

      setField("patronVolume", lastCalculationRes.patronVolume);

      setLatestCalc(lastCalculationRes);


    } else {
      alert('No se puede diluir desde una concentración de patrón menor')
      setField("patronVolume", 0)
    }

  };

    const saveHistory = (data:FormData)=>{
    setHistory((prev)=>([...prev, data]))
  }

  useEffect(() => {

    console.log(typeof (latestCalc))

    if (latestCalc && latestCalc != undefined) {

      saveHistory(latestCalc)

      const updateHistory = [...history, latestCalc]
      localStorage.setItem('calculationHistory', JSON.stringify(updateHistory));
      console.log('saved to History: ', latestCalc);

    }

  }, [latestCalc]);

  const addFavorites=(data:FormData) =>{
    setFavorites((prev)=>([...prev,data]))    
  }
  useEffect(() => {

    localStorage.setItem('favoriteCalc',JSON.stringify(favorites))
    console.log('favorite saved')

  }, [favorites])
  


  console.log(history)


  return (
    <div className="container mt-5 ">

      <form autoComplete="off" className="flex items-center justify-center flex-col">

        <div className="text-3xl">
          Calculadora de diluciones
        </div><br />

        <div className="mb-3">
          <label className="formLabel">Nombre muestra</label><br />
          <div className="mb-6 inline-flex gap-6">
            <input type="text"
              name="measureName"
              className="form-control"
              value={measureName}
              onChange={handleChange}
            />
            <div>

            </div>
          </div>
        </div>

        <div className="mb-3">
          <label>Concentración patrón</label><br />
          <div className="mb-6 inline-flex gap-6">
            <input type="number"
              min={"0"}
              maxLength={3}
              name="concentrationPatron"
              value={concentrationPatron}
              onChange={handleChange}
            />
            <div>
              Mol
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label>Concentración deseada</label><br />
          <div className="mb-6 inline-flex gap-6">
            <input type="number"
              min={"0"}
              name="finalConcentration"
              value={finalConcentration}
              onChange={handleChange}
            />
            <div>
              Mol
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Volumen final deseada</label><br />
          <div className="mb-6 inline-flex gap-6">
            <input type="number"
              name="finalVolume"
              value={finalVolume}
              onChange={handleChange}
            />
            <div>
              mL
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label>Volumen inicial patron</label><br />
          <div className="mb-6 inline-flex gap-6">
            <input type="number"
              name="patronVolume"
              value={patronVolume ?? ""}
              disabled
            />
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

      <div className=" container mt-5 gap-1">
        <h2>Caculation History</h2>
        <div>
          {
            history.map((history, index) => (
              <div key={index} className="border-2 gap-6 inline-flex flex-col p-6 m-4 rounded-2xl">
                {history.measureName}:<br />
                Concentración inicial del patrón: {history.concentrationPatron} Mol<br />
                Concentración deseada: {history.finalConcentration} Mol<br />
                Volumen final de la dilución: {history.finalVolume} mL<br />
                Volumen requerido del patrón: {history.patronVolume} mL<br />
                <div className="space-x-4">
                  <button id="favorite"
                  onClick={()=>addFavorites(history)}
                  >⭐Fav</button>
                  <button id="deleteH">Del</button>
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