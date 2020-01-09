import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Grid, Container, Button, Paper } from "@material-ui/core"
import { TextField } from '@material-ui/core';

interface Props {

}

const Join: React.FC<Props> = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <Container>
            <Paper 
                style={{ 
                    padding: "1rem", 
                    maxWidth: "250px", 
                    margin: "auto",
                    minHeight: "180px" 
                }}
            >
                <Grid>
                    <TextField
                        fullWidth
                        name="name"
                        label="name"
                        onChange={(event: any) => {
                            setName(event.target.value)
                        }}
                    />
                    <div style={{ marginTop: "20px" }}></div>
                    <TextField
                        fullWidth
                        name="room"
                        label="room"
                        onChange={(event: any) => {
                            setRoom(event.target.value)
                        }}
                    />
                    <Link
                        onClick={(event: any) =>
                            (!name || !room) ? event.preventDefault() :
                                null}
                        to={`/chat?name=${name}&room=${room}`}>
                        <Button 
                            fullWidth
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={{ 
                                float: "right",
                                marginTop: "20px"     
                        }}
                        >
                            Enter
                    </Button>
                    </Link>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Join;
