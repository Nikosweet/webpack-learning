import * as classes from './Shop.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'

export default function shop() {
  const [cards, setCards] = useState([])
  useEffect(() => {
    const apiURL = 'http://localhost:5000/api/product'
    axios.get(apiURL).then(res => {
      const Cards = res.data;
      setCards(Cards);
      console.log(Cards)
    })
  }, [])

  return (
    <section className={classes.cards}>
      {cards.map(card => (
        <ProductCard 
          key={card.id}
          img={card.image_url}
          price={card.price}
          name={card.product_manuf}
          product={card.product_name}
          estimation={card.estimation}
          reviews={card.reviews}
        />
      ))}
    </section>
  )
}
