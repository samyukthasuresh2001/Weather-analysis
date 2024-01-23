import React,{useState} from 'react'
import './App.css'
import axios from 'axios'

function Home() {
    const [data,setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2
    })
    const [name,setName] = useState('');
    const [error,setError] = useState('')
    

   const handleClick = ()=>{
        if(name !== ""){
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=9db13d338ff708108e82e14fad8a7e91&units=metric`
            axios.get(apiUrl)
            .then(res => {
                setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed})
                setError('');
            })
            .catch(err => {
                if(err.response.status === 404){
                    setError("Invalid City Name")
                }else{
                    setError('')
                }
                console.log(err)
            })

        }
    }
  return (
    <div className='container'>
       <div className='weather'>
         <div className='search'>
            <input type='text' placeholder='Enter city name'onChange={e => setName(e.target.value)}/>
            <button><img src='/images/search-image.png' onClick={handleClick} alt='search'/></button>

        </div>
        <div className='error'>
            <p>{error}</p>
        </div>
        <div className='winfo'>
            <h1>{Math.round(data.celcius)}°c</h1>
            <h2>{data.name}</h2>
            <div className='details'>
                <div className='col'>
                    <div className='humidity'>
                        <p>{Math.round(data.humidity)}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className='col'>
                <div className='wind'>
                        <p>{Math.round(data.speed)} km/h</p>
                        <p>Wind</p>
                    </div>
                </div>
            </div>
        </div>

       </div>

      
    </div>
  )
}

export default Home

