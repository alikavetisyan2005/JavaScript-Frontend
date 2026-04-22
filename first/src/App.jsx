import { useState } from "react"

export default function App(){

  const [products, setProducts] = useState([
    {id: 101, title: "Economics", price: 12, picture: "https://m.media-amazon.com/images/I/81c6E2VdT3L._AC_UF1000,1000_QL80_.jpg"},
    {id: 102, title: "Philosophy", price: 14, picture: "https://prodimage.images-bn.com/pimages/9780593847046_p0_v19_s600x595.jpg"},
    {id: 103, title: "Psychology", price: 23, picture: "https://images.booksense.com/images/568/458/9781465458568.jpg"},
    {id: 104, title: "Poetry", price: 32, picture: "https://m.media-amazon.com/images/I/91Mzoi3Z+RL._UF1000,1000_QL80_.jpg"},
    {id: 105, title: "Bible", price: 52, picture: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1516202379i/35354152.jpg"},
    {id: 106, title: "History", price: 22, picture: "https://bookazine.com.hk/cdn/shop/products/68fa1af4cb73f919f620253ca990118e.jpg?v=1589010646"},
    {id: 107, title: "Literature", price: 21, picture: "https://images.booksense.com/images/015/491/9781465491015.jpg"},
    {id: 108, title: "Science", price: 12, picture: "https://m.media-amazon.com/images/I/71egR+xVYGL._AC_UF1000,1000_QL80_.jpg"},
    {id: 109, title: "Bussiness", price: 7, picture: "https://images.penguinrandomhouse.com/cover/9780593966822"},
    {id: 110, title: "Economics 2", price: 34, picture: "https://booksandyou.in/cdn/shop/files/TheEconomicsBook_1.webp?v=1732795447"}
  ])

  const [basket, setBasket] = useState([]);

  const handleMove = (product) =>{
    // const temp = [...basket];
    // const found = temp.find(prod => prod.id === product.id);
    // if(found){
    //   found.quantity++;
    // }
    // else{
    //   temp.push({...product, quantity: 1});
    // }

    // setBasket(temp); IMPERATIVE!!!

    const found = basket.find(prod => prod.id === product.id);
    if(found){
      setBasket(basket.map(item =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      ))
    }
    else{
      setBasket([...basket, {...product, quantity: 1}])
    }

  }

  const handleRemove = id =>{
    setBasket(basket.filter(product => product.id !== id))
  }

  const handleIncrement = product =>{
    setBasket(basket.map(item => 
      item.id === product.id ? {...item, quantity: item.quantity + 1} : item
    ))
  }

  const handleDecrement = product => {
    setBasket(basket.map(item => 
      item.id === product.id ? {...item, quantity: item.quantity - 1} : item
    ).filter(item => item.quantity > 0)
  )}

  return(
    <>
      <div className="container my-5">
        <h1 className="display-2 text-info">BookStore</h1>
        <div className="row">
          <div className="col-md-7">
            <h2>Products</h2>  
            <div className="row">
              {
                products.map(product =>
                  <div className="col-md-4 my-4" key = {product.id}>
                    <img
                    src={product.picture} 
                    className="img-thumbnail"
                    width={200}
                    />
                    <p>{product.title}</p>
                    <p className="text-danger">
                     <strong>
                        {product.price} USD
                      </strong> 
                    </p>
                    <button className="btn btn-outline-dark" onClick={() => handleMove(product)} >Move</button>

                  </div>
                )
              }
            </div>
          </div>
          
          <div className="col-md-5">
            <h2>Basket</h2>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  basket.map(item =>
                  <tr key = {item.id}>
                    <td>{item.title}</td>
                    <td>{item.price} USD</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity} USD</td>
                    <td>
                      <button className="btn btn-outline-success mx-1" onClick={() => handleIncrement(item)}>+</button>
                      <button className="btn btn-outline-warning mx-1 " onClick={() => handleDecrement(item)}>-</button>
                      <button className="btn btn-outline-danger mx-1" onClick={() => handleRemove(item.id)}>X</button>
                    </td>
                  </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          
        </div>

      </div>
    </>
  )
}