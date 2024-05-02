import React from 'react';
import { Link } from 'react-router-dom';
import article_default from '../../../backend/static/article_default.jpg';
// import '../styles/Article.css';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';


function Article({ article, onDelete }) {
    const formattedDate = new Date(article.created_at).toLocaleDateString("es-AR");
    const navigate = useNavigate();

    return (
        <div className="bg-zinc-200  p-3 hover:bg-zinc-300 hover:cursor-pointer mt-5 rounded-lg my-10 " onClick={() => {
            navigate(`/articles/${article.id}`)
        }}>
            {/* Enlace al detalle del artículo */}
            <h1 className='font-bold uppercase'>{article.title}</h1>
            <p className='text-slate-700'>{article.description}</p>
            <p className='text-slate-700'>Precio: {<strong>${article.price}</strong>}</p>
            <p className='text-slate-700'>{article.location}</p>
            <p className='text-slate-400 mt-5'>{article.category}</p>
            <div className='box-border h-100 w-100 p-4'>
                {article.image ? (
                    <img src={article.image} alt="Article" />
                ) : (
                    <img src={article_default} alt="Default" />
                )}
            </div>
            <p className='text-slate-500 font-sans text-center'>Fecha: {formattedDate}</p>
            {/* Botón para eliminar el artículo */}
            <button className="bg-rose-900 p-3 rounded-lg block w-full mt-3 "
                onClick={() => onDelete(article.id)}><Link to={`/home`}>Eliminar</Link>
            </button>
            {/* Enlace para editar el artículo */}
            <button className='bg-sky-800 p-3 rounded-lg block w-full mt-3'><Link to={`/articles/${article.id}`} className='edit-button'>Editar</Link>
            </button>
        </div>
    );
}

export default Article;