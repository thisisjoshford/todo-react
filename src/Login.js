import React, { Component } from 'react'
import request from 'superagent';

export default class Login extends Component {
    //set empty string state for user sign in and sign up
    state = {
        userSignIn: '',
        passwordSignIn: '',

        userSignUp: '',
        passwordSignUp: ''
    }

    handleSignIn = async () => {
        const signIn = await request.post(`http://https://shielded-eyrie-03811.herokuapp.com/api/auth/signin`, {
            email: this.state.userSignIn,
            password: this.state.passwordSignIn,
        })
        localStorage.setItem('user', JSON.stringify(signIn.body));
        this.props.history.push('/');
    }

    handleSignUp = async () => {
        const signUp = await request.post(`https://shielded-eyrie-03811.herokuapp.com/api/auth/signup`, {
            email: this.state.userSignUp,
            password: this.state.passwordSignUp,
        })
        localStorage.setItem('user', JSON.stringify(signUp.body));
        this.props.history.push('/');
    }
     

    render() {
        return (
            <div>
                <div>
                    <input 
                    value={ this.state.userSignUp} 
                    onChange={(e) => this.setState({ userSignUp: e.target.value})} />
                    <input 
                    value={ this.state.passwordSignUp} 
                    onChange={(e) => this.setState({ passwordSignUp: e.target.value})} />

                    <button onClick={ this.handleSignUp }>
                        Sign up
                    </button>  
                    <br/>

                    <input 
                    value={ this.state.userSignIn} 
                    onChange={(e) => this.setState({ userSignIn: e.target.value})} />

                    <input value={ this.state.passwordSignIn} 
                    onChange={(e) => this.setState({ passwordSignIn: e.target.value})} />

                    <button onClick={this.handleSignIn}>
                        Sign in
                    </button>     
                </div>
            </div>
        )
    }
}
