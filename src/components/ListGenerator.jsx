export default function ListGenerator({listToGenerate}){
    return (
        <div className='container py-3'>
            <ul className='list-group'>
                {
                    listToGenerate.map((movie, index) => (
                        <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>{movie.title} <span className='badge text-bg-primary'>{movie.genre}</span></li>
                    ))
                }
            </ul>
        </div>
    )
}