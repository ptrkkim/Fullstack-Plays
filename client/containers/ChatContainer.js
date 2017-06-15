// import React, { Component } from 'react';
// import ChatInput from '../components/ChatInput';
// import { addMessage } from '../reducer/messages';
// import { connect } from 'react-redux';

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addMessage (message) {
//       dispatch(addMessage(message));
//     }
//   };
// };

// class InputContainer extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       inputValue: '',
//       dirty: false
//     };

//   render () {
//     const dirty = this.state.dirty;
//     const inputValue = this.state.inputValue;
//     let warning = '';

//     if (!inputValue && dirty) warning = 'Type something!';

//     return (
//       <ChatInput
//         handleChange={this.handleChange}
//         handleSubmit={this.handleSubmit}
//         inputValue={inputValue}
//         warning={warning}
//       />
//     );
//   }
// }

// export default connect(
//   null,
//   mapDispatchToProps
// )(InputContainer);
