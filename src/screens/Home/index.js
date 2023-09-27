import { View, Text, StyleSheet, Image, ScrollView, FlatList, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getNews } from '../../services/NewsService'
import Trending from './Trending'
import Latest from '../../components/NewsItem'

const Home = (props) => {
    useEffect(() => {
        getNewsData();
    }, [])

    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);

    const renderItem = (value) => {
        const { item: news } = value;
        return (
            <Latest
                onPress={() => props.navigation.navigate('Detail', { id: news._id, createdBy: news.createdBy })}
                thumb={{ uri: news.image }}
                title={news.title}
                avatar={{ uri: news.createdBy.avatar }}
                author={news.createdBy.name}
                time={news.createdAt}
            />
        )
    }

    const getNewsData = async () => {
        setLoading(true);
        const res = await getNews();
        if (res?.statusCode === 200) {
            setNews(res.data);

        }
        setLoading(false);
    }

    return (
        <ScrollView style={myStyle.body}>
            <View style={myStyle.header}>
                <Image source={require('../../assets/images/kabar.png')} />
                <View style={myStyle.notifi_icon}>
                    <Image source={require('../../assets/images/notifi_icon.png')} />
                </View>
            </View>
            <Pressable onPress={() => props.navigation.navigate('Search')}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderRadius: 6, borderColor: '#4E4B66', padding: 10 }}>
                    <Image source={require('../../assets/images/search_icon.png')} />
                    <Text style={{ marginLeft: 8, flex: 1 }}>Search</Text>
                    <Image source={require('../../assets/images/search2_icon.png')} />
                </View>
            </Pressable>
            <View style={myStyle.trendingContainer}>
                <View style={myStyle.headerForTrending} >
                    <Text style={myStyle.fontTrending}>Trending</Text>
                    <Text style={myStyle.fontSeeall}>See all</Text>
                </View>
                <Trending
                    title="Russian warship: Moskva sinks in Black Sea"
                    thumb={require('../../assets/images/trending1.png')}
                    time="4h ago"
                    author="BBC News"
                    avatar={require('../../assets/images/logoBBC.png')}
                    country="Europe"
                />
            </View>

            <View style={myStyle.latestContainer}>
                <View style={myStyle.headerForTrending}>
                    <Text style={myStyle.fontTrending}>Latest</Text>
                    <Text style={myStyle.fontSeeall}>See all</Text>
                </View>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={myStyle.tabLatest}>
                    <Text style={myStyle.itemTabLatest}>All</Text>
                    <Text style={myStyle.itemTabLatest}>Sports</Text>
                    <Text style={myStyle.itemTabLatest}>Politics</Text>
                    <Text style={myStyle.itemTabLatest}>Business</Text>
                    <Text style={myStyle.itemTabLatest}>Health</Text>
                    <Text style={myStyle.itemTabLatest}>Travel</Text>
                    <Text style={myStyle.itemTabLatest}>Science</Text>
                </ScrollView>

                <View style ={{paddingBottom: 30}}>
                    {news.map((item, index) => (
                        <Latest
                            key={item._id}
                            onPress={() => props.navigation.navigate('Detail', { id: item._id, createdBy: item.createdBy })}
                            thumb={{ uri: item.image }}
                            title={item.title}
                            avatar={{ uri: item.createdBy.avatar }}
                            author={item.createdBy.name}
                            time={item.createdAt}
                        />
                    ))}
                </View>

            </View>
        </ScrollView>
    )
}

export default Home

const myStyle = StyleSheet.create({

    listLatest: {
        height: 120,
    },

    itemTabLatest: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#000000',
        marginBottom: 16,
        paddingRight: 15,
    },

    tabLatest: {
        height: 40,
        marginTop: 16,
    },

    latestContainer: {

    },

    fontSeeall: {
        fontFamily: 'Arial',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#4E4B66',
    },

    fontTrending: {
        fontFamily: 'Arial',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0.12,
        color: '#000000',
    },

    headerForTrending: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    trendingContainer: {
        marginTop: 16,
        marginBottom: 16,
    },

    notifi_icon: {
        backgroundColor: '#FFFFFF',
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 6,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
    },
    body: {
        padding: 24,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%',
    }
})
