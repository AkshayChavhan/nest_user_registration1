import { useForm } from "react-hook-form";
import "./Signup.css";
import { handleLogin } from "../services/authService";
import { Link } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    const { mobileNumber, password } = data;
    handleLogin(e, mobileNumber, password);
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            {...register("mobileNumber", {
              required: "Mobile number is required",
            })}
          />
          {errors.mobileNumber && <p>{errors.mobileNumber.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
        <div className="center">
          <Link to="/register">Sign Up here</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
