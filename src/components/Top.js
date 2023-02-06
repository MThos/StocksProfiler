import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import { NumberConverter } from '../helper.js';
import LoadingIcon from './LoadingIcon.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Top = () => {
  const [marketCapData, setMarketCapData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const rows =
    marketCapData.map((stock, index) => (
      createData(
        index + 1, 
        stock.companyName, 
        stock.symbol, 
        stock.marketCap, 
        stock.price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
        stock.volume, 
        stock.country)
    ));

  function createData(rank, name, symbol, marketcap, price, volume, country) {
    return { rank, name, symbol, marketcap, price, volume, country };
  };

  const OnClickSymbolHandler = (symbol) => {
    localStorage.setItem('active', symbol.toUpperCase());
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'mediumslateblue',
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
      borderTop: '1px solid rgba(50, 50, 50, 0.3)',
      borderBottom: '1px solid rgba(50, 50, 50, 0.3)',
      fontSize: 16,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      borderTop: '1px solid rgba(50, 50, 50, 0.3)',
      borderBottom: '1px solid rgba(50, 50, 50, 0.3)',
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const StyledTableHead = styled(TableHead)(() => ({
    border: '1px solid rgba(50, 50, 50, 0.2)',
    backgroundColor: 'mediumslateblue',
  }));

  useEffect(() => {
    try {
      const options = {
        method: 'GET',
        url: 'http://localhost:8000/topmarketcap'
      };
  
      axios.request(options).then((response) => {
        //console.log(response.data);
        setMarketCapData(response.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (isLoading) {
    return (
      <LoadingIcon />
    )
  }

  return (
    <section className="fade-in">
      <div id="top" className="top-flex">
        <div>
          <TableContainer sx={{ margin: '0 auto', width: '90%' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Ticker</StyledTableCell>
                  <StyledTableCell>Company</StyledTableCell>
                  <StyledTableCell align="right">Market Cap (USD)</StyledTableCell>
                  <StyledTableCell align="right">Price (USD)</StyledTableCell>
                  <StyledTableCell align="right">Volume (3M)</StyledTableCell>
                  <StyledTableCell align="right">Country</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody sx={{ border: '2px solid rgba(50, 50, 50, 0.5)' }}>
                {rows.map((row) => (
                  <StyledTableRow
                    key={row.symbol}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell sx={{ maxWidth: 30 }} align="left">{row.rank}</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 80, fontWeight: 600 }} onClick={() => OnClickSymbolHandler(row.symbol)}>
                      <a href='/company'>{row.symbol}</a>
                    </StyledTableCell>
                    <StyledTableCell sx={{ maxWidth: 200 }}>{row.name}</StyledTableCell>
                    <StyledTableCell align="right">{NumberConverter(row.marketcap, 2)}</StyledTableCell>
                    <StyledTableCell align="right" sx={{ color: 'mediumseagreen', fontWeight: 600 }}>${row.price}</StyledTableCell>
                    <StyledTableCell align="right">{NumberConverter(row.volume, 0)}</StyledTableCell>
                    <StyledTableCell align="right">{row.country}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div id="top-footer-description">
          <p>The above chart of companies can be refreshed every minute.</p>
          <p>There are some companies above that have multiple shares - A, B or C class shares.</p>
          <p>The above data is not guaranteed to be 100% accurate.</p>
        </div>
      </div>      
    </section>
  )
  
}

export default Top;