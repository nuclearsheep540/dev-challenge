import React from 'react'
import axios from 'axios'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      data: [], //all items
      select: [], //items returned by result of two filters
      selSupplier: [], //suppliers result by filter
      selProduct: [], //products result by filter
      priceOrder: true
    }
    this.handleSupplier = this.handleSupplier.bind(this)
    this.handleProduct = this.handleProduct.bind(this)
    this.ascPrice = this.ascPrice.bind(this)
    this.desPrice = this.desPrice.bind(this)
  }
  componentDidMount() {
    axios.get('/api/products')
      .then(res => {
        this.setState({
          data: res.data,
          select: res.data,
          selSupplier: [...new Set(res.data.map(elem => elem.supplier))],
          selProduct: [...new Set(res.data.map(elem => elem.product))]
        })
      })
  }

  handleSupplier() {
    // if supplier && product === all ... show all
    if (event.target.value === 'All' && this.state.selProduct.length > 1) {
      console.log('supplier rule 1')
      this.setState({
        ...this.state,
        selSupplier: [...new Set(this.state.data.map(elem => elem.supplier))],
        select: this.state.data
      })

      // if supplier === all ... show this suppliers by with this product
    } else if (event.target.value === 'All') {
      console.log('supplier rule 2')
      this.setState({
        ...this.state,
        selSupplier: [...new Set(this.state.data.map(elem => elem.supplier))], //list of all unique suppliers
        select: this.state.data.filter(item => item.supplier.includes(this.state.selSupplier)) //list of all suppliers who supply this product
      })

      // if supplier !== all && product === all ... show all products by seleted supplier
    } else if (this.state.selProduct.length > 1) {
      console.log('supplier rule 3')
      this.setState({
        ...this.state,
        selSupplier: [event.target.value],
        select: this.state.data.filter(item => item.supplier === event.target.value)
      })

      // show products by sel supplier
    } else {
      console.log('supplier rule 4')
      this.setState({
        ...this.state,
        selSupplier: [event.target.value],
        select: this.state.data.filter(item => item.supplier === event.target.value && item.product.includes(this.state.selProduct))
      })
    }
  }

  handleProduct() {
    // if product && supplier === all ... show all
    if (event.target.value === 'All' && this.state.selSupplier.length > 1) {
      console.log('product rule 1')
      this.setState({
        ...this.state,
        selProduct: [...new Set(this.state.data.map(elem => elem.supplier))],
        select: this.state.data
      })

      // if product === all ... show all products for this supplier
    } else if (event.target.value === 'All') {
      console.log('product rule 2')
      this.setState({
        ...this.state,
        selProduct: [...new Set(this.state.data.map(elem => elem.product))], //list of all unique suppliers,
        select: this.state.data.filter(item => item.supplier.includes(this.state.selSupplier))
      })

      // if product !== all && supplier === all ... show all suppliers with seleted product
    } else if (this.state.selSupplier.length > 1) {
      console.log('product rule 3')
      this.setState({
        ...this.state,
        selProduct: [event.target.value],
        select: this.state.data.filter(item => item.product === event.target.value)
      })

      // show suppliers by sel product
    } else {
      console.log('product rule 4')
      this.setState({
        ...this.state,
        selProduct: [event.target.value],
        select: this.state.data.filter(item => item.product === event.target.value && item.supplier.includes(this.state.selSupplier))
      })
    }
  }
  ascPrice() {
    this.setState({
      ...this.state,
      select: this.state.select.sort((a, b) => a.price - b.price),
      priceOrder: !this.state.priceOrder
    })
    console.log('ascending price')
  }

  desPrice() {
    this.setState({
      ...this.state,
      select: this.state.select.sort((a, b) => b.price - a.price),
      priceOrder: !this.state.priceOrder
    })
    console.log('descending price')
  }

  render() {
    console.log('suppli :', this.state.selSupplier)
    console.log('produc :', this.state.selProduct)
    console.log('select :', this.state.select)
    console.log('')
    if (!this.state.data) return null

    const { data, select } = this.state

    const supplier = data.map(elem => elem.supplier) //store all suppliers from data
    const uniqueSupplier = [...new Set(supplier)] //store unique suppliers

    const product = data.map(elem => elem.product) //store all products from data
    const uniqueProduct = [...new Set(product)] //store unique products

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 main">
            <h1 className="page-header">Product pricing</h1>

            <form>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Supplier</label>

                  <select className="form-control" id="selSupplier" onChange={this.handleSupplier}>
                    <option value='All'>All</option>
                    {uniqueSupplier.map((elem, i) => <option key={i} value={elem}>{elem}</option>)}
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <label>Product</label>

                  <select className="form-control" id="selProduct" onChange={this.handleProduct}>
                    <option value='All'>All</option>
                    {uniqueProduct.map((elem, i) => <option key={i} value={elem}>{elem}</option>)}
                  </select>

                </div>
              </div>
            </form>

            <h2 className="sub-header">Product details</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Supplier</th>
                    <th>Product</th>
                    <th onClick={this.state.priceOrder ? this.desPrice : this.ascPrice} className='trhover'>Price</th>
                  </tr>
                </thead>
                <tbody onLoad={this.handleUpdate}>
                  {select.map((item, i) => (
                    <tr key={i + 1}>
                      <td>{i + 1}</td>
                      <td>{item.supplier}</td>
                      <td>{item.product}</td>
                      <td>£{item.price}</td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}