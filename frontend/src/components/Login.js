import React from 'react'

const Login = () => {
    return (
        <div className="login">
            <div className="login__graphic">
            </div>
            <div className="login__form">
                <h2>hey there!</h2>
                <form>
                    <label>username</label>
                    <input type="text"></input>
                    <label>password</label>
                    <input type="text"></input>
                    <button>login</button>
                </form>
                <div className="login__form__register">
                    <p>not registered yet?</p>
                    <button>register as applicant</button>
                    <button>register as contributor</button>
                </div>
            </div>

        </div>
    )
}

export default Login
