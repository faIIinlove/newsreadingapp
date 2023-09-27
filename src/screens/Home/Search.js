import {
    Image, StyleSheet, Text,
    TextInput, View, TouchableOpacity, FlatList
} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Latest from '../../components/NewsItem'
import { searchNews } from '../../services/NewsService'
import Lottie from 'lottie-react-native';
import SearchingAnimation from '../../assets/lottie/animedancing.json'



const Search = (props) => {
    const [text, setText] = useState('')
    const [showClearIcon, setShowClearIcon] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const searchByTitle = async (text) => {
        setIsLoading(true)
        const results = await searchNews(text)
        setSearchResults(results.data)
        setIsLoading(false)
    }

    useEffect(() => {
        let timer
        if (text.length > 0) {
            timer = setTimeout(() => {
                searchByTitle(text)
            }, 900);
        }
        return () => clearTimeout(timer)
    }, [text])


    const handleClear = useCallback((text) => {
        setText(text)
        setShowClearIcon(text.length > 0)
    }, [text])

    const renderItem = (value) => {
        const { item } = value;
        return (
            <Latest
                onPress={() => props.navigation.navigate('Detail', { id: item._id })}
                thumb={{ uri: item.image }}
                title={item.title}
                avatar={{ uri: item.createdBy.avatar }}
                author={item.createdBy.name}
                time={item.createdAt}
            />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image source={require('../../assets/images/searchIcon.png')} style={{ margin : 5 }} />
                <TextInput
                    value={text}
                    style={styles.input}
                    onChangeText={handleClear}
                    placeholder="Search"
                    placeholderTextColor={'gray'}
                />
                {showClearIcon &&
                    (<TouchableOpacity onPress={
                        () => {
                            setText('')
                            setShowClearIcon(false)
                        }
                    }>
                        <Image source={require('../../assets/images/xIcon.png')} />
                    </TouchableOpacity>)}
            </View>

            <Text style={styles.txtTitle}>News</Text>
            <View style={{ flex: 1, width: '100%' }}>
                {isLoading ? <Lottie source={SearchingAnimation} autoPlay loop /> :
                    (<FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={searchResults}
                        renderItem={renderItem} //adapter
                        keyExtractor={(item, index) => item._id} />)}
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    txtTitle: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 22,
        color: '#000000',
        marginTop: 16,
        borderBottomColor: '#1877F2',
        borderBottomWidth: 4,
        paddingBottom: 8,
    },
    input: {
        flex: 1,
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 24,
        color: '#000000',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 48,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#4E4B66',
        borderRadius: 6,
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 24,
    },
})