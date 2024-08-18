import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Savedpasswords = ({ passwordArray, setpasswordArray, setForm }) => {
  const copyText = (text) => {
    toast('copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
    navigator.clipboard.writeText(text);
  };

  const deletePassword = async (id) => {
   
    let confirmEdit = confirm("Do you want to delete");
    if(confirm){
    setpasswordArray(passwordArray.filter(item => item.id !== id));
    await await fetch('http://localhost:3000/',{
      method: 'DELETE',
      headers: { "Content-Type": "application/json" },
      body:JSON.stringify({ id }),
     })
    }
   
  };

  const editPassword = (id) => {
    let confirmEdit = confirm("Do you want to edit");
    if (confirmEdit) {
     
      setForm({...passwordArray.find(i => i.id === id),edit_id:id});
      setpasswordArray(passwordArray.filter(item => item.id !== id));
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <h1 className="text-center text-xl font-semibold mb-4">Your Passwords</h1>
      <div className="overflow-x-auto md:mycontainer savepasswords flex justify-center items-center">
        {passwordArray.length === 0 && <div>No passwords saved</div>}
        {passwordArray.length !== 0 && (
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left border">Site</th>
                <th className="py-2 px-4 text-left border">Username</th>
                <th className="py-2 px-4 text-left border">Password</th>
                <th className="py-2 px-4 text-left border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((item) => (
                <tr key={item.id} className="bg-white hover:bg-gray-50">
                  <td className="py-2 px-4 border break-words">
                    <a href={item.site} target="_blank" rel="noopener noreferrer">
                      {item.site}
                    </a>
                  </td>
                  <td
                    className="py-2 px-4 border break-words cursor-pointer"
                    onClick={() => copyText(item.username)}
                  >
                    {item.username}
                    <lord-icon
                      style={{ width: "25px", height: "25px", paddingLeft: "5px" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                    ></lord-icon>
                  </td>
                  <td
                    className="py-2 px-4 border break-words cursor-pointer"
                    onClick={() => copyText(item.password)}
                  >
                    {item.password}
                    <lord-icon
                      style={{ width: "25px", height: "25px", paddingLeft: "5px" }}
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                    ></lord-icon>
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <span className="cursor-pointer mx-1" onClick={() => editPassword(item.id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                    <span className="cursor-pointer mx-1" onClick={() => deletePassword(item.id)}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ width: "25px", height: "25px" }}
                      ></lord-icon>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Savedpasswords;
