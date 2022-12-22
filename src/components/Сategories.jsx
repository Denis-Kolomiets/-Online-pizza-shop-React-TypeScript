import { useState } from 'react'
import { useDispatch } from 'react-redux'
import categories from '../data/categories'
import { SetActiveCategori } from '../redux/slices/filterSlice'
import { useSelector } from 'react-redux'
function Categories() {
  const activeCategori = useSelector((state) => state.filter.activeCategori)
  const dispatch = useDispatch()

  const onClickCategory = (index) => {
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
