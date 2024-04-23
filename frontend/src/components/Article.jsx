import article_default from '../../../backend/static/article_default.jpg'; // Ruta a la imagen predeterminada en la carpeta static

function Article({ article, onDelete }) {
    const formattedDate = new Date(article.created_at).toLocaleDateString("es-AR");

    return (
        <div className='article-container'>
            <p className='article-title'>{article.title}</p>
            <p className='article-description'>{article.description}</p>
            <p className='article-location'>{article.location}</p>
            <p className='article-price'>{article.price}</p>
            <p className='article-category'>{article.category}</p>
            <div className='article-images'>
                {article.image ? (
                    <img src={article.image} height={1000} alt="Article" />
                ) : (
                    <img src={article_default} alt="Default" />
                )}
            </div>
            <p className='article-date'>{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(article.id)}>Delete</button>
        </div>
    );
}

export default Article;