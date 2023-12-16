import { useForm } from "react-hook-form";
import "./Signup.css";
import { handleRegister } from "../services/authService";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    const { firstName, lastName, mobileNumber, password } = data;
    handleRegister(e, firstName, lastName, mobileNumber, password);
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
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
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
