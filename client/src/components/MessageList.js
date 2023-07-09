import {useEffect, useRef} from 'react';

function MessageList({messages}) {
    const containerRef = useRef();

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            // scroll to bottom to make the last message visible
            container.scrollTo(0, container.scrollHeight);
        }
    }, [messages]);

    return (
        <div ref={containerRef} className="box" style={{height: '50vh', overflowY: 'scroll'}}>
            <table>
                <tbody>
                {messages.map((message) => (
                    <MessageRow key={message.id} message={message}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}

function MessageRow({message}) {
    return (
        <tr>
            <td className="py-1">
        <span className={(message.from === 1) ? 'tag is-primary' : 'tag'}>
          {message.from}
        </span>
            </td>
            <td className="pl-4 py-1">
                {message.text}
            </td>
        </tr>
    );
}

export default MessageList;
