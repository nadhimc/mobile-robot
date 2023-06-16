const MyFetchFunction = async (url, method, body) => {
  // let mainUrl = process.env.REACT_APP_API_SERVER;
  let mainUrl = "http://192.168.1.100:3002";
  let token = localStorage.getItem("token");
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  let requestUrl = "";
  if (url.includes("http")) {
    requestUrl = url;
  } else {
    requestUrl = `${mainUrl}/${url}`;
  }

  try {
    let fetchFunc = await fetch(requestUrl, {
      method: method || "GET",
      headers: headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!fetchFunc.ok) {
      if (fetchFunc.status === 401) {
        window.location.href = "/logout";
      }
      throw fetchFunc;
    }
    try {
      let result = await fetchFunc.json();
      return result;
    } catch (e) {
      console.log("JSON PARSE ERROR", e);
      alert(e.message || "Error 1");
    }
  } catch (e) {
    try {
      let errorMessage = await e.json();
      if (errorMessage) {
        let message =
          errorMessage.error ||
          errorMessage.message ||
          JSON.stringify(errorMessage);
        console.log("ERM", message);
        alert(message || "Error 2");
      } else {
        alert(errorMessage || "Error 3");
      }
    } catch (err) {
      alert(err.message || "Error 4");
    }
  }
  return false;
};

export default MyFetchFunction;
