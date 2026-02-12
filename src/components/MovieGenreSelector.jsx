
export default function MovieGenreSelector({ inputController, onSetInputController, inputIdentifier, labelForInput, optionArray }) {
    return (
        <>
            <div>
                <label htmlFor={inputIdentifier} className='form-label'>{labelForInput}</label>
                <select value={inputController} onChange={(e) => onSetInputController(e.target.value)} name={inputIdentifier} id={inputIdentifier} className='form-control'>
                    <option value="">Seleziona</option>
                    {
                        optionArray.map((genre, index) => { return <option key={index} value={genre}>{genre}</option>})
                    }
                </select>
            </div>
        </>
    )
}