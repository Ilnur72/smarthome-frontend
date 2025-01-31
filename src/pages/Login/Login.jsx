import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveState } from "../../Utils/storage";

//img
import Visibility from "../../assets/visibility.svg";
import VisibilityOff from "../../assets/visibilityOff.svg";
import { jwtDecode } from "jwt-decode";

const Login = ({ refetchData }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { register, handleSubmit, reset, formState } = useForm();

  const submit = async (dataValue) => {
    try {
      const { data } = await axios.post("/auth/login-staff", dataValue);
        const { user } = jwtDecode(data.data.token);
      
      saveState("token", data.data.token);
      if (data.data.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;
        navigate(user.role ==='OPERATOR' ? '/operator/profile' : "/building");
        toast.success("Siz tizimga muvaffaqiyatli kirdingiz.");
        reset();
        refetchData();
      }
    } catch (error) {            
      toast.error(error.response?.data.message);
    }
  };

  return (
    <div className="flex items-center justify-evenly translate-y-10 ">
      <div className="w-96 px-5 py-8 rounded-md">
        <h2 className="text-primary text-3xl font-extrabold text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col">
          <InputLabel
            sx={{
              color: "#092C4C",
              fontSize: 18,
              marginTop: 3,
              marginLeft: 1.5,
            }}
          >
            Email
          </InputLabel>
          <OutlinedInput
            {...register("email", {
              required: true,
            })}
            sx={{ borderRadius: "70px" }}
            size="small"
            placeholder="username"
            variant="outlined"
          />
          <InputLabel
            sx={{
              color: "#092C4C",
              fontSize: 18,
              marginTop: 3,
              marginLeft: 1.5,
            }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            {...register("password", { required: true })}
            sx={{ borderRadius: "70px" }}
            size="small"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  <img
                    width={20}
                    src={showPassword ? VisibilityOff : Visibility}
                    alt=""
                  />
                </IconButton>
              </InputAdornment>
            }
            placeholder="password"
          />
          <Button
            type="submit"
            sx={{
              background: "#4b48e2",
              ":hover": { background: "#514eec" },
              borderRadius: "70px",
              paddingX: "20px",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: 4,
            }}
            variant="contained"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Loading" : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
