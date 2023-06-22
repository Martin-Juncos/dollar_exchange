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

  const handlerChange = (e) => {
    let value = e.target.value;
    setInput(value);
  };

  const handlerClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={style.form}>
        <input
          type="number"
          placeholder="Ingrese el monto..."
          onChange={handlerChange}
        />
        <button onClick={handlerClick}>Calcular</button>
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
            {cotizacion.map(({ nombre, venta }) => {
              const total = input ? Number(input / venta) : venta;
              return (
                <tr>
                  <td>{nombre}</td>
                  <td>{Number(venta).toLocaleString('es-AR',{style: 'currency', currency: 'USD'})}</td>
                  <th scope="row">{Number(total).toLocaleString('es-AR',{style: 'currency', currency: 'ARS'})}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
