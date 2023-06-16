import { useState } from "react";
import MyPages from "../../Components/MyPages";
import MyFetchFunction from "../../Helpers/MyFetchFunction";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  async function loginFunc(e) {
    e.preventDefault();
    let result = await MyFetchFunction("api/auth/login", "POST", {
      username,
      password,
    });
    // console.log("LOGIN RESULT", result);
    if (result?.token) {
      localStorage.setItem("token", result.token);
      history.replace("/dashboard");
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      history.replace("/dashboard");
    }
  }, [history]);

  return (
    <MyPages>
      <div className="flex items-center justify-center pt-40 w-11/12 mx-auto">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white rounded-lg shadow-xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Silahkan masuk menggunakan akun anda
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={loginFunc} className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block px-5 py-2 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block py-2 text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block px-5 py-2 w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MyPages>
  );
};

export default Login;
