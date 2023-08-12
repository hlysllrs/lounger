import { Component } from 'react'
import { signUp } from '../../utilities/users-service'

export default class SignUpForm extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: ''
    })
  }

  handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const formData = { ...this.state }
      delete formData.confirm
      delete formData.error
      // the promise returned by the signUp service method will resolve to the user object included in the payload of the JWT
      const user = await signUp(formData)
      // baby step
      this.props.setUser(user)
    } catch {
      // an error happened on the server
      this.setState({ error: 'Sugn Up Failed - Try Again' })
    }
  }

  // we must override the render method
  // the render method is the equivilent to a function-based component (its jon is to return the UI)
  render() {
    const disable = this.state.password !== this.state.confirm
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
            <label>Email</label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="text" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    )
  }
}