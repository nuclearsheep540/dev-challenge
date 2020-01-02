import React from 'react'
import axios from 'axios'

export default class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {

      }

    }
    //binds
  }
  componentDidMount(){
    axios.get('/api/products')
      .then(res => {
        this.setState({ data: res.data })
        console.log(this.state.data)
      })
  }

  render() {
    if (!this.state.data) return null
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 main">
            <h1 className="page-header">Product pricing</h1>

            <form>
              <div className="row">
                <div className="form-group col-md-6">
                  <label>Supplier</label>
                  <select className="form-control" id="selSupplier">
                    <option>xxxx</option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>Product</label>
                  <select className="form-control" id="selProduct">
                    <option>xxxx</option>
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
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>x</td>
                    <td>xxxx</td>
                    <td>xxxx</td>
                    <td>xxxx</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}