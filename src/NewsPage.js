import { useState, useEffect } from "react";
import axios from "axios";
import NewsCard from "./components/NewsCard";
import ReactPaginate from "react-paginate";

const NewsPage = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [query, setQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        setQuery(searchInput);
    }

    const handlePageChange = event => {
        setCurrentPage(event.selected);
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://hn.algolia.com/api/v1/search?", {
                    params: { page: currentPage, query, tags: "story" },
                });
                const { hits, nbPages } = data;
                hits.sort((a, b) => (a.points > b.points) ? -11 : 1);
                setArticles(hits);
                setTotalPages(nbPages);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [currentPage, query]);

    return (
        <div className="container">
            <h1>Hacker News</h1>
            <form className="search-form" action="submit" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search for news"
                />
                <button type="submit">Search</button>
            </form>
            <div className="container">
                {
                    isLoading ? (<p>Loading.....</p>) : (articles.map(article => <NewsCard article={article} key={article.objectID} />
                    ))
                }
            </div>
            <ReactPaginate
                nextLabel=">>"
                previousLabel="<<"
                breakLabel="..."
                forcePage={currentPage}
                pageCount={totalPages}
                renderOnZeroPageCount={false}
                onPageChange={handlePageChange}
                className="pagination"
                activeClassName="active-page"
                previousClassName="previous-page"
                nextClassName="next-page"
            />
        </div>
    )
};

export default NewsPage;