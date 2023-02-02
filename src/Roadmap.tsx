
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
              top: 700,
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
          <div className="storytitleContainer">
            <h1 className="gradient-text">Solove Story : Solove World!</h1>
            <p className="stroyfirsttext">In 2050, I discovered Solove World while traveling in a spacecraft
              </p>
              <p className="stroyfirsttext">made by Elon Musk.
              </p>
            <div className="storyfirst">  
            </div>
              <p className="stroyfirsttext">Solove World has various love.
              </p>
              <p className="stroyfirsttext">And everyone loved the various love.
              </p>
            <div className="storyfirst"> 
            </div>
            <p className="stroyfirsttext">Seeing advanced love, Human settled in Solove World.
              </p>
              <p className="stroyfirsttext">Come to Solove World, too.
              </p>
            <div className="storyfirst">  
            </div>
          </div> 
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
