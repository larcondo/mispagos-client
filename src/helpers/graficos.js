
export function getDiferentesAnios( array ) {
  // const aux = array.filter( pago => pago.tipo === 'pago' )
  const yearSet = new Set(array.map( e => e.fecha.substring(0,4)))
  const yearArr = Array.from(yearSet)

  return yearArr
}

export function getDiferentesDetalles( array ) {
  const detalleSet = new Set(array.map( pago => pago.detalle ))
  const detalleArr = Array.from(detalleSet).sort()
  
  return detalleArr
}