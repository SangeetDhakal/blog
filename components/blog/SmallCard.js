import Link from 'next/link';
import renderHTML from 'react-render-html';
import Image from 'next/image'
import moment from 'moment';
import { API } from '../../config';
import style from '../../public/Static/css/styles.module.css'



const SmallCard = ({ blog }) => {
    const myLoader=({src})=>{
        return (`${API}/blog/photo/${blog.slug}`)
        }
    return (
        
        <div className={style.card}>
            <section>
                <Link href={`/blogs/${blog.slug}`}>
                    <a>
                        <Image
                            loader={myLoader}
                            className="card-img-top"
                            height={400}
                            width={500}
                            src={`${API}/blog/photo/${blog.slug}`}
                            alt={blog.title}
                            layout="responsive"
                            objectFit="cover"
                            quality={30}
                        />
                    </a>
                </Link>
            </section>

            <div className="card-body">
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a>
                            <h5 className="card-title">{blog.title}</h5>
                        </a>
                    </Link>
                   
                </section>
            </div>
               
        </div>
       
        
    );
};

export default SmallCard;
