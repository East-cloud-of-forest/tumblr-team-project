import {
  ButtonComp,
  ProfileComp,
  ModalComp,
  StarRating,
  SliderComp,
} from '../../index-comp/IndexComp'
import './ReviewModalComp.scss'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TempReviewThumbnail from './ReviewThumbnail'
import { useSelector } from 'react-redux'
import { Popover, Overlay } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deleteFirebaseData } from '../../../datasources/firebase'


const ReviewModalComp = (props) => {
  const userNow = useSelector((user)=> user.enteruser.user)
  const navigate = useNavigate();
  const { 
    review, 
    rating, 
    tages, 
    user, 
    images, 
    createdAt, 
    boughtDate, 
    itemName, 
    itemColor 
  } = props.review

  // 수정, 삭제 팝오버
  const [ show, setShow ] = useState(false);
  const [ target, setTarget ] = useState(null);
  const popref = useRef(null);
  
  const handleClick = (e) => {
    setShow(!show)
    setTarget(e.target)
  }
  // 삭제버튼 클릭시
  const deletePost = async (id) => {
    try {
        alert('정말 삭제하시겠습니까?')
        await deleteFirebaseData('Review', id)
        navigate(-1)
    } catch (e) { console.log(e) }
  }
  // 날짜표시
  const timeStamp = createdAt;
  let postDate = new Date(timeStamp);

  return (
    <div>
      <ModalComp
        button={<TempReviewThumbnail review={props.review} />}
        image={
          <SliderComp dots={false} infinite={true}>
            { Object.values(images).map( (image,i) => (
              <div key={i}>
                <img id="image" src={image.url} key={image.name} alt="review-image" />
              </div>
            ))}
          </SliderComp>
        }
        className="review_modal"
      >
        <div className="modal_top">
          <div className="star">
            <StarRating rating={rating} />
          </div>
        </div>

        <div className="modal_body">
          {/* <h5 className="modal_title">임시제목</h5> */}
          <div className="option">
            <p>상품명 : {itemName}</p>
            <p>색상 : {itemColor}</p>
            <p>구매일자 : {boughtDate}</p>
          </div>
          <div className="hashtag">
            {tages.map((tag, i) => (
              <span key={i}>{tag}</span>
            ))}
          </div>
          <p>{review}</p>
          <div className="score">
            <i>
              <FontAwesomeIcon icon={regular('eye')} />
            </i>
            <span>1234</span>
            <i>
              <FontAwesomeIcon icon={regular('heart')} />
            </i>
            <span>1234</span>
          </div>
        </div>

        <div className="modal_footer">
          <div className="profile_block">
            <ProfileComp justName imageURL={user.photoURL} size="md" />
            <div>
              <p>{user.displayName}</p>
              <p className="caption">
                {`${postDate.getFullYear()}-${postDate.getMonth()+1}-${postDate.getDate()}`}
              </p>
            </div>
          </div>
          <div ref={popref} className="button_block">
            <ButtonComp icon>
              <FontAwesomeIcon icon={solid('heart')} />
            </ButtonComp>
            <ButtonComp icon>
              <FontAwesomeIcon icon={solid('share-nodes')} />
            </ButtonComp>
            {
              userNow && userNow.uid == user.uid ? (
                <div>
                  <ButtonComp icon onClick={handleClick}>
                    <FontAwesomeIcon icon={solid("ellipsis-vertical")} />
                  </ButtonComp>
                <Overlay
                  show={show}
                  target={target}
                  placement="left"
                  container={popref}
                  containerPadding={20}
                  rootClose
                  onHide={() => setShow(false)}
                >
                  <Popover id='review_popover'>
                    <ButtonComp icon onClick={() => navigate(`/review/write/${props.review.id}`)}> 
                      <FontAwesomeIcon icon={solid("pen-to-square")}/> 수정
                    </ButtonComp> <br/>
                    <ButtonComp icon onClick={()=> deletePost(props.review.id)}>
                      <FontAwesomeIcon  icon={solid("trash-can")} /> 삭제
                    </ButtonComp>
                  </Popover>
                </Overlay>
              </div>
              ) : null
            }
          </div>
        </div>
      </ModalComp>
    </div>
  )
}
export default ReviewModalComp
