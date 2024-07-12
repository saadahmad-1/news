import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Card, Title, Paragraph } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../../components/AppBar";
import { styled } from "nativewind";

const StyledCard = styled(Card);
const StyledTitle = styled(Title);
const StyledParagraph = styled(Paragraph);

export default class HomeScreen extends Component {
  state = {
    articles: [],
    isLoading: true,
    errors: null,
  };

  getArticles() {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=pakistan&apiKey=378f321edf194aa698775ced044519cc"
      )
      .then((response) => {
        return response.data.articles.map((article) => ({
          date: article.publishedAt,
          title: article.title,
          url: article.url,
          description: article.description,
          urlToImage: article.urlToImage,
        }));
      })
      .then((articles) => {
        this.setState({
          articles,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    const { isLoading, articles } = this.state;
    return (
      <SafeAreaProvider>
        <View className="flex-1 bg-black">
          <Header country="Pakistan" />
          <ScrollView contentContainerStyle={{ padding: 10 }}>
            {!isLoading ? (
              articles.map((article) => {
                const { date, title, url, description, urlToImage } = article;
                return (
                  <StyledCard
                    key={url}
                    className="bg-gray-800 mb-4 rounded-lg border border-gray-700"
                    onPress={() => {
                      Linking.openURL(url);
                    }}
                  >
                    <View className="flex-row">
                      {/* Text */}
                      <View className="flex-1 justify-around m-3">
                        <StyledTitle className="text-white">
                          {title}
                        </StyledTitle>
                      </View>
                      {/* Image */}
                      <View className="w-32 m-3">
                        <Image
                          style={{
                            width: "100%",
                            height: 120,
                            borderRadius: 10,
                          }}
                          source={{ uri: urlToImage }}
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                    <View className="m-3">
                      <StyledParagraph className="text-gray-300">
                        {description}
                      </StyledParagraph>
                      <Text className="text-gray-500">
                        Published At: {new Date(date).toLocaleDateString()}
                      </Text>
                    </View>
                  </StyledCard>
                );
              })
            ) : (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#ffffff" />
              </View>
            )}
          </ScrollView>
        </View>
      </SafeAreaProvider>
    );
  }
}
