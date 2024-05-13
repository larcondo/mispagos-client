import './index.css'

const PageSelector = ({ pages = 0, actualPage = 1, onReClick, onAvClick}) => {
  return(
    <div id='contenedor-paginas'>
      <button type='button' className='boton-paginas'
        onClick={onReClick}
        disabled={(actualPage === 1) ? true : false}
      >
        &#9664;
      </button>

      <span className='indicador-paginas'>{ actualPage } / { pages }</span>

      <button type='button' className='boton-paginas'
        onClick={onAvClick}
        disabled={(actualPage === pages) ? true : false}
      >
        &#9654;
      </button>
    </div>
  )
}

export default PageSelector