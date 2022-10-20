import style from './index.module.scss'
import {useEffect, useRef, useState} from "react";

export default function ExpandText({maxHeightTmp, content} : {
  maxHeightTmp: number,
  content: string
  }) {
  const MAX_HEIGHT = maxHeightTmp;
  const refHeightContent = useRef<any>(null);
  const [maxHeight, setMaxHeight] = useState(maxHeightTmp);
  const [showGradient, setShowGradient] = useState(false);
  const [isShowMore, setIsShowMore] = useState(false);

  useEffect(() => {
    const height =  refHeightContent.current?.clientHeight;
    if (height < MAX_HEIGHT) {
      setMaxHeight(MAX_HEIGHT);
      setIsShowMore(false);
    }
    if(height > MAX_HEIGHT) {
      setIsShowMore(true);
    }
    if (!isShowMore && height > MAX_HEIGHT - 20) {
      setShowGradient(true);
    }
  }, [content]);

  const handleShowMore = () => {
    setMaxHeight(refHeightContent.current?.clientHeight);
    setShowGradient(false);
    setTimeout(() => {
      setIsShowMore(false);
    }, 2000);
  };

  const handleShowLess = () => {
    setMaxHeight(MAX_HEIGHT);
    setShowGradient(true);
    setTimeout(() => {
      setIsShowMore(true);
    }, 2000);
  };

  const renderBtnShowMore = () => {
    return (refHeightContent?.current?.clientHeight > MAX_HEIGHT) && (
      isShowMore ?
        <a href="#" className={style.more} title="Show more" onClick={handleShowMore}>More</a> :
        <a href="#" className={style.less} title="Show less" onClick={handleShowLess}>Less</a>
    )
  };
  return (
    <>
      <div  className={`${style.result} ${showGradient ? style.gradient : ''}`} style={{maxHeight: maxHeight}}>
        <span style={{display: 'block'}} ref={refHeightContent}>{content}</span>
      </div>
      <div className={style.control}>{renderBtnShowMore()}</div>
    </>
  )
}