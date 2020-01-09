import React, { useState } from 'react';
import { Container } from '@material-ui/core';


interface Props {

}

const InfoBar: React.FC<Props> = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    return (
        <Container>
        </Container>
    );
}

export default InfoBar;
