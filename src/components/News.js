import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import LoadingIcon from './LoadingIcon.js';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const rows =
    newsData.map((news) => (
      createData(
        news.publishedDate, 
        news.symbol, 
        news.title, 
        news.site, 
        news.text, 
        news.url)
    ));

  function createData(publishedDate, symbol, title, site, text, url) {
    return { publishedDate, symbol, title, site, text, url };
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

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      fontSize: '0.9rem',
    },
  }));

  useEffect(() => {
    try {
      const options = {
        method: 'GET',
        url: 'http://localhost:8000/news'
      };
  
      axios.request(options).then((response) => {
        //console.log(response.data);
        setNewsData(response.data);
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
      <div id="news" className="news-flex">
        <div>
          <TableContainer sx={{ margin: '0 auto', width: '90%' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Ticker</StyledTableCell>
                  <StyledTableCell>Article</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Site</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody sx={{ border: '2px solid rgba(50, 50, 50, 0.5)' }}>
                {rows.map((row, index) => (
                  <StyledTableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <StyledTableCell sx={{ minWidth: 100 }}>{row.publishedDate}</StyledTableCell>
                    <StyledTableCell sx={{ maxWidth: 100, fontWeight: 600 }} onClick={() => OnClickSymbolHandler(row.symbol)}>                     
                      <a href='/company'>{row.symbol}</a>
                    </StyledTableCell>
                    <StyledTableCell>
                      <BootstrapTooltip title="External Site" placement="right">
                        <a href={row.url} target='_blank' rel='noopener noreferrer'>{row.title}</a>
                      </BootstrapTooltip>
                    </StyledTableCell>
                    <StyledTableCell>{(row.text.length === 0 ? row.title : row.text)}</StyledTableCell>
                    <StyledTableCell>{row.site}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div id="news-footer-description">
          <p>The above news articles are the property of their respective publishers.</p>
          <p>Love The Stocks is not responsible for financial advice provided by the above news articles.</p>
        </div>
      </div>      
    </section>
  )
  
}

export default News;