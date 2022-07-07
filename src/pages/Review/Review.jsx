import "./Review.scss";
import { Col, Container, Row } from "react-bootstrap";
import ReviewAndModalComp from "../../components/Review/grid/ReviewAndModalComp";
import TempReviewModalComp from "../../components/Review/grid/TempReviewModalComp";
import { ButtonComp, Pagination } from "../../components/index-comp/IndexComp";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { dataResultModule } from "../../modules/firebaseData";
import { getFirebaseData } from "../../datasources/firebase";

const ReviewPage = () => {
  const navigate = useNavigate();
  const goReviewWrite = () => {
    navigate("/review/write");
  };
  const { boards } = useSelector((state) => state.review);

  // const { review } = useSelector(state => state.firebaseData)
  let review = []
  //const dispatch = useDispatch()
  //const aaa = useCallback(()=>dispatch(dataResultModule()),[dispatch])
  const getReviews = () => async () => {
    try {
      const reviewRef = getFirebaseData('Review');
      (await reviewRef).forEach( doc => {
        console.log(doc)
      })
    } catch (e) { console.log(e) }
  }
  useEffect(() => {
    getReviews()
  }, [])

  return (
    <div className="review_page">
      <h1>포토리뷰</h1>
      <Container fluid>
        <Row>
          {/* {
            review && review.map( r => (
              <Col xl="2" lg="3" md="4" sm="6" key={r.id} className="review_card">
                <TempReviewModalComp review={r.data} />
                
            </Col>
            ))
          } */}
        </Row>
        <Row>
          {boards.map((board, i) => (
            <Col xl="2" lg="3" md="4" sm="6" key={i} className="review_card">
              <ReviewAndModalComp board={board} />
            </Col>
          ))}
          {boards.map((board, i) => (
            <Col xl="2" lg="3" md="4" sm="6" key={i} className="review_card">
              <ReviewAndModalComp board={board} />
            </Col>
          ))}
          {boards.map((board, i) => (
            <Col xl="2" lg="3" md="4" sm="6" key={i} className="review_card">
              <ReviewAndModalComp board={board} />
            </Col>
          ))}
          {boards.map((board, i) => (
            <Col xl="2" lg="3" md="4" sm="6" key={i} className="review_card">
              <ReviewAndModalComp board={board} />
            </Col>
          ))}
        </Row>
      </Container>
      <br />

      {/** plus 버튼 누르면 /review/write 페이지 이동 */}
      <ButtonComp
        icon
        style={{ display: "inline", float: "right" }}
        onClick={goReviewWrite}
      >
        <FontAwesomeIcon icon={solid("circle-plus")} size="2x" />
      </ButtonComp>
      <br />
      {/** 페이징 */}
      <Pagination />
    </div>
  );
};
export default ReviewPage;
