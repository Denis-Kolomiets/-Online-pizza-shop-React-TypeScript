import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loanding from '../components/Loanding'

import { Pizza } from '../types'

const SearchPizzas: React.FC = () => {
  function findPizza(pizzas: Pizza[], findKey: number) {
    const pizza = pizzas.find((obj) => obj.id === findKey)
    if (pizza) {
      return pizza
    }
  }

  const params = useParams()
  const navigate = useNavigate()
  const [key, setKey] = useState<number>(Number(params.id))
  const [pizza, setPizza] = useState<Pizza>()

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      try {
        const res = await fetch(
          'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/36ad4e93-800e-451b-9831-ae6abe1b28ef/pizzas.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221220%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221220T061350Z&X-Amz-Expires=86400&X-Amz-Signature=a4509112c65b9fefc0fb0a44e5ea3b71fcfdcb3a787098b563973c26c48d884f&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22pizzas.json%22&x-id=GetObject'
        )
        const data: Pizza[] = await res.json()
        !data.find((obj) => obj.id === key)
          ? navigate('/')
          : setPizza(findPizza(data, key))
      } catch (error) {
        alert('Error server')
      }
    }
    fetchData()
  }, [])

  if (!pizza) {
    return <Loanding />
  }

  return (
    <>
      <div className="pizza-block__wrapper">
        <div className="pizza-block">
          <img
            className="pizza-block__image"
            src={pizza.imageUrl}
            alt="Pizza"
          />
          <h4 className="pizza-block__title">{pizza.title}</h4>
          <div className="pizza-block__price">{`от ${pizza.price} ₽`}</div>
        </div>
      </div>
    </>
  )
}

export default SearchPizzas
