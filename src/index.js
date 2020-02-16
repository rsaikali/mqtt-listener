import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

var mqtt = require('mqtt');

function MQTTRow(props) {
    return (
      <tr>
        <td><samp>{props.topic}</samp></td>
        <td className="text-right"><samp>{props.payload}</samp></td>
      </tr>
     );
}

class MQTTTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { client: null, messages: {} };
  }

  onMQTTConnect = () => {
    this.state.client.subscribe(this.props.topic);
  }

  onMQTTMessage = (topic, message) => {
    var stateCopy = Object.assign({}, this.state);
    stateCopy.messages[topic] = message.toString();
    this.setState(stateCopy);
  }

  onMQTTError = error => {
    console.warn(error);
  }

  componentDidMount() {
    var mqtt_options = {
      clientId: "mqtt_reactjs_" + Math.random() * 1000000000000000000,
      username: this.props.mqtt_user,
      password: this.props.mqtt_password
    };

    var client = mqtt.connect(this.props.mqtt_url, mqtt_options);

    client.on('connect', this.onMQTTConnect);
    client.on('message', this.onMQTTMessage);
    client.on('error', this.onMQTTError);

    this.setState({ client: client });
  }

  render() {
    return (
      <div className="table-responsive-sm">
        <table className="table table-hover table-sm">
        <tbody>
            {Object.keys(this.state.messages).sort().map((topic, message) =>
              <MQTTRow key={topic} topic={topic} payload={this.state.messages[topic]} />)}
        </tbody>
        </table>
      </div>
    );
  }
}

ReactDOM.render((
  <MQTTTable
    topic="#"
    mqtt_url="ws://MQTT_HOST:MQTT_PORT" />
  ),
  document.getElementById('root')
);
