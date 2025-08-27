import * as classes from './App.module.scss'

type Props = {
  img: string,
  price: number,
  name: string,
  product: string,
  estimation: number,
  reviews: number,
}

export default function ProductCard(props: Props) {
  const {img, price, name, product, estimation, reviews} = props

  return (
    <article className={classes.card}>
      <img src={img} alt="" className={classes.img}/>
      <h4 className={classes.price}>{price}</h4>
      <h4 className={classes.manufacturer}>
        <p className={classes.manufName}>{name}</p>
        <p className={classes.manufProduct}>{product}</p>
      </h4>
      <h4>
        <p className={classes.estimation}>
          <img src="" alt="" />
          {estimation}
        </p>
        <p className={classes.reviews}>{reviews}</p>
      </h4>
      <button className={classes.order}>Заказать</button>
    </article>
  )
}
