import style from './Calculadora.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCotization } from "../redux/action";

export default function Calculadora() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCotization());
  }, [dispatch]);

  const cotizacion = useSelector((state) => state.cotizacion);

  const [input, setInput] = useState("");

  const handlerClick = (e) => {
    e.preventDefault();
    setInput("")
  };

  return (
    <>
      <div className={style.form}>
        <input
          type="number"
          placeholder="Ingrese el monto..."
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />
        <button onClick={handlerClick}>Listo</button>
      </div>
      <div className={style.table}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Tipo</th>
              <th scope="col">Cotizacion</th>
              <th scope="col">Dolares</th>
            </tr>
          </thead>
          <tbody>
            {cotizacion.map(({ nombre, venta }, index) => {
              const total = input ? Number(input / venta) : 0;
              return (
                <tr key={index}>
                  <td>{nombre}</td>
                  <td>{Number(venta).toLocaleString('es-AR',{style: 'currency', currency: 'ARS'})}</td>
                  <th scope="row">{Number(total).toLocaleString('es-AR',{style: 'currency', currency: 'USD'})}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
