import React from "react";
import Wrapper from "../assets/wrappers/MailContainer.js";
import Alert from './Alert'
import { useAppContext } from "../context/appContext.js";

function MailContainer() {
  const { sendMail, isLoading } = useAppContext();

  return (
    <Wrapper>
      <div>
        Ønsker du at få tilsendt dine opgaver på <span>mail?</span>
      </div>
      <button disabled={isLoading} onClick={sendMail}>Send</button>
      <Alert />
    </Wrapper>
  );
}

export default MailContainer;
