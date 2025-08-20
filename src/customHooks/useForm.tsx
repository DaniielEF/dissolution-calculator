import { ChangeEvent, useState } from 'react'


export const useForm = <T extends Object>(initialState: T) => {
  const [form, setForm] = useState(initialState);
  const [history, setHistory] = useState<T[]>(()=>JSON.parse(localStorage.getItem('calculationHistory')||"[]"));

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = target;
    
    if(type === "number"){

      if(value === ""){
        setForm({
          ...form,
          [name]:value
        });
        return;
      }

      const parsed = parseFloat(value);
      if(!isNaN(parsed) && parsed>=0){
        setForm({
          ...form,
          [name]:parsed
        });
      }
    } else {
        setForm({
          ...form,
          [name]:value
        });

      }
    // setForm({
    //   ...form,
    //   [name]: type === "number" ? parseFloat(value)>0?parseFloat(value):0 : value
    // })


  }
  const setField = <K extends keyof T>(name: K, value: T[K]) => {

    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const saveHistory = (data:T)=>{
    setHistory((prev)=>[...prev, data])
  }


  return {
    form,
    history,
    handleChange,
    setField,
    saveHistory,
    ...form
  }
}

