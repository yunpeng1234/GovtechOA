import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:8000',
})


const signIn = (username, password) => {
    API.post('/login', {
        name, password
    })
    .then(res=> {
        if(res?.data.name){
            const role=res?.data.role;
            console.log({"role":`${role}`, "name":`${name}`})
            setAuth({"role":`${role}`, "name":`${name}`});
            setName('');
            setPassword('');
            navigate(from, {replace : true});
        }
        else{
            console.log('incorrect submission');
            setError(res.message);
        }
    })
    console.log('working');
}
} 
