import {NextPage} from 'next'
import style from './index.module.scss'
import {useEffect, useRef, useState} from 'react';
import ExpandText from "./components/ExpandText";

const Home: NextPage = () => {
  const [content, setContent] = useState('');
  const refFocusTextarea = useRef<any>(null);

  // Runs only on the first render
  useEffect(() => {
    refFocusTextarea.current?.focus();
  }, []);

  const changeContent = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <textarea rows={15} autoFocus={true} ref={refFocusTextarea} onChange={changeContent} />

      <ExpandText
        maxHeightTmp={90}
        content={content}
      />
    </div>
  )
};

export default Home
