import style from './Pagination.module.scss'
import ReactPaginate from 'react-paginate'

type PaginationPropsType = {
  setFirstIndex: (page: number) => void
  setLastIndex: (page: number) => void
  numberPages: number
}
const Pagination: React.FC<PaginationPropsType> = ({
  setFirstIndex,
  setLastIndex,
  numberPages,
}) => {
  const clickPaginate: (e: number) => void = (e) => {
    switch (e) {
      case 1:
        setFirstIndex(0)
        setLastIndex(4)
        break
      case 2:
        setFirstIndex(4)
        setLastIndex(8)
        break
      case 3:
        setFirstIndex(8)
        setLastIndex(12)
        break
    }
  }
  return (
    <>
      <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={(e) => clickPaginate(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={numberPages}
      />
    </>
  )
}

export default Pagination
