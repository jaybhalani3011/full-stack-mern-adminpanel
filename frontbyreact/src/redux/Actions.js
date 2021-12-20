import actionList from "./ActionList";

const users = {
    userAdd,
    userDelete,
    userEdit,
}

function userAdd(User) {
    // return (dispatchaction) => {
    //     dispatchaction(userCreationAction(User));
    // };

    return userCreationAction(User);

    function userCreationAction (User) {
        return {
            type : actionList.ADDUSER,
            User,
        }
    }
}

function userDelete(id) {
    // return (dispatchaction) => {
    //     dispatchaction(userCreationAction(User));
    // };

    return userDeletionAction(id);

    function userDeletionAction (id) {
        return {
            type : actionList.REMOVE_USER,
            id,
        }
    }
}

function userEdit(editedData,id) {
    // return (dispatchaction) => {
    //     dispatchaction(userCreationAction(User));
    // };

    return userEditingAction(id);

    function userEditingAction (id) {
        return {
            type : actionList.EDIT_USER,
            editedData,
        }
    }
}



export default users;