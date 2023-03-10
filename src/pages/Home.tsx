import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import Categories from '../components/–°ategories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import qs from 'qs'
// import pizzas from '../data/pizzas'
import Pagination from '../Pagination'
import { useRef } from 'react'
import sortList, { SortType } from '../data/sort'

import { setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'
import { useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import Loanding from '../components/Loanding'
import Error from '../components/Error'
import { Pizza } from '../types'
import { RootState, useAppDispatch } from '../redux/store'

// import { SearchContext } from '../App'
const sortedPizzas = (filterPizzas: Pizza[], key: SortType) => {
  const sortedCourses = [...filterPizzas]
  key === 'ABC'
    ? sortedCourses.sort((a, b) => (a.title > b.title ? 1 : -1))
    : sortedCourses.sort((a, b) => (a[key] < b[key] ? 1 : -1))
  return sortedCourses
}

const filterCategories = (activeCategori: Pizza['id'], pizzas: Pizza[]) => {
  const filterCategori = [...pizzas]
  if (!activeCategori) {
    return filterCategori
  }
  return filterCategori.filter((pizza) => pizza.category === activeCategori)
}
const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)
  const { activeCategori, sort, search } = useSelector(
    (state: RootState) => state.filter
  )
  const { items, status } = useSelector((state: RootState) => state.pizza)
  const pizzas = items
  const sortKey = sort
  const searchValue = search
  const [firstIndex, setFirstIndex] = useState<number>(0)
  const [lastIndex, setLastIndex] = useState<number>(4)
  const [numberPages, setNumberPages] = useState<number>(0)
  const location = useLocation()
  const filterPizzas = filterCategories(activeCategori, pizzas)

  const sortPizzas = sortedPizzas(filterPizzas, sortKey)
  useEffect(() => {
    dispatch(fetchPizzas())
  }, [])

  useEffect(() => {
    setNumberPages(Math.ceil(sortPizzas.length / 4))
  }, [sortPizzas])
  // : (filterPizzas: Pizza[]) => void

  const pizzasSorted = (sortPizzas: Pizza[]) => {
    return sortPizzas
      .filter((pizza) => {
        return pizza.title.toLowerCase().includes(searchValue.toLowerCase())
          ? true
          : false
      })
      .slice(firstIndex, lastIndex)
      .map((pizza) => {
        return <PizzaBlock {...pizza} key={pizza.id} />
      })
  }

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        activeCategori,
        sortKey,
      })
      navigate(`?${queryString}`)
    }

    isMounted.current = true
  }, [activeCategori, sortKey, searchValue])

  useEffect(() => {
    if (location.search) {
      const params = qs.parse(location.search.substring(1))
      const sort = sortList.find((obj) => obj === params.sortKey)
      if (sort) {
        dispatch(
          setFilters({
            ...params,
            sort,
            activeCategori: 0,
            search: '',
          })
        )
      }
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [activeCategori, sortKey, searchValue])
  // const query = queryString.parse(location.search)
  // console.log(query.search)
  // const [sortKey, setSortKey] = useState(query.sort)

  // const sortPizzas = sortedPizzas(pizzas, sortKey)

  // sortedPizzas(pizzas, sortKey)
  // console.log(sortedPizzas)
  // const [sortedPizzas, setSortedPizzas] = useState()

  // const { searchValue } = React.useContext(SearchContext)

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>

        {status === 'error' ? (
          <Error />
        ) : (
          <>
            <h2 className="content__title">–í—Ā–Ķ –Ņ–ł—Ü—Ü—č</h2>
            <div className="content__items">
              {status === 'loading' ? <Loanding /> : pizzasSorted(sortPizzas)}
            </div>
            <Pagination
              setFirstIndex={setFirstIndex}
              setLastIndex={setLastIndex}
              numberPages={numberPages}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Home
