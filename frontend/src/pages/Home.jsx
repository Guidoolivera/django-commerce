import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import api from '../api';
import Article from '../components/Article';
import '../styles/index.css';


function Home() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticles();
    }, []);

    const getArticles = () => {
        api
            .get("/api/articles/")
            .then((res) => res.data)
            .then((data) => { setArticles(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteArticle = (id) => {
        api.delete(`/api/articles/delete/${id}/`).then((res) => {
            if (res.status === 204) toast.success("Article deleted.", {
                position: "top-right",
                style: {
                    background: "#101010",
                    color: "white"
                }
            })
            else alert("Failed to delete article.")
            getArticles();
        }).catch((error) => alert(error))
    };
    return (
        <div>
            <h2 className="text-center text-white text-3xl font-bold text-neutral-900 mb-5">Publicaciones</h2>

            <div className="grid grid-cols-3 gap-2 mt-15">
                {articles.map((article) => (
                    <Article article={article} onDelete={deleteArticle} key={article.id} />
                ))}
            </div>

        </div>
    );
}

export default Home;