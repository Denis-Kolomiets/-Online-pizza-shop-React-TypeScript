import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Card from './pages/Cart'

import { Routes, Route } from 'react-router-dom'

import React from 'react'
import SearchPizzas from './pages/SearchPizzas'
import MainLayout from './layouts/MainLayout'

// export const SearchContext = React.createContext()

function App() {
  return (
    <>
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Card />} />
          <Route path="pizza/:id" element={<SearchPizzas />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* </SearchContext.Provider> */}
    </>
  )
}

export default App
