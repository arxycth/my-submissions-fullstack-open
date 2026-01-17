const Notification = ({ message, error }) => {

    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      }

    const notificationErrorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      }
    
    if (message === null) {
      return null
    }
  
    return (
      <div style={error?notificationErrorStyle:notificationStyle}>
        {message}
      </div>
    )
  }
  
  export default Notification