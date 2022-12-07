import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;
const CoinList = styled.ul``;
const Coin = styled.li`
    margin-bottom: 10px;
    border-radius: 15px;
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.textColor};
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    a > span {
        margin-top: 6px;
    }
    &:hover {
        a {
        color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Loader = styled.span`
    display: block;
    text-align: center;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface ICoinsprops {
    toggleDark: () => void;
}

function Coins({ toggleDark }:ICoinsprops ) {
    const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
        <Helmet>
            <title>코인</title>
        </Helmet>
        <Header>
            <Title>Coin</Title>
            <button onClick={toggleDark}>Toggle Dark Mode</button>
        </Header>
        {isLoading ? (
            <Loader>"Loading..."</Loader>
        ) : (
            <CoinList>
            {data?.slice(0,10).map((coin) => (
                <Coin key={coin.id}>
                <Link
                    to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                    }}
                >
                    <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    alt={coin.name}
                    />
                    <span>{coin.name} &rarr;</span>
                </Link>
                </Coin>
            ))}
            </CoinList>
        )}
        </Container>
    );
};

export default Coins;