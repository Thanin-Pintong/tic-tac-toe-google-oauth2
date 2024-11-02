import React, { useState } from 'react'
import { useGameStyle } from "./styles/useGameStyle";
import { useDispatch, useSelector } from "react-redux";
import { Button, NativeSelect, Typography, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { changeMode, changeDifficulty, restartGame } from "../redux/board/action";
import { Input } from "./Input";
import { CodeIcon, HeartIcon } from "./icon";

const Game = (props) => {
    const classes = useGameStyle()
    const {
        player1,
        player2,
        difficulty,
        turn,
        mode
    } = useSelector(({ state }) => {
        return state
    })

    const dispatch = useDispatch()

    const [dialogOpen, setDialogOpen] = useState(false);
    const [playHistories, setPlayHistories] = useState([]);

    const onDialogOpen = (byCondition) => () => {
        fetchPlayHistories(byCondition);
        //setDialogOpen(true);
    };

    const onDialogClose = () => {
        setDialogOpen(false);
    };

    const fetchPlayHistories = (byCondition) => {
        const appApiUrl = process.env.APP_API_URL || 'http://localhost:4000/api/v1';
        let userIdMeta = document.getElementsByTagName("meta").userId;
        //let userIdMetaName = userIdMeta.getAttribute('name');
        let userIdMetaContent = userIdMeta.getAttribute('content');
        let userId = userIdMetaContent;
        let appApiPath = '';

        if (byCondition === 'all') { appApiPath = `${appApiUrl}/play-history`; }
        else { appApiPath = `${appApiUrl}/play-history-by-user-id/${userId}`; }

        fetch(appApiPath, {
            method: 'GET',
            credentials: 'include', // to send HTTP only cookies
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => { setPlayHistories(data); setDialogOpen(true); })
            .catch(err => console.error(err));
    }

    return (
        <>
            <Dialog open={dialogOpen} onClose={onDialogClose}
                sx={{ ".MuiPaper-root": { maxWidth: 800 } }}
            >
                <DialogTitle>Play History</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">No.</TableCell>
                                <TableCell align="center">User ID</TableCell>
                                <TableCell align="center">Start Date/Time</TableCell>
                                <TableCell align="center">Last Date/Time</TableCell>
                                <TableCell align="center">Score(s)</TableCell>
                                <TableCell align="center">Total Round(s)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {playHistories.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="left">{row.userId}</TableCell>
                                    <TableCell align="center">{new Date(row.startDateTime).toLocaleString("th-TH")}</TableCell>
                                    <TableCell align="center">{new Date(row.endDateTime).toLocaleString("th-TH")}</TableCell>
                                    <TableCell align="right">{row.playerScore}</TableCell>
                                    <TableCell align="right">{row.roundNumber}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDialogClose} color="primary">Close</Button>
                </DialogActions>
            </Dialog>

            <div className={classes.game}>
                <h1 className={classes.header}>
                    Tic Tac Toe
                    <IconButton size="small" onClick={ () => {
                        window.location.replace("/"); }}
                    >
                        <HomeIcon fontSize="inherit" />
                    </IconButton>                    
                </h1>
                <h3>{turn === 1 && player1.name}{turn === 2 && player2.name} turn</h3>
                <div className={classes.selectsContainer} style={{ display: 'none' }}>
                    <div className={classes.select}>
                        <span className={classes.label}>Difficulty</span>
                        <NativeSelect
                            labelid="difficulty"
                            value={difficulty}
                            input={<Input />}
                            onChange={(event) => dispatch(changeDifficulty(event.target.value))}
                        >
                            <option value={'easy'}>
                                easy
                            </option>
                            <option value={'hard'}>
                                hard
                            </option>
                            <option value={'impossible'}>
                                impossible (minmax algorithm)
                            </option>
                        </NativeSelect>
                    </div>

                    <div className={classes.select} style={{ display: 'none' }}>
                        <span className={classes.label}>Mode</span>
                        <NativeSelect
                            labelid="mode"
                            value={mode}
                            input={<Input />}
                            onChange={(event) => dispatch(changeMode(event.target.value))}
                        >
                            <option value={'robot'}>
                                robot
                            </option>
                            <option value={'friendly'}>
                                friendly
                            </option>
                        </NativeSelect>
                    </div>
                </div>
                {
                    props.children
                }
                <footer>
                    {
                        player1.winner && player2.winner ?
                            <h3>Draw</h3>
                            :
                            <>
                                <h3>{player1.winner && `${player1.name} win`}</h3>
                                <h3>{player2.winner && `${player2.name} win`}</h3>
                            </>
                    }

                    <Button
                        variant={'contained'}
                        color={'primary'}
                        style={{ marginTop: 8 }}
                        onClick={() => {
                            dispatch(restartGame())
                        }}
                    >
                        Restart
                    </Button>

                    <div className={classes.github}>
                        <Button variant="outlined" style={{ margin: '0 8px' }} onClick={onDialogOpen('userId')}>Your Playing History</Button>
                        <Button variant="outlined" style={{ margin: '0 8px' }} onClick={onDialogOpen('all')}>All Playing Histories</Button>
                    </div>

                    <Typography
                        className={classes.github} style={{ display: 'none' }}
                    >
                        <a
                            href={'https://github.com/MamadTvl/tic-tac-toe-pwa'}
                            rel={'noreferrer'}
                            target={'_blank'}
                        >

                            <CodeIcon />
                        </a>
                        with
                        <HeartIcon />
                        By
                        <a
                            href={'https://github.com/MamadTvl'}
                            target={'_blank'}
                            rel={'noreferrer'}
                            style={{ margin: '0 8px' }}
                        >
                            MamadTvl
                        </a>
                        &
                        <a
                            href={'https://github.com/mahdis-ai'}
                            target={'_blank'}
                            rel={'noreferrer'}
                            style={{ margin: '0 8px' }}
                        >
                            Mahdis Abedi
                        </a>
                    </Typography>
                </footer>
            </div>
        </>
    )
}
export default Game
