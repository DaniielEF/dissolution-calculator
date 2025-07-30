
import { useForm } from "../customHooks/useForm";


interface FormData {
  measureName: string;
  concentrationPatron: number;
  finalConcentration: number;
  finalVolume: number;
  patronVolume?: number;
}

const DissolutionCalculator = () => {

  const { form, history, handleChange, setField, saveHistory } = useForm<FormData>({
    measureName: 'Muestra ',
    concentrationPatron: 0,
    finalConcentration: 0,
    finalVolume: 1,
  });



  const { measureName, concentrationPatron, finalConcentration, finalVolume, patronVolume } = form;

// Funcion para el manejo del calculo de dilucion en el formulario
  const handleCalc = (e: React.FormEvent) => {

    e.preventDefault()

    if (concentrationPatron > finalConcentration) {

      const patronVolumen = finalVolume * finalConcentration / concentrationPatron;

      setField("patronVolume", parseFloat(patronVolumen.toFixed(2)));

      if(patronVolume){
        console.log(true)
        saveHistory();
      }
      


    } else {
      alert('No se puede diluir desde una concentración de patrón menor')
      setField("patronVolume", 0)
    }
   
  }

    console.log(history)

  return (
    <div className="container mt-5 ">

      <form autoComplete="off" className="flex items-center justify-center flex-col">
        
        <div className="text-3xl">
          Calculadora de diluciones
        </div><br/>

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

    </div>
  )
}

export default DissolutionCalculator