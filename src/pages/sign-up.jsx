import React, { useState } from "react";
import {
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-`~[\]{}|;':",./<>?]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character";
    if (password !== repeatPassword) newErrors.repeatPassword = "Passwords do not match";
    if (!firstName) newErrors.firstName = "First Name is required";
    if (!lastName) newErrors.lastName = "Last Name is required";
    if (!address) newErrors.address = "Address is required";
    if (!phone) newErrors.phone = "Phone is required";
    else if (!validatePhone(phone)) newErrors.phone = "Phone number must be exactly 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('address', address);
    formData.append('phone', phone);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_REGISTER, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setAlertMessage(data.message);
        setAlertType('success');
        setTimeout(() => navigate('/sign-in'), 2000);
      } else {
        setAlertMessage('Registration failed');
        setAlertType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertMessage('An error occurred');
      setAlertType('error');
    }
  };

  const handleBlur = (field) => {
    if (field === 'email' && email && !validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
    }
    if (field === 'phone' && phone && !validatePhone(phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Phone number must be exactly 10 digits",
      }));
    }
    if (field === 'repeatPassword' && password !== repeatPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        repeatPassword: "Passwords do not match",
      }));
    }
  };

  const handleChange = (field, value) => {
    if (field === 'email') {
      setEmail(value);
      if (validateEmail(value)) {
        setErrors((prevErrors) => {
          const { email, ...rest } = prevErrors;
          return rest;
        });
      }
    }
    if (field === 'phone') {
      const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setPhone(numericValue);
      if (validatePhone(numericValue)) {
        setErrors((prevErrors) => {
          const { phone, ...rest } = prevErrors;
          return rest;
        });
      }
    }
    if (field === 'password') {
      setPassword(value);
      if (validatePassword(value)) {
        setErrors((prevErrors) => {
          const { password, ...rest } = prevErrors;
          return rest;
        });
      }
    }
    if (field === 'repeatPassword') {
      setRepeatPassword(value);
      if (password === value) {
        setErrors((prevErrors) => {
          const { repeatPassword, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const isFormValid = () => {
    return (
      username &&
      email &&
      validateEmail(email) &&
      password &&
      validatePassword(password) &&
      repeatPassword &&
      password === repeatPassword &&
      firstName &&
      lastName &&
      address &&
      phone &&
      validatePhone(phone)
    );
  };

  const passwordRequirements = [
    { label: "Longitud Mínima: Mínimo 8 caracteres.", regex: /.{8,}/ },
    { label: "Mayúsculas: Al menos una letra mayúscula (A-Z).", regex: /[A-Z]/ },
    { label: "Minúsculas: Al menos una letra minúscula (a-z).", regex: /[a-z]/ },
    { label: "Números: Al menos un número (0-9).", regex: /\d/ },
    { label: "Símbolos: Al menos un carácter especial o símbolo.", regex: /[!@#$%^&*()_+=\-`~[\]{}|;':",./<>?]/ },
  ];

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
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your details to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Username
            </Typography>
            <Input
              size="lg"
              placeholder="Username"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!errors.username}
            />
            {errors.username && <Typography variant="small" color="red">{errors.username}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              error={!!errors.email}
            />
            {errors.email && <Typography variant="small" color="red">{errors.email}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => handleChange('password', e.target.value)}
              error={!!errors.password}
            />
            {errors.password && <Typography variant="small" color="red">{errors.password}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password Requirements:
            </Typography>
            <ul>
              {passwordRequirements.map(({ label, regex }) => (
                <Typography
                  key={label}
                  variant="small"
                  color={regex.test(password) ? "green" : "red"}
                >
                  <li>{label}</li>
                </Typography>
              ))}
            </ul>
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Repeat Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={repeatPassword}
              onChange={(e) => handleChange('repeatPassword', e.target.value)}
              onBlur={() => handleBlur('repeatPassword')}
              error={!!errors.repeatPassword}
            />
            {errors.repeatPassword && <Typography variant="small" color="red">{errors.repeatPassword}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              First Name
            </Typography>
            <Input
              size="lg"
              placeholder="First Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              error={!!errors.firstName}
            />
            {errors.firstName && <Typography variant="small" color="red">{errors.firstName}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Last Name
            </Typography>
            <Input
              size="lg"
              placeholder="Last Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              error={!!errors.lastName}
            />
            {errors.lastName && <Typography variant="small" color="red">{errors.lastName}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Address
            </Typography>
            <Input
              size="lg"
              placeholder="Address"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={!!errors.address}
            />
            {errors.address && <Typography variant="small" color="red">{errors.address}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Phone
            </Typography>
            <Input
              size="lg"
              placeholder="Phone"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              error={!!errors.phone}
            />
            {errors.phone && <Typography variant="small" color="red">{errors.phone}</Typography>}
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Profile Image
            </Typography>
            <Input
              type="file"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <Button className="mt-6" fullWidth type="submit" disabled={!isFormValid()}>
            Register Now
          </Button>

          {alertMessage && (
            <Typography variant="small" color={alertType === "success" ? "green" : "red"} className="mt-4 text-center">
              {alertMessage}
            </Typography>
          )}

          <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
              <span>Sign in With Twitter</span>
            </Button>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
