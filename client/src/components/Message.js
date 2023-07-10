import {useMessages} from "../graphql/hooks";
import MessageList from "./MessageList";

function Message() {
    const {messages} = useMessages(1);
    return (
        <section className="section">
            <div className="container">
                <h1 className="tile">
                    Messages from
                </h1>
                <MessageList messages={messages}/>

            </div>

        </section>
    );
}

export default Message;