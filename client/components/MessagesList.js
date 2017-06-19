import React from 'react';
import emoteLinks from '../../public/emotes.js';

// sender has two props: name and color
const MessagesList = ({ messages }) => {
  const ulStyles = { listStyleType: 'none', padding: '0px' };
  const liStyles = { padding: '5px 10px' };
  const emoteStyles = {
    maxHeight: '29px',
    margin: '-1rem 0',
    paddingRight: '4px'
  };

  const containsEmotes = (words) => {
    return words.reduce((included, str) => included || !!emoteLinks[str], false);
  };

  return (
    <div>
      <ul id="messages" style={ulStyles}>
        {
          messages.map((message, i) => {
            const nameStyle = { fontWeight: 600, color: message.color };
            const words = message.text.split(' ');

            return (
              <li style={liStyles} key={i}>
                <span style={nameStyle}>{`${message.sender}`}</span>
                <span>: </span>
                {
                  // the hell am i going to use as a unique id here?
                  // these items aren't computed, they never change, they have no id, never reordered...
                  containsEmotes(words)
                    ? words.map((word, wordi) => {
                      return emoteLinks[word]
                        ? <span key={wordi}><img style={emoteStyles} src={emoteLinks[word]} /></span>
                        : <span>{`${word} `}</span>;
                      })
                    : <span>{`${message.text}`}</span>
                }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default MessagesList;
// later: calculate li height * number of messages
// .animate scrolltop: height


// return (
// <span style={nameStyle}>{`${message.sender}`}</span>
// <span>:</span>
// <span>{`${message.text}`}</span>
// )
