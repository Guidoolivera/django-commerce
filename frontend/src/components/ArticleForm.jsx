import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import api from '../api';
import '../styles/index.css';



function ArticleForm({ }) {
    // const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();



    // const [articleDetail, setArticleDetail] = useState({});

    // useEffect(() => {
    //     api.get(`/api/articles/${id}`)
    //         .then((res) => {
    //             // setArticleDetail(res.data);
    //         })
    //         .catch((err) => console.error(err));
    // }, [id]);

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
                    toast.success('Article created!', {
                        position: "top-right",
                        style: {
                            background: "#101010",
                            color: "white"
                        }
                    })
                } else {
                    console.error("Failed to create article:", res.data); // Registrar el error del servidor
                    toast.error("Failed to create article. See console for details.");
                }
                navigate(`/home`)
                // getArticles();
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
        <div className='max-w-xl mx-auto h-dvh'>
            <h2 className='text-center text-3xl font-bold text-cyan-700 mb-5'>Crear publicación</h2>
            <form onSubmit={createArticle} encType="multipart/form-data">
                <label htmlFor="title">Título:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    className='bg-zinc-200 p-3 rounded-lg block w-full mb-3'
                    placeholder='Título'
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
                    className='bg-zinc-200 p-3 rounded-lg block w-full mb-3'
                    placeholder='Descripción'
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="price">Precio:</label>
                <br />
                <input
                    type="text"
                    id="price"
                    name="price"
                    required
                    value={price}
                    className='bg-zinc-200 p-3 rounded-lg block w-full mb-3'
                    placeholder='Precio'
                    onChange={(e) => setPrice(e.target.value)}
                />
                <br />
                <label htmlFor="location">Ubicación:</label>
                <br />
                <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    value={location}
                    className='bg-zinc-200 p-3 rounded-lg block w-full mb-3'
                    placeholder='Ubicación'
                    onChange={(e) => setLocation(e.target.value)}
                />
                <br />
                <label htmlFor="category">Categoría:</label>
                <br />
                <select
                    id="category"
                    name="category"
                    required
                    value={category}
                    className='bg-zinc-200 p-3 rounded-lg block w-full mb-3'
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
                    className='bg-zinc-200 p-3 rounded-lg block w-full mb-3'
                    onChange={handleImageChange}
                />
                <br />
                <input type="submit" value="Submit" className='bg-cyan-950' />
            </form>
        </div>
    );
}

export default ArticleForm;
