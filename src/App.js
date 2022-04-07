import React, {useState, useEffect} from 'react'
import './index.css'
import SearchForm from './SearchForm'

function App() {

  const [articles, setArticles] = useState([])
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('piano')
  const [isLoading, setIsLoading] = useState(true)

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
    //console.log("query:", query)
  };
  const submitHandler = (e) => {
    e.preventDefault();
    //console.log('e:', e)
    //console.log("query at submit:", query)
    setSubmitted(query)
  };
  
  useEffect(() => {
    const nytKey = process.env.REACT_APP_ARTICLES_API_KEY

    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=` + submitted + `&api-key=` + nytKey)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(myJSON => {
      //console.log('myJSON.response.docs:', myJSON.response.docs)
      setArticles(myJSON.response.docs) 
    })
    .then(setIsLoading(false))
    .catch(err => console.log('Request Failed', err)); // Catch errors
}, [submitted])

  return (
    <>
      <div className="showcase">
        <div className="overlay px-5">
          <div className="text-white mb-10 text-5xl font-semibold capitalize">Viewing articles about {submitted}</div>
          
          <SearchForm 
            submitHandler={submitHandler}
            submitted={submitted}
            queryChangeHandler={queryChangeHandler}
          />

        </div>
      </div>

      {isLoading ? ( 
        <h1 className="text-center mt-20 font-bold text-6xl">Loading...</h1> 
      ) : (
        <section className="px-10 pt-10 pb-10 m-4">
        
         {articles.map((article, index) => 
          
            <div 
              key={index}
              className="mb-8 bg-white p-5 rounded-lg"
            >
              <div className="font-semibold">{article.headline.main}</div>
              <div className="mb-2">{article.abstract}</div>
              <div>{article.lead_paragraph}</div>
              <div>
                <a 
                  href={article.web_url} 
                  className="text-teal-700" 
                  target="_blank"
                  rel='noreferrer'
                >
                  {article.web_url}
                </a>
              </div>
            </div>
        )} 
        
      </section> )
      }
    </>
    
  );
}

export default App;
