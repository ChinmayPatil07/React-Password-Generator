import React, { useRef, useState } from 'react';
import './App.css'
import { useCallback } from 'react';
import { useEffect } from 'react';

function App() {

    const [password, setPassword] = useState("")
    const [capitals, setCapitals] = useState(true)
    const [lowers, setLowers] = useState(false)
    const [numbers, setNumbers] = useState(false)
    const [specials, setSepcials] = useState(false)
    const [length, setLength] = useState(8)

    const generatePassword = useCallback(() => {
        let str = ""
        if (capitals) str += "QWERTYUIOPASDFGHJKLZXCVBNM"
        if (lowers) str += "qwertyuiopasdfghjklzxcvbnm"
        if (numbers) str += "0123456789"
        if (specials) str += "!@#$%^&*()-=_+[]{}?"
        let pass = ""
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * str.length);
            pass += str.charAt(randomIndex);
        }
        setPassword(pass)
    }, [capitals, lowers, numbers, specials, length, setPassword]
    )

    useEffect(() => {
        generatePassword()
    }, [capitals, lowers, numbers, specials, length])

    const qualityLevel = () => {
        if (length <= 4) return { level: "Very Weak", color: "bg-red-700" };
        else if (length >= 5 && length <= 7) return { level: "Weak", color: "bg-orange-600" };
        else if (length >= 8 && length <= 10) return { level: "Good", color: "bg-yellow-500" };
        else if (length >= 11 && length <= 15) return { level: "Strong", color: "bg-lime-700" };
        else return { level: "Very Strong", color: "bg-green-700" };
    }

    const passRef = useRef(null)

    const copyToClipboard = () => {
        passRef.current?.select()
        window.navigator.clipboard.writeText(password)
    }

    const handleSliderChange = (event) => {
        setLength(Number(event.target.value));
    };

    const handleCheckbox = (ind) => {
        if(ind == 1) {
            if(!capitals || lowers || numbers || specials) setCapitals(prev => !prev)
        }
        else if(ind == 2) {
            if(capitals || !lowers || numbers || specials) setLowers(prev => !prev)
        }
        else if(ind == 3) {
            if(capitals || lowers || !numbers || specials) setNumbers(prev => !prev)
        }
        else if(ind == 4) {
            if(capitals || lowers || numbers || !specials) setSepcials(prev => !prev)
        }
        console.log(capitals, lowers, numbers, specials);
    }

    return (
        <div className="password-generator-app w-2/5 bg-gray-100 px-12 py-6 rounded-xl shadow-xl">
            <h1 className='text-3xl w-full text-center border-b-2 border-b-gray-600 pb-4 mb-8'>Password Generator</h1>
            <div className="password-display-container flex justify-between h-12 gap-0">
                <div className="password-box flex flex-grow justify-between items-center bg-gray-300 rounded-l-lg">
                    <input type="text" readOnly value={password} className='bg-transparent mx-4 flex-grow outline-none' ref={passRef} />
                    <div className={`password-quality ${qualityLevel().color} text-white px-4 py-1 rounded-lg`}>{qualityLevel().level}</div>
                    <img width="14px" height="14px" className='mx-3 cursor-pointer' src="https://cdn.pixabay.com/photo/2013/07/13/12/20/recycle-159650_1280.png" alt="" onClick={generatePassword} />
                </div>
                <button className='bg-gray-800 text-white px-8 rounded-r-lg transition-all hover:bg-gray-700' onClick={copyToClipboard}>Copy</button>
            </div>

            <div className="password-customization-container">
                <div className="password-length-box flex justify-between mt-8 mb-4 gap-4 items-center">
                    <label htmlFor="rangeInput" className='password-length flex-grow-0 font-semibold text-lg'>Password Length : </label>
                    <p className='flex-grow-0 mr-14 font-semibold w-24'>{length}</p>
                    <div className="range-min flex-grow-0 border px-3 cursor-pointer hover:bg-slate-700 hover:text-white transition-all 
                    text-xl font-semibold pb-1 border-gray-600 rounded-full" onClick={() => setLength(prev => (prev > 1) ? prev - 1 : 1)}>-</div>

                    <input type="range" min="1" max="100" step="1" className='slider' value={length} onChange={handleSliderChange} />

                    <div className="range-plus flex-grow-0  border px-2.5 cursor-pointer hover:bg-slate-700 hover:text-white transition-all text-xl font-semibold pb-1 border-gray-600 rounded-full" onClick={() => setLength(prev => (prev < 100) ? prev + 1 : 100)}>+</div>
                </div>


                <div className="password-characters-box flex justify-between">
                    <label htmlFor="" className='text-lg font-semibold mr-16'>Character Used : </label>
                    <div className="capital-words flex items-center gap-3">
                        <input type="checkbox" className='w-4 h-4 border-2 border-gray-700 rounded-md ' checked={capitals}
                            onChange={() => (handleCheckbox(1))}
                        />
                        <p className='text-lg font-semibold'>ABC</p>
                    </div>
                    <div className="small-words flex items-center gap-3">
                        <input type="checkbox" className='w-4 h-4 border-2 border-gray-700 rounded-md ' checked={lowers}
                            onChange={() => (handleCheckbox(2))}
                        />
                        <p className='text-lg font-semibold'>abc</p>
                    </div>
                    <div className="numbers flex items-center gap-3">
                        <input type="checkbox" className='w-4 h-4 border-2 border-gray-700 rounded-md ' checked={numbers}
                            onChange={() => (handleCheckbox(3))}
                        />
                        <p className='text-lg font-semibold'>123</p>
                    </div>
                    <div className="special-characters flex items-center gap-3">
                        <input type="checkbox" className='w-4 h-4 border-2 border-gray-700 rounded-md ' checked={specials}
                            onChange={() => (handleCheckbox(4))}
                        />
                        <p className='text-lg font-semibold'>!@#</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
