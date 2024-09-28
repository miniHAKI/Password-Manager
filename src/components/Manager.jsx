import { parse } from "postcss";
import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const [form, setform] = useState({ URL: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const Passwordref = useRef();

  const getPasswords = async() => {
    let req =await fetch("http://localhost:3000/");
    let passwords =await req.json();  
    console.log(passwords)
      setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    let a = Passwordref.current.type;
    console.log(a);
    if (ref.current.src.includes("icons/eye.png")) {
      ref.current.src = "icons/eyecross.png";
      Passwordref.current.type = "text";
    } else {
      ref.current.src = "icons/eye.png";
      Passwordref.current.type = "password";
    }
  };

  const savePassword = async() => {
    if (form.URL.length > 3 && form.password.length > 3 && form.username.length > 3) 
      {

      // if any id exist in db delete it
      await fetch("http://localhost:3000", {method: "DELETE", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id : form.id}) })  

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
     await fetch("http://localhost:3000/", {method: "POST", headers: {"Content-Type": "application/json"},
      body: JSON.stringify({...form, id:uuidv4() }) })
      

      // localStorage.setItem("passwords",JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      // console.log([...passwordArray, form]);

      setform({ URL: "", username: "", password: "" });

      // Add the new password to the password array and localStorage
      // const updatedPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
      // setPasswordArray(updatedPasswordArray);
      // localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));

      // // Clear the form fields
      // setform({ URL: "", username: "", password: "" });
    } else {
      alert("Can't save empty");
    }
  };

  const deletePassword = async (id) => {
    console.log("delete the", id);

    let cnfrm = confirm("Are you sure you want to delete?");
    if (cnfrm) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res =await fetch("http://localhost:3000", {method: "DELETE", headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id}) })
      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter((item) => item.id !== id)));
      toast.error("Deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    console.log("edit the", id);
    setform({...passwordArray.filter((item) => item.id === id)[0], id:id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    // let a = e.target.name
    // console.log(a)
    // let a = e.target.value
    // console.log(a)

    // let a = {...form, [e.target.name]: e.target.value}
    // console.log(a)

    setform({ ...form, [e.target.name]: e.target.value });
  };

  const Copytext = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className=" p-2 md:px-0 md:my-container text-white">
        <h1 className="text-4xl font-bold text-center ">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-400 text-center text-base">
          Your own Password Manager.
        </p>
        <div className="text-black flex flex-col p-4 gap-8 items-center">
          <input
            value={form.URL}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border-2 border-green-500 w-full py-1 p-4"
            type="text"
            name="URL"
            id="URL"
          />
          <div className="flex md:flex-row flex-col justify-between w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border-2 border-green-500 w-full py-1 px-4"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={Passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border-2 border-green-500 w-full py-1 px-4"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute text-black right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  src="icons/eye.png"
                  width={26}
                  alt="Eye"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            onMouseEnter={() =>
              document
                .getElementById("password-icon")
                .dispatchEvent(new Event("mouseenter"))
            }
            onMouseLeave={() =>
              document
                .getElementById("password-icon")
                .dispatchEvent(new Event("mouseleave"))
            }
            className="font-medium w-fit  gap-2 flex items-center justify-center bg-green-600 hover:bg-green-500 px-8 border border-green-900 py-1 rounded-full "
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              id="password-icon"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="showCase">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-700">
                <tr>
                  <th className="py-2">Website</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 text-black">
                {passwordArray.map((items, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2 border border-black">
                        <div className="flex justify-center items-center">
                          <a
                            className="hover:underline"
                            href={items.URL}
                            target="_blank"
                          >
                            {items.URL}
                          </a>
                          <div
                            className="lordiconCopy cursor-pointer size-7"
                            onClick={() => {
                              Copytext(items.URL);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "23px",
                                height: "23px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-black w-32">
                        <div className="flex justify-center items-center">
                          <span>{items.username}</span>
                          <div
                            className="lordiconCopy cursor-pointer size-7"
                            onClick={() => {
                              Copytext(items.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "23px",
                                height: "23px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-black w-32">
                        <div className="flex justify-center items-center">
                          <span>{"*".repeat(items.password.length)}</span>
                          <div
                            className="lordiconCopy cursor-pointer size-7"
                            onClick={() => {
                              Copytext(items.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "23px",
                                height: "23px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/wzwygmng.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-black w-28">
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            deletePassword(items.id);
                          }}
                        >
                          <lord-icon
                            style={{ width: "23px", height: "23px" }}
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-2"
                          onClick={() => {
                            editPassword(items.id);
                          }}
                        >
                          <lord-icon
                            style={{ width: "23px", height: "23px" }}
                            src="https://cdn.lordicon.com/ghhwiltn.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

// const clearAllLocalStorage = () => {
//   localStorage.clear();
//   setPasswordArray([]); // Clear the local state as well
//   console.log("All localStorage data cleared.");
// };
{
  /* <button
            onClick={clearAllLocalStorage} // Clear passwords from localStorage
            className="font-medium w-fit  gap-2 flex items-center justify-center bg-red-600 hover:bg-red-500 px-8 border border-red-900 py-1 rounded-full mt-4"
          >
            Clear Passwords
          </button> */
}
