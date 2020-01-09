import React from 'react'
import {
    makeStyles,
    Theme,
    createStyles,
    Typography
} from '@material-ui/core'

interface Props {
    message: Msg,
    name: string
}

interface Msg {
    user: string
    text: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            height: 140,
            width: 100,
        },
        control: {
            padding: theme.spacing(2),
        },
    }),
);

const Message: React.FC<Props> = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false
    const classes = useStyles();

    const trimmedName = name.trim().toLowerCase()

    if (user === trimmedName) {
        isSentByCurrentUser = true
    }

    return (
        isSentByCurrentUser ? (
            <>
                <div className="message--container f-end">
                    <div className="innerBox--message--user" style={{ marginRight: "10px" }}>
                        <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                            {trimmedName}
                        </Typography>
                    </div>
                    <div className="innerBox--message--text">
                        <Typography variant="body2" component="p">
                            {text}
                        </Typography>
                    </div>
                </div>
            </>
        ) : (
                <>
                    <div className="message--container">
                        <div className="innerBox--message--text">
                            <Typography variant="body2" component="p">
                                {text}
                            </Typography>
                        </div>
                        <div className="innerBox--message--user">
                            <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
                                {user}
                            </Typography>
                        </div>
                    </div>
                </>

            )
    );
}

export default Message;
