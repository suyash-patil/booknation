import axios from 'axios'
import React,{useState,useEffect} from 'react'

const ProfileScreen = ({history}) => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [edit,setEdit] = useState(false)
  const [user,setUser] = useState(null)
  const [oldpassword,setOldPassword] = useState('')
  const [newpass,setNewPass]= useState('')



  const updateHandler = async () => {
    const { token } = JSON.parse(localStorage.getItem('userInfo'))
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
    const {data} = await axios.put(`/api/users/profile/update`,{email,name,oldpassword,newpass},config)
    localStorage.setItem('userInfo',JSON.stringify(data))
  }



  useEffect(() => {
    if (!localStorage.getItem('userInfo')){
      history.push('/')
    }
    else {
      const { email,name, token } = JSON.parse(localStorage.getItem('userInfo'))
      setUser(JSON.parse(localStorage.getItem('userInfo')))
      setName(name)
      setEmail(email)

    }

  },[history])
  return (
//     <div>
//       {user && <>
//         { edit?(<>
//         <input value={name} onChange={(e) => setName(e.target.value)} />
//         <h2>{email}</h2>
//       </>) : (<>
//     <h2>{name}</h2>
//     <h2>{email}</h2>
//   </>)
// }
//       </>
//         <button onClick={() => setEdit(true)}>edit</button>
//         <button onClick={updateHandler}>Save</button>}
//     </div>
//     <div>
    <div>

        { edit ? (<>
         <input value={name} onChange={(e) => setName(e.target.value)} />
         <h2>{email}</h2>
         Change Password
         <input value={oldpassword} onChange={(e) => setOldPassword(e.target.value)}/>
         <input value={newpass} onChange={(e) => setNewPass(e.target.value)}/>
       </>) : (<>
     <h2>{name}</h2>
     <h2>{email}</h2>
   </>)
}
        <button onClick={() => setEdit(true)}>edit</button>
         <button onClick={updateHandler}>Save</button>


    </div>
  )
}

export default ProfileScreen
