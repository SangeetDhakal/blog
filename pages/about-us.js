import Layout from '../components/Layout';
import Image from 'next/image'


const about=()=>{
    return (
        <Layout>
            <div className="container-fluid">
                <h1 className="text-center pt-4 pb-4">About Us</h1></div>
                <div className="row ml-5 mr-5">
            <div className="col-md-8">
                
            <h3>Who are we?</h3>
            <p>WIKI STACKS is a movement for creative excellence in storytelling celebrating the extraordinary of every day. Launched in 2021, WIKI STACKSs’ primary motto is to provide all the information about upcoming celebrities so that you get all the information that you desire. Our team does all the heavy lifting- the tiring process of going through social media posts and countless interviews to provide you with the must accurate information that is available.</p>
            <p>For upcoming artists and celebrities we provide a medium using which their fan following can know more about their personal life so that they remain attached and in turn help the upcoming celebrities grow. We understand that not everything that we write may be 100 percent correct. In case anyone wants to make changes to their articles or delete their article then you can contact us through our <a href="contact">contact page.</a></p>
            <p>If anyone wants to publish their own biography then feel free to contact us through our <a href="contact">contact us</a> page</p>
            <h3>Where are we located?</h3>
            <p>We are located at 413, Nursery Lane Marg, Bansbari, Kathmandu. Feel free to contact us through mail or postal service or any other means. We will try our best to get back to you.</p>
            
            
            
            </div>
            <div className="col-md-4"><Image
                                        src="https://res.cloudinary.com/wikistacks/image/upload/v1619968390/detective_rsyedi.webp"
                                        width={400}
                                        height={400}
                                        
                                    /></div>
</div>
                
        </Layout>
    );
}
export default about

