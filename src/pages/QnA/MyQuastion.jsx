import React from "react";

import "../QnA/MyQuastion.scss";
import { Link, Outlet, useParams } from "react-router-dom";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

import { propTypes } from "react-bootstrap/esm/Image";

import { useState } from "react";
import Ask from "./Ask";
import App from "../../App";
import { useEffect } from "react";
import {
  getFirebaseData,
  userGetFirebaseData,
  deleteFirebaseData,
} from "../../datasources/firebase";
import TotalPriceComp from "../../components/Cart/TotalPriceComp";

import PostPage from "./PostPage";
import UpdatePost from "./UpdatePost";
import { useSelector } from "react-redux";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../../datasources/firebase'



const MyQuastion = (props) => {

  // 게시글 데이터 저장
  const [post, setPost] = useState([]);
  const params = useParams();

  // 게시판 세부 기능 컨트롤
  const [mode, setMode] = useState();
  const [id, setId] = useState(null);   // 내가 조회중인 게시글을 웹에 알려주기 위한 변수

  let title,body,category,date = null;
  let update_delete = null;
  let updateArea = null;



  //////////////////// FireStore로 게시글 데이터 저장 ///////////////////////

  const { user } = useSelector((a) => a.enteruser);

  const getPost = async () => {
    let postArray = [];
    await userGetFirebaseData("inquiry", user.uid).then((r) => {
      r.forEach((doc) => {
        console.log(doc.id)
        const data = doc.data();

        const DATE = new Date(data.createdAt);

        const year = DATE.getFullYear();
        const month = DATE.getMonth() + 1;
        const date = DATE.getDate();

        postArray.push({
          id: doc.id,
          category: data.category,
          date: year + "년 " + month + "월" + date + "일",
          title: data.title,
          body: data.body,
        });
      });
    });
    setPost(postArray);
    setMode("READ");
  };

  // 웹페이지가 리 렌더링 될때마다 getPost 함수를 실행.
  useEffect(() => {
    user !== null && getPost();
  }, [user]);

  ///////////////////////////////////////////////////




  //// 게시글 출력  ////

  let list = [];  // 게시판에 출력할 데이터를 담을 list 변수 

  for (let i = 0; i < post.length; i++) {   // post 객체의 숫자만큼 반복실행
    let p = post[i];   // 함수 실행시 post에 있는 객체를 p에 할당하고 진행

    list.push(  // list 변수에 게시글 데이터를 밀어넣어서 저장함
      <tr key={i}>
        <td>{i + 1}</td>  {/* 게시글 번호 */}
        <td>{p.category}</td> {/* 게시글 카테고리 */}

        <td className="title_Menu"                                 /*  td영역 누르면 게시글 열리는 기능이었으나, 현재는 사용 안함  onClick={(e) => {e.preventDefault();  updateArea = null;  setMode("READ");   }}*/
        >
          <Link to={"/QnAmenu/MyQuastion/" + p.id} className="PostName"
          onClick={() => {} }>
          {p.title}    {/* 게시글 제목 클릭시 게시글 열림 */}
          </Link>
        </td>
      
        <td>가입회원</td>                       {/* 글쓴이 */}
        <td>{p.date}</td>                      {/* 게시글 작성 날짜 */}
        <td className="answer">답변준비중</td>  {/* 1:1 답변 여부 */}
      </tr>
    );

    
    //////// firestore에 저장된 게시글 데이터를 게시판에 출력 ////////
    ///  이 코드는 현재 사용 안함,
    ///  fireStore에서 받은 게시글 데이터를 post에 담은 뒤
    ///  맨 아래의 return 영역에서 PostPage(게시글 조회 컴포넌트) 에
    ///  props로 전달해서 게시글 출력하는 기능으로 대체함
    if (mode === "READ") {
      for (let i = 0; i < post.length; i++) {
        if (post[i].id === id) {
          title = post[i].title;
          body = post[i].body;
        }

    //    postText = <PostPage title={title} body={body} />;
    //////////////////////////////////////////////////////////


    //////////// 게시글 수정, 삭제 버튼 //////////////
        update_delete = (
          <div>

            {/* 게시글 수정 버튼 */}

            <Link
              to="/QnAmenu/update"
              onClick={(e) => {
                e.preventDefault();
                setMode("UPDATE");
              }}
            >
              <button>수정하기</button>
            </Link>

            | |

            {/* 게시글 삭제 버튼,
            현재 작동x
            firestore delete 기능으로 대체해야 */}

            <input
              type="button"
              value="삭제하기"
              onClick={() => {
                const NewPost = [];

                for (let i = 0; i < post.length; i++) {
                  if (post[i].id !== id) {
                    NewPost.push(post[i]);
                  }
                }
                // setPost(NewPost);
        /////////////////////////////////////////////////// 
              }}
            />
          </div>
        );
      }
    }

    // 게시글 수정 기능

    if (mode === "UPDATE") {

      update_delete = null;  //// 게시글 수정,삭제 버튼 숨기기

      for (let i = 0; i < post.length; i++) {  // 게시글 데이터 갯수만큼 반복실행
        if (post[i].id === id) {
          
          title = post[i].title;
          body = post[i].body;
          category = post[i].category;
          date = post[i].date;
        }
      }

      updateArea = (
        <UpdatePost
          update_start={(_title, _body, _category, _date) => {

          //////////// fireStore 게시글 데이터 Update 코드 ///////////
            const firebase_PostUpdate = doc(db, "inquiry", post.id);

            updateDoc(firebase_PostUpdate, {
              title: _title,
              body: _body,
            })
          /////////////////////////////////////////////


          ///  fireStore에 저장된 데이터가 바뀌면
          ///  자동으로 post 데이터가 바뀌게 되어있으므로,
          ///  아래 코드는 현재 사용 안하는 상태   //////
            const NewPost = [...post];
            const NewObject = {
              id: post.id,
              title: _title,
              body: _body,
              category: _category,
              date: _date,
            };

            for (let i = 0; i < NewPost.length; i++) {
              if (NewPost[i].id === post.id) {
                NewPost[i] = NewObject;
              }
            }
            // setPost(NewPost);    현재 사용 안하는 update 코드 
            //////////////////////////////////////////////////
          }}


          // Post의 title,body,category,date를 UpdatePost에 props로 전달
          title={title}
          body={body}
          category={category}
          date={date}
        />
      );
    }
  }

  return (
    <div>
      <div className="board">
        <div>
          {params.id === undefined ? (
            <table className="in_board">
              <thead className="menu">
                <tr>
                  <th>번호</th>
                  <th>카테고리</th>
                  <th>제목</th>
                  <th>글쓴이</th>
                  <th>작성일</th>
                  <th>진행상태</th>
                </tr>
              </thead>

              <tbody className="contents">{list}</tbody>
            </table>
          ) : (
            /// firebase에서 받은 데이터를 Props로 넘겨줌
            <PostPage post={post} />
          )}
        </div>
      </div>

      {/* 게시글 조회, 수정, 삭제 */}
      <div className="Update_Box">
        <div className="Update_Box2">
          {updateArea}
          {update_delete}
        </div>
      </div>

      {/* 게시글 수정 */}
    </div>
  );
};

export default MyQuastion;

// 1. firestore 유저 uid문서 안에 여러 게시글 데이터를 저장하는 법

// 3. 게시글 데이터를 list로 출력하는 법

// OK 2. firestore 게시글 데이터를 가져오는 법 ★제일 중요★
// OK 4. Firestore에서 가져온 데이터를 useState에 저장하는 법




// - 문의글 파이어베이스 수정, 삭제 기능


/// 게시글을 누를경우 post에 있는 게시글 데이터가 updatePost로 가게 해야