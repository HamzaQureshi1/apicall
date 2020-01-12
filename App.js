import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    };
  }

  componentDidMount() {
    return fetch(
      "https://2aw2ojaww1.execute-api.eu-west-2.amazonaws.com/api/safeplaces"
    )
      .then(response => response.json())
      .then(responseJSON => {
        this.setState({
          isLoading: false,
          dataSource: responseJSON.Items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let safeplaces = this.state.dataSource.map((value, key) => {
        return (
          <View key={key} style={styles.item}>
            <Text>
              Name:{value.place_name}
              {"\n"}
              Address:{value.formatted_address}
              {"\n"}
              Author:{value.author}
              {"\n"}
              Place_id:{value.place_id}
              {"\n"}
              Rating:{value.rating}
              {"\n"}
              Opening hours:{value.weekday_text}
              {"\n"}
              Longitude:{value.longitude}
              {"\n"}
              Latitude:{value.latitude}
              {"\n"}
            </Text>
          </View>
        );
      });

      return <View style={styles.container}>{safeplaces}</View>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  }
});
