import { createSlice } from '@reduxjs/toolkit'
import pagosService from '../services/pagos'

const pagosSlice = createSlice({
  name: 'pagos',
  initialState: [],
  reducers: {
    sendPagos(state, action) {
      return action.payload
    },
    addPago(state, action) {
      state.resultado.push(action.payload)
    },
    deletePago(state, action) {
      const id = action.payload._id
      return {
        ...state,
        resultado: state.resultado.filter(p => p._id !== id )
      }
    },
    updatePago(state, action) {
      const id = action.payload._id
      return {
        ...state,
        resultado: state.resultado.map(p => p._id === id ? action.payload : p )
      }
    },
    cleanState() {
      return {
        message: null,
        resultado: [],
        options: {
          detalles: [],
          months: [],
          years: [],
          tipos: [],
        }
      }
    }
  },
})

export const { sendPagos, addPago, deletePago, updatePago, cleanState } = pagosSlice.actions

export const initializePagos = (token) => {
  return async dispatch => {
    const pagos = await pagosService.getAll(token)
    dispatch(sendPagos(pagos))
  }
}

export const createPago = (content, token) => {
  return async dispatch => {
    const newPago = await pagosService.add(content, token)
    dispatch(addPago(newPago))
  }
}

export const removePago = (id, token) => {
  return async dispatch => {
    const deletedPago = await pagosService.remove(id, token)
    dispatch(deletePago(deletedPago))
  }
}

export const modifyPago = (id, toUpdatePago, token) => {
  return async dispatch => {
    const updated = await pagosService.update(id, toUpdatePago, token)
    dispatch(updatePago(updated))
  }
}

export default pagosSlice.reducer

/**
 * slice 'pagos' cuando se cierra sesión:
 *    pagos: {
 *     message: null,
 *     resultado: [],
 *     options: {
 *       detalles: [],
 *       months: [],
 *       years: [],
 *       tipos: [],
 *     }
 *    }
 */