import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import copyBtn from "./assets/copyBtn.svg";
import githubIcon from "./assets/github.svg";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [password, setPassword] = useState("");
  const [isNumbersAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(false);
  const [length, setLength] = useState(8);

  const passwordRef = useRef(null);
  


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumbersAllowed){
      str += "0123456789";
    }

    if (isSpecialCharAllowed){
      str += "@#$!*&_-.~+/"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      
    }

    setPassword(pass);

  }, [length, isNumbersAllowed, isSpecialCharAllowed, setPassword])

useEffect(() => {
  passwordGenerator()
}, [length, isNumbersAllowed, isSpecialCharAllowed, passwordGenerator])

const copyPassToClip =  useCallback(() => {
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password);
  toast.success('Copied successfully!')
}, [password])

   return (
    <>
      <div className="w-full h-screen flex items-center flex-col">
        <h1 className="text-3xl font-semibold text-white text-center mt-36 mb-8">
          Password Generator
        </h1>
        <div className="h-fit py-5 w-1/2 min-w-[300px] bg-white border-white flex flex-col justify-evenly items-center rounded-2xl">
          <div className="inputContainer h-14 w-11/12  bg-[#0175fe] rounded-xl flex outline-4  outline-black max-lg:h-10" >
            <input
              className="h-full w-10/12 px-5 text-2xl rounded-l-xl outline-none border-2 border-black max-lg:text-lg max-sm:text-base "
              type="text"
              name=""
              id=""
              placeholder="Password"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button className=" grow rounded-r-xl flex justify-center items-center border-y-2 border-r-2 border-black active:bg-[#275b97]" onClick={copyPassToClip}>
              <img src={copyBtn} alt="" className="max-lg:w-5"/>
            </button>
          </div>
          <div className="optionsContainerOuter h-fit w-11/12 py-5 rounded-xl flex items-center justify-center gap-5 max-xl:flex-col">
            <div className="optionsContainer flex gap-3">
              <input type="range" min={8} max={20} name="" value={length} id="" onChange={(e) => {
                setLength(e.target.value)
              }}/>
              <h1 className="text-xl">Length ({length}) </h1>
            </div>
            <div className="optionsContainer flex gap-3">
              <input type="checkbox" name="" id="check1" className="scale-150" defaultChecked={isNumbersAllowed}
              onChange={() => {
                setIsNumberAllowed((prev) => !prev)
              }}/>
              <label htmlFor="check1"><h1 className="text-xl">Numbers </h1></label>
            </div>
            <div className="optionsContainer flex gap-3">
              <input type="checkbox" name="" id="check2" className="scale-150" defaultChecked={isSpecialCharAllowed}
              onChange={() => {
                setIsSpecialCharAllowed((prev) => !prev)
              }}/>
              <label htmlFor="check2"><h1 className="text-xl">Special Characters </h1></label>
            </div>
          </div>
        </div>
        <div className="text-white mt-5 text-sm" >Made by</div>
        <div className="">
         <a href="https://github.com/galhotra-ravi" target="_blank" className="w-fit flex gap-1 "> <img src={githubIcon} alt="" width={15}/> <h2  className="text-white hover:text-[#0175fe]"> Ravi Kumar </h2> </a>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
