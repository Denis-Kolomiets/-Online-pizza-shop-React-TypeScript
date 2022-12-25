import categories from '../data/categories'
import { SetActiveCategori } from '../redux/slices/filterSlice'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store'
const Categories: React.FC = () => {
  const activeCategori = useSelector(
    (state: RootState) => state.filter.activeCategori
  )
  const dispatch = useAppDispatch()

  const onClickCategory: (index: number) => void = (index) => {
    dispatch(SetActiveCategori(index))
  }

  return (
    <>
      <div className="categories">
        <ul>
          {categories.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => onClickCategory(index)}
                className={activeCategori === index ? 'active' : ''}
              >
                {item}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Categories
