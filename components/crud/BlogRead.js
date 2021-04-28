import Link from 'next/link';
import React,{ useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBlog } from '../../actions/blog';
import moment from 'moment';

const BlogRead = ({ username }) => {
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBlogs(data);
            }
        });
    };

    const deleteBlog = slug => {
        removeBlog(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBlogs();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your blog?');
        if (answer) {
            deleteBlog(slug);
        }
    };

    const showUpdateButton = blog => {
        if (isAuth() && isAuth().role === 0) {
            return (
                
                    <a href={`/user/crud/${blog.slug}`} className="ml-2 btn btn-sm btn-info float-right ml-5">Update</a>
                
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                
                    <a href={`/admin/crud/${blog.slug}`} className="ml-2 btn btn-sm btn-info float-right ml-5">Update</a>
               
            );
        }
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <div key={i} className="pb-1">
                    <h5>
                        <Link href={`../../blogs/${blog.slug}`}><a>{blog.title}</a></Link></h5>
                    <p className="mark">
                        Written by {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()}
                    
                    <button className="btn btn-sm btn-danger float-right ml-5" onClick={() => deleteConfirm(blog.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(blog)}
                    </p>
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {showAllBlogs()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default BlogRead;
