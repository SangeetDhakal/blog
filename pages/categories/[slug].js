import Head from 'next/head';
import Link from 'next/link';

import React,{useState} from 'react'
import Layout from '../../components/Layout';
import { singleCategory } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard';

const Category = ({ category, blogs, query, totalBlogs,blogsLimit, blogSkip, }) => {


    const head = () => (
        <Head>
            <title>
                {category.name} | {APP_NAME}
            </title>
            <meta name="description" content={`Best programming tutorials on ${category.name}`} />
            <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:title" content={`${category.name}| ${APP_NAME}`} />
            <meta property="og:description" content={`Best programming tutorials on ${category.name}`} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );
 
    const [limit, setLimit] = useState(blogsLimit)
    const [skip, setSkip] = useState(0)
   
    
    const [size, setSize] = useState(totalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([])

    const loadMore = () => {
        let toSkip = skip + limit
        singleCategory(toSkip, limit, query.slug).then(data => {
            if (data.error) {
                console.log(data.error)

            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
                
                
            }
        })
    }


    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (<button onClick={loadMore} className="btn btn-outline-primary btn-lg">Load More</button>)
        )
    }

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (<div className="col-md-4" key={i}>
                <SmallCard blog={blog} />
            </div>
            )
        })
    }
    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <SmallCard blog={blog} />
            </div>
        ))
    }

    const showNice = () => {
        return blogs.map((blog, i) => (
            <div className="col-md-4" key={i}>
                
                    <SmallCard blog={blog} />
                
                 
            </div>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                                <div className="row pl-5 pr-5">
                        {showAllBlogs()}
                    
                        {showLoadedBlogs()}
                    </div>
                    <div className="text-center pt-5 pb-5">
                        {loadMoreButton()}
                    </div>
                                
                                
                            </div>
                            
                        </header>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Category.getInitialProps = ({ query }) => {
    let skip = 0
    let limit = 6
    return singleCategory(skip,limit,query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { category: data.category, blogs: data.blogs, query ,totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip};
        }
    });
};

export default Category;
