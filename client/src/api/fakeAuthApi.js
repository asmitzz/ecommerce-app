export const login = (email, password, users) => {

    const findUser = (email) => {
        return users.find( user => user.email === email)
    }

    return new Promise((resolve, reject) => {
        setTimeout( () => {
           const user = findUser(email);
           
           if( user && password === user.password ){
               resolve({ success: true,status:200,message:"Successfully logged in"});
           }
           else if(!user){
             reject({ success: false,status:404,message:"Email address is not registered"});
           }
           reject({ success: false,status:401,message:"Invalid password"});
        },2000)
    })
}

export const signup = (email,users) => {

    const findUser = (email) => {
        return users.find( user => user.email === email)
    }

    return new Promise((resolve, reject) => {
        setTimeout( () => {
           const user = findUser(email);
           
           if( user ){
               reject({ success: false,status:409,message:"Email address is already registered"});
           }
           
           resolve({ success: true,status:200,message:"Successfully signed up"});
        },2000)
    })
}