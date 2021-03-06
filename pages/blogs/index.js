import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import React, { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import SmallCard from '../../components/blog/SmallCard';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

    const head = () => (
        <head>
            <title>WIKI STACKS | {APP_NAME} </title>
            <meta
                name="description"
                content="Wiki of upcoming celebrities along with News and Entertainment."
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Wiki of upcoming celebrities along with News and Entertainment. | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Wiki of upcoming celebrities along with News and Entertainment."
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" ccontent={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </head>
    )

    const [limit, setLimit] = useState(blogsLimit)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(totalBlogs)
    const [loadedBlogs, setLoadedBlogs] = useState([])

    const loadMore = () => {
        let toSkip = skip + limit
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
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


   
    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    }

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
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

    // const showNice = () => {
    //     return blogs.map((blog, i) => (
    //         <div className="col-md-4" key={i}>
                
    //                 <SmallCard blog={blog} />
                
                 
    //         </div>
    //     ));
    // };


    return (

        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">
                                    WIKI STACKS
                                </h1>
                            </div>
                            <section>
                                <div className="pb-5">
                                    {showAllCategories()}
                                    {showAllTags()}
                                    <br />
                                </div>
                            </section>

                        </header>
                    </div>
                    <div className="col-md-12 pt-3">
                    <div className="row pl-5 pr-5">
                        {showAllBlogs()}
                    
                        {showLoadedBlogs()}
                    </div>
                    <div className="text-center pt-5 pb-5">
                        {loadMoreButton()}
                    </div>
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    )
} 
 
Blogs.getInitialProps = () => {
    let skip = 0
    let limit = 6

    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip

            }
        }
    })
}
export default withRouter(Blogs);
