const Filter = (props) => {
    return (
        <div>
            filter shown with 
            <input onChange={props.handleSearch}/>
        </div>
    )
}

export default Filter