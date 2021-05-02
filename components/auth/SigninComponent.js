import Router from 'next/router'
import React,{useState, useEffect} from "react" //useState is imported so that we can capture the onChange value and send to backend
import {signin, authenticate, isAuth} from '../../actions/auth'


const SigninComponent =()=>{

    const[values,setValues]=useState({
        
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm:true //to hide form once we create
    })

    const{email,password,error,loading,message,showForm}=values //to make it easier to extract values

    //redirect loggedin user if they try to access signin and signup pages
    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit=(e)=>{//handleChange function is created to type letters in form as we type
        e.preventDefault() //to prevent page from loading on event change
    //    console.table({name,email,password,error,loading,message,showForm})
        setValues({ ...values,loading:true,error:false})
        const user={email,password}
        signin(user)
        .then(data =>{
            if(data.error){
                setValues({ ...values,error:data.error,loading:false})
            } else{
                //save user token to cookie
                //save user info to local storage
                //authenticate user
                authenticate(data,()=>{
                    if(isAuth() && isAuth().role ===1){
                        Router.push('/admin');

                    }else{
                        Router.push('/user')
                    }
                })
                
            }
        
        })
    }  

    const handleChange = name=>(e)=>{ //set user entered value in data
        setValues({...values, error:false,[name]:e.target.value}) //e.target.value sets value. [name] is just a varibale and changes as name, email, password, error:false we dont want to show errors while typing so . ...values sets values
        //console.log(e.target.value)
    }
 

    const showLoading=()=> (loading? <div className="alert alert-info">Loading...</div>:'')
    const showError=()=> (error? <div className="alert alert-danger">{error}</div>:'')
    const showMessage=()=> (message? <div className="alert alert-info">{message}</div>:'')

    const signinForm=()=>{
        return(
            <form on onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your Email"/> 
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your Password"/> 
                </div>

                <div>
                    <button className="btn btn-primary">Sign In</button>
                </div>
            </form>
            

        )
    }
    

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>

    )
}

export default SigninComponent