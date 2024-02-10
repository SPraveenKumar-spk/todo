function Message({NewItems}){
    return (
        <>
        {(NewItems.length ==0 && <h3>You have completed all tasks</h3>)}
        </>
    )
}

export default Message;