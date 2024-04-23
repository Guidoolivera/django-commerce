import { useEffect, useState } from "react";
import api from '../api';
import Article from '../components/Article';

function Home() {
    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

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
        api.delete(`/api/articles/${id}/`).then((res) => {
            if (res.status === 204) alert("Article deleted!");
            else alert("Failed to delete article.");
            getArticles();
        }).catch((error) => alert(error));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const createArticle = (e) => {
        e.preventDefault();

        const priceDecimal = parseFloat(price);
        const articleData = new FormData();

        articleData.append("title", title);
        articleData.append("description", description);
        articleData.append("price", priceDecimal);
        articleData.append("location", location);
        articleData.append("category", category);
        articleData.append("image", image);

        console.log("FormData:", articleData); // Verificar FormData en la consola

        api.post("/api/articles/", articleData)
            .then((res) => {
                console.log("Response:", res); // Verificar respuesta del servidor
                if (res.status === 201) {
                    alert("Article created!");
                } else {
                    console.error("Failed to create article:", res.data); // Registrar el error del servidor
                    alert("Failed to create article. See console for details.");
                }
                getArticles();
            })
            .catch((err) => {
                console.error("Error:", err); // Registrar el error de la solicitud
                if (err.response) {
                    console.error("Server response error:", err.response.data); // Registrar detalles del error de respuesta del servidor
                }
                alert("Failed to create article. See console for details.");
            });
    };

    return (
        <div>
            <div>
                <h2>Publicaciones</h2>
                <ul>
                    {articles.map((article) => (
                        <Article article={article} onDelete={deleteArticle} key={article.id} />
                    ))}
                </ul>
            </div>
            <div>
                <h2>Crear publicación</h2>
                <form onSubmit={createArticle} encType="multipart/form-data">
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <br />
                    <label htmlFor="description">Descripción:</label>
                    <br />
                    <textarea
                        id="description"
                        name="description"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <br />
                    <label htmlFor="price">Price:</label>
                    <br />
                    <input
                        type="text"
                        id="price"
                        name="price"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <br />
                    <label htmlFor="location">Location:</label>
                    <br />
                    <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <br />
                    <label htmlFor="category">Category:</label>
                    <br />
                    <select
                        id="category"
                        name="category"
                        required
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="property">Property</option>
                    </select>
                    <br />
                    <label htmlFor="image">Image:</label>
                    <br />
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        required
                        onChange={handleImageChange}
                    />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}

export default Home;