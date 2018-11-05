import React from 'react'
import { LineChart, YAxis, Grid, PieChart } from 'react-native-svg-charts';
import { View , Text } from 'react-native';
import { Container, Header, Content, Body, Right, Left } from 'native-base';
import { userInfo } from '../API/UserInfo';
export default class VisualizationPage extends React.Component {
 
    constructor(props) {
        super(props);
        this.state = {
            commitList : [],
            loading: false
        }
    }
    
    static navigationOptions = {
        title: 'Data Visualization'
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
        const data = [
            {
                key: 1,
                amount: 50,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: 50,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount: 40,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: 95,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: 35,
                svg: { fill: '#ecb3ff' }
            }
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={24}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                )
            })
        }
        const contentInset = { top: 20, bottom: 20 }
 
        return (
            <Container>
                <View style={{ paddingTop: 50, height: 300, flexDirection: 'row' }}>
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
                <View style = {{ paddingTop: 50}}>
                    <PieChart
                    style={{ height: 200 }}
                    valueAccessor={({ item }) => item.amount}
                    data={data}
                    spacing={0}
                    outerRadius={'95%'}
                    >
                    <Labels/>
                    </PieChart>
                </View>         
            </Container>
        )
    }
 
}
