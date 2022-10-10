import React from 'react';
import styled from "styled-components";
import {Block} from "../atoms/Block";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import {MyRow} from "../atoms/MyRow";
import {Title24} from "../atoms/Title24";

const Home = () => {

    const data = [
        {
            name: 'January',
            Iphone: 4000
        },
        {
            name: "March",
            Iphone: 1000,
        },
        {
            name: "May",
            Iphone: 4000,
        },
        {
            name: "July",
            Iphone: 800,
        },
        {
            name: "October",
            Iphone: 1500,
        },
    ];


    return (
        <Root>
            <MyRow>
                <Title24>
                    Income/Expenditure
                </Title24>
            </MyRow>
            <MyRow>
                <Panel background={'linear-gradient(180deg, #1DA1F2 0%, #1565D8 100%)'}>

                </Panel>
                <Panel background={'linear-gradient(180deg, #FF5A5F 0%, #ED3B41 100%)'}>

                </Panel>
                <Panel background={'linear-gradient(180deg, #FF9E51 0%, #FF8626 100%)'}>

                </Panel>
            </MyRow>
            {/*<MyRow*/}
            {/*>*/}
            {/*    <MyBlock>*/}

            {/*    </MyBlock>*/}
            {/*    <MyBlock2>*/}

            {/*    </MyBlock2>*/}
            {/*</MyRow>*/}
            <ResponsiveContainer width="90%" aspect={3}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 15,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid horizontal stroke="#243240"/>
                    <XAxis dataKey="name" tick={{fill: "#000000"}}/>
                    <YAxis tick={{fill: "#000000"}}/>
                    <Tooltip contentStyle={{backgroundColor: "#8884d8", color: "#fff"}} itemStyle={{color: "#fff"}}
                             cursor={false}/>
                    <Line type="monotone" dataKey="Iphone" stroke="#8884d8" strokeWidth="5"
                          dot={{fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5}}
                          activeDot={{fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10}}/>

                </LineChart>
            </ResponsiveContainer>
        </Root>
    );
};

export default Home;

const Root = styled.div`
  
`;

type PanelType = {
    background: string;
}
const Panel = styled.div<PanelType>`
  background: ${props => props.background};
  max-width: 400px;
  width: 100%;
  height: 96px;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(38, 38, 38, 0.1);
`;

const MyBlock = styled(Block)`
  padding: 24px;
  width: 824px;
  //width: 100%;
  height: 400px;
`;
const MyBlock2 = styled(Block)`
  padding: 24px;
  width: 400px;
  //width: 100%;
  height: 400px;
`;
