export function numberToCurrency( num ) {
  return '$ ' + num.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Para pagina Register
export function validarNombreUsuario ( entryName ) {
  var resultado = null
  if( entryName === null || entryName === '') resultado = '¡El nombre de usuario no puede estar vacío!'

  if (!/^(?=.{6,})/.test(entryName)) resultado = 'El usuario debe tener al menos 6 caracteres.'
  
  return resultado
}

export function validarPassword( entryPassword ) {
  var resultado = null
     
  if ( entryPassword === null || entryPassword === '' ) resultado = '¡El password no puede estar vacío!'

  if (!/^(?=.{8,})/.test(entryPassword)) return resultado = 'La contraseña debe tener al menos 8 caracteres'
  if (!/^(?=.*[A-Z])/.test(entryPassword)) return resultado = 'La contraseña debe tener al menos una Mayúscula'
  if (!/^(?=.*[a-z])/.test(entryPassword)) return resultado = 'La contraseña debe tener al menos una Minúscula'
  if (!/^(?=.*[0-9])/.test(entryPassword)) return resultado = 'La contraseña debe contener al menos un número (0-9)'
  
  return resultado
}

export function validarEmail( entryEmail ) {
  var resultado = null
  const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")

  if (!emailRegex.test(entryEmail)) return resultado = 'El email no es válido'
  
  return resultado
}

export function monthToText( value ) {
  const texts = {
    esp01: 'Enero',
    esp02: 'Febrero',
    esp03: 'Marzo',
    esp04: 'Abril',
    esp05: 'Mayo',
    esp06: 'Junio',
    esp07: 'Julio',
    esp08: 'Agosto',
    esp09: 'Septiembre',
    esp10: 'Octubre',
    esp11: 'Noviembre',
    esp12: 'Diciembre',
  }

  return texts['esp' + value] ? texts['esp' + value] : value;
}