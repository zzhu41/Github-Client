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
        userInfo.getContributorsStats(this.props.navigation.state.params.user, this.props.navigation.state.params.repo)
        .then((async (res) => {
            let totalCommits = 0;
            let authorLogin = [];
            let total = []
            for (const index in res) {
                totalCommits += res[index].total
                authorLogin.push(res[index].author.login);
                total.push(res[index].total)
            }
            authorLogin = authorLogin.slice(-5);
            total = total.slice(-5);
            this.setState({
                topone : total[4],
                toptwo : total[3],
                topthree : total[2],
                topfour : total[1],
                topfive : total[0],
                toponeName : authorLogin[4],
                toptwoName : authorLogin[3],
                topthreeName : authorLogin[2],
                topfourName : authorLogin[1],
                topfiveName : authorLogin[0]
            })
            for (let i = 0; i<5; i++) {
                console.log(authorLogin[i]);
            }
        }))
        userInfo.getCommitStats(this.props.navigation.state.params.user, this.props.navigation.state.params.repo)
        .then((async (res) => {
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
                amount: this.state.topone,
                svg: { fill: '#600080' },
            },
            {
                key: 2,
                amount: this.state.toptwo,
                svg: { fill: '#9900cc' }
            },
            {
                key: 3,
                amount: this.state.topthree,
                svg: { fill: '#c61aff' }
            },
            {
                key: 4,
                amount: this.state.topfour,
                svg: { fill: '#d966ff' }
            },
            {
                key: 5,
                amount: this.state.topfive,
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
                        {'data.amount'}
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
                <View style={{ paddingTop: 50, flexDirection: 'row' }}>
                    <View style = {{ flex:2}}>
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
                    <View style = {{ flex:1}}> 
                        <Text style={{color: '#600080'}}>
                            {this.state.toponeName}
                        </Text>
                        <Text style={{color: '#9900cc'}}>
                            {this.state.toptwoName}
                        </Text>
                        <Text style={{color: '#c61aff'}}>
                            {this.state.topthreeName}
                        </Text>
                        <Text style={{color: '#d966ff'}}>
                            {this.state.topfourName}
                        </Text>
                        <Text style={{color: '#ecb3ff'}}>
                            {this.state.topfiveName}
                        </Text>
                        <Text style={{color: 'red'}}>
                            others
                        </Text>
                    </View>  
                </View>       
            </Container>
        )
    }
 
}
