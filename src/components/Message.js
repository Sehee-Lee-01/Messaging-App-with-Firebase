import react, { useState } from "react";
import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Message = ({ messageObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(messageObj.text);
  const MessageTextRef = doc(dbService, "messages", `${messageObj.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 글을 지우시겠습니까?");
    console.log(ok);
    if (ok) {
      // delete message
      await deleteDoc(MessageTextRef);
      await deleteObject(ref(storageService, messageObj.attachmentUrl));
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(messageObj, newMessage);
    await updateDoc(MessageTextRef, {
      text: newMessage,
    });
    toggleEditing();
  };
  const onchange = (event) => {
    const {
      target: { value },
    } = event;
    setNewMessage(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholer="Edit your Message"
              value={newMessage}
              onChange={onchange}
              required
            />
            <input type="submit" value="Update Message" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{messageObj.text}</h4>
          {messageObj.attachmentUrl && (
            <img src={messageObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Message</button>
              <button onClick={toggleEditing}>Edit Message</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Message;
