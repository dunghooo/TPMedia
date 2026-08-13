import './register.css';
import user_icon from '../../assets/person.png';
import password_icon from '../../assets/password.png';
import email_icon from '../../assets/email.png';
import { Link } from "react-router-dom";

import { useState } from 'react';

function Register() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="register-page">

            <div className="register-card">

                {/* Header */}
                <div className="register-header">
                    <h1>Create Account</h1>
                    <p>Tạo tài khoản để bắt đầu</p>
                </div>

                <form className="register-form">

                    {/* Họ và tên */}
                    <div className="input-group">
                        <img src={user_icon} alt="user" />

                        <input
                            type="text"
                            placeholder="Họ và tên"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="input-group">
                        <img src={email_icon} alt="email" />

                        <input
                            type="email"
                            placeholder="Email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="input-group">
                        <img src={password_icon} alt="password" />

                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mật khẩu"
                            required
                        />

                        <button
                            type="button"
                            className="show-password"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? 'Ẩn' : 'Hiện'}
                        </button>
                    </div>

                    {/* Terms */}
                    <div className="terms">
                        <label>
                            <input type="checkbox" required />

                            <span>
                                Tôi đồng ý với
                                <a href="#"> điều khoản sử dụng</a>
                            </span>
                        </label>
                    </div>

                    {/* Register button */}
                    <button
                        type="submit"
                        className="register-button"
                    >
                        Đăng ký
                    </button>

                    {/* Login */}
                    <div className="login-link">
                        <span>Đã có tài khoản?</span>

                        <Link to="/login"> Đăng nhập</Link>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default Register;

