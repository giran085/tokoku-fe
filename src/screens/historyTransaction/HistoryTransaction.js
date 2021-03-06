import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import Axios from 'axios'
import { API_URL } from '../../supports/constants/urlApi'
import { Container, Content, List, ListItem, Left, Body, Right,Text } from 'native-base'
import HeaderWithArrowBack from '../../components/Header'
import Moment from 'moment'
import Loading from '../../components/Loading'

const users_id = 3

const HistoryTransaction = (props) => {
    const [data,setData] = useState(null)

    useEffect(() => {
        getDataTransaction()
    } ,[])

    const getDataTransaction = () => {
        Axios.get(API_URL+'transaction/' + users_id)
        .then((res) => {
            setData(res.data.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }  
    
    const renderDataToJsx = () => {
        return data.map((val) => {
            return(     
                <ListItem key={val.id} avatar onPress={() => props.navigation.navigate('history-detail',{transaction_id : val.id , status : val.status}) }>
                    <Left>
                        <View style={{backgroundColor : "grey",height :40,width:40,borderRadius:25,justifyContent:'center',alignItems:'center'}} >
                            <Text style={{color : "white"}}>
                                {val.total_item}
                            </Text>
                        </View>
                    </Left>
                    <Body>
                        <Text>Rp. {val.total_transaction}</Text>
                        <Text note>{val.status === 1 ? "Waiting For Payment" : val.status === 2 ? "Waiting For Approvement" : "Others"}</Text>
                    </Body>
                    <Right>
                        <Text note>{Moment(val.date).format('MMM Do YY')}</Text>
                    </Right>
                </ListItem>
                    
            )
        })
    }

    if(data === null){
        return <Loading />
    }

    return (
        <Container>
            <HeaderWithArrowBack title='History' />
            <Content>
                <List>
                    {renderDataToJsx()}
                </List>
            </Content>
        </Container>
    )
}
export default HistoryTransaction
