import axios from "axios";

export const GET_COTIZATION = 'GET_COTIZATION'

export const getCotization = () => {
    return async function(dispatch){
        const data = (
            await axios.get(
              "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
            )
          ).data.filter((cotizaciones) =>
              [
                "Dolar Oficial",
                "Dolar Blue",
                "Dolar Bolsa",
                "Dolar Contado con Liqui",
              ].includes(cotizaciones.casa.nombre)
            )
            .map((cotizacion) => ({
              nombre: cotizacion.casa.nombre,
              compra: parseFloat(cotizacion.casa.compra.replace(",", ".")),
              venta: parseFloat(cotizacion.casa.venta.replace(",", ".")),
            }));
            dispatch({type: GET_COTIZATION, payload: data})
    }
}