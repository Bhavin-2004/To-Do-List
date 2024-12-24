// eslint-disable-next-line no-unused-vars
import React, { useState, useActionState, useEffect } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "@/actions/userAction";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [state, formAction, isPanding] = useActionState(register, {
    success: null,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  console.log(formData);

  return (
    <>
      <div className="h-screen flex justify-center items-center transform -translate-y-16">
        <form
          action={formAction}
          className="flex flex-col gap-6 max-w-xl w-full px-8"
        >
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {state.success && (
            <span className="massage successMsg">
              {state.success} {"Redireting..."}
            </span>
          )}
          {state.error && <span className="massage ">{state.error}</span>}
          <Button disabled={isPanding}>
            {isPanding ? "Registering" : "Register"}
          </Button>
          <span className="text-[#63657b] text-center">
            Already have an account? {"  "}
            <Link
              to="/login"
              className="transition ease-in-out hover:cursor-pointer hover:text-primary hover:underline"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Register;
