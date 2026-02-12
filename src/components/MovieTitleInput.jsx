export default function MovieTitleInput({inputController, onSetInputController, inputIdentifier, labelForInput, inputPlaceHolder} ) {

    return (
        <>
            <div>
            <label htmlFor={inputIdentifier} className='form-label'>{labelForInput}</label>
            <input value={inputController} onChange={(e) => onSetInputController(e.target.value)} type="text" className='form-control' name={inputIdentifier} id={inputIdentifier} placeholder={inputPlaceHolder} />
            </div>
        </>
    )
}