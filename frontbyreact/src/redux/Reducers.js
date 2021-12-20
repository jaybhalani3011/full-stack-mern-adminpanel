import actionList from "./ActionList";

const initialUserInfo = [];

export default function userDataReducer(state = initialUserInfo, action) {
    switch (action.type) {
        case actionList.ADDUSER:
            return state.concat(action.User);

        case actionList.REMOVE_USER:
            return state.filter(item => item.id !== action.id);

        case actionList.EDIT_USER:
            // return state[action.payload.id] = action.payload.editedData;
            console.log('state in Reducer -->    ', state);
            return state.map((item,index) => item.id === action.editedData.id ? {
                id: action.editedData.id, fname: action.editedData.fname, lname: action.editedData.lname, email: action.editedData.email, phone: action.editedData.phone, Gender: action.editedData.Gender, sports: action.editedData.sports,
                //  language: {
                //     English: action.editedData.language.English,
                //     Gujarati: action.editedData.language.Gujarati,
                //     Hindi: action.editedData.language.Hindi,
                // },
                file: action.editedData.file
            } : item);

        default:
            return state;
    }
}

