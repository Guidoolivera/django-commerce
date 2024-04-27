import { Link } from 'react-router-dom';


export function Navigation() {
    return (
        <div className='flex justify-between py-3 rounded-lg'>
            <h1 className='text-white font-bold text-3xl mb-4'><Link to="/home">Ecommerce</Link></h1>
            <button className='bg-sky-600 px-3 py-2 rounded-lg font-normal'>
                <Link to="/articles/create">Crear artículo</Link>
            </button>
        </div>
    )
}