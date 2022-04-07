import React, {useState} from 'react'

const SearchForm = ({newSearch}) => {

    const [text, setText] = useState('e.g. election')

    const queryChangeHandler = (e) => {
        setText(e.target.value);
    };
    const submitHandler = (e) => {
        e.preventDefault();
        newSearch(text)
    };
  
    return (
    <div>
        <form 
            onSubmit={submitHandler}
            className="mb-4"
            >
            <input
                name="query"
                placeholder={text}
                onChange={queryChangeHandler}
                className="border-solid border-2 border-gray-400 rounded pl-1"
            />
            <button
                type="submit"
                className="bg-teal-700 text-white font-bold pl-3 pt-1 pr-3 pb-1 rounded ml-2 text-sm"
            >
                SUBMIT
            </button>
        </form>
    </div>
  )
}

export default SearchForm