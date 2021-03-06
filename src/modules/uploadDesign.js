// Create page에서 저장버튼 클릭시
const UPLOAD_ITEM = 'uploadDesign/UPLOAD_ITEM';

// firestore 컬렉션에 존재하는 문서를 확인하고, 다음 아이디로 할당할 수 있게
export const uploadItem = (mycup) => ({
    type : UPLOAD_ITEM,
    mycup
})

const initialState = {
    mycup : []
}
const uploadDesign = ( state=initialState, action ) => {
    if ( action.type === UPLOAD_ITEM ) {
        return { mycup : state.mycup.concat({...state, mycup: action.mycup}) }
    } else { return state}
}

export default uploadDesign;