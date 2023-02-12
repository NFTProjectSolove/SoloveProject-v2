import { useState, useEffect } from 'react';

type propsType = {
  typingText:string;
}

export default function Typingword({typingText}: propsType) {
  
  const [word, setBlogTitle] = useState('');
  const [count, setCount] = useState(0);
  const completionWord = {typingText}.typingText;

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setBlogTitle((prevTitleValue) => {
        let result = prevTitleValue ? prevTitleValue + completionWord[count] : completionWord[0];
        setCount(count + 1);

        if (count >= completionWord.length) {
          setBlogTitle(completionWord);
          result=completionWord;
        }

        return result;
      });
    }, 60);

    return () => {
      clearInterval(typingInterval);
    };
  });

  return <p className="Typing-word">{word}</p>;
};