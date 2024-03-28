import Logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const id = uuidv4();
import Swal from "sweetalert2";
import NavbarV2 from "../component/NavbarV2";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: id,
    name: "",
    email: "",
    password: "",
    dataHp: []
  });

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (localStorage.getItem("urutanAkun") !== null) {
      return navigate("/dashboard");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = getNextKey();
    for (let index = 1; index <= key; index++) {
      const dataLocalAkun = JSON.parse(localStorage.getItem("akun" + index));
      if (dataLocalAkun && dataLocalAkun.email === formData.email) {
        return Swal.fire({
          icon: "error",
          showConfirmButton: false,
          text: "Email sudah digunakan!",
          timer: 1500,
          timerProgressBar: true,
        });
      }
    }
    localStorage.setItem("akun" + key, JSON.stringify(formData));
    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      text: "Berhasil mendaftar",
      timer: 1500,
      timerProgressBar: true,
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        navigate("/login");
      }
    });
  };

  const getNextKey = () => {
    let count = 1;
    while (localStorage.getItem(`akun${count}`) !== null) {
      count++;
    }
    return count;
  };

  return (
    <>
      <div className="flex h-screen min-h-[600px] flex-1 flex-col justify-center px-2 lg:px-8 bg-gray-200">
        {<NavbarV2 />}
        <div className="relative isolate px-6 pt-14 flex flex-col items-center justify-center babi">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-24 w-auto"
              src={Logo}
              alt="Your Company"
            />
            <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
              Sign up your account
            </h2>
          </div>
          <div className="mt-3 w-full sm:max-w-sm">
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="text"
                    required
                    onChange={handleChange}
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900 mt-2"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mt-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-1 flex relative">
                  <input
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 absolute"
                  />
                  <p
                    onClick={togglePasswordVisibility}
                    className={`absolute right-0 top-0 m-2 bg-white cursor-pointer ${formData.password.length === 0 ? 'hidden' : ''}`}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 ml-1 text-slate-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 ml-1 text-slate-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-16">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-3 text-center text-sm text-slate-800">
              A member?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
