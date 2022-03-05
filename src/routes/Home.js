import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 } from "uuid";
import Message from "components/Message";

const Home = ({ userObj }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [attachment, setAttachment] = useState("");
  // const getMessages = async () => {
  //   const getDbMessages = query(collection(dbService, "messages"));
  //   const dbMessages = await getDocs(getDbMessages);
  //   dbMessages.forEach((document) => {
  //     const messageObject = {
  //       ...document.data(),
  //       id: document.id,
  //     };
  //     setMessages((prev) => [messageObject, ...prev]);
  //   });
  // };
  useEffect(() => {
    // getMessages();
    const getDbMessages = query(
      collection(dbService, "messages"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(getDbMessages, (snapshot) => {
      const messageArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageArr);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(response.ref);
    }
    const messagePosting = {
      text: message,
      createdAt: Date.now(),
      createrId: userObj.uid,
      attachmentUrl,
    };
    await addDoc(collection(dbService, "messages"), messagePosting);
    setMessage("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment("");
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={message}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Message" onClick={onSubmit} />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {messages.map((message) => (
          <Message
            key={message.id}
            messageObj={message}
            isOwner={message.createrId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
