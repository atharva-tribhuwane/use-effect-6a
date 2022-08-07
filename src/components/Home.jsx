import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'



export const Home = () => {
    const [defau, setDefau] = useState("react");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [val,setVal] = useState("")

    const getData =()=>{
        setLoading(true);
        fetch(`https://api.github.com/search/repositories?q=${defau}`)
            .then(res => res.json())
            .then(data1 => { setData(data1.items); setLoading(false); })
    }

    const handleaddinp =()=>{
        console.log("invoking");
        setDefau(val);
        getData();
    }
    useEffect(() => {
      getData()
    }, [defau])
    
    return (
        <>
        {console.log(data)}
            {
                
                loading ? <div>Loading.... Please Wait</div> : 
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
                    <div>
                        <input type="text" placeholder='Search A Repo...' value={val} onChange={(e)=>setVal(e.target.value)}/>
                        <button onClick={()=>handleaddinp()}>Submit</button>
                    </div>
                    <table border={1} >
                        <thead>
                            <tr>
                                <th>Repo Name</th>
                                <th>Full Name</th>
                            </tr>
                        </thead>
                        <tbody>


                            {
                                data.map((el) => {
                                    return (
                                        <tr key={el.id}>
                                            <td>

                                                {el.name}

                                            </td>
                                            <td>

                                                {el.full_name}

                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}
