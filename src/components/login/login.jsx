
import './login.css';
import user_icon from '../../assets/person.png';
import password_icon from '../../assets/password.png';
import { useState } from 'react';
import { Link } from "react-router-dom";

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Đăng nhập để tiếp tục</p>
                </div>

                <form className="login-form">

                    {/* Email */}
                    <div className="input-group">
                        <img src={user_icon} alt="user" />
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
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Ẩn' : 'Hiện'}
                        </button>
                    </div>

                    {/* Options */}
                    <div className="login-options">
                        <label>
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>

                        <a href="#">Quên mật khẩu?</a>
                    </div>

                    {/* Button */}
                    <button type="submit" className="login-button">
                        Đăng nhập
                    </button>

                    {/* Register */}
                    <div className="register-link">
                        <span>Chưa có tài khoản?</span>
                        <Link to="/register"> Đăng ký</Link>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Login;

