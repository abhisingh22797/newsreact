import axios from 'axios';
import React, { useState, useEffect } from 'react';


const News = () => {
    var [laoder, setloader] = useState(true);
    const [News, setNews] = useState([]);
    const [Country, setCountry] = useState("in");
    const [Category, setCategory] = useState("general");
    const [SearchData, setSearchData] = useState("");


    useEffect(() => {
        if (SearchData == "") {
            let key = "262ca29f445840a596e6301fc64290dd";
            let apiUrl = "/top-headlines";

            axios({
                url: apiUrl, method: "get", headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',

                }, data: {}, params: {
                    country: Country,
                    category: Category,
                    apiKey: key,
                }
            }).then((response) => {

                console.log(">>>>>>>>", response.data.articles);
                if (response.data.articles) {
                    setloader(false)
                    setNews(response.data.articles)
                    console.log(News);
                }

            }, (error) => { })
        } else {
            let key = "262ca29f445840a596e6301fc64290dd";
            let apiUrl = "/everything";
            axios({
                url: apiUrl, method: "get", headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',

                }, data: {}, params: {
                    q: SearchData,

                    apiKey: key,
                }
            }).then((response) => {

                console.log(">>>>>>>>", response.data.articles);
                if (response.data.articles) {
                    setloader(false)
                    setNews(response.data.articles)
                    console.log(News);
                }

            }, (error) => { })

        }
    }, [Country, Category, SearchData])

    const onContryChange = (event) => {
        setCountry(event.target.value)
        console.log(Country)
    }
    const onCategoryChange = (event) => {
        setCategory(event.target.value)
        console.log(Category)
    }
    const onInputChange = (event) => {
        setSearchData(event.target.value)
        console.log(Category)
    }
    const passingdata = News.map((data) => {

        return (
            <div className="col-sm-4 blog-list">
                <img src={data.urlToImage} alt="" className="img-responsive" />
                <div className="blog-list-content">
                    <div className="title rainbow">
                        <a href={data.url} target="_blank">
                            {data.title}
                        </a></div>
                    <p>{data.content}</p>
                    <div className="blog-footer"> <b> Source: </b>{data.source.name} <span> {data.publishedAt}</span></div>
                </div>
            </div>


        )

    })


    return (




        <div>

            <nav className="navbar navbar-light " style={{ backgroundColor: '#e3f2fd' }}>
                <a className="navbar-brand">Latest News</a>
                <form className="form-inline">
                    <select class="form-control" onChange={onContryChange}>
                        <option value="">Select Country</option>
                        <option value="ae">ae</option>
                        <option value="ar">ar</option>
                        <option value="at">at</option>
                        <option value="au">au</option>
                        <option value="be">be</option>
                        <option value="bg">bg</option>
                        <option value="br">br</option>
                        <option value="ca">ca</option>
                        <option value="in">in</option>
                    </select>
                    <select class="form-control" onChange={onCategoryChange}>
                        <option value="">Select Category</option>
                        <option value="business">business</option>
                        <option value="entertainment">entertainment</option>
                        <option value="general">general</option>
                        <option value="health">health</option>
                        <option value="science">science</option>
                        <option value="sports">sports</option>
                        <option value="technology">technology</option>
                    </select>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onInputChange} />

                </form>
            </nav>
            {laoder && <div class="m-5 p-5">
                <div class="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>}
            <section className="blog">


                <div className="container">

                    <div className="row">

                        {passingdata}


                    </div>
                </div>
            </section>

        </div>
    )
}

export default News;