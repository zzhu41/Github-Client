import React from 'react'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { View } from 'react-native'
 
export default class VisualizationPage extends React.Component {
 
    async componentWillMount() {
        let username = 'zzhu41';
        if (this.props.navigation.state.params) {
            username = this.props.navigation.state.params.user;
        }
        userInfo.getRepoInfo(username).then((async (res) => {
            this.setState({
                repoList: res
            })
            let rlist = '';
            res.map((item) => {
                rlist += `${item.owner.login}/${item.name}` + '@';
            })
            try {
                await AsyncStorage.setItem('repositories', rlist);
            } catch (error) {
                console.log(error);
            }
        }))
    } 

    render() {
 
        const data = [ 50, 10, 40, 95, 12,412 ,213,21,32 ]
 
        const contentInset = { top: 20, bottom: 20 }
 
        return (
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={ data }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}` }
                />
                <LineChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={ data }
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={ contentInset }
                >
                    <Grid/>
                </LineChart>
            </View>
        )
    }
 
}