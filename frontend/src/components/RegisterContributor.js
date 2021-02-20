import React from 'react'

const RegisterApplicant = () => {
    return (
        <div className="register">
            <h2>register as applicant</h2>
            <div className="register__form">
                <form>
                    <div className="form-col">
                        <label>username</label>
                        <input type="text"></input>
                        <label>name</label>
                        <input type="text"></input>
                        <label>password</label>
                        <input type="text"></input>
                        <label>confirm password</label>
                        <input type="text"></input>
                    </div>
                    <div className="form-col">
                        <label>current location</label>
                        <input type="text"></input>
                        <label>phone number</label>
                        <input type="text"></input>
                        <label>maximum availability</label>
                        <input type="text" placeholder="e.g. 3 weeks"></input>
                        <label>details of home</label>
                        <input type="text" className="additional-req"></input>
                        <button className="register-submit">register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterApplicant
