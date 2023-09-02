

import { put, takeLatest, all } from 'redux-saga/effects';


function* getFoodDetails() {
    const records = yield fetch('http://localhost:3003/viewfooddetails').then(response => response.json());

    yield put({ type: "ADMIN_GET_FOOD_DETAILS_RECEIVED", foodDetails: records.data, isLoaded: true })
}

function* postFoodDetails(data) {
    const result = yield fetch('http://localhost:3003/addfooddetails', {
        method: 'POST',
         body: JSON.stringify(data.payload),
          headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
    }).then(response => response.json());

    yield put({ type: "ADMIN_POST_FOOD_DETAILS_RESPONSE_RECEIVED", response: result, isLoaded: true })

}


function* deleteFoodDetails(data) {
    
    const result = yield fetch('http://localhost:3003/deletefooddetails',{
         headers:{
            'Content-Type': 'application/json'
         },
        method: 'DELETE', 
        body: JSON.stringify({id:data.payload}), 
        mode: 'cors'
    }).then(response => response.json());

    yield put({ type: "ADMIN_DELETE_FOOD_DETAILS_RESPONSE_RECEIVED", response: result })

}

function* updateFoodDetails(data) {

    const result = yield fetch('http://localhost:3003/updatefooddetails',{
         headers:{
            'Content-Type': 'application/json'
         },
        method: 'PUT', 
        body: JSON.stringify(data.payload), 
        mode: 'cors'
    }).then(response => response.json());

    yield put({ type: "ADMIN_UPDATE_FOOD_DETAILS_RESPONSE_RECEIVED", response: result })

}




function* actionWatcher() {
    yield takeLatest('ADMIN_GET_FOOD_DETAILS', getFoodDetails)
    yield takeLatest('ADMIN_POST_FOOD_DETAILS', postFoodDetails)
    yield takeLatest('ADMIN_DELETE_FOOD_DETAILS', deleteFoodDetails)
    yield takeLatest('ADMIN_UPDATE_FOOD_DETAILS', updateFoodDetails)
}


export default function* rootSaga() {
    yield all([actionWatcher()])
}
