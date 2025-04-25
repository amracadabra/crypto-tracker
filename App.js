import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAsset } from './store/cryptoSlice';
import { togglePersistence } from './store/persistenceSlice';
import CryptoTable from './components/CryptoTable';
import styled from 'styled-components';

const AppContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const PersistenceToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: ${props => props.active ? '#22c55e' : '#ef4444'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#16a34a' : '#dc2626'};
  }
`;

function App() {
  const dispatch = useDispatch();
  const isPersisting = useSelector(state => state.persistence.isPersisting);

  useEffect(() => {
    const simulateWebSocket = () => {
      const assets = [1, 2, 3, 4, 5];
      const randomAsset = assets[Math.floor(Math.random() * assets.length)];
      
      const updates = {
        price: Math.random() * 1000 + 1000,
        change1h: (Math.random() * 10 - 5).toFixed(2),
        change24h: (Math.random() * 15 - 7.5).toFixed(2),
        change7d: (Math.random() * 20 - 10).toFixed(2),
        volume24h: Math.random() * 1000000000 + 1000000000
      };

      dispatch(updateAsset({ id: randomAsset, updates }));
    };

    const interval = setInterval(simulateWebSocket, 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <AppContainer>
      <Title>Crypto Price Tracker</Title>
      <CryptoTable />
      <PersistenceToggle
        active={isPersisting}
        onClick={() => dispatch(togglePersistence())}
      >
        {isPersisting ? 'Persistence: ON' : 'Persistence: OFF'}
      </PersistenceToggle>
    </AppContainer>
  );
}

export default App; 