interface cardProps  {
   src:string
   title:string,
   description:string,
   price:string
   onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}
export default cardProps
