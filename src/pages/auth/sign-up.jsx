import {
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { useDispatch } from "react-redux";
import { HandleSignUP } from "@/features/authslice/authslice";


export function SignUp() {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password : yup.string().min(8).required(),
    password_confirmation : yup.string().oneOf([yup.ref("password"),null],"Password Didn't Match").required()
  })
  const {register,formState:{errors},handleSubmit, reset} = useForm({
    resolver : yupResolver(schema)
  })
  const handleSignUp = (data)=>{
    dispatch(HandleSignUP(data))
    reset()
  }
  return (
    <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Use your email and password to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit(handleSignUp)}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Name
            </Typography>
            <Input
              {...register("name")}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.name && 
              <Typography variant="small" color="red" className="-mb-3 font-medium">
                {errors.name.message}
              </Typography>
            } 
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              {...register("email")}
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.email && 
              <Typography variant="small" color="red" className="-mb-3 font-medium">
                {errors.email.message}
              </Typography>
            } 
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              {...register("password")}
              type="password"
              size="lg"
              placeholder="*************"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && 
              <Typography variant="small" color="red" className="-mb-3 font-medium">
                {errors.password.message}
              </Typography>
            }
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Confirm Password
            </Typography>
            <Input
              {...register("password_confirmation")}
              type="password"
              size="lg"
              placeholder="**************"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password_confirmation && 
              <Typography variant="small" color="red" className="-mb-3 font-medium">
                {errors.password_confirmation.message}
              </Typography>
            } 
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Register Now
          </Button>
          
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
