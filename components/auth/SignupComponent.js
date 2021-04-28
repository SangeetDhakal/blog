import React,{useState, useEffect} from "react" //useState is imported so that we can capture the onChange value and send to backend
import Router from 'next/router'
import {signup, isAuth} from '../../actions/auth'


const SignupComponent =()=>{

    const[values,setValues]=useState({
        name:'Ryan',
        email:'ryan@gmail.com',
        password:'rrrrrr',
        error:'',
        loading:false,
        message:'',
        showForm:true //to hide form once we create
    })

    const{name,email,password,error,loading,message,showForm}=values //to make it easier to extract values

        //redirect loggedin user if they try to access signin and signup pages
    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);


    const handleSubmit=(e)=>{//handleChange function is created to type letters in form as we type
        e.preventDefault() //to prevent page from loading on event change
    //    console.table({name,email,password,error,loading,message,showForm})
        setValues({ ...values,loading:true,error:false})
        const user={name,email,password}
        signup(user)
        .then(data =>{
            if(data.error){
                setValues({ ...values,error:data.error,loading:false})
            } else{
                setValues({ ...values,name:'',email:'',password:'',error:'',loading:false,message: data.message,showForm:false})
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
 
    const signupForm=()=>{
        return(
            <form on onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Type your Name"/> 
                </div>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} type="email" className="form-control" placeholder="Type your Email"/> 
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} type="password" className="form-control" placeholder="Type your Password"/> 
                </div>

                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
            

        )
    }
    

    return (
        <React.Fragment>

            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </React.Fragment>

    )
}

export default SignupComponent