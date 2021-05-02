import Layout from '../components/Layout'


import Link from 'next/link'
const Index = () => {

    
    return <Layout>
        
       
            <article className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                        <div id="container">
  
  <div id="flip">
    <div><div>Wiki</div></div>
    <div><div>News</div></div>
    <div><div>Entertainment</div></div>
    
  </div>
  Stacks !!
</div>


                        </div>
                    </div>
                </div>
                
</article>
<article className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center pt-4 pb-5">
                            <p className="lead">
                            Wiki, News & Entertainment related to your favourite celebs!!!
                            </p>
                        </div>
                    </div>
                 
                </div>
                
            </article>
        </Layout>
        

   //anything in between layout will be passed as children
};
export default Index;