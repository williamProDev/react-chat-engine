import ReconnectingWebSocket from 'reconnecting-websocket'

export function connectSocket(props) {    
  const { publicKey, userName, userSecret } = props 

  const env = process.env.NODE_ENV
  const wsStart = env === 'production' ? 'wss://' : 'ws://'
  const rootHost = env === 'production' ? 'api.chatengine.io' : '127.0.0.1:8000'

  const rws = new ReconnectingWebSocket(`${wsStart}${rootHost}/person/?publicKey=${publicKey}&username=${userName}&secret=${userSecret}`)

  rws.onopen = function(event) {
    console.log("User socket connect", event)
    props.onConnect && props.onConnect(props)
  }

  rws.onerror = function(event) {
    console.log("User socket error", event)
  }

  rws.onmessage = function(event) {
    const eventJSON = JSON.parse(event.data)
    console.log('action', eventJSON.action)

    if (eventJSON.action === 'new_chat') {
      props.onNewChat && props.onNewChat(eventJSON.data)

    } else if (eventJSON.action === 'edit_chat') {
      props.onEditChat && props.onEditChat(eventJSON.data)

    } else if (eventJSON.action === 'delete_chat') {
      props.onDeleteChat && props.onDeleteChat(eventJSON.data)

    } else if (eventJSON.action === 'add_person') {
      props.onAddPerson && props.onAddPerson(eventJSON.data)

    } else if (eventJSON.action === 'remove_person') {
      props.onRemovePerson && props.onRemovePerson(eventJSON.data)

    } else if (eventJSON.action === 'new_message') {
      props.onNewMessage && props.onNewMessage(eventJSON.data.id, eventJSON.data.messages)

    } else if (eventJSON.action === 'edit_message') {
      props.onEditMessage && props.onEditMessage(eventJSON.data.id, eventJSON.data.messages)

    } else if (eventJSON.action === 'delete_message') {
      props.onDeleteMessage && props.onDeleteMessage(eventJSON.data.id, eventJSON.data.messages)
    }
  }

  return rws
}