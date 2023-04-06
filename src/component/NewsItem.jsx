import React from 'react'

import "./Newstyles.scss"
const NewsItem = (props)=> {
    const { title, description, imageUrl, newsUrl, author, date, source } = props;
    
    const styles = {
        newscard: {
            container: "nfy__newscard__container",
            thumbnail: "nfy__newscard__thumbnail",
            content: "nfy__newscard__content",
            title: "nfy__newscard__title",
            text: "nfy__newscard__text",
            greyText: "nfy__newscard__greyText",
            tag: "nfy__newscard__tag",
            button: "nfy__newscard__button",
        }
    }
    const getNewsCard = () => (
        <div className={styles.newscard.container}> 
            <div className={styles.newscard.tag}> 
                <span className="badge rounded-pill bg-danger"> {source} </span>
            </div>
            <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className={styles.newscard.thumbnail} alt="..." />
                <div className={styles.newscard.content}>
                    <h5 className={styles.newscard.title}>{title}</h5>
                    <p className={styles.newscard.text}>{description}</p>
                    <p className={styles.newscard.greyText}>By {!author ? "Unknown" : author} </p>
                    <p className={styles.newscard.greyText}>{new Date(date).toGMTString()}</p>
                        <div className={styles.newscard.button}>
                            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-md btn-dark">Read More</a>
                        </div>
                </div>
        </div>
    )
    return (
        <div>
            {getNewsCard()}
        </div>
    )
}
export default NewsItem