export const addItem = (item,count) => {
  let cart = []
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.push({
      ...item,
      count: count
    })

    cart = Array.from(new Set(cart.map((p) => p._id))).map(id => {
      return cart.find(p => p._id === id)
    })
    cart.map(p => p._id === item._id ? console.log(p.count=count) : p)
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
export const removeItem = (item) => {
  let cart = []
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'))
    }
    cart.map((prod,i) => {
      if(prod._id === item._id){
        cart.splice(i,1)
      }
    })

    localStorage.setItem('cart', JSON.stringify(cart));
  }
}