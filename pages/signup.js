import Layout from '../components/Layout'
import SignupComponent from '../components/auth/SignupComponent'
import Link from 'next/link';

const Signup = () => {

    return (
        <Layout>
            <h2 className='text-center pt-4 pb-4'>Signup</h2>
            <div className='row'>
                <div className="col-md-4 offset-md-4">
                <SignupComponent />
                </div>
            </div>
            

        </Layout>
    )//anything in between layout will be passed as children
};
export default Signup;