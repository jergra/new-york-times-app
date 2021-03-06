import React, {useState, useEffect} from 'react'
import './index.css'
import SearchForm from './components/SearchForm'

function App() {

  const [articles, setArticles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('Canada')

  useEffect(() => {
  
    fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${process.env.REACT_APP_NYT_API_KEY}`)
    // Handle success
    .then(response => response.json())  // convert to json
    .then(myJSON => {
      console.log('myJSON.response.docs:', myJSON.response.docs)
      setArticles(myJSON.response.docs) 
      console.log('myJSON.response.docs[0]:', myJSON.response.docs[0])
      console.log('myJSON.response.docs[0].multimedia[0].url:', myJSON.response.docs[0].multimedia[0].url)
    })
    .then(setIsLoading(false))
    .catch(err => console.log('Request Failed', err)); // Catch errors
  }, [query])

  return (
    <>
      <div className="showcase">
        <div className="overlay px-5">
          <div className="text-white mb-10 text-5xl font-semibold capitalize">Viewing articles about {query}</div>
          
          <SearchForm 
            newSearch={(query) => setQuery(query)}
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
              <div className="flex mb-4">
              {
                article.multimedia[0] ? (
                  <div className="mb-2 mr-8">
                      <img src={'https://static01.nyt.com/' + article.multimedia[0].url} width={700} alt='' />
                  </div>
                ) : (
                  <div></div>
                )
              }
                <div className='w-1/2'>
                  <div className="font-semibold mb-2">{article.headline.main}</div>
                  <div className="mb-2">{article.abstract}</div>
                </div>
              </div>

              {
                article.lead_paragraph === article.abstract ? (
                  <div></div>
                ) : (
                  <div className="mb-2">{article.lead_paragraph}</div>
                )
              }
            
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

            // another way (left here for reference):

            // {articles.map((article, index) => {
            
            //   const {
            //     headline,
            //     abstract,
            //     lead_paragraph,
            //     web_url
            //   } = article

            //   return (
            //     <div 
            //       key={index}
            //       className="mb-8 bg-white p-5 rounded-lg"
            //     >
            //       <div className="font-semibold mb-2">{headline.main}</div>
            //       <div className="mb-2">{abstract}</div>
            //       <div className="mb-2">{lead_paragraph}</div>
            //       <div>
            //         <a 
            //           href={web_url} 
            //           className="text-teal-700" 
            //           target="_blank"
            //           rel='noreferrer'
            //         >
            //           {web_url}
            //         </a>
            //       </div>
            //     </div>
            //   )
            // }
            
            // )}
        )} 
        
      </section> )
      }
    </>
    
  );
}

export default App;
