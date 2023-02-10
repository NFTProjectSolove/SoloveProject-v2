import styled from "styled-components";
import Button from '@material-ui/core/Button';  

interface ImageTest{
    length: number;
};

const StyledButton = styled(Button)`
background-color: white !important;
color:black !important;
`;

const Image = styled.img`
  width: ${(props:ImageTest) => props.length}vw;
  height: ${(props:ImageTest) => props.length}vw;
  border-radius: 50%;
  `;

function MainHome(){

    return(
        <div className="tranPage">
            <div style={{backgroundColor:'black', width:'100%', height:'100%', position:'relative',overflow:'hidden'}}>
                <div className="bigContainer">
                    <div className="imgContainer">
                        <span id="mainImg1"><Image alt='soloveimage1' length={30} src={"/Solove1.jpg"}></Image></span>
                        <span id="mainImg2"><Image alt='soloveimage2' length={11} src={"/Solove3.jpg"}></Image></span>
                        <span id="mainImg3"><Image alt='soloveimage3' length={18} src={"/Solove2.gif"}></Image></span>
                    </div>
                    <div className="textContainer">
                        <h1>Welcome to</h1>
                        <img src="/solovewhite.png" alt="Solove" width='60%'></img>
                        <p>Solove Supports all the loves in the world. Join our world and create a new relationship.</p>
                        <div className="mainButtonContainer">
                            <StyledButton className="shopButton" type="submit" formTarget='_blank' href="https://opensea.io">Click to shop ➠</StyledButton>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainHome;