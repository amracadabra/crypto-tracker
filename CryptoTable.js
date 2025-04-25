import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const TableContainer = styled.div`
  overflow-x: auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  background: #f5f5f5;
  font-weight: 600;
  color: #333;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const ChangeCell = styled(Td)`
  color: ${props => props.value > 0 ? '#22c55e' : '#ef4444'};
  font-weight: 500;
`;

const ChartContainer = styled.div`
  width: 100px;
  height: 40px;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
`;

const SortButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  background-color: ${props => props.active ? '#007bff' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.active ? '#0056b3' : '#f8f9fa'};
  }
`;

const formatNumber = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toFixed(2);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price);
};

function CryptoTable() {
  const assets = useSelector(state => state.crypto.assets);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterGainers, setFilterGainers] = useState(false);
  const [filterLosers, setFilterLosers] = useState(false);

  const filteredAndSortedAssets = useMemo(() => {
    let result = [...assets];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(asset => 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply gainers/losers filter
    if (filterGainers) {
      result = result.filter(asset => asset.change24h > 0);
    }
    if (filterLosers) {
      result = result.filter(asset => asset.change24h < 0);
    }

    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    });

    return result;
  }, [assets, searchTerm, sortField, sortDirection, filterGainers, filterLosers]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <>
      <FilterContainer>
        <FilterInput
          type="text"
          placeholder="Search by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={sortField}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="marketCap">Market Cap</option>
          <option value="price">Price</option>
          <option value="change24h">24h Change</option>
          <option value="volume24h">24h Volume</option>
        </FilterSelect>
        <SortButton
          active={filterGainers}
          onClick={() => setFilterGainers(!filterGainers)}
        >
          Top Gainers
        </SortButton>
        <SortButton
          active={filterLosers}
          onClick={() => setFilterLosers(!filterLosers)}
        >
          Top Losers
        </SortButton>
      </FilterContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th onClick={() => handleSort('price')}>Price</Th>
              <Th onClick={() => handleSort('change1h')}>1h %</Th>
              <Th onClick={() => handleSort('change24h')}>24h %</Th>
              <Th onClick={() => handleSort('change7d')}>7d %</Th>
              <Th onClick={() => handleSort('marketCap')}>Market Cap</Th>
              <Th onClick={() => handleSort('volume24h')}>Volume (24h)</Th>
              <Th>Circulating Supply</Th>
              <Th>Max Supply</Th>
              <Th>7D Chart</Th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedAssets.map((asset, index) => (
              <tr key={asset.id}>
                <Td>{index + 1}</Td>
                <Td>
                  <Logo src={asset.logo} alt={asset.name} />
                  {asset.name} ({asset.symbol})
                </Td>
                <Td>{formatPrice(asset.price)}</Td>
                <ChangeCell value={asset.change1h}>{asset.change1h}%</ChangeCell>
                <ChangeCell value={asset.change24h}>{asset.change24h}%</ChangeCell>
                <ChangeCell value={asset.change7d}>{asset.change7d}%</ChangeCell>
                <Td>{formatNumber(asset.marketCap)}</Td>
                <Td>{formatNumber(asset.volume24h)}</Td>
                <Td>{formatNumber(asset.circulatingSupply)}</Td>
                <Td>{asset.maxSupply ? formatNumber(asset.maxSupply) : '∞'}</Td>
                <Td>
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={asset.chartData.map((value, index) => ({ value }))}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke={asset.change7d > 0 ? '#22c55e' : '#ef4444'}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default CryptoTable; 