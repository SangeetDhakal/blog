import fetch from 'isomorphic-fetch';
import { BlogJsonLd, NextSeo } from 'next-seo';
import Head from 'next/head';
import Image from 'next/image'
import CookieConsent from "react-cookie-consent";
import Link from 'next/link';
import LayoutBlog from '../../components/Layoutblog';
import React, { useState, useEffect } from 'react';
import { singleBlog, listRelated,list } from '../../actions/blog';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/blog/SmallCard'
import DisqusThread from '../../components/DisqusThread';

const SingleBlog = ({ blog}) => {

    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ blog }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);
    const head = () => (
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${blog.slug}`} />
            <meta property="og:title" content={`${blog.title}| ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${blog.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            
   

        </Head>
    );

    const  makeJobSchema =()=> {
        
        return {
            // schema truncated for brevity
            '@context': 'http://schema.org',
            '@type': 'Article',
            "inLanguage":"en-US",

            
            dateUpdated: `${blog.updatedAt}`,
            description: blog.mdesc,
            headline: blog.title,
            excerpt:blog.excerpt,
            image:`${API}/blog/photo/${blog.slug}`,
            slug:blog.slug,
            author:blog.postedBy.username

            
        }
    }

    const JobSchema=blog=> {
        return (
            <script
                
                type='application/ld+json'
                dangerouslySetInnerHTML={{ __html: JSON.stringify(makeJobSchema(blog)) }}
            />
        )
    }



    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };

    const showComments = () => {
        return (
            <div>
                <DisqusThread id={blog.id} title={blog.title} path={`/blog/${blog.slug}`} />
            </div>
        );
    };

    // const myLoader=({src,width,quality})=>{
    //     return (`${API}/blog/photo/${blog.slug}`)
    //     }

    return (
        <React.Fragment>
            {head()}
            {JobSchema()}
            <LayoutBlog>
                <main>
                    <article>
                        <div className="container-fluid ">
                            <section>
                                <div className="col-md-11 mx-auto" style={{ marginTop: '0px' }}>
                                    <Image
                                        // loader={myLoader}
                                        src={`${API}/blog/photo/${blog.slug}`}
                                        alt={blog.title}
                                        priority={true}
                                        height={300}
                                        width={400}
                                        layout="responsive"
                                        quality={50}
                                        
                                        
                                    />
                                </div>
                            </section>

                            <section>
                                <div className="container">
                                    <h1 className="col-md-12 pb-3 pt-3">{blog.title}</h1>
                                    <p className="col-md-9 lead mt-3 mark">
                                        Written by <Link href={`/profile/${blog.postedBy.username}`}><a>{blog.postedBy.username}</a></Link> | Published {moment(blog.updatedAt).fromNow()}
                                    </p>

                                    <div className="pb-3">
                                        {showBlogCategories(blog)}
                                        {showBlogTags(blog)}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="container">
                            <section>
                                <div className="col-md-9 lead">{renderHTML(blog.body)}</div>
                            </section>
                        </div>
                        <CookieConsent
                            
                            location="bottom"
                            enableDeclineButton
                            onDecline={() => {
                                alert("nay!");
                            }}
                            buttonText="Sure!!"
                            cookieName="myAwesomeCookieName2"
                            style={{ background: "#2B373B" }}
                            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                            expires={150}
                        >
                            We use cookies and other tracking technologies to improve your browsing experience on our website, to show you personalized content and targeted ads, to analyze our website traffic, and to understand where our visitors are coming from.{" "}

                        </CookieConsent>
                        <div className="container">
                            <h4 className="text-center pt-5 pb-5 h2">Related blogs</h4>
                            {/* {JSON.stringify(related)} */}
                            <div className="row">{showRelatedBlog()}</div>
                        </div>

                        {/* <div className="container pt-5 pb-5">{showComments()}</div> */}
                    </article>
                </main>
            </LayoutBlog>
        </React.Fragment>
    );
};

// SingleBlog.getInitialProps = ({ query }) => {
//     return singleBlog(query.slug).then(data => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
//             return { blog: data, query };
//         }
//     });
// };

export async function getStaticProps({params}) {
    const blog = await singleBlog(params.slug)
    return {props: {blog},revalidate:300,
    } 
  }
  
  export async function getStaticPaths() {
    // const paths = (await list()) || []
    return {
    //   paths: allblog.map((blog)=>`/blogs/${blog.slug}`),
    paths:[],
    // paths:[{params:{slug:'oh-looks-like-it-works'}}],
      fallback: "blocking"
    }
  }



export default SingleBlog;
