interface cardProps  {
   src:string
   title:string,
   description:string,
   price:string,
   discount_price:string
   onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}
export default cardProps
