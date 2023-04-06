import React, { useEffect, useState } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'
import axios from 'axios';

import NewsItem from './NewsItem'
import Spinner from './Spinner';

const News = (props) => {
    News.defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }
    News.propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // const updateNews = async () => {
    //     props.setProgress(10);
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=83f8f6b2db95495b8d0512d272a2efc9&page=${page}&pageSize=${props.pageSize}`;
    //     setLoading(true)
    //     const data = await fetch(url);
    //     props.setProgress(30);
    //     const parsedData = await data.json()
    //     props.setProgress(70);
    //     setArticles(parsedData.articles)
    //     setTotalResults(parsedData.totalResults)
    //     setLoading(false)
    //     props.setProgress(100);
    // }
    
    useEffect(() => {
       document.title = `${capitalizeFirstLetter(props.category)} - NewsFeedly`;
       updateNews();
    }, [])
   

    const updateNews = async () => {
  props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines`;
  const params = {
    country: props.country,
    category: props.category,
    apiKey: '83f8f6b2db95495b8d0512d272a2efc9',
    page: page,
    pageSize: props.pageSize
  };
  setLoading(true);
  try {
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json'
      },
      params: params
    });
    props.setProgress(30);
    const parsedData = response.data;
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  } catch (error) {
    console.error(error);
  }
};


   
//     const updateNews = async () => {
//   props.setProgress(10);
//   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=83f8f6b2db95495b8d0512d272a2efc9&page=${page}&pageSize=${props.pageSize}`;
//   setLoading(true);
//   try {
//     const response = await axios.get(url);
//     props.setProgress(30);
//     const parsedData = response.data;
//     props.setProgress(70);
//     setArticles(parsedData.articles);
//     setTotalResults(parsedData.totalResults);
//   } catch (error) {
//     console.error(error);
//   }
//   setLoading(false);
//   props.setProgress(100);
//     };


const fetchMoreData = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=83f8f6b2db95495b8d0512d272a2efc9&page=${page + 1}&pageSize=${props.pageSize}`;
  setPage(page + 1);
  try {
    const response = await axios.get(url);
    const parsedData = response.data;
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  } catch (error) {
    console.error(error);
  }
};

    // const fetchMoreData = async () => {

    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=83f8f6b2db95495b8d0512d272a2efc9&page=${page + 1}&pageSize=${props.pageSize}`;
       
    //     setPage(page + 1)

    //     let data = await fetch(url);
    //     let parsedData = await data.json()
    //     setArticles(articles.concat(parsedData.articles))
    //     setTotalResults(parsedData.totalResults)
    // };
    const getHeadingView = () => (
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px', color: 'white' }}>Top {capitalizeFirstLetter(props.category)} Headlines</h1>
    )
    const getNewsItem = (element) => (
        <div className="col-md-4" key={element.url}>
            <NewsItem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                source={element.source.name} />
        </div>
    )
    const getAllNewsCardView = () => (
        <div className="container">

            <div className="row">
                {articles.map(getNewsItem)}
            </div>
        </div>
    )
    return (
        <div>
            {getHeadingView()}
            {loading && <Spinner />}
            {console.log(articles.length)}
            <InfiniteScroll
                dataLength={articles}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                {getAllNewsCardView()}
            </InfiniteScroll>
        </div>
    )
}
export default News