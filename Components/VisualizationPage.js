import React from 'react'
import { LineChart, YAxis, Grid } from 'react-native-svg-charts'
import { View , Container, Text } from 'react-native'
import { userInfo } from '../API/UserInfo'
export default class VisualizationPage extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            commitList : [],
            loading: false
        }
    }
    
    async componentWillMount() {
        userInfo.getCommitStats(this.props.navigation.state.params.user, this.props.navigation.state.params.repo)
        .then((async (res) => {
            console.log('adsa')
            let commitList = []
            for (const index in res) {
                commitList.push(res[index].total);
            }
            this.setState({
                commitList: commitList
            })
        }))
    } 

    render() {
        const contentInset = { top: 20, bottom: 20 }
 
        return (
            <View style={{ height: 200, flexDirection: 'row' }}>
                <YAxis
                    data={ this.state.commitList }
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
                    data={ this.state.commitList }
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={ contentInset }
                >
                    <Grid/>
                </LineChart>
            </View>
        )
    }
 
}
