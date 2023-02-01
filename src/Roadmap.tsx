
function Roadmap(){
    function Slogun(){
        return(
          <div className = "Roadmapcontainer">
            <div className="slideText-wrap2">
              <div className="slideText-wrap">
                <div className = "slideText-box">
                  <ul>
                    <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                    <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                  </ul>
                </div>
              <div className = "slideText2-box">
                <ul>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                </ul>
              </div>
              <div className = "slideText-box">
                <ul>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                </ul>
              </div>
              <div className = "slideText2-box">
                <ul>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                </ul>
              </div>
              <div className = "slideText-box">
                <ul>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                </ul>
              </div>
              <div className = "slideText2-box">
                <ul>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                  <li>SOLOVE SUPPORTS ALL THE LOVE IN THE WORLD!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        )
    }

    function Scrolldown (){

      const scrollToTop = () => {
          window.scroll({
              top: 500,
              behavior: 'smooth'
          })

      }
      
      return (
        <div className="Scrolldowncontainer">
          <div className = "Scrolldown" onClick={scrollToTop}>
              <p className='Scrolldowntext'>Click me</p>
          </div>
        </div>  
      )
    }

    function Roadmap (){
      
      return(
        <>
    
 
        </>  
      )
    }

    return(
      <div className="tranPage">
        <div className = 'Roadmapwall'>
          <Scrolldown></Scrolldown>
          <Slogun></Slogun>
        </div>
        <Roadmap></Roadmap>
      </div>
        
    )
};

export default Roadmap;
